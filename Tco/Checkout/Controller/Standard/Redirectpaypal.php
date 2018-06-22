<?php

namespace Tco\Checkout\Controller\Standard;

class Redirectpaypal extends \Tco\Checkout\Controller\Paypal
{

    public function execute()
    {
        if (!$this->getRequest()->isAjax()) {
            $this->_cancelPayment();
            $this->_checkoutSession->restoreQuote();
            $this->getResponse()->setRedirect(
                $this->getCheckoutHelper()->getUrl('checkout')
            );
        }
        
        $quote = $this->getQuote();
        $email = $this->getRequest()->getParam('email');
        if ($this->getCustomerSession()->isLoggedIn()) {
            $this->getCheckoutSession()->loadCustomerQuote();
            $quote->updateCustomerData($this->getQuote()->getCustomer());
        }
        else
        {
            $quote->setCustomerEmail($email);
        }
        $quote->reserveOrderId();
        $this->quoteRepository->save($quote);

        $params = [];
        $params["fields"] = $this->getPaymentMethod()->buildCheckoutRequest($quote);
        $params["url"] = $this->getPaymentMethod()->getCgiUrl();

        return  $this->resultJsonFactory->create()->setData($params);
    }

}
