<?php

namespace Tco\Checkout\Model;


class Api extends \Magento\Payment\Model\Method\Cc
{
    const CODE = 'tco_api';
    protected $_code                    = self::CODE;
    protected $_canAuthorize            = true;
    protected $_canCapture              = false;
    protected $_canRefund               = true;
    protected $_canRefundInvoicePartial = true;
    protected $_isGateway               = true;
    protected $_request;
    protected $_helper;
    protected $_httpClientFactory;

    protected $_supportedCurrencyCodes = [
        'AFN',
        'ALL',
        'DZD',
        'ARS',
        'AUD',
        'AZN',
        'BSD',
        'BDT',
        'BBD',
        'BZD',
        'BMD',
        'BOB',
        'BWP',
        'BRL',
        'GBP',
        'BND',
        'BGN',
        'CAD',
        'CLP',
        'CNY',
        'COP',
        'CRC',
        'HRK',
        'CZK',
        'DKK',
        'DOP',
        'XCD',
        'EGP',
        'EUR',
        'FJD',
        'GTQ',
        'HKD',
        'HNL',
        'HUF',
        'INR',
        'IDR',
        'ILS',
        'JMD',
        'JPY',
        'KZT',
        'KES',
        'LAK',
        'MMK',
        'LBP',
        'LRD',
        'MOP',
        'MYR',
        'MVR',
        'MRO',
        'MUR',
        'MXN',
        'MAD',
        'NPR',
        'TWD',
        'NZD',
        'NIO',
        'NOK',
        'PKR',
        'PGK',
        'PEN',
        'PHP',
        'PLN',
        'QAR',
        'RON',
        'RUB',
        'WST',
        'SAR',
        'SCR',
        'SGF',
        'SBD',
        'ZAR',
        'KRW',
        'LKR',
        'SEK',
        'CHF',
        'SYP',
        'THB',
        'TOP',
        'TTD',
        'TRY',
        'UAH',
        'AED',
        'USD',
        'VUV',
        'VND',
        'XOF',
        'YER'
    ];

    protected $_formBlockType = \Tco\Checkout\Block\Form\Api::class;
    protected $_infoBlockType = \Tco\Checkout\Block\Info\Api::class;

    protected $_transactionBuilder;

    public function __construct(
        \Magento\Framework\HTTP\ZendClientFactory $httpClientFactory,
        \Magento\Framework\App\RequestInterface $request,
        \Magento\Framework\UrlInterface $urlBuilder,
        \Tco\Checkout\Helper\Api $helper,
        \Magento\Framework\Model\Context $context,
        \Magento\Framework\Registry $registry,
        \Magento\Framework\Api\ExtensionAttributesFactory $extensionFactory,
        \Magento\Framework\Api\AttributeValueFactory $customAttributeFactory,
        \Magento\Payment\Helper\Data $paymentData,
        \Magento\Framework\App\Config\ScopeConfigInterface $scopeConfig,
        \Magento\Payment\Model\Method\Logger $logger,
        \Magento\Framework\Module\ModuleListInterface $moduleList,
        \Magento\Framework\Stdlib\DateTime\TimezoneInterface $localeDate,
        \Magento\Sales\Model\Order\Payment\Transaction\BuilderInterface $transactionBuilder,
        \Magento\Framework\Model\ResourceModel\AbstractResource $resource = null,
        \Magento\Framework\Data\Collection\AbstractDb $resourceCollection = null,
        array $data = []
    ) {
        parent::__construct(
            $context,
            $registry,
            $extensionFactory,
            $customAttributeFactory,
            $paymentData,
            $scopeConfig,
            $logger,
            $moduleList,
            $localeDate,
            $resource,
            $resourceCollection,
            $data
        );
        $this->_helper = $helper;
        $this->_request = $request;
        $this->_httpClientFactory = $httpClientFactory;
        $this->_transactionBuilder = $transactionBuilder;
    }

    public function get2coOrder($refNo)
    {
        $sellerId = $this->getSellerId();
        $requestDateTime = $this->_helper->composeRequestDateTime();
        $hash = $this->_helper->generateHash($sellerId, $this->getSecretKey(), $requestDateTime);
        $headers = $this->_helper->getHeaders($sellerId, $requestDateTime, $hash);

        return $this->_helper->callApi($this->getApiUrl() . 'orders/' . $refNo . '/', [], $headers, 'GET');
    }

