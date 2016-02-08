<?php

namespace Tco\Checkout\Controller\Standard;

class Redirect extends \Tco\Checkout\Controller\Checkout
{

    public function execute()
    {
        $order = $this->getOrder();
        if ($order->getBillingAddress())
        {
            $this->getResponse()->setRedirect(
                $this->getTwocheckoutModel()->buildCheckoutRequest($order)
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
