<?php

namespace Tco\Checkout\Controller\Standard;

class Redirect3DSecure extends \Tco\Checkout\Controller\ApiController
{
    public function execute()
    {

        if ($this->getRequest()->getParam('cancel')) { //cancel by client
            return $this->getResponse()->setRedirect($this->getPaymentMethod()->getCheckoutRedirectUrl());
        }

        if ($this->getRequest()->getParam('REFNO') && !empty($this->getRequest()->getParam('REFNO'))) {

            $redirectUrl = $this->getPaymentMethod()->getRedirectUrl(false); // default - failure page
            $apiResponse = $this->getPaymentMethod()->get2coOrder($this->getRequest()->getParam('REFNO'));

            if (isset($apiResponse['RefNo']) && isset($apiResponse['ExternalReference'])) {
                try {

                    $quote = $this->getQuote();
                    if ($this->getCustomerSession()->isLoggedIn()) {
                        $quote->setCheckoutMethod(\Magento\Checkout\Model\Type\Onepage::METHOD_CUSTOMER);
                    } else {
                        $quote->setCheckoutMethod(\Magento\Checkout\Model\Type\Onepage::METHOD_GUEST);
                        $this->_prepareGuestQuote($quote, $apiResponse['BillingDetails']['Email']);
                    }
                    $quote->setPaymentMethod($this->getPaymentMethod());
                    $quote->getPayment()->importData(['method' => $this->getPaymentMethod()->getCode()]);
                    $order = $this->getPaymentMethod()->createMageOrder($quote, $apiResponse);

                    // set the checkoutSession for the redirect
                    $this->getCheckoutSession()
                         ->setLastSuccessQuoteId($quote->getId())
                         ->setLastQuoteId($quote->getId())
                         ->setLastRealOrderId($order->getIncrementId())
                         ->setLastOrderId($order->getId());

                    $redirectUrl = $this->getPaymentMethod()->getRedirectUrl();
                } catch (\Magento\Checkout\Exception $e) {
                    throw new \Magento\Checkout\Exception(_('Your payment could not be processed! Please try again later. Error: (' . $e->getMessage() . ')'));
                }
            }

            return $this->getResponse()->setRedirect($redirectUrl);
        }
    }
}