    /**
     * build the 2co format array for paymentDetails
     * @param $q
     * @param $token
     * @return array
     */
    public function buildPaymentDetails($q, $token)
    {
        return [
            'Type'          => 'EES_TOKEN_PAYMENT',
            'Currency'      => $q->getCurrency()->getQuoteCurrencyCode(),
            'CustomerIP'    => $q->getRemoteIp(),
            'PaymentMethod' => [
                'EesToken'           => $token,
                'Vendor3DSReturnURL' => $this->get3DSRedirectUrl(),
                'Vendor3DSCancelURL' => $this->get3DSRedirectUrl(false)
            ]
        ];
    }

    /**
     * build the 2co format array for billingAddress
     * @param $q
     * @return array
     */
    public function buildBillingAddress($q)
    {
        $address = [
            'Address1'    => $q->getStreet()[0],
            'City'        => $q->getCity(),
            'CountryCode' => $q->getCountryId(),
            'Email'       => $q->getEmail(),
            'FirstName'   => $q->getFirstname(),
            'LastName'    => $q->getLastname(),
            'Phone'       => $q->getTelephone(),
            'State'       => $q->getRegion(),
            'Zip'         => $q->getPostcode(),
            'Company'     => $q->getCompany()
        ];

        if (count($q->getStreet()) > 1) {
            $address['Address2'] = $q->getStreet()[1];
        }

        return $address;
    }

    /** we send only an ITEM as entire order with the quote_id
     * @param $id
     * @param $total
     * @param $currency
     * @return array
     */
    public function buildItems($id, $total, $currency)
    {

        return [
            [
                'Code'         => null,
                'Quantity'     => 1,
                'Name'         => 'Cart_' . $id,
                'Description'  => 'N / A',
                'IsDynamic'    => true,
                'Tangible'     => false,
                'PurchaseType' => 'PRODUCT',
                'Price'        => [
                    'Amount'   => number_format($total, 2, '.', ''),
                    'Type'     => 'CUSTOM',
                    'Currency' => $currency
                ]
            ]
        ];
    }

    /**
     * builds a request to place an order on 2co API
     * @param $quote
     * @param $token
     * @return mixed
     * @throws \Magento\Framework\Exception\LocalizedException
     * @throws \Throwable
     */
    public function buildOrderParams($quote, $token)
    {

        $currency = $quote->getCurrency()->getQuoteCurrencyCode();
        if (!$this->canUseForCurrency($currency)) {
            throw new \Magento\Framework\Exception\LocalizedException(__('This currency is not allowed'));
        }

        $billing_address = $this->buildBillingAddress($quote->getBillingAddress());
        $payment_details = $this->buildPaymentDetails($quote, $token);
        $items = $this->buildItems($quote->getReservedOrderId(), $quote->getGrandTotal(), $currency);

        $orderArr = [
            'Currency'                  => $currency,
            'Language'                  => 'EN', // we dont have a language available in this shitty mangeto
            'Country'                   => $quote->getBillingAddress()->getCountryId(),
            'CustomerIP'                => $quote->getRemoteIp(),
            'Source'                    => 'MAGENTO2',
            'ExternalCustomerReference' => 'Ext_CR_' . $quote->getId(),
            'ExternalReference'         => $quote->getReservedOrderId(),
            'Items'                     => $items,
            'BillingDetails'            => $billing_address,
            'PaymentDetails'            => $payment_details,
        ];

        if ($this->testOrder()) {
            $orderArr['test'] = 1;
        }

        $sellerId = $this->getSellerId();
        $requestDateTime = $this->_helper->composeRequestDateTime();
        $hash = $this->_helper->generateHash($sellerId, $this->getSecretKey(), $requestDateTime);
        $headers = $this->_helper->getHeaders($sellerId, $requestDateTime, $hash);

        return $this->_helper->callApi($this->getApiUrl() . 'orders/', $orderArr, $headers);
    }

