<?php

namespace Tco\Checkout\Controller\Standard;

class Redirect extends \Tco\Checkout\Controller\Checkout
{

    public function execute()
    {
        $quote = $this->getQuote();
        $email = $this->getRequest()->getParam('email');
        if (false == $this->getCustomerSession()->isLoggedIn()) {
            $quote->setCustomerEmail($email);
        }
        if ($quote->getBillingAddress())
        {
            $this->getResponse()->setRedirect(
                $this->getPaymentMethod()->buildCheckoutRequest($quote)
            );
        }
        else
        {
            $this->_cancelPayment();
            $this->_checkoutSession->restoreQuote();
            $this->getResponse()->setRedirect(
                $this->getCheckoutHelper()->getUrl('checkout')
            );
        }
    }

}
