<?php

namespace Tco\Checkout\Model;

class Checkout extends \Magento\Payment\Model\Method\AbstractMethod
{

    const CODE = 'tco_checkout';

    protected $_code = self::CODE;

    protected $_isGateway = false;

    protected $_isOffline = false;

    protected $_canRefund = true;

    protected $_isInitializeNeeded = false;

    protected $_helper;

    protected $_minAmount = null;

    protected $_maxAmount = null;

    protected $_supported_currency_codes = [
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
        'YER',
    ];

    protected $_formBlockType = \Tco\Checkout\Block\Form\Checkout::class;

    protected $_infoBlockType = \Tco\Checkout\Block\Info\Checkout::class;

    protected $_httpClientFactory;

    protected $_orderSender;

    protected $_orderRepo;

    protected $_transactionBuilder;

    protected $_taxHelper;

    protected $_locale_resolver;

    protected $_store;

    protected $_apiHelper;

    public function __construct(
        \Magento\Framework\Model\Context $context,
        \Magento\Framework\Registry $registry,
        \Magento\Framework\Api\ExtensionAttributesFactory $extensionFactory,
        \Magento\Framework\Api\AttributeValueFactory $customAttributeFactory,
        \Magento\Payment\Helper\Data $paymentData,
        \Magento\Framework\App\Config\ScopeConfigInterface $scopeConfig,
        \Magento\Payment\Model\Method\Logger $logger,
        \Tco\Checkout\Helper\Checkout $helper,
        \Magento\Sales\Model\Order\Email\Sender\OrderSender $orderSender,
        \Magento\Framework\HTTP\ZendClientFactory $httpClientFactory,
        \Magento\Sales\Api\OrderRepositoryInterface $orderRepo,
        \Magento\Sales\Model\Order\Payment\Transaction\BuilderInterface $transactionBuilder,
        \Magento\Catalog\Helper\Data $taxHelper,
        \Magento\Framework\Locale\Resolver $locale_resolver,
        \Magento\Store\Api\Data\StoreInterface $store,
        \Tco\Checkout\Helper\Api $apiHelper
    ) {
        $this->_helper = $helper;
        $this->_orderSender = $orderSender;
        $this->_httpClientFactory = $httpClientFactory;
        $this->_orderRepo = $orderRepo;
        $this->_transactionBuilder = $transactionBuilder;
        $this->_taxHelper = $taxHelper;
        $this->_locale_resolver = $locale_resolver;
        $this->_store = $store;
        $this->_apiHelper = $apiHelper;

        parent::__construct(
            $context,
            $registry,
            $extensionFactory,
            $customAttributeFactory,
            $paymentData,
            $scopeConfig,
            $logger
        );

        $this->_minAmount = $this->getConfigData('min_order_total');
        $this->_maxAmount = $this->getConfigData('max_order_total');
    }

    public function isAvailable(
        \Magento\Quote\Api\Data\CartInterface $quote = null
    ) {
        if ($quote && (
                $quote->getBaseGrandTotal() < $this->_minAmount
                || ($this->_maxAmount && $quote->getBaseGrandTotal() > $this->_maxAmount))
        ) {
            return false;
        }

        return parent::isAvailable($quote);
    }

    public function canUseForCurrency($currency_code)
    {
        if (!in_array($currency_code, $this->_supported_currency_codes)) {
            return false;
        }
        return true;
    }

    protected function buildCheckoutParameters($quote)
    {

        $billing_address = $quote->getBillingAddress();
        $shipping_address = $quote->getShippingAddress();

        //1. Setup data
        $setup_data = [];
        $setup_data['merchant'] = $this->getConfigData("merchant_id");

        //2. Set the BASE needed fields.
        $cart_data = [];
        $cart_data['src'] = 'MAGENTO2';
        $cart_data['return-url'] = $this->getReturnUrl();
        $cart_data['return-type'] = 'redirect';
        $cart_data['expiration'] = time() + (3600 * 5);
        $cart_data['order-ext-ref'] = $quote->getReservedOrderId();
        $cart_data['item-ext-ref'] = date('YmdHis');
        $cart_data['customer-ext-ref'] = $quote->getCustomer()->getEmail();
        $cart_data['currency'] = $quote->getQuoteCurrencyCode();

        $cart_data["test"] = 0;
        if ($this->getConfigData('demo_mode')) {
            $cart_data["test"] = 1;
        }

        //3. Language config
        $current_locale_setting = $this->_locale_resolver->getLocale();
        $current_store_lang = $this->_store->getLocaleCode();
        $lang = !$current_store_lang ? $current_locale_setting : $current_store_lang;
        $langCode = strstr($lang, '_', true);
        $cart_data['language'] = $langCode;

        //4. Products
        $products_data = [];
        $totals = $quote->collectTotals()->save();

        $_arr['name'] = _("Cart_" . $cart_data['order-ext-ref']);
        $_arr['price'] = $totals->getGrandTotal();
        $_arr["qty"] = 1;
        $_arr["type"] = "PRODUCT";
        $_arr["tangible"] = 0;
        $products_data[] = $_arr;

        //5. Set the shipping address data
        $shipping_data = $this->setCheckoutShipping($shipping_address);

        //6. Set the billing address data
        $billing_data = $this->setCheckoutBilling($billing_address);
        $setup_data['dynamic'] = 1;

        return [
            'setup_data' => $setup_data,
            'cart_data' => $cart_data,
            'products_data' => $products_data,
            'shipping_data' => $shipping_data,
            'billing_data' => $billing_data,
        ];
    }