    /**
     * creates an ORDER from a QUOTE and sets it STATUS from the 2co side
     * also sends email to client
     * @param $quote
     * @param $response
     * @return mixed
     * @throws \Magento\Checkout\Exception
     */
    public function createMageOrder($quote, $response)
    {
        try {

            $objectManager = \Magento\Framework\App\ObjectManager::getInstance();
            $order = $objectManager->get('\Magento\Quote\Model\QuoteManagement')->submit($quote);
            $magentoState = $this->getMangetoOrderState($response['Status'], $response['ApproveStatus']);

            $order->setEmailSent(1)
                  ->setState($magentoState['state'])
                  ->setStatus($magentoState['status'])
                  ->setExtOrderId($response['RefNo']);

            $payment = $order->getPayment();
            $payment->setTransactionId($response['RefNo']);
            $payment->setIsTransactionClosed(0);
            $payment->setTransactionAdditionalInfo('tco_order_number', $response['RefNo']);
            $payment->setAdditionalData('tco_order_number_' . $response['RefNo']);
            $payment->setAdditionalInformation([\Magento\Sales\Model\Order\Payment\Transaction::RAW_DETAILS => (array)$response]);
            $payment->setCurrencyCode($response['Currency']);
            $payment->setShouldCloseParentTransaction(true);

            if ($this->getConfigData('invoice_when_captured')) {
                $payment->place();
            }

            $message = __('The authorized amount is %1.', $order->getBaseCurrency()->formatTxt($order->getGrandTotal()));

            $trans = $this->_transactionBuilder;
            $transaction = $trans->setPayment($payment)
                                 ->setOrder($order)
                                 ->setTransactionId($response['RefNo'])
                                 ->setFailSafe(true)
                                 ->build(\Magento\Sales\Model\Order\Payment\Transaction::TYPE_CAPTURE);

            $payment->addTransactionCommentsToOrder($transaction, $message);
            $payment->setParentTransactionId(null);
            $payment->save();
            $order->save();

            return $order;
        } catch (\Magento\Checkout\Exception $e) {
            throw new \Magento\Checkout\Exception(sprintf('Error Creating Invoice: "%s"', $e->getMessage()));
        }
    }

    /**
     * @param string $currencyCode
     * @return bool
     */
    public function canUseForCurrency($currencyCode)
    {

        return in_array($currencyCode, $this->_supportedCurrencyCodes);
    }

    public function authorize3DS($response)
    {
        if (isset($response['PaymentDetails']['PaymentMethod']['Authorize3DS']) &&
            isset($response['PaymentDetails']['PaymentMethod']['Authorize3DS']['Href']) &&
            !empty($response['PaymentDetails']['PaymentMethod']['Authorize3DS']['Href'])) {

            return $response['PaymentDetails']['PaymentMethod']['Authorize3DS']['Href'] . '?avng8apitoken=' .
                $response['PaymentDetails']['PaymentMethod']['Authorize3DS']['Params']['avng8apitoken'];
        }

        return false;
    }

    public function validate()
    {
        return $this;
    }

    /**
     * match status between 2co and mangeto
     * @param $state
     * @param $status
     * @return array
     */
    private function getMangetoOrderState($state, $status)
    {
        switch ($state) {
            case 'REVERSED':
            case 'CANCELED':
                $mageState = \Magento\Sales\Model\Order::STATE_CANCELED;
                break;
            case 'REFUND':
                $mageState = \Magento\Sales\Model\Order::STATE_CLOSED;
                break;
            default: // for COMPLETE and AUTHRECEIVED
                $mageState = \Magento\Sales\Model\Order::STATE_PROCESSING;
                break;
        }

        if ($status === 'FRAUD' || $status === 'INVALIDDATA') { // https://www.mageworx.com/wiki/magento-2-order-status/
            $mageStatus = \Magento\Sales\Model\Order::STATUS_FRAUD;
            $mageState = \Magento\Sales\Model\Order::STATE_CANCELED;
        } else {
            $mageStatus = $mageState;
        }

        return ['state' => $mageState, 'status' => $mageStatus];
    }


    protected function _getRequest()
    {
        return $this->_request;
    }

    public function getSecretKey()
    {
        return $this->getConfigData('secret_key');
    }


    public function testOrder()
    {
        return $this->getConfigData('demo_mode');
    }

    public function getSellerId()
    {
        return $this->getConfigData('merchant_id');
    }

    public function getPlaceOrderUrl()
    {
        return $this->_helper->getUrl('tco/standard/apisdk');
    }

    public function getRedirectUrl($success = true)
    {
        if (!$success) {
            return $this->_helper->getUrl('checkout/onepage/failure');
        }

        return $this->_helper->getUrl('checkout/onepage/success');
    }

    public function get3DSRedirectUrl($to = true)
    {
        if ($to) {
            return $this->_helper->getUrl('tco/standard/Redirect3DSecure');
        }

        return $this->_helper->getUrl('tco/standard/Redirect3DSecure', ['cancel' => 1]);
    }

    public function getCheckoutRedirectUrl()
    {

        return $this->_helper->getUrl('checkout/cart');
    }

    public function getApiUrl()
    {
        return $this->getConfigData('api_url');
    }

    public function getCode()
    {
        return self::CODE;
    }
}
