define(
    [
        'Magento_Checkout/js/model/quote',
        'Magento_Checkout/js/model/url-builder',
        'mage/storage',
        'mage/url',
        'Magento_Checkout/js/model/error-processor',
        'Magento_Customer/js/model/customer',
        'Magento_Checkout/js/model/full-screen-loader'
    ],
    function (quote, urlBuilder, storage, url, errorProcessor, customer, fullScreenLoader) {
        'use strict';

        return function (paymentData, redirectOnSuccess) {
            var serviceUrl,
                payload;

            redirectOnSuccess = redirectOnSuccess === false ? false : true;

            /** Checkout for guest and registered customer. */
            if (!customer.isLoggedIn()) {
                serviceUrl = urlBuilder.createUrl('/guest-carts/:quoteId/payment-information', {
                    quoteId: quote.getQuoteId()
                });
                payload = {
                    cartId: quote.getQuoteId(),
                    email: quote.guestEmail,
                    paymentMethod: paymentData,
                    billingAddress: quote.billingAddress()
                };
            } else {
                serviceUrl = urlBuilder.createUrl('/carts/mine/payment-information', {});
                payload = {
                    cartId: quote.getQuoteId(),
                    paymentMethod: paymentData,
                    billingAddress: quote.billingAddress()
                };
            }

            fullScreenLoader.startLoader();

            return storage.post(
                serviceUrl, JSON.stringify(payload)
            ).done(
                function () {
                    if (redirectOnSuccess) {
                        window.location.replace(url.build(window.checkoutConfig.payment[quote.paymentMethod().method].redirectUrl));
                    }
                }
            ).fail(
                function (response) {
                    if (response.status === 400) {
                        response.responseText = window.checkoutConfig.payment[quote.paymentMethod().method].processingError;
                    }
                    errorProcessor.process(response);
                    fullScreenLoader.stopLoader();
                }
            );
        };
    }
);