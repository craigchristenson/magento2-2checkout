define(
    [
        'jquery',
        'Magento_Checkout/js/view/payment/default',
        'Tco_Checkout/js/action/set-payment-method',
        'Magento_Checkout/js/action/select-payment-method',
        'Magento_Checkout/js/model/payment/additional-validators'
    ],
    function ($, Component, setPaymentMethodAction, selectPaymentMethodAction, additionalValidators) {
        'use strict';
        return Component.extend({
            defaults: {
                template: 'Tco_Checkout/payment/tco'
            },

            continueTo2Checkout: function () {
                if (this.validate() && additionalValidators.validate()) {
                    this.selectPaymentMethod();
                    setPaymentMethodAction();
                    return false;
                }
            }
        });
    }
);