<?php

namespace Tco\Checkout\Controller\Standard;

class Response extends \Tco\Checkout\Controller\Checkout
{

    public function execute()
    {
        $orderId = $this->getRequest()->getParam('cart_order_id');
        $order = $this->getOrderById($orderId);

        $orderNumber = $this->getRequest()->getParam('order_number');
        $orderTotal = number_format($order->getGrandTotal(), 2, '.', '');
        $orderKey = $this->getRequest()->getParam('key');

        if($this->getTwocheckoutModel()->validateResponse($orderNumber, $orderTotal, $orderKey))
        {
            $order->setStatus($order::STATE_PROCESSING);
            $order->setExtOrderId($orderNumber);
            $returnUrl = $this->getCheckoutHelper()->getUrl('checkout/onepage/success');
        }
        else
        {
            $order->setStatus($order::STATE_PAYMENT_REVIEW);
            $returnUrl = $this->getCheckoutHelper()->getUrl('checkout/onepage/failure');
        }

        $order->save();

        $this->getResponse()->setRedirect($returnUrl);
    }

}