    public function buildInlineCheckoutRequest($quote)
    {
        $params_array = $this->buildCheckoutParameters($quote);

        //Generate the signature only for buy link || prepare inline
        $params_array['setup_data']['mode'] = "DYNAMIC";
        $params['setup'] = $params_array['setup_data'];
        $params['products'] = $params_array['products_data'];
        $params['cart'] = $params_array['cart_data'];
        $params['shipping'] = $params_array['shipping_data'];
        $params['billing'] = $params_array['billing_data'];

        $params = $this->_helper->trimArray($params);

        return $params;
    }

    public function buildCheckoutRequest($quote)
    {
        $buy_link_params = [];
        $params_array = $this->buildCheckoutParameters($quote);
        $products_data_hosted = $this->prodsForHosted($params_array['products_data']);

        //dynamic products
        $buy_link_params["prod"] = implode(';', $products_data_hosted['prod']);
        $buy_link_params["price"] = implode(
            ';',
            $products_data_hosted['price']
        );
        $buy_link_params["qty"] = implode(';', $products_data_hosted['qty']);
        $buy_link_params["type"] = implode(';', $products_data_hosted['type']);
        $buy_link_params["tangible"] = implode(
            ';',
            $products_data_hosted['tangible']
        );

        $buy_link_params = array_merge(
            $buy_link_params,
            $params_array['setup_data']
        );
        $buy_link_params = array_merge(
            $buy_link_params,
            $params_array['cart_data']
        );
        $buy_link_params = array_merge(
            $buy_link_params,
            $params_array['shipping_data']
        );
        $buy_link_params = array_merge(
            $buy_link_params,
            $params_array['billing_data']
        );

        //generate signature
        $buy_link_params = $this->_helper->removeArrEmptyValues($buy_link_params);
        $secret_word = $this->getConfigData('secret_word');
        $buy_link_params['signature'] = $this->_helper->generateSignature(
            $buy_link_params,
            $secret_word
        );

        $buy_link_params = $this->_helper->trimArray($buy_link_params);

        return $buy_link_params;
    }

    public function setCheckoutBilling($billing_address)
    {
        $billing_params = [];
        $billing_params["name"] = $billing_address->getName();
        $billing_params["phone"] = $billing_address->getTelephone();
        $billing_params["country"] = $billing_address->getCountryId();
        $billing_params["state"] = $billing_address->getRegion();
        $billing_params["email"] = $billing_address->getEmail();
        $billing_params["address"] = $billing_address->getStreet()[0];
        if (count($billing_address->getStreet()) > 1) {
            $billing_params["address2"] = $billing_address->getStreet()[1];
        }
        $billing_params["city"] = $billing_address->getCity();
        $billing_params["zip"] = $billing_address->getPostcode();

        return $billing_params;
    }

    public function setCheckoutShipping($shipping_address)
    {
        $shipping_params = [];
        $shipping_params["ship-name"] = $shipping_address->getName();
        $shipping_params["ship-country"] = $shipping_address->getCountryId();
        $shipping_params["ship-state"] = $shipping_address->getRegion();
        $shipping_params["ship-city"] = $shipping_address->getCity();
        $shipping_params["ship-email"] = $shipping_address->getEmail();
        $shipping_params["ship-address"] = $shipping_address->getStreet()[0];
        if (count($shipping_address->getStreet()) > 1) {
            $shipping_params["ship-address2"] = $shipping_address->getStreet()[1];
        }
        $shipping_params["zip"] = $shipping_address->getPostcode();

        return $shipping_params;
    }

