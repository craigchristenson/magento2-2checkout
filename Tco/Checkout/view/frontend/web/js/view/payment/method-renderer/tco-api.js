define(
    [
        'underscore',
        'jquery',
        'Magento_Payment/js/view/payment/cc-form',
        'Magento_Checkout/js/action/set-billing-address',
        'Tco_Checkout/js/action/place-order',
        'mage/translate',
        'Magento_Checkout/js/model/payment/additional-validators',
        'Magento_Customer/js/model/customer',
        'tco/token'
    ],
    function (_, $, Component, setBillingAddressAction, placeOrderAction, $t, additionalValidators, customer) {

        'use strict';

        return Component.extend({
            defaults: {
                template: 'Tco_Checkout/payment/cc-form',
                paymentToken: '',
                setStoreCc: false
            },
            initObservable: function () {
                this._super()
                    .observe([
                        'creditCardType',
                        'creditCardExpYear',
                        'creditCardExpMonth',
                        'creditCardNumber',
                        'creditCardVerificationNumber',
                        'selectedCardType'
                    ]);
                return this;
            },
            setPlaceOrderHandler: function(handler) {
                this.placeOrderHandler = handler;
            },
            setValidateHandler: function(handler) {
                this.validateHandler = handler;
            },
            getCode: function() {
                return 'tco_api';
            },
            getData: function() {
                return {
                    'method': this.item.method,
                    additional_data: {
                        'cc_type': this.creditCardType(),
                        'token': this.paymentToken
                    }
                };
            },
            isActive: function() {
                return true;
            },
            /**
             * @override
             */
            placeOrder: function(data, event) {
                var self = this;

                if (event) {
                    event.preventDefault();
                }

                var sellerId = this.getSellerId();
                var publishableKey = this.getPublishableKey();
                var publicKeyType = this.getPublicKeyType();

                if (this.validate() && additionalValidators.validate()) {
                    this.isPlaceOrderActionAllowed(false);

                    var setBillingInfo = setBillingAddressAction();
                    setBillingInfo.done(function() {

                        var args = {
                            sellerId: sellerId,
                            publishableKey: publishableKey,
                            ccNo: self.creditCardNumber(),
                            cvv: self.creditCardVerificationNumber(),
                            expMonth: self.creditCardExpMonth(),
                            expYear: self.creditCardExpYear()
                        };

                        TCO.loadPubKey(publicKeyType, function() {
                            TCO.requestToken(function(data) {

                                self.paymentToken = data.response.token.token;

                                var placeOrder = placeOrderAction(self.getData(), true);

                                $.when(placeOrder).fail(function(response) {
                                    self.isPlaceOrderActionAllowed(true);
                                });
                            }, function(data){
                                return false;
                            }, args);
                        });

                    });

                    return true;
                }
                return false;
            },
            getControllerName: function() {
                return window.checkoutConfig.payment.iframe.controllerName[this.getCode()];
            },
            getPlaceOrderUrl: function() {
                return window.checkoutConfig.payment.iframe.placeOrderUrl[this.getCode()];
            },
            context: function() {
                return this;
            },
            getSellerId: function() {
                return window.checkoutConfig.payment.tco_api.sellerId;
            },
            getPublishableKey: function() {
                return window.checkoutConfig.payment.tco_api.publishableKey;
            },
            getPublicKeyType: function() {
                return window.checkoutConfig.payment.tco_api.publicKeyType;
            },
            isShowLegend: function() {
                return true;
            },
            validate: function () {
                var form = 'form[data-role=tco-cc-form]';
                var validate =  $(form).validation() && $(form).validation('isValid');
                var cardNumber = Boolean($(form + ' #tco_api_cc_number').valid());
                var expirationMonth = Boolean($(form + ' #tco_api_expiration').valid());
                var expirationYear = Boolean($(form + ' #tco_api_expiration_yr').valid());
                var cvv = Boolean($(form + ' #tco_api_cc_cid').valid());

                if (!validate || !cardNumber || !expirationMonth || !expirationYear || !cvv) {
                    return false;
                }

                return true;
            }
        });
    }
);