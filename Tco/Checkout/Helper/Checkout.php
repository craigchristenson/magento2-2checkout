<?php

namespace Tco\Checkout\Helper;

use Magento\Framework\App\Helper\Context;
use Magento\Sales\Model\Order;
use Magento\Framework\App\Helper\AbstractHelper;

class Checkout extends AbstractHelper
{
    protected $session;

    public function __construct(
        Context $context,
        \Magento\Checkout\Model\Session $session
    ) {
        $this->session = $session;
        parent::__construct($context);
    }

    public function cancelCurrentOrder($comment)
    {
        $order = $this->session->getLastRealOrder();
        if ($order->getId() && $order->getState() != Order::STATE_CANCELED) {
            $order->registerCancellation($comment)->save();
            return true;
        }
        return false;
    }

    public function restoreQuote()
    {
        return $this->session->restoreQuote();
    }

    public function getUrl($route, $params = [])
    {
        return $this->_getUrl($route, $params);
    }

}
