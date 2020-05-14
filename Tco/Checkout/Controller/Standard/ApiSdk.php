<?php

namespace Tco\Checkout\Controller\Standard;


class ApiSdk extends \Tco\Checkout\Controller\ApiController
{
    public function execute()
    {
        if ($this->getRequest()->isAjax()) {

            $response = $this->resultJsonFactory->create();
            $quote = $this->getQuote();
            $quote->reserveOrderId();
            $quote->save();
            if ($this->getCustomerSession()->isLoggedIn()) {
                $quote->setCheckoutMethod(\Magento\Checkout\Model\Type\Onepage::METHOD_CUSTOMER);
            } else {
                $quote->setCheckoutMethod(\Magento\Checkout\Model\Type\Onepage::METHOD_GUEST);
                $this->_prepareGuestQuote($quote, $this->getRequest()->getParam('email'));
            }

            $apiResponse = $this->getPaymentMethod()->buildOrderParams($quote, $this->getRequest()->getParam('token'));

            if (!$apiResponse) { // we dont get any response from 2co
                $response->setHttpResponseCode(500);
                $response->setData(['status' => false, 'message' => _('Your payment could not be processed! Please try again later.'), 'redirect' => null]);
            } else {
                if (isset($apiResponse['error_code']) && !empty($apiResponse['error_code'])) { // we get an response with ERRORS from 2co
                    $response->setHttpResponseCode(500);
                    $response->setData(['status' => false, 'message' => $apiResponse['message'], 'redirect' => null]);

                } else { // we successfully place an order with 2co

                    // first we check if we have to redirect to 3dSecure
                    $is3DSecure = $this->getPaymentMethod()->authorize3DS($apiResponse);
                    if ($is3DSecure) {
                        $response->setHttpResponseCode(200);
                        $response->setData([
                            'status'   => true,
                            'message'  => 'Redirect to 3DSecure',
                            'redirect' => $is3DSecure
                        ]);

                        return $response;
                    }


                    try {
                        $quote->setPaymentMethod($this->getPaymentMethod());
                        $quote->getPayment()->importData(['method' => $this->getPaymentMethod()->getCode()]);
                        if (isset($apiResponse['Status']) && isset($apiResponse['RefNo'])) {
                            $order = $this->getPaymentMethod()->createMageOrder($quote, $apiResponse);

                            // set the checkoutSession for the redirect
                            $this->getCheckoutSession()
                                 ->setLastSuccessQuoteId($quote->getId())
                                 ->setLastQuoteId($quote->getId())
                                 ->setLastRealOrderId($order->getIncrementId())
                                 ->setLastOrderId($order->getId());

                            $redirectUrl = !in_array(strtoupper($order->getStatus()), ['FRAUD', 'INVALIDDATA', 'CANCELED']) ?
                                $this->getPaymentMethod()->getRedirectUrl() : $this->getPaymentMethod()->getRedirectUrl(false);

                            $response->setHttpResponseCode(200);
                            $response->setData(['status' => true, 'message' => 'Order placed', 'redirect' => $redirectUrl]);
                        }
                    } catch (\Magento\Checkout\Exception $e) {
                        $response->setHttpResponseCode(500);
                        $response->setData(['status' => false, 'message' => 'TCO: ' . $e->getMessage(), 'redirect' => null]);
                    }
                }
            }

            return $response;
        }
    }


}