    public function prodsForHosted($prodsInlineArr)
    {
        $prod_hosted_structure = [];
        foreach ($prodsInlineArr as $key => $data) {
            $prod_hosted_structure['prod'][] = $data['name']; //important to assign to correct key. Inline works with name.
            $prod_hosted_structure['price'][] = $data['price']; //important to assign to correct key. Inline works with name.
            $prod_hosted_structure['qty'][] = $data['qty']; //important to assign to correct key. Inline works with name.
            $prod_hosted_structure['type'][] = $data['type']; //important to assign to correct key. Inline works with name.
            $prod_hosted_structure['tangible'][] = $data['tangible']; //important to assign to correct key. Inline works with name.
        }
        return $prod_hosted_structure;
    }

    public function validateResponse($params)
    {
        $secret_word = $this->getConfigData('secret_word');
        $merchant_id = $this->getConfigData('merchant_id');
        $key = $params['signature'];

        if ((isset($params['merchant']) && $params['merchant'] == $merchant_id)
            || isset($params['refno'])
        ) {
            $hash = $this->_helper->generateSignature($params, $secret_word, true);
            if ($hash === $key) {
                return true;
            }
        }
        return false;
    }

    public function isIpnResponseValid($params)
    {
        $result = '';
        $received_hash = $params['HASH'];

        foreach ($params as $key => $val) {

            if ($key != "HASH") {
                if (is_array($val)) {
                    $result .= $this->_helper->arrayExpand($val);
                } else {
                    $size = strlen(StripSlashes($val));
                    $result .= $size . StripSlashes($val);
                }
            }
        }
        $secret_word = $this->getConfigData('api_secret_key');

        if (isset($params['REFNO']) && !empty($params['REFNO'])) {
            $calc_hash = $this->_helper->generateHash($secret_word, $result);
            if ($received_hash === $calc_hash) {
                return true;
            }
        }
        return false;
    }

    public function postProcessing(\Magento\Sales\Model\Order $order, $response)
    {

        try {
            //1. Creating Invoice
            // Update payment details
            $payment = $order->getPayment();
            $payment->setTransactionId($response['refno']);
            $payment->setIsTransactionClosed(0);
            if (isset($response['order-ext-ref'])) {
                $payment->setTransactionAdditionalInfo(
                    'tco_order_number',
                    $response['order-ext-ref']
                );
                $payment->setAdditionalInformation(
                    'tco_order_number',
                    $response['order-ext-ref']
                );
                $payment->setAdditionalInformation(
                    [\Magento\Sales\Model\Order\Payment\Transaction::RAW_DETAILS => (array)$response]
                );
                $order->setExtOrderId($response['refno']);
            }
            $payment->setCurrencyCode($response['currency']);
            $payment->setShouldCloseParentTransaction(true);
            $payment->setAdditionalInformation('tco_order_status', 'approved');

            if (
                !$this->getConfigData('invoice_before_fraud_review')
                && !$this->getConfigData('invoice_when_captured')
                && !$this->getConfigData('invoice_after_fraud_review')
            ) {
                //Only create the transaction here & only if no invoice creation trigger is set in Magento2 admin, connectors settings
                $formattedPrice = $order->getBaseCurrency()->formatTxt(
                    $order->getGrandTotal()
                );
                $message = __('The authorized amount is %1.', $formattedPrice);

                $trans = $this->_transactionBuilder;
                $transaction = $trans->setPayment($payment)
                    ->setOrder($order)
                    ->setTransactionId($response['refno'])
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
            }

            // Update order status
            $order->setStatus($this->getOrderStatus());
            $invoice = $payment->getCreatedInvoice();
            // Send email confirmation
            if ($invoice && !$order->getEmailSent()) {
                $this->_orderSender->send($order);
                $order->addStatusHistoryComment(
                    __(
                        'You notified customer about invoice #%1.',
                        $invoice->getIncrementId()
                    )
                )->setIsCustomerNotified(
                    true
                );
            }
            $this->_orderRepo->save($order);

        } catch (Exception $e) {
            throw new Exception(sprintf(
                'Error Creating Invoice: "%s"',
                $e->getMessage()
            ));
        }
    }

    public function getCgiUrl()
    {
        return $this->getConfigData('inline') ?
            $this->getConfigData('inline_url') : $this->getConfigData('cgi_url');
    }

    public function getApiUrl()
    {
        return $this->getConfigData('sandbox') ?
            $this->getConfigData('api_url_sandbox') : $this->getConfigData('api_url');
    }

