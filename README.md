### _[Signup free with 2Checkout and start selling!](https://www.2checkout.com/signup)_

### Integrate Magento2 with 2Checkout
----------------------------------------

### 2Checkout Payment Module Setup

#### 2Checkout Settings

1. Sign in to your 2Checkout account.
2. Click the **Account** tab and **Site Management** subcategory.
3. Under **Direct Return** select **Header Redirect**.
4. Enter your **Secret Word**._(Must be the same value entered in your Magento admin.)_
5. Set the **Approved URL** to https://www.yourstore.com/tco/standard/response _(Replace https://www.yourstore.com with the actual URL to your store.)_
6. Click **Save Changes**.

#### Magento Settings

1. Download the 2Checkout payment module from https://github.com/craigchristenson/magento2-2checkout
2. Upload the included **Tco** directory to “app/code/” your Magento root directory.
3. On your server, install the module by running `bin/magento setup:upgrade` in your magento root directory.
3. Sign in to your Magento admin.
4. Flush your Magento cache under **System**->**Cache Management** and reindex all templates under **System**->**Index Management**.
5. Navigate to Payment Methods under **Stores**->**Configuration**->**Sales**->**Payment Methods** expand **2Checkout** and make sure that it is enabled.
6. Select **No** under **Sandbox**. _(Unless you are testing in the 2Checkout Sandbox)_
7. Enter your **Merchant ID**. _(2Checkout Account Number)_
8. Enter your **Secret Word** _(Must be the same value entered on your 2Checkout Site Management page.)_
9. Save your changes.

Please feel free to contact 2Checkout directly with any integration questions.
