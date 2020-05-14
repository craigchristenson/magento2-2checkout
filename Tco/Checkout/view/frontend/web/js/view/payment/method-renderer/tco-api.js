define(
    [
        'Magento_Checkout/js/model/quote',
        'jquery',
        'Magento_Payment/js/view/payment/cc-form',
        'Magento_Checkout/js/action/set-billing-address',
        'mage/translate',
        'payJsExternal',
        'Magento_Checkout/js/model/full-screen-loader',
        'domReady!' // awaits for DOM to be loaded
    ], function (quote, $, Component, setBillingAddressAction, $t, payJsExternal, fullScreenLoader) {
        'use strict';

        const sellerId = window.checkoutConfig.payment.tco_api.sellerId;
        let jsPaymentClient = new payJsExternal,
            language = window.navigator.languages ? window.navigator.languages[1] : 'en',
            tco_component;
        jsPaymentClient.setup.setMerchant(sellerId);
        jsPaymentClient.setup.setLanguage(language);
        tco_component = jsPaymentClient.components.create('card');
        setTimeout(function () {
            tco_component.mount('#card-element-tco');
            $('#two-co-iframe').css('min-height', '200px');
        }, 300);

        return Component.extend({
            defaults: {
                template: 'Tco_Checkout/payment/cc-form'
            },
            getCode: function () {
                return 'tco_api';
            },
            isActive: function () {
                return true;
            },
            placeOrder: function (data, event) {
                event.preventDefault();
                fullScreenLoader.startLoader();
                let billingDetails = {name: document.querySelector('#name').value},
                    settings = window.checkoutConfig.payment.tco_api,
                    msg = document.getElementById('validation-message');

                if (!billingDetails.name.length) {
                    msg.style.display = 'block';
                    return false;
                } else {
                    msg.style.display = 'none';
                    this.selectPaymentMethod();
                    let setBillingInfo = setBillingAddressAction();
                    setBillingInfo.done(function () {
                        jsPaymentClient.tokens.generate(tco_component, billingDetails).then((response) => {
                            if (response.token) {
                                let url = settings.placeOrder;
                                $.ajax({
                                    url: url,
                                    type: 'post',
                                    context: this,
                                    data: {isAjax: 1, token: response.token, email: quote.guestEmail},
                                    dataType: 'json',
                                    success: function (response, data) {
                                        window.location.replace(response.redirect);
                                    },
                                    error: function (response, data) {
                                        console.error(response.responseJSON, data);
                                        if (!response.responseJSON.status && response.responseJSON.message) {
                                            alert(response.responseJSON.message);
                                        } else {
                                            alert(settings.processingError);
                                        }
                                    },
                                    complete: function (response) {
                                        fullScreenLoader.stopLoader();
                                    }
                                });

                            } else {
                                alert(settings.processingError);
                                fullScreenLoader.stopLoader();
                                console.error('Token response is NULL');
                            }
                        }).catch((error) => {
                            console.error(error);
                            alert('An error has occurred, please try again later!');
                            fullScreenLoader.stopLoader();
                        });
                    });
                    return false;
                }
            },
            isShowLegend: function () {
                return true;
            }
        });
    });
