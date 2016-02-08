<?php

namespace Tco\Checkout\Controller\Standard;

class Cancel extends \Tco\Checkout\Controller\Checkout
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
