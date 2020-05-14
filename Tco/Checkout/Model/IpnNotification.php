<?php

namespace Tco\Checkout\Model;

use Exception;

class IpnNotification
{
    /**
     * Ipn Constants
     */
    const ORDER_CREATED = 'ORDER_CREATED';
    const FRAUD_STATUS_CHANGED = 'FRAUD_STATUS_CHANGED';
    const INVOICE_STATUS_CHANGED = 'INVOICE_STATUS_CHANGED';
    const REFUND_ISSUED = 'REFUND_ISSUED';

    //Order Status Values:
    const ORDER_STATUS_PENDING = 'PENDING';
    const ORDER_STATUS_PAYMENT_AUTHORIZED = 'PAYMENT_AUTHORIZED';
    const ORDER_STATUS_SUSPECT = 'SUSPECT';
    const ORDER_STATUS_INVALID = 'INVALID';
    const ORDER_STATUS_COMPLETE = 'COMPLETE';
    const ORDER_STATUS_REFUND = 'REFUND';
    const ORDER_STATUS_REVERSED = 'REVERSED';
    const ORDER_STATUS_PURCHASE_PENDING = 'PURCHASE_PENDING';
    const ORDER_STATUS_PAYMENT_RECEIVED = 'PAYMENT_RECEIVED';
    const ORDER_STATUS_CANCELED = 'CANCELED';
    const ORDER_STATUS_PENDING_APPROVAL = 'PENDING_APPROVAL';

    const FRAUD_STATUS_APPROVED = 'APPROVED';
    const FRAUD_STATUS_DENIED = 'DENIED';
    const FRAUD_STATUS_REVIEW = 'UNDER REVIEW';
    const FRAUD_STATUS_PENDING = 'PENDING';
    const PAYMENT_METHOD = 'tco_checkout';

    /**
     * @var \Magento\Sales\Model\Order
     */
    protected $_order;

    /**
     * @var \Tco\Checkout\Model\Checkout
     */
    protected $_tcoCheckout;

    /**
     * @var \Magento\Sales\Model\Order\Email\Sender\OrderSender
     */
    protected $_orderSender;

    /**
     * @var string
     */
    protected $_paymentMethod;

    /**
     * @var $_transactionBuilder
     */
    protected $_transactionBuilder;

    /**
     * @var \Tco\Checkout\Helper\Ipn
     */
    protected $_ipnHelper;

    /**
     * @var Api
     */
    protected $_tcoApi;

    /**
     * @var \Magento\Sales\Model\OrderFactory
     */
    protected $_orderFactory;

    /**
     * @var \Magento\Sales\Model\OrderRepository
     */
    protected $orderRepository;

    /**
     * @var \Magento\Framework\Api\SearchCriteriaBuilder
     */
    protected $searchCriteriaBuilder;

    /**
     * @var \Psr\Log\LoggerInterface
     */
    protected $_logger;

    /**
     * @var \Magento\Quote\Model\QuoteRepository
     */
    protected $_quoteRepo;

    /**
     * @var \Magento\Quote\Model\QuoteManagement
     */
    protected $_quoteManagement;

    /**
     * @var \Magento\Framework\Message\ManagerInterface
     */
    protected $_msgManager;


    public function __construct(
        \Tco\Checkout\Model\Checkout $tcoCheckout,
        \Tco\Checkout\Model\Api $tcoApi,
        \Magento\Sales\Model\Order\Email\Sender\OrderSender $orderSender,
        \Magento\Sales\Model\Order\Payment\Transaction\BuilderInterface $transactionBuilder,
        \Tco\Checkout\Helper\Ipn $ipnHelper,
        \Magento\Sales\Model\OrderFactory $orderFactory,
        \Magento\Sales\Model\OrderRepository $orderRepository,
        \Magento\Framework\Api\SearchCriteriaBuilder $searchCriteriaBuilder,
        \Psr\Log\LoggerInterface $logger,
        \Magento\Quote\Model\QuoteRepository $quoteRepo,
        \Magento\Quote\Model\QuoteManagement $quoteManagement,
        \Magento\Framework\Message\ManagerInterface $messageManager
    ) {
        $this->_tcoCheckout = $tcoCheckout;
        $this->_tcoApi = $tcoApi;
        $this->_orderSender = $orderSender;
        $this->_paymentMethod = $this::PAYMENT_METHOD;
        $this->_transactionBuilder = $transactionBuilder;
        $this->_ipnHelper = $ipnHelper;
        $this->_orderFactory = $orderFactory;
        $this->orderRepository = $orderRepository;
        $this->searchCriteriaBuilder = $searchCriteriaBuilder;
        $this->_logger = $logger;
        $this->_quoteRepo = $quoteRepo;
        $this->_quoteManagement = $quoteManagement;
        $this->_msgManager = $messageManager;
    }

