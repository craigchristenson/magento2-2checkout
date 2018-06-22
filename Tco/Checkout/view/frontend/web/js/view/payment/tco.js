define(
    [
        'uiComponent',
        'Magento_Checkout/js/model/payment/renderer-list'
    ],
    function (
        Component,
        rendererList
    ) {
        'use strict';
        rendererList.push(
            {
                type: 'tco_checkout',
                component: 'Tco_Checkout/js/view/payment/method-renderer/tco-checkout'
            },
            {
                type: 'tco_api',
                component: 'Tco_Checkout/js/view/payment/method-renderer/tco-api'
            },
            {
                type: 'tco_paypal',
                component: 'Tco_Checkout/js/view/payment/method-renderer/tco-paypal'
            }
        );
        return Component.extend({});
    }
 );