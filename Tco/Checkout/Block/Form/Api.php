<?php

namespace Tco\Checkout\Block\Form;

class Api extends \Magento\Payment\Block\Form\Cc
{
    protected $_template = 'Tco_Api::form/tco_api.phtml';
    /**
     * Payment config model
     *
     * @var \Magento\Payment\Model\Config
     */
    protected $_paymentConfig;
    /**
     * @var \Magento\Framework\App\State
     */
    protected $_appState;
    /**
     * @var \Magento\Checkout\Model\Session
     */
    protected $_checkoutSession;
    /**
     * Cc constructor.
     *
     * @param \Magento\Framework\View\Element\Template\Context $context
     * @param \Magento\Payment\Model\Config $paymentConfig
     * @param \Magento\Checkout\Model\Session $checkoutSession
     * @param array $data
     */
    public function __construct(
        \Magento\Framework\View\Element\Template\Context $context,
        \Magento\Payment\Model\Config $paymentConfig,
        \Magento\Checkout\Model\Session $checkoutSession,
        array $data = []
    ) {
        parent::__construct($context, $paymentConfig);
        $this->_appState = $context->getAppState();
        $this->_checkoutSession = $checkoutSession;
    }

}