    /**
     * @param $params
     *
     * @return bool|string
     * @throws \Magento\Framework\Exception\LocalizedException
     * @throws \Exception
     */
    public function processNotification($params)
    {
        $this->setPaymentMethod($this->_paymentMethod);
        //1. Validate signature
        if (!$this->_paymentMethod->isIpnResponseValid($params)) {
            throw new Exception(sprintf('MD5 hash mismatch for 2Checkout IPN with date: "%s".', $params['IPN_DATE']));
        }

        //2. Check if we have Avangate REFNO & Magento2 orderid ( value hold by REFNOEXT )
        if (!isset($params['REFNOEXT']) && (!isset($params['REFNO']) && empty($params['REFNO']))) {
            throw new Exception(sprintf('Cannot identify order: "%s".', $params['REFNOEXT']));
        }

        $orderReservedId = intval($params['REFNOEXT']);
        $params['REFNOEXT_D'] = !empty($orderReservedId) ? $orderReservedId : 0;

        try {
            $this->_order = $this->_ipnHelper->getOrderByIncrementId($orderReservedId, $params['REFNO']);
            if (!$this->_order) {
                //let's check if we have a quote and finish the cart now
                $quote = $this->_ipnHelper->getQuoteByIncrementId($orderReservedId);
                if ($quote && $quote->getId()) {
                    $this->_order = $this->_createOrder($quote);

                    if (!$this->_order) {
                        throw new Exception(sprintf('No order could be created from quote with increment id: "%s".',
                            $orderReservedId));
                    }

                    $sts = $this->_paymentMethod->getConfigData('order_status');
                    $this->_order->setStatus($sts);
                    $this->_order->setExtOrderId($params['REFNO']);
                    $this->_order->save();

                    if ($this->_paymentMethod->getConfigData('invoice_before_fraud_review')) {
                        //Creates both invoice
                        $this->_createInvoice($params);
                    }
                } else {
                    throw new Exception(sprintf('QUOTE is not valid for increment ID: "%s".', $orderReservedId));
                }
            }
        } catch (Exception $e) {
            $this->_logger->error("Exception for Order request: " . $e->getMessage());
            throw new Exception(sprintf('Can\'t get any order with REFNOEXT: "%s".', $orderReservedId));
        }

        try {
            $this->_processFraud($params);

            if (!$this->_isFraud($params)) {
                // Process order status changes.
                $this->_processOrderStatus($params);
            }

            //IPN response to 2Checkout
            return $this->_ipnHelper->calculateIpnResponse(
                $params,
                $this->_paymentMethod->getConfigData('api_secret_key')
            );

        } catch (\Magento\Framework\Exception\LocalizedException $e) {
            $comment = $this->_createNotificationComment(sprintf('Error: "%s"', $e->getMessage()));
            $comment->save();
            throw $e;
        }
        return false;
    }

    protected function getOrder_ById($id)
    {
        return $this->orderRepository->get($id);
    }

    protected function _createNotificationComment($comment)
    {
        $message = sprintf('[2Checkout IpnNotification Process] "%s"', $comment);
        $message = $this->_order->addStatusHistoryComment($message);
        $message->setIsCustomerNotified(null);
        return $message;
    }

