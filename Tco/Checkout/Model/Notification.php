<?php

namespace Tco\Checkout\Model;

use Exception;
use Magento\Sales\Model\Order\Email\Sender\OrderSender;

class Notification
{
    /**
     * INS Constants
     */
    const ORDER_CREATED = 'ORDER_CREATED';
    const FRAUD_STATUS_CHANGED = 'FRAUD_STATUS_CHANGED';
    const INVOICE_STATUS_CHANGED = 'INVOICE_STATUS_CHANGED';
    const REFUND_ISSUED = 'REFUND_ISSUED';
    const FRAUD_STATUS_PASSED = 'pass';
    const FRAUD_STATUS_FAILED = 'fail';
    const INVOICE_STATUS_DEPOSITED = 'deposited';

    /**
     * @var \Magento\Sales\Model\Order
     */
    protected $_order;

    /**
     * @var \Magento\Sales\Model\OrderFactory
     */
    protected $_orderFactory;

    /**
     * @var \Tco\Checkout\Model\Checkout
     */
    protected $_tcoCheckout;

    /**
     * @var \Tco\Checkout\Model\Paypal
     */
    protected $_tcoPaypal;

    /**
     * @var OrderSender
     */
    protected $orderSender;

    protected $_paymentMethod;

    /**
     * @param \Magento\Sales\Model\OrderFactory $orderFactory
     * @param \Tco\Checkout\Model\Checkout $tcoCheckout
     * @param \Tco\Checkout\Model\Api $tcoApi
     * @param \Tco\Checkout\Model\Paypal $tcoPaypal
     * @param OrderSender $orderSender
     */
    public function __construct(
        \Magento\Sales\Model\OrderFactory $orderFactory,
        \Tco\Checkout\Model\Checkout $tcoCheckout,
        \Tco\Checkout\Model\Api $tcoApi,
        \Tco\Checkout\Model\Paypal $tcoPaypal,
        OrderSender $orderSender
    )
    {
        $this->_orderFactory = $orderFactory;
        $this->_tcoCheckout = $tcoCheckout;
        $this->_tcoApi = $tcoApi;
        $this->_tcoPaypal = $tcoPaypal;
        $this->orderSender = $orderSender;
    }

    public function processNotification($params)
    {
        $order = $this->_getOrder($params['vendor_order_id']);
        if ($order) {
            $this->setPaymentMethod($this->_paymentMethod = $order->getPayment()->getMethod());
            if ($this->_validateResponse($params['sale_id'], $params['invoice_id'], $params['md5_hash'])) {
                try {
                    $messageType = $params['message_type'];
                    switch ($messageType) {
                        case $this::ORDER_CREATED:
                            $this->_processOrderCreated($params);
                            break;
                        case $this::INVOICE_STATUS_CHANGED:
                            $this->_processInvoiceStatusChanged($params);
                            break;
                        case $this::FRAUD_STATUS_CHANGED:
                            $this->_processFraudStatusChanged($params);
                            break;
                        case $this::REFUND_ISSUED:
                            $this->_processRefundIssued($params);
                            break;
                        default:
                            throw new Exception('Cannot handle INS message type for message: "%s".', $params['message_id']);
                    }
                } catch (\Magento\Framework\Exception\LocalizedException $e) {
                    $comment = $this->_createNotificationComment(sprintf('Error: "%s"', $e->getMessage()));
                    $comment->save();
                    throw $e;
                }
            } else {
                throw new Exception(sprintf('MD5 hash mismatch for 2Checkout notification message: "%s".', $params['message_id']));
            }
        } else {
            throw new Exception(sprintf('Could not locate order: "%s".', $params['vendor_order_id']));
        }
    }

    public function _validateResponse($saleId, $invoiceId, $key)
    {
        $result = false;
        if ($this->_paymentMethod) {
            $secretWord = $this->_paymentMethod->getConfigData('secret_word');
            $merchantId = $this->_paymentMethod->getConfigData('merchant_id');
            $stringToHash = strtoupper(md5($saleId . $merchantId . $invoiceId . $secretWord));
            if ($stringToHash == $key) {
                $result = true;
            }
        }
        return $result;
    }

