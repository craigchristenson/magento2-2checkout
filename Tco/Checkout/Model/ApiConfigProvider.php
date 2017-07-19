<?php

namespace Tco\Checkout\Model;

use Magento\Payment\Model\CcGenericConfigProvider;
use Magento\Payment\Helper\Data as PaymentHelper;
use Magento\Framework\View\Asset\Source as Source;

class ApiConfigProvider extends CcGenericConfigProvider
{
    protected $_methodCodes = [
        \Tco\Checkout\Model\Api::CODE
    ];

    protected $_methodCode = "tco_api";
    protected $_paymentHelper;
    protected $_assetSource;

    public function __construct(
        \Magento\Payment\Model\CcConfig $ccConfig,
        PaymentHelper $paymentHelper,
        Source $assetSource
    ) {
        parent::__construct($ccConfig, $paymentHelper, $this->_methodCodes);
        $this->_paymentHelper = $paymentHelper;
        $this->_assetSource = $assetSource;
    }

    public function getConfig()
    {
        $config = parent::getConfig();
        $config['payment']['tco_api']['sellerId'] = $this->methods[$this->_methodCode]->getSellerId();
        $config['payment']['tco_api']['publishableKey'] = $this->methods[$this->_methodCode]->getPublishableKey();
        $config['payment']['tco_api']['publicKeyType'] = $this->methods[$this->_methodCode]->getPublicKeyType();
        $config['payment']['tco_api']['redirectUrl'] = $this->methods[$this->_methodCode]->getRedirectUrl();
        $config['payment']['tco_api']['processingError'] = '{"message":"Payment Authorization Failed: Please verify your information and try again, or try another payment method."}';
        return $config;
    }

}