    private function _processOrderStatus($params)
    {
        $order_sts = $params['ORDERSTATUS'];
        if (!empty($order_sts)) {
            switch ($order_sts) {
                case self::ORDER_STATUS_PENDING:
                    $comment = $this->_createNotificationComment(
                        sprintf('IPN ORDERSTATUS : "%s". Order placed, waiting bank authorization.', "PENDING")
                    );
                    $comment->save();
                    $this->_processOrderCreated();
                    break;

                case self::ORDER_STATUS_PURCHASE_PENDING:
                    $comment = $this->_createNotificationComment(
                        sprintf(
                            'IPN ORDERSTATUS : "%s". 2Checkout is waiting for the customer to make the payment.',
                            "PURCHASE_PENDING"
                        )
                    );
                    $comment->save();
                    break;

                case self::ORDER_STATUS_INVALID:
                    $this->_order->setStatus(\Magento\Sales\Model\Order::STATE_HOLDED);
                    $comment = $this->_createNotificationComment(
                      sprintf(
                        'IPN ORDERSTATUS : "%s". Order is currently on hold due to invalid data. Please contact 2Checkout support.',
                        "INVALID"
                      )
                    );
                    $comment->save();
                    $this->_order->save();
                    break;


                case self::ORDER_STATUS_PENDING_APPROVAL:
                    $comment = $this->_createNotificationComment(
                        sprintf('IPN ORDERSTATUS : "%s". 2Checkout has yet to approve this order.', "PENDING_APPROVAL")
                    );
                    $comment->save();
                    break;

                case self::ORDER_STATUS_PAYMENT_AUTHORIZED:
                    $comment = $this->_createNotificationComment(
                        sprintf('IPN ORDERSTATUS : "%s". The bank authorized the payment.', "PAYMENT_AUTHORIZED")
                    );
                    $comment->save();
                    if ($this->_paymentMethod->getConfigData('invoice_when_captured')) {
                        $this->_createInvoice($params);
                    }
                    break;

                case self::ORDER_STATUS_COMPLETE:
                    $comment = $this->_createNotificationComment(
                        sprintf('IPN ORDERSTATUS : "%s". 2Checkout marked the order as complete.', "COMPLETE")
                    );
                    $comment->save();

                    $this->_processOrderComplete($params);
                    break;

                case $this::ORDER_STATUS_REFUND:
                    $comment = $this->_createNotificationComment(
                        sprintf('IPN ORDERSTATUS: "%s". 2Checkout marked the order as refunded.', "REFUNDED")
                    );
                    $comment->save();

                    break;
                default:
                    throw new Exception('Cannot handle Ipn message type for message: "%s".', $params['message_id']);
            }
        }
    }

    /**
     * @param $params
     * @return bool
     * @throws Exception
     */

    protected function _isFraud($params)
    {
        return (isset($params['FRAUD_STATUS']) && trim($params['FRAUD_STATUS']) === $this::FRAUD_STATUS_DENIED);
    }

    /**
     * @param $params
     * @throws Exception
     */
    private function _processFraud($params)
    {
        if (isset($params['FRAUD_STATUS'])) {
            switch ($params['FRAUD_STATUS']) {
                case $this::FRAUD_STATUS_DENIED:
                    $payment = $this->_order->getPayment();
                    $payment->setIsTransactionDenied(true);
                    $this->_order->setStatus(\Magento\Sales\Model\Order::STATUS_FRAUD);

                    $comment = $this->_createNotificationComment(
                        sprintf('IPN ORDERSTATUS : "%s". Payment is under the suspicion of fraud!', "DENIED")
                    );
                    $comment->save();

                    $this->_order->save();
                    break;

                case $this::FRAUD_STATUS_APPROVED:
                    $payment = $this->_order->getPayment();
                    $payment->setIsTransactionApproved(true);
                    $this->_createTransaction($params);

                    $sts = $this->_paymentMethod->getConfigData('order_status');
                    $this->_order->setStatus($sts);

                    $comment = $this->_createNotificationComment(
                        sprintf('FRAUD STATUS CHANGED: "%s"', $params['FRAUD_STATUS'])
                    );
                    $comment->save();

                    $this->_order->save();

                    if ($this->_paymentMethod->getConfigData('invoice_after_fraud_review')) {
                        $this->_createInvoice($params);
                    }
                    break;
            }
        }
    }

