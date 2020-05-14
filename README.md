### _[Signup free with 2Checkout and start selling!](https://www.2checkout.com/signup)_

### Integrate Magento2 with 2Checkout
----------------------------------------

### 2Checkout Payment Module Setup

#### 2Checkout Settings

1. Sign in to your 2Checkout account.
2. Navigate to **Dashboard** → **Integrations** → **Webhooks & API section**
3. There you can find the 'Merchant Code', 'Secret key', and the 'Buy link secret word'
4. Navigate to **Dashboard** → **Integrations** → **Ipn Settings**
5. Set the IPN URL which should be https://your-site-name.com/tco/ipn/notification/
    5a. Example IPN URL: http://example.com/tco/ipn/notification/
6. Enable 'Triggers' in the IPN section. It’s simpler to enable all the triggers. Those who are not required will simply not be used.

#### Magento Settings

1. Download the 2Checkout payment module from https://github.com/2Checkout/magento2-2checkout
    1a. Under the 'Releases' you can find the latest release.
    1b. You can also download the connector directly from the 'master' branch as it always reflects the latest release.
2. Upload the included **Tco** directory to 'app/code/' your Magento root directory on your server.
3. On your server, install the module by running `bin/magento setup:upgrade` in your magento root directory, then in your magento admin flush your Magento cache under **System**->**Cache Management** and reindex all templates under **System**->**Index Management**.
4. In your magento admin navigate to **Stores** → **Configuration** → **Sales** → **Payment Methods**. There you should see '2Checkout Hosted' and '2Checkout Payment API'
    _**IMPORTANT: Both '2Checkout Hosted' and '2Checkout Payment API' must be configured but only 1 needs to be enabled. Usually they will have the same settings.**_
    4a. The 'Test Mode' dropdown will enable or disable demo mode. If it’s set to 'Yes' then any order placed will be for demonstration purposes and will have no impact on the store.
    4b. The 'Merchant ID' field is your Merchant Code which can be found in your 2Checkout panel.
    4c. The 'Secret key' field is your Secret Key which can be found in your 2Checkout panel.
    4d. The 'Secret Word' field is the BuyLink secret word which can be found in your 2Checkout panel.
    4e. The 'Use Inline Checkout' dropdown will determine if Inline mode or ConvertPlus mode is used. Setting 'Use Inline Checkout' to 'No' will use the ConverPlus mode.
    4f. The 'New Order Status' will set the default status of the order when it’s created. It’s HIGHLY recommended that you leave it as 'Processing'. Unless you have a very good reason to set it to any other status.
    4g. The 'Invoice Before Fraud Review' dropdown will issue an invoice before 2Checkout does a fraud review on the order.
    4h. The 'Invoice After Fraud Review' dropdown will issue an invoice after 2Checkout does a fraud review. _Generally the best option is to have 'Invoice Before Fraud Review' set to 'No' and  'Invoice After Fraud Review' set to 'Yes'. Unless you have a good reason to issue the invoice before the fraud review._
    4i. The 'Invoice On Capture' field will issue an invoice on capturing a transaction.

Please feel free to contact 2Checkout directly with any integration questions.
