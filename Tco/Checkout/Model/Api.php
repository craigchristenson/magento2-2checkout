<?php


namespace Tco\Checkout\Model;


class Api extends \Magento\Payment\Model\Method\Cc
{
    const CODE = 'tco_api';
    protected $_code = self::CODE;
    protected $_canAuthorize = true;
    protected $_canCapture = false;
    protected $_canRefund = true;
    protected $_canRefundInvoicePartial = true;
    protected $_isGateway = true;
    protected $_request;
    protected $_helper;
    protected $_httpClientFactory;

    protected $_minAmount = null;
    protected $_maxAmount = null;

    protected $_supportedCurrencyCodes = array(
        'AFN', 'ALL', 'DZD', 'ARS', 'AUD', 'AZN', 'BSD', 'BDT', 'BBD',
        'BZD', 'BMD', 'BOB', 'BWP', 'BRL', 'GBP', 'BND', 'BGN', 'CAD',
        'CLP', 'CNY', 'COP', 'CRC', 'HRK', 'CZK', 'DKK', 'DOP', 'XCD',
        'EGP', 'EUR', 'FJD', 'GTQ', 'HKD', 'HNL', 'HUF', 'INR', 'IDR',
        'ILS', 'JMD', 'JPY', 'KZT', 'KES', 'LAK', 'MMK', 'LBP', 'LRD',
        'MOP', 'MYR', 'MVR', 'MRO', 'MUR', 'MXN', 'MAD', 'NPR', 'TWD',
        'NZD', 'NIO', 'NOK', 'PKR', 'PGK', 'PEN', 'PHP', 'PLN', 'QAR',
        'RON', 'RUB', 'WST', 'SAR', 'SCR', 'SGF', 'SBD', 'ZAR', 'KRW',
        'LKR', 'SEK', 'CHF', 'SYP', 'THB', 'TOP', 'TTD', 'TRY', 'UAH',
        'AED', 'USD', 'VUV', 'VND', 'XOF', 'YER'
    );

    protected $_formBlockType = 'Tco\Checkout\Block\Form\Api';
    protected $_infoBlockType = 'Tco\Checkout\Block\Info\Api';

    public function __construct(
        \Magento\Framework\HTTP\ZendClientFactory $httpClientFactory,
        \Magento\Framework\App\RequestInterface $request,
        \Magento\Framework\UrlInterface $urlBuilder,
        \Tco\Checkout\Helper\Checkout $helper,
        \Magento\Framework\Model\Context $context,
        \Magento\Framework\Registry $registry,
        \Magento\Framework\Api\ExtensionAttributesFactory $extensionFactory,
        \Magento\Framework\Api\AttributeValueFactory $customAttributeFactory,
        \Magento\Payment\Helper\Data $paymentData,
        \Magento\Framework\App\Config\ScopeConfigInterface $scopeConfig,
        \Magento\Payment\Model\Method\Logger $logger,
        \Magento\Framework\Module\ModuleListInterface $moduleList,
        \Magento\Framework\Stdlib\DateTime\TimezoneInterface $localeDate,
        \Magento\Framework\Model\ResourceModel\AbstractResource $resource = null,
        \Magento\Framework\Data\Collection\AbstractDb $resourceCollection = null,
        array $data = []
    )
    {
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
    }

    public function isAvailable(\Magento\Quote\Api\Data\CartInterface $quote = null)
    {
        if ($quote && (
                $quote->getBaseGrandTotal() < $this->_minAmount
                || ($this->_maxAmount && $quote->getBaseGrandTotal() > $this->_maxAmount))
        ) {
            return false;
        }

        return parent::isAvailable($quote);
    }

    public function canUseForCurrency($currencyCode)
    {
        if (!in_array($currencyCode, $this->_supportedCurrencyCodes)) {
            return false;
        }
        return true;
    }

    public function validate()
    {
        return $this;
    }

    public function assignData(\Magento\Framework\DataObject $data)
    {
        parent::assignData($data);
        if (!$data instanceof \Magento\Framework\DataObject) {
            $data = new \Magento\Framework\DataObject($data);
        }
        $additionalData = $data->getAdditionalData();
        $infoInstance = $this->getInfoInstance();
        if (isset($additionalData['cc_type'])) {
            $infoInstance->setCcType($additionalData['cc_type']);
        }
        $infoInstance->setAdditionalInformation('token', $additionalData['token']);

        return $this;
    }