    protected function _processOrderCreated()
    {
        $sts = $this->_paymentMethod->getConfigData('order_status');
        $this->_order->setStatus($sts);
        $payment = $this->_order->getPayment();
        $payment->setIsTransactionPending(true);

        if (!$this->_order->getEmailSent()) {
            $this->_orderSender->send($this->_order);
        }
        $this->_order->save();
    }

    /**
     * @param $params
     * @throws Exception
     */
    protected function _processOrderComplete($params)
    {
        $payment = $this->_order->getPayment();
        $payment->setIsTransactionApproved(true);
        $this->_order->save();
    }

    /**
     * @param $code
     *
     * @throws \Magento\Framework\Exception\LocalizedException
     */
    protected function setPaymentMethod($code)
    {
        if ($code == \Tco\Checkout\Model\Api::CODE) {
            $this->_paymentMethod = $this->_tcoApi;
        } else {
            if ($code == \Tco\Checkout\Model\Checkout::CODE) {
                $this->_paymentMethod = $this->_tcoCheckout;
            } else {
                throw new \Magento\Framework\Exception\LocalizedException(__("Payment type not supported"));
            }
        }
    }

    /**
     * @param $response
     */
    protected function _createTransaction($response)
    {

        $formattedPrice = $this->_order->getBaseCurrency()->formatTxt(
            $this->_order->getGrandTotal()
        );
        $message = __('The authorized amount is %1.', $formattedPrice);

        $payment = $this->_order->getPayment();
        $trans = $this->_transactionBuilder;
        $transaction = $trans->setPayment($payment)
            ->setOrder($this->_order)
            ->setTransactionId($response['REFNO'])
            ->setAdditionalInformation(
                [\Magento\Sales\Model\Order\Payment\Transaction::RAW_DETAILS => (array)$response]
            )
            ->setFailSafe(true)
            //build method creates the transaction and returns the object
            ->build(\Magento\Sales\Model\Order\Payment\Transaction::TYPE_CAPTURE);

        $payment->addTransactionCommentsToOrder(
            $transaction,
            $message
        );
        $payment->setParentTransactionId(null);
        $payment->save();
        $this->_order->save();
    }

    /**
     * @param $params
     * @throws Exception
     */
    protected function _createInvoice($params)
    {
        try {
            if ($this->_order->canInvoice()) {
                $payment = $this->_order->getPayment();
                $payment->setTransactionId($params['REFNO']);
                $payment->setCurrencyCode($params['CURRENCY']);
                $payment->setParentTransactionId($params['REFNO']);
                $payment->setShouldCloseParentTransaction(true);
                $payment->setIsTransactionClosed(0);
                $payment->registerCaptureNotification($params['IPN_TOTALGENERAL'], true);
                $this->_order->save();

                // notify customer
                $invoice = $payment->getCreatedInvoice();
                if ($invoice && !$this->_order->getEmailSent()) {
                    $this->_orderSender->send($this->_order);
                    $this->_order->addCommentToStatusHistory(
                        __('You notified customer about invoice #%1.', $invoice->getIncrementId(), false)
                    )->setIsCustomerNotified(
                        true
                    )->save();
                }
                $this->_order->setStatus($this->_paymentMethod->getConfigData('order_status'));
                $this->_order->save();
            }
        } catch (Exception $e) {
            throw new Exception(sprintf('Error Creating Invoice: "%s"', $e->getMessage()));
        }
    }

    private function _createOrder($quote)
    {
        try {
            // Create Order From Quote
            try {
                return $this->_quoteManagement->submit($quote);
            } catch (\Exception $e) {
                $this->_logger->critical("Cannot create order from quote at IPN call!");
                $this->_msgManage->addExceptionMessage($e, __('We can\'t place the order.'));
            }
            return null;
        } catch (Exception $ex) {
            $this->_logger->critical("Exception creating order in IPN notification!");
            $this->_msgManage->addExceptionMessage($e, __('Exception creating order in IPN notification!'));
        }
    }
}
