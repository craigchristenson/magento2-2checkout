<?php

namespace Tco\Checkout\Controller\Ipn;


/**
 * Ipn POST Notification Controller
 */

class Notification extends \Magento\Framework\App\Action\Action implements \Magento\Framework\App\CsrfAwareActionInterface
{
    /**
     * @var \Psr\Log\LoggerInterface
     */
    protected $_logger;

    /**
     * @var \Tco\Checkout\Model\IpnNotification
     */
    protected $_notificationHandler;

    /**
     * @param \Magento\Framework\App\Action\Context $context
     * @param \Tco\Checkout\Model\IpnNotification $notificationHandler
     * @param \Psr\Log\LoggerInterface $logger
     */
    public function __construct(
        \Magento\Framework\App\Action\Context $context,
        \Tco\Checkout\Model\IpnNotification $notificationHandler,
        \Psr\Log\LoggerInterface $logger
    ) {

        if (interface_exists(\Magento\Framework\App\CsrfAwareActionInterface::class)) {
            $request = $this->getRequest();
            if ($request instanceof HttpRequest && $request->isPost() && empty($request->getParam('form_key'))) {
                $formKey = $this->_objectManager->get(\Magento\Framework\Data\Form\FormKey::class);
                $request->setParam('form_key', $formKey->getFormKey());
            }
        }

        $this->_logger = $logger;
        $this->_notificationHandler = $notificationHandler;
        parent::__construct($context);
    }

    /**
     * @param \Magento\Framework\App\RequestInterface $request
     *
     * @return \Magento\Framework\App\Request\InvalidRequestException|null
     */
    public function createCsrfValidationException(\Magento\Framework\App\RequestInterface $request): ?\Magento\Framework\App\Request\InvalidRequestException
    {
        return null;
    }

    /**
     * @param \Magento\Framework\App\RequestInterface $request
     *
     * @return bool|null
     */
    public function validateForCsrf(\Magento\Framework\App\RequestInterface $request): ?bool
    {
        return true;
    }

    /**
     * @return \Magento\Framework\App\ResponseInterface|\Magento\Framework\Controller\ResultInterface|void
     */
    public function execute()
    {
        if (!$this->getRequest()->isPost()) {
            return;
        }

        try {
            $params = $this->getRequest()->getParams();
            $response = $this->resultFactory->create(\Magento\Framework\Controller\ResultFactory::TYPE_RAW);
            $response->setContents($this->_notificationHandler->processNotification($params));
            return $response;
        } catch (\Exception $e) {
            $this->_logger->critical($e);
            $this->messageManager->addExceptionMessage($e, __('IPN process error!'));
            $this->getResponse()->setHttpResponseCode(500);
        }
    }
}