    public function authorize(\Magento\Payment\Model\InfoInterface $payment, $amount)
    {
        if (!$this->canAuthorize()) {
            throw new \Magento\Framework\Exception\LocalizedException(__('The authorize action is not available.'));
        }

        $payment->getAdditionalInformation();

        $order = $payment->getOrder();
        $billing_address = $order->getBillingAddress();
        $shipping_address = $order->getShippingAddress();

        $params = array();
        $params["sellerId"]         = $this->getConfigData("merchant_id");
        $params["privateKey"]         = $this->getConfigData("private_key");
        $params["merchantOrderId"]  = $order->getRealOrderId();
        $params["currency"]         = $order->getOrderCurrencyCode();
        $params["token"]            = $payment->getAdditionalInformation()['token'];
        $params["total"]            = round($order->getGrandTotal(), 2);

        // Set billing info
        $params["billingAddr"]                   = array();
        $params["billingAddr"]["name"]           = $billing_address->getName();
        $params["billingAddr"]["addrLine1"]      = $billing_address->getStreet()[0];
        if (count($billing_address->getStreet()) > 1) {
            $params["billingAddr"]["addrLine2"]  = $billing_address->getStreet()[1];
        }
        $params["billingAddr"]["city"]           = $billing_address->getCity();
        $params["billingAddr"]["state"]          = $billing_address->getRegion();
        $params["billingAddr"]["zipCode"]        = $billing_address->getPostcode();
        $params["billingAddr"]["country"]        = $billing_address->getCountryId();
        $params["billingAddr"]["email"]          = $order->getCustomerEmail();
        $params["billingAddr"]["phoneNumber"]    = $billing_address->getTelephone();

        if (isset($shipping_address)) {
            $params["shippingAddress"] = array();
            $params["shippingAddress"]["name"]              = $shipping_address->getName();
            $params["shippingAddress"]["addrLine1"]         = $shipping_address->getStreet()[0];
            if (count($shipping_address->getStreet()) > 1) {
                $params["shippingAddress"]["addrLine2"]     = $shipping_address->getStreet()[1];
            }
            $params["shippingAddress"]["city"]              = $shipping_address->getCity();
            $params["shippingAddress"]["state"]             = $shipping_address->getRegion();
            $params["shippingAddress"]["zipCode"]           = $shipping_address->getPostcode();
            $params["shippingAddress"]["country"]           = $shipping_address->getCountryId();
        }





        $client = $this->_httpClientFactory->create();
        $path = $this->getConfigData('merchant_id') . "/rs/authService";
        $url = $this->getPaymentApiUrl();
        $client->setUri($url . $path);
        $client->setConfig(['maxredirects' => 0, 'timeout' => 30]);

        $client->setHeaders(
            [
                'Accept: application/json',
                'Content-Type: application/json'
            ]
        );

        $client->setMethod(\Zend_Http_Client::POST);
        $client->setRawData(json_encode($params), 'application/json');

        try {
            $response = $client->request();
            $responseBody = json_decode($response->getBody(), true);
            if (isset($responseBody['exception'])) {
                throw new \Magento\Framework\Exception\LocalizedException(__($responseBody['exception']['errorMsg']));
            } elseif (!isset($responseBody['response'])) {
                throw new \Magento\Framework\Exception\LocalizedException(__('Error placing transaction.'));
            }
        } catch (\Exception $e) {
            throw new \Magento\Framework\Exception\LocalizedException(__($e->getMessage()));
        }

        $payment->setTransactionId($responseBody['response']['transactionId']);
        $payment->setIsTransactionClosed(0);
        $payment->setTransactionAdditionalInfo('tco_order_number', $responseBody['response']['orderNumber']);
        $payment->setAdditionalInformation('tco_order_number', $responseBody['response']['orderNumber']);
        $payment->setAdditionalInformation('tco_order_status', 'approved');

        return $this;
    }


    public function refund(\Magento\Payment\Model\InfoInterface $payment, $amount)
    {
        if ($amount <= 0) {
            throw new \Magento\Framework\Exception\LocalizedException(__('Invalid amount for refund.'));
        }

        if (!$payment->getParentTransactionId()) {
            throw new \Magento\Framework\Exception\LocalizedException(__('Invalid transaction ID.'));
        }

        $orderNumber = $payment->getAdditionalInformation('tco_order_number');

        $args = array(
            'sale_id' => $orderNumber,
            'category' => 5,
            'comment' => 'Refund issued by merchant.',
            'amount' => $amount,
            'currency' => 'vendor'
        );

        $client = $this->_httpClientFactory->create();
        $path = 'sales/refund_invoice';
        $url = $this->getApiUrl();
        $client->setUri($url . $path);
        $client->setConfig(['maxredirects' => 0, 'timeout' => 30]);
        $client->setAuth($this->getConfigData('api_user'), $this->getConfigData('api_pass'));

        $client->setHeaders(
            [
                'Accept: application/json'
            ]
        );
        $client->setParameterPost($args);
        $client->setMethod(\Zend_Http_Client::POST);

        try {
            $response = $client->request();
            $responseBody = json_decode($response->getBody(), true);
            if (isset($responseBody['errors'])) {
                $this->_logger->critical(sprintf('Error Refunding Invoice: "%s"', $responseBody['errors'][0]['message']));
                throw new \Magento\Framework\Exception\LocalizedException(__($responseBody['errors'][0]['message']));
            } elseif (!isset($responseBody['response_code']) || !isset($responseBody['response_message'])) {
                throw new \Magento\Framework\Exception\LocalizedException(__('Error refunding transaction.'));
            } elseif ($responseBody['response_code'] != 'OK') {
                throw new \Magento\Framework\Exception\LocalizedException(__($responseBody['response_message']));
            }
        } catch (\Exception $e) {
            throw new \Magento\Framework\Exception\LocalizedException(__($e->getMessage()));
        }

        return $this;
    }

    protected function _getRequest()
    {
        return $this->_request;
    }

    public function getSellerId()
    {
        return $this->getConfigData('merchant_id');
    }

    public function getPublishableKey()
    {
        return $this->getConfigData('publishable_key');
    }

    public function getRedirectUrl()
    {
        $url = $this->_helper->getUrl('checkout/onepage/success');
        return $url;
    }

    public function getPaymentApiUrl()
    {
        $url = $this->getConfigData('sandbox') ?
            $this->getConfigData('payment_api_url_sandbox') : $this->getConfigData('payment_api_url');
        return $url;
    }

    public function getApiUrl()
    {
        $url = $this->getConfigData('sandbox') ?
            $this->getConfigData('api_url_sandbox') : $this->getConfigData('api_url');
        return $url;
    }

    public function getPublicKeyType()
    {
        $keyType = $this->getConfigData('sandbox') ? 'sandbox' : 'production';
        return $keyType;
    }

}