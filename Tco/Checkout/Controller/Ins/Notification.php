<?php

namespace Tco\Checkout\Controller\Ins;

class Notification extends \Magento\Framework\App\Action\Action
{
    /**
     * @var \Psr\Log\LoggerInterface
     */
    protected $_logger;

    /**
     * @var \Tco\Checkout\Model\Notification
     */
    protected $_notificationHandler;

    /**
     * @param \Magento\Framework\App\Action\Context $context
     * @param \Tco\Checkout\Model\Notification $notificationHandler
     * @param \Psr\Log\LoggerInterface $logger
     */
    public function __construct(
        \Magento\Framework\App\Action\Context $context,
        \Tco\Checkout\Model\Notification $notificationHandler,
        \Psr\Log\LoggerInterface $logger
    ) {
        $this->_logger = $logger;
        $this->_notificationHandler = $notificationHandler;
        parent::__construct($context);
    }

    public function execute()
    {
        if (!$this->getRequest()->isPost()) {
            return;
        }

        try {
            $params = $this->getRequest()->getPostValue();
            $this->_notificationHandler->processNotification($params);
        } catch (\Exception $e) {
            $this->_logger->critical($e);
            $this->getResponse()->setHttpResponseCode(500);
        }
    }
}
