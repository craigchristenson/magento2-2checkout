<?php

namespace Tco\Checkout\Helper;

class Api extends \Magento\Framework\App\Helper\AbstractHelper
{

    protected $_httpClientFactory;

    public function __construct(
        \Magento\Framework\App\Helper\Context $context,
        \Magento\Framework\HTTP\ZendClientFactory $clientFactory
    ) {
        parent::__construct($context);
        $this->_httpClientFactory = $clientFactory;
    }

    /**
     * @param $merchantId
     * @param $dateUtcFormatted
     * @param $hash
     * @return array
     */
    public function getHeaders($merchantId, $dateUtcFormatted, $hash)
    {
        $headers[] = 'Content-Type: application/json';
        $headers[] = 'Accept: application/json';
        $headers[] = sprintf('X-Avangate-Authentication: code="%s" date="%s" hash="%s"',
            $merchantId, $dateUtcFormatted, $hash);

        return $headers;
    }

    /**
     * @return string
     * @throws \Throwable
     */
    public function composeRequestDateTime()
    {
        try {
            //  REQUEST_DATE_TIME: The UTC date time of the request. Format: YYYY-MM-DD HH:MM:SS. You must provide the time of the request in the GMT timezone.
            $dateUtc = new \DateTimeImmutable('now', new \DateTimeZone('UTC'));
            if (false === $dateUtcFormatted = $dateUtc->format('Y-m-d H:i:s')) // formatting may fail for whatever reason
            {
                throw new \Exception('Unable to format dateUtc to proper format.');
            }
        } catch (\Throwable $exception) {
            // log the error but also rethrow the exception to cause script termination
            $this->_logger->info(
                sprintf(
                    'Exception thrown when trying to create UTC time in class %s at line %. Exception message: %s',
                    __CLASS__,
                    __LINE__,
                    $exception->getMessage()
                )
            );

            throw $exception;
        }

        return $dateUtcFormatted;
    }

    /**
     * @param $vendorCode
     * @param $secret
     * @param $requestDateTime
     * @return string
     * @throws \Exception
     */
    public function generateHash($vendorCode, $secret, $requestDateTime)
    {
        $string = sprintf('%s%s%s%s', strlen($vendorCode), $vendorCode, strlen($requestDateTime), $requestDateTime);
        $hash = hash_hmac('md5', $string, $secret);

        // the hash_hmac may fail for various reasons
        if (false === $hash) {
            $exception = new \Exception('Unable to create the hash, hash_hmac returned false.');
            $this->_logger->info(sprintf('Exception thrown when trying to create hash_hmac time in class %s at line %. Exception message: %s',
                __CLASS__, __LINE__, $exception->getMessage()));

            throw $exception;
        }

        return $hash;
    }

    /**
     * @param string $endpoint
     * @param array  $params
     * @param array  $headers
     * @param string $method
     * @return mixed
     */

    public function callApi(string $endpoint, array $params, array $headers, string $method = 'POST')
    {

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $endpoint);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        if ($method === 'POST') {
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($params, JSON_UNESCAPED_UNICODE));
        }
        $response = curl_exec($ch);

        if ($response === false) {
            exit(curl_error($ch));
        }
        curl_close($ch);

        return json_decode($response, true);
    }

    public function getUrl($route, $params = [])
    {
        return $this->_getUrl($route, $params);
    }

}
