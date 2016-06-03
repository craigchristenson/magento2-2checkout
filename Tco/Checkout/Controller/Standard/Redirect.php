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
            $params = [];
            $params["fields"] = $this->getPaymentMethod()->buildCheckoutRequest($quote);
            $params["url"] = $this->getPaymentMethod()->getCgiUrl();
            $params["inline"] = $this->getPaymentMethod()->getInline();
            
            return  $this->resultJsonFactory->create()->setData($params);
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
