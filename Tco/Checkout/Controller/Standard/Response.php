<?php

namespace Tco\Checkout\Controller\Standard;

class Response extends \Tco\Checkout\Controller\Checkout
{

    public function execute()
    {
        $returnUrl = $this->getCheckoutHelper()->getUrl('checkout');
        try {
            // Get params from response
            $params = $this->getRequest()->getParams();
            $paymentMethod = $this->getPaymentMethod();

            // Get payment method code
            $code = $paymentMethod->getCode();


            // Create the order if the response passes validation
            if ($paymentMethod->validateResponse($params)) {
                $convert_plus_order = null;
                if ($this->isInlineResponse($params)) {
                    $convert_plus_order = $this->getOrderByApi($params, $paymentMethod);
                    if ($convert_plus_order) {
                        $params['email'] = isset($convert_plus_order['CustomerDetails']['Email']) ? $convert_plus_order['CustomerDetails']['Email'] : null;
                        $params['order-ext-ref'] = $convert_plus_order['ExternalReference'];
                        $params['currency'] = $convert_plus_order['Currency'];
                        $params['total'] = $convert_plus_order['GrossPrice'];
                    }
                }

                $quoteId = $this->getQuote()->getId();

                $quote = $quoteId ? $this->_quoteRepository->get($quoteId) : $this->_ipnHelper->getQuoteByIncrementId($params['order-ext-ref']);

                if ($quote) {
                    $this->getCheckoutSession()->replaceQuote($quote);
                }
                $order = $this->_ipnHelper->getOrderByIncrementId($params['order-ext-ref'], $params['refno']);

                if (!$order && !$quote) {
                    $this->messageManager->addExceptionMessage(new \Exception(__("Missing order and quote data!")),
                        __("Missing order and quote data!"));
                }

                if ($quote && !$order) {
                    if ($this->getCustomerSession()->isLoggedIn()) {
                        if (isset($params['email']) && !empty($params['email'])) {
                            $quote->setCustomerEmail($params['email']);
                        }
                        $quote->setCheckoutMethod(\Magento\Checkout\Model\Type\Onepage::METHOD_CUSTOMER);
                    } else {
                        $quote->setCheckoutMethod(\Magento\Checkout\Model\Type\Onepage::METHOD_GUEST);
                    }

                    $quote->setPaymentMethod($code);
                    $quote->getPayment()->importData(['method' => $code]);
                    $this->_quoteRepository->save($quote);
                }

                if (!$order) {
                    try {
                        //Quote has been updated. From now we process the checkout
                        $this->initCheckout();
                        $this->_cartManagement->placeOrder(
                            $quote->getId(),
                            $quote->getPayment()
                        );
                        $order = $this->getOrder();
                        $order->addStatusHistoryComment(__('Order created when redirected from payment page.'));

                    } catch (\Exception $e) {
                        $this->messageManager->addExceptionMessage($e, __('We can\'t place the order.'));

                    }
                } else {

                    // set the checkoutSession for the redirect
                    $this->getCheckoutSession()
                        ->setLastSuccessQuoteId($quote->getId())
                        ->setLastQuoteId($quote->getId())
                        ->setLastRealOrderId($order->getIncrementId())
                        ->setLastOrderId($order->getId())
                        ->setLastOrderStatus($order->getStatus());
                }

                if ($order) {
                    $order->setExtOrderId($params['refno']);
                    $order->save();

                    $paymentMethod->postProcessing($order, $params);

                    $returnUrl = $this->getCheckoutHelper()->getUrl('checkout/onepage/success');
                }

            } else {
                $returnUrl = $this->getCheckoutHelper()->getUrl('checkout/onepage/failure');
            }

        } catch (\Magento\Framework\Exception\LocalizedException $e) {
            $this->messageManager->addExceptionMessage($e, $e->getMessage());
        } catch (\Exception $e) {
            $this->messageManager->addExceptionMessage($e, __('We can\'t place the order.'));
        }
        $this->getResponse()->setRedirect($returnUrl);
    }

    protected function isInlineResponse($params)
    {
        return (isset($params['refno']) && !isset($params['order-ext-ref']));
    }

    protected function getOrderByApi($params, $paymentMethod)
    {
        $refNo = isset($params['refno']) ? $params['refno'] : null;
        if (!$refNo) {
            throw new \Magento\Framework\Exception\LocalizedException(__('No valid reference number received!'));
        }

        $secretKey = $paymentMethod->getConfigData('api_secret_key');
        if (!$secretKey) {
            throw new \Magento\Framework\Exception\LocalizedException(__('Configuration for API Secret key is missing!'));
        }

        $merchantId = $paymentMethod->getMerchantId();
        if (!$merchantId) {
            throw new \Magento\Framework\Exception\LocalizedException(__('Configuration for Merchant Id is missing!'));
        }

        $requestDateTime = $paymentMethod->getApiHelper()->composeRequestDateTime();
        $hash = $paymentMethod->getApiHelper()->generateHash(
            $merchantId,
            $secretKey,
            $requestDateTime
        );
        $apiUrl = $paymentMethod->getConfigData('api_url');
        $headers = $paymentMethod->getApiHelper()->getHeaders($merchantId, $requestDateTime, $hash);
        $clientConfig = [
            'maxredirects' => 0,
            'timeout' => 30,
        ];

        $client = $paymentMethod->getHttpClientFactory()->create();
        $client->setUri(sprintf('%sorders/%s/', $apiUrl, $refNo));
        $client->setConfig($clientConfig);

        $client->setHeaders($headers);
        $client->setMethod(\Zend_Http_Client::GET);

        $responseBody = $paymentMethod->decodeAndValidateResponse($client);

        if (!isset($responseBody['ExternalReference'])) {
            throw new \Magento\Framework\Exception\LocalizedException(__('Required information missing from response!'));
        }
        return $responseBody;
    }
}