    protected function _getOrder($vendorOrderId)
    {
        $this->_order = $this->_orderFactory->create()->loadByIncrementId($vendorOrderId);
        if (!$this->_order->getId()) {
            throw new Exception(sprintf('Wrong order ID: "%s".', $vendorOrderId));
        }
        return $this->_order;
    }

    protected function _createNotificationComment($comment)
    {
        $message = sprintf('[2Checkout Notification Processed] "%s"', $comment);
        $message = $this->_order->addStatusHistoryComment($message);
        $message->setIsCustomerNotified(null);
        return $message;
    }

    protected function _processOrderCreated($params)
    {
        $this->_order->setStatus($this->_paymentMethod->getConfigData('order_approved_status'));
        if (!$this->_order->getEmailSent()) {
            $this->orderSender->send($this->_order);
        }
        $this->_order->save();

        if ($this->_paymentMethod->getConfigData('invoice_before_fraud_review')) {
            $this->_createInvoice($params);
        }

        $comment = $this->_createNotificationComment(
            sprintf('ORDER CREATED: "%s"', $params['sale_id'])
        );
        $comment->save();
    }

    protected function _processInvoiceStatusChanged($params)
    {
        if ($params['invoice_status'] == $this::INVOICE_STATUS_DEPOSITED) {
            if ($this->_paymentMethod->getConfigData('invoice_when_captured')) {
                $this->_createInvoice($params);
            }
        }

        $payment = $this->_order->getPayment();
        $payment->setAdditionalInformation('tco_order_status', $params['invoice_status']);
        $this->_order->save();

        $comment = $this->_createNotificationComment(
            sprintf('INVOICE STATUS CHANGED: "%s"', $params['invoice_status'])
        );
        $comment->save();
    }

    protected function _processFraudStatusChanged($params)
    {
        switch ($params['fraud_status']) {
            case $this::FRAUD_STATUS_PASSED:
                $payment = $this->_order->getPayment();
                $payment->setIsTransactionApproved(true);
                $this->_order->save();
                if ($this->_paymentMethod->getConfigData('invoice_after_fraud_review')) {
                    $this->_createInvoice($params);
                }
                break;
            case $this::FRAUD_STATUS_FAILED:
                $payment = $this->_order->getPayment();
                $payment->setIsTransactionDenied(true);
                $this->_order->save();
                break;
        }

        $comment = $this->_createNotificationComment(
            sprintf('FRAUD STATUS CHANGED: "%s"', $params['fraud_status'])
        );
        $comment->save();
    }

    protected function _processRefundIssued($params)
    {
        $comment = $this->_createNotificationComment(
            sprintf('REFUND ISSUED: "%s" "%s"', $params['item_list_amount_1'], $params['list_currency'])
        );
        $comment->save();
        $this->_order->save();
    }

    protected function _createInvoice($params)
    {
        try {
            if ($this->_order->canInvoice()) {
                $payment = $this->_order->getPayment();
                $payment->setTransactionId($params['invoice_id']);
                $payment->setCurrencyCode($params['list_currency']);
                $payment->setParentTransactionId($params['sale_id']);
                $payment->setShouldCloseParentTransaction(true);
                $payment->setIsTransactionClosed(0);
                $payment->registerCaptureNotification($params['invoice_list_amount'], true);
                $this->_order->save();

                // notify customer
                $invoice = $payment->getCreatedInvoice();
                if ($invoice && !$this->_order->getEmailSent()) {
                    $this->orderSender->send($this->_order);
                    $this->_order->addStatusHistoryComment(
                        __('You notified customer about invoice #%1.', $invoice->getIncrementId())
                    )->setIsCustomerNotified(
                        true
                    )->save();
                }
            }
        } catch (Exception $e) {
            throw new Exception(sprintf('Error Creating Invoice: "%s"', $e->getMessage()));
        }
    }

    protected function setPaymentMethod($code)
    {
        if ($code == \Tco\Checkout\Model\Api::CODE) {
            $this->_paymentMethod = $this->_tcoApi;
        } else if ($code == \Tco\Checkout\Model\Checkout::CODE) {
            $this->_paymentMethod = $this->_tcoCheckout;
        } else if ($code == \Tco\Checkout\Model\Paypal::CODE) {
            $this->_paymentMethod = $this->_tcoPaypal;
        } else {
            throw new \Magento\Framework\Exception\LocalizedException(__("Payment type not supported"));
        }
    }


}