    public function getRedirectUrl()
    {
        return $this->_helper->getUrl($this->getConfigData('redirect_url'));
    }

    public function getRefProcessUrl()
    {
        return $this->_helper->getUrl($this->getConfigData('ref_process_url'));
    }

    public function getReturnUrl()
    {
        return $this->_helper->getUrl($this->getConfigData('return_url'));
    }

    public function getMerchantId()
    {
        return $this->getConfigData('merchant_id');
    }

    public function getCancelUrl()
    {
        return $this->_helper->getUrl($this->getConfigData('cancel_url'));
    }

    public function getSecret()
    {
        return $this->getConfigData('secret_word');
    }

    public function getInline()
    {
        return $this->getConfigData('inline');
    }

    public function getOrderStatus()
    {
        return $this->getConfigData('order_status');
    }

    public function getApiHelper()
    {
        return $this->_apiHelper;
    }

    public function getHttpClientFactory()
    {
        return $this->_httpClientFactory;
    }

    public function refund(
        \Magento\Payment\Model\InfoInterface $payment,
        $amount
    ) {
        if ($amount <= 0) {
            throw new \Magento\Framework\Exception\LocalizedException(__('Invalid amount for refund.'));
        }

        if (!$payment->getParentTransactionId()) {
            throw new \Magento\Framework\Exception\LocalizedException(__('Invalid transaction ID.'));
        }

        $secretKey = $this->getConfigData('api_secret_key');
        if (!$secretKey) {
            throw new \Magento\Framework\Exception\LocalizedException(__('Configuration for API Secret key is missing'));
        }

        $merchantId = $this->getMerchantId();
        $requestDateTime = $this->_apiHelper->composeRequestDateTime();
        $paymentAdditionalInfo = $payment->getAdditionalInformation(\Magento\Sales\Model\Order\Payment\Transaction::RAW_DETAILS);
        $hash = $this->_apiHelper->generateHash(
            $merchantId,
            $secretKey,
            $requestDateTime
        );
        $apiUrl = $this->getConfigData('api_url');

        $headers = $this->_apiHelper->getHeaders($merchantId, $requestDateTime, $hash);
        $clientConfig = [
            'maxredirects' => 0,
            'timeout' => 30,
        ];

        $client = $this->_httpClientFactory->create();
        $client->setUri(sprintf('%sorders/%s/', $apiUrl, $paymentAdditionalInfo['refno']));
        $client->setConfig($clientConfig);

        $client->setHeaders($headers);
        $client->setMethod(\Zend_Http_Client::GET);

        $responseBody = $this->decodeAndValidateResponse($client);

        if (!isset($responseBody['NetDiscountedPrice'])) {
            throw new \Magento\Framework\Exception\LocalizedException(__('Required information missing from response'));
        }

        $args = [
            'amount' => (float)$responseBody['NetDiscountedPrice'],
            'reason' => 'Other',
        ];

        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, sprintf('%sorders/%s/refund/', $apiUrl, $paymentAdditionalInfo['refno']));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HEADER, false);

        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($args));
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        $result = curl_exec($ch);

        $result = json_decode($result, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new \Magento\Framework\Exception\LocalizedException(__(
                isset($result['message']) ? $result['message'] : 'Unable to decode response'
            ));
        }
        if (isset($result['error_code'])) {
            $this->_logger->critical(sprintf(
                'Error Refunding Invoice with error code: "%s"',
                isset($result['error_code']) ? $result['error_code'] : 'An unknown error occurred'
            ));
            throw new \Magento\Framework\Exception\LocalizedException(__($result['message']));
        }

        return $this;
    }

    /**
     * @param \Magento\Framework\HTTP\ZendClient $client
     *
     * @return mixed
     * @throws \Magento\Framework\Exception\LocalizedException
     */
    public function decodeAndValidateResponse(\Magento\Framework\HTTP\ZendClient $client)
    {
        try {
            $response = $client->request();
            $responseBody = json_decode($response->getBody(), true);
            if ( isset($responseBody['error_code']) ) {
                $this->_logger->critical(sprintf(
                    'Api response has errors: "%s"',
                    $responseBody['error_code']
                ));
                throw new \Magento\Framework\Exception\LocalizedException(__(
                    isset($responseBody['message']) ? $responseBody['message'] : 'An unknown error occurred'
                ));
            }
        } catch (\Exception $e) {
            throw new \Magento\Framework\Exception\LocalizedException(__($e->getMessage()));
        }

        return $responseBody;
    }
}
