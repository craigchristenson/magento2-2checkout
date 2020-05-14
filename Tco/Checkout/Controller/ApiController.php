<?php

namespace Tco\Checkout\Controller;

abstract class ApiController extends \Magento\Framework\App\Action\Action
{
    /**
     * @var \Magento\Checkout\Model\Session
     */
    protected $_checkoutSession;

    /**
     * @var \Magento\Sales\Model\OrderFactory
     */
    protected $_orderFactory;

    /**
     * @var \Magento\Customer\Model\Session
     */
    protected $_customerSession;

    /**
     * @var \Magento\Quote\Api\CartRepositoryInterface
     */
    protected $quoteRepository;

    /**
     * @var \Psr\Log\LoggerInterface
     */
    protected $_logger;

    /**
     * @var \Magento\Quote\Model\Quote
     */
    protected $_quote;

    /**
     * @var \Tco\Checkout\Model\Api
     */
    protected $_paymentMethod;

    /**
     * @var \Tco\Checkout\Helper\Api
     */
    protected $_apiHelper;

    /**
     * @var \Magento\Quote\Api\CartManagementInterface
     */
    protected $cartManagement;

    /**
     * @var \Magento\Framework\Controller\Result\JsonFactory $resultJsonFactory
     */
    protected $resultJsonFactory;

    /**
     * @var \Magento\Framework\Controller\Result\RedirectFactory $resultRedirectFactory
     */
    protected $resultRedirectFactory;

    /**
     * ApiController constructor.
     * @param \Magento\Framework\App\Action\Context                $context
     * @param \Magento\Customer\Model\Session                      $customerSession
     * @param \Magento\Checkout\Model\Session                      $checkoutSession
     * @param \Magento\Quote\Api\CartRepositoryInterface           $quoteRepository
     * @param \Magento\Sales\Model\OrderFactory                    $orderFactory
     * @param \Psr\Log\LoggerInterface                             $logger
     * @param \Tco\Checkout\Model\Api                              $paymentMethod
     * @param \Tco\Checkout\Helper\Api                             $apiHelper
     * @param \Magento\Quote\Api\CartManagementInterface           $cartManagement
     * @param \Magento\Framework\Controller\Result\JsonFactory     $resultJsonFactory
     * @param \Magento\Framework\Controller\Result\RedirectFactory $resultRedirectFactory
     */
    public function __construct(
        \Magento\Framework\App\Action\Context $context,
        \Magento\Customer\Model\Session $customerSession,
        \Magento\Checkout\Model\Session $checkoutSession,
        \Magento\Quote\Api\CartRepositoryInterface $quoteRepository,
        \Magento\Sales\Model\OrderFactory $orderFactory,
        \Psr\Log\LoggerInterface $logger,
        \Tco\Checkout\Model\Api $paymentMethod,
        \Tco\Checkout\Helper\Api $apiHelper,
        \Magento\Quote\Api\CartManagementInterface $cartManagement,
        \Magento\Framework\Controller\Result\JsonFactory $resultJsonFactory,
        \Magento\Framework\Controller\Result\RedirectFactory $resultRedirectFactory
    ) {
        $this->_customerSession = $customerSession;
        $this->_checkoutSession = $checkoutSession;
        $this->quoteRepository = $quoteRepository;
        $this->_orderFactory = $orderFactory;
        $this->_paymentMethod = $paymentMethod;
        $this->_apiHelper = $apiHelper;
        $this->cartManagement = $cartManagement;
        $this->resultJsonFactory = $resultJsonFactory;
        $this->_logger = $logger;
        $this->resultRedirectFactory = $resultRedirectFactory;
        parent::__construct($context);
    }

    /**
     * Get order object
     *
     * @return \Magento\Sales\Model\Order
     */
    protected function getOrder()
    {
        return $this->_orderFactory->create()->loadByIncrementId(
            $this->_checkoutSession->getLastRealOrderId()
        );
    }

    protected function getQuote()
    {
        if (!$this->_quote) {
            $this->_quote = $this->getCheckoutSession()->getQuote();
        }

        return $this->_quote;
    }

    protected function getCheckoutSession()
    {
        return $this->_checkoutSession;
    }

    public function getCustomerSession()
    {
        return $this->_customerSession;
    }

    public function getPaymentMethod()
    {
        return $this->_paymentMethod;
    }

    protected function getApiHelper()
    {
        return $this->_apiHelper;
    }

    protected function _prepareGuestQuote(\Magento\Quote\Model\Quote $quote, $email)
    {
        $quote->setCustomerId(null)
              ->setCustomerEmail($email)
              ->setCustomerIsGuest(true)
              ->setCustomerGroupId(\Magento\Customer\Api\Data\GroupInterface::NOT_LOGGED_IN_ID);

        return $quote;
    }
}
