<?php

namespace Tco\Checkout\Controller\Standard;

class Cancelpaypal extends \Tco\Checkout\Controller\Paypal
{

    public function execute()
    {
        $this->_cancelPayment();
        $this->_checkoutSession->restoreQuote();
        $this->getResponse()->setRedirect(
            $this->getCheckoutHelper()->getUrl('checkout')
        );
    }

}
