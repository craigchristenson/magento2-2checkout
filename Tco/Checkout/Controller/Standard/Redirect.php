<?php

namespace Tco\Checkout\Controller\Standard;

class Redirect extends \Tco\Checkout\Controller\Checkout
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
        $quote->setCustomerEmail($email);
        $quote->reserveOrderId();
        if ($this->getCustomerSession()->isLoggedIn()) {
            $this->getCheckoutSession()->loadCustomerQuote();
            $quote->updateCustomerData($this->getQuote()->getCustomer());
            $quote->setCheckoutMethod(\Magento\Checkout\Model\Type\Onepage::METHOD_CUSTOMER);
        } else {
            $quote->setCheckoutMethod(\Magento\Checkout\Model\Type\Onepage::METHOD_GUEST);
        }

        $quote->setPaymentMethod($this->getPaymentMethod()->getCode());
        $quote->getPayment()->importData(['method' => $this->getPaymentMethod()->getCode()]);

        $this->_quoteRepository->save($quote);
        $params = [];
        $params["inline"] = $this->getPaymentMethod()->getInline();

        if ($params["inline"]) {
            $params["fields"] = $this->getPaymentMethod()->buildInlineCheckoutRequest($quote);
        } else {
            $params["fields"] = $this->getPaymentMethod()->buildCheckoutRequest($quote);
        }
        $params["url"] = $this->getPaymentMethod()->getCgiUrl();
        $params["method"] = "GET";
        $json = $this->_resultJsonFactory->create()->setData($params);
        return $json;
    }
}
