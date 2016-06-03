define([
    'jquery',
    'Magento_Checkout/js/model/full-screen-loader',
    'domReady'
], function ($, fullScreenLoader) {
    'use strict';

    var inline_2Checkout = {}; // not used yet - put a few methods on here for the seller to use?
    (function(document){
        // Most browsers have a srcdoc property you can fill with HTML
        // Others require you give them an ugly javascript: "url"
        var setIframeSrcDoc = (("srcdoc" in document.createElement("iframe")) ?
                function(frame, doc){ frame.setAttribute("srcdoc", doc) } :
                function(frame, doc){ frame.setAttribute("src", "javascript: '"+doc.replace(/([\\'])/g, "\\$1")+"'") }
        );

        // Since we have no idea what JavaScript libraries the page has set up, we need to
        // provide our own "onready" functionality. This hooks the `readystatechange`,
        // `DOMContentLoaded`, and `load` events, as well as setting a timer to check every
        // so often if the other methods don't look like they are supported.
        //
        // NOTE: the outer function returns the function that actually gets assigned to the
        // `onready` variable. This is for scope reasons. Functions that are declared
        // inside the inner function (`run_when_ready`, `state_change_handler`) are done so
        // because they need to be technically different functions in order to remove them
        // appropriately if onready is called more than once (see the `remove_event` calls
        // in `run_when_ready`).
        var onready = (function(){
            var ready_already = false;
            var fallback_timer = false;
            var eventManager = (document.addEventListener ?
                    (function(n, h, r){document[(r?'remove':'add')+'EventListener'](n, h, false);}) :
                    (function(n, h, r){document[(r?'de':'at')+'tachEvent']('on'+n, h);})
            );
            var add_event    = function(name, handler) { eventManager(name, handler) };
            var remove_event = function(name, handler) { eventManager(name, handler, true) };

            var check_ready = function() {
                var ready = (document.readyState === 'complete') || (document.readyState === 'interactive');
                if (! ready && ! document.addEventListener && document.body) {
                    try {
                        document.createElement('div').doScroll('left');
                        ready = true;
                    } catch(e) {}
                }
                return ready;
            };

            return function(fn) {
                ready_already = ready_already || check_ready();

                var run_when_ready = function() {
                    ready_already = true;
                    remove_event('readystatechange', state_change_handler);
                    remove_event('DOMContentLoaded', run_when_ready);
                    remove_event('load', run_when_ready);
                    fallback_timer && window.clearInterval(fallback_timer);
                    fn();
                };

                var state_change_handler = function() { check_ready() && run_when_ready(); };

                if (ready_already) {
                    fn();
                } else {
                    add_event('readystatechange', state_change_handler);
                    add_event('DOMContentLoaded', run_when_ready);
                    add_event('load', run_when_ready);
                    if (! document.addEventListener) {
                        fallback_timer = window.setInterval(state_change_handler, 10);
                    }
                }

            };
        })();

        // make elements by passing in a tag name and an object full of properties
        // that you want to set.
        // Special cases for `atts`:
        //   * the "class" HTML attribute is set via the "className" property
        //     because "class" is a reserved word
        //   * if you pass a "text" attribute it will instead create a text node
        //     inside the new element.
        //     Example:
        //       makeElement('p',{text:'This is a paragraph.',className:'example'});
        var makeElement = function(tag, atts) {
            var new_element = document.createElement(tag);
            for (var a in atts) {
                if (atts.hasOwnProperty(a)) {
                    if (a === 'text') {
                        // We have to define the type before appending due to IE 8 restrictions.
                        new_element.type = 'text/css';
                        if (new_element.styleSheet){
                            new_element.styleSheet.cssText = atts[a];
                        } else {
                            new_element.appendChild(document.createTextNode(atts[a]));
                        }
                    } else {
                        new_element[a] = atts[a];
                        new_element.setAttribute(a, atts[a]);
                    }
                }
            }
            return new_element;
        };

        // inserts a style element into the head
        // Note: JavaScript does not have a good multi-line string
        // literal syntax. These backslashes at the end of lines are
        // the best we can do - maybe just one-line this or have some
        // string concatenations.
        // The backslashes at the end of lines WILL BE BROKEN BY
        // ANY WHITESPACE AFTER THEM.
        var loadStyles = function(){
            // CSS
            var stylesheet = makeElement('style', { text: "\
      #tco_lightbox {\
        display: none;\
        position: fixed;\
        top: 0;\
        bottom: 0;\
        left: 0;\
        right: 0;\
        z-index: 9999\
      }\
      #tco_lightbox_iframe {\
        width:100%;\
        height:100%;\
        border:none;\
        visibility: hidden;\
      }\
    " });
            var head = document.getElementsByTagName('head')[0];
            head.insertBefore(stylesheet, head.firstChild);
        };
        loadStyles();

        onready(function(){
            var body = document.getElementsByTagName('body')[0];

            var lightbox_container = makeElement('div', {
                className: 'tco_lightbox',
                id: 'tco_lightbox'
            });
            var hideLightbox = (function(){
                lightbox_container.style.display = 'none';
                setIframeSrcDoc(lightbox_iframe, '<html><head><style>html { background-color: transparent; }</style></head><body></body></html>');
            });

            var lightbox_iframe = makeElement('iframe', {
                className: 'tco_lightbox_iframe',
                name: 'tco_lightbox_iframe',
                id: 'tco_lightbox_iframe',
                frameborder: '0',
                allowtransparency: 'true',
                onload: "this.style.visibility = 'visible';"
            });

            lightbox_container.appendChild(lightbox_iframe);

            if(body !== null){ body.appendChild(lightbox_container); }
            hideLightbox();

            var checkOrigin = function (origin) {
                var domain = /^https:\/\/[a-zA-Z0-9\.]*\.2checkout\.com\/?$/;
                if ( origin.match(domain) ) { return true; }
            };

            //add close/refresh button event listener
            if (window.addEventListener){
                window.addEventListener('message', function(ev) {
                    if ( !checkOrigin(ev.origin) ) { return; }
                    if (ev.data === 'close') {
                        if (typeof fullScreenLoader !== 'undefined') {
                            fullScreenLoader.stopLoader();
                        }
                        hideLightbox();
                    } else {
                        hideLightbox();
                        window.location.href = ev.data;
                    }
                }, false);
            } else if (window.attachEvent){
                window.attachEvent('onmessage', function(ev) {
                    if ( !checkOrigin(ev.origin) ) { return; }
                    if (ev.data === 'close') {
                        if (typeof fullScreenLoader !== 'undefined') {
                            fullScreenLoader.stopLoader();
                        }
                        hideLightbox();
                    } else {
                        hideLightbox();
                        window.location.href = ev.data;
                    }
                });
            }

        });

    })(document);

});