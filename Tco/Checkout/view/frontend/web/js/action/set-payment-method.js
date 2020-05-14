define(
    [
        'jquery',
        'Magento_Checkout/js/model/quote',
        'Magento_Customer/js/customer-data',
        'Magento_Checkout/js/model/url-builder',
        'mage/storage',
        'Magento_Checkout/js/model/error-processor',
        'Magento_Customer/js/model/customer',
        'Magento_Checkout/js/model/full-screen-loader',
        'TwoCoInlineCart'
    ],
    function ($, quote, customerData, urlBuilder, storage, errorProcessor, customer, fullScreenLoader, TwoCoInlineCart) {
        'use strict';

        return function (messageContainer) {

            var serviceUrl,
                email;

            if (!customer.isLoggedIn()) {
                email = quote.guestEmail;
            } else {
                email = customer.customerData.email;
            }

            serviceUrl = window.checkoutConfig.payment.tco_checkout.redirectUrl+'?email='+email;
            fullScreenLoader.startLoader();

            $.ajax({
                url: serviceUrl,
                type: 'post',
                context: this,
                data: {isAjax: 1},
                dataType: 'json',
                success: function (response) {
                    if ($.type(response) === 'object' && !$.isEmptyObject(response)) {
                        $('#tco_payment_form').remove();
                        var data = response.fields;
                        if(response.inline && response.inline == 1) {

                            TwoCoInlineCart.setup.setConfig('cart', {'host': response.url});
                            TwoCoInlineCart.setup.setMerchant(data.setup.merchant);
                            TwoCoInlineCart.setup.setMode(data.setup.mode);
                            TwoCoInlineCart.register();


                            TwoCoInlineCart.cart.setCurrency(data.cart.currency);
                            TwoCoInlineCart.cart.setLanguage(data.cart.language);
                            TwoCoInlineCart.cart.setReturnMethod({type: data.cart["return-type"], url: data.cart['return-url']});
                            TwoCoInlineCart.cart.setTest(data.cart.test);
                            TwoCoInlineCart.cart.setOrderExternalRef(data.cart["order-ext-ref"]);
                            TwoCoInlineCart.cart.setCustomerReference(customer.customerData.id);
                            TwoCoInlineCart.cart.setExternalCustomerReference(data.cart["customer-ext-ref"]);
                            TwoCoInlineCart.cart.setSource(data.cart.src);

                            TwoCoInlineCart.products.removeAll();
                            TwoCoInlineCart.products.addMany(data.products); // add products to cart
                            TwoCoInlineCart.billing.setData(data.billing); // add products to cart
                            TwoCoInlineCart.shipping.setData(data.shipping); // add products to cart

                            TwoCoInlineCart.cart.checkout();
                            fullScreenLoader.stopLoader();
                        }
                        else {
                            if(response.method == "GET"){
                                fullScreenLoader.stopLoader();
                                //customerData.invalidate(['cart']);
                                window.location.href = response.url + $.param(data);
                            }
                        }
                    } else {
                        fullScreenLoader.stopLoader();
                        alert({
                            content: $.mage.__('Sorry, something went wrong. Please try again.')
                        });
                    }
                },
                error: function (response) {
                    fullScreenLoader.stopLoader();
                    alert({
                        content: $.mage.__('Sorry, something went wrong. Please try again later.')
                    });
                }
            });
        };
    }
);
