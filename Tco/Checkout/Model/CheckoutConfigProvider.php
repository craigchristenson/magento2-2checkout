<?php

namespace Tco\Checkout\Model;

use Magento\Checkout\Model\ConfigProviderInterface;
use Magento\Payment\Helper\Data as PaymentHelper;

class CheckoutConfigProvider implements ConfigProviderInterface
{
    protected $methodCode = "tco_checkout";

    protected $method;

    public function __construct(
        PaymentHelper $paymentHelper
    ) {
        $this->method = $paymentHelper->getMethodInstance($this->methodCode);
    }

    public function getConfig()
    {
        return $this->method->isAvailable() ? [
            'payment' => [
                'tco_checkout' => [
                    'redirectUrl' => $this->method->getRedirectUrl(),
                    'refProcessUrl' => $this->method->getRefProcessUrl()
                ]
            ]
        ] : [];
    }

    protected function getRedirectUrl()
    {
        return $this->method->getRedirectUrl();
    }

    protected function getRefProcessUrl()
    {
        return $this->method->getRefProcessUrl();
    }
}
