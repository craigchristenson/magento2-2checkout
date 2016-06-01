define(
    [
        'jquery',
        'Magento_Checkout/js/model/quote',
        'Magento_Checkout/js/model/url-builder',
        'mage/storage',
        'Magento_Checkout/js/model/error-processor',
        'Magento_Customer/js/model/customer',
        'Magento_Checkout/js/model/full-screen-loader'
    ],
    function ($, quote, urlBuilder, storage, errorProcessor, customer, fullScreenLoader) {
        'use strict';

        return function () {

            var serviceUrl,
                payload,
                paymentData = quote.paymentMethod(),
                email;
                email = quote.guestEmail;
            $.mage.redirect(window.checkoutConfig.payment.tco_checkout.redirectUrl+'?email='+email);

        };
    }
);
