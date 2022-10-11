'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var vue = require('vue');
var usedialog = require('primevue/usedialog');
var DynamicDialogEventBus = _interopDefault(require('primevue/dynamicdialogeventbus'));

var DialogService = {
    install: (app) => {
        const DialogService = {
            open: (content, options) => {
                const instance = {
                    content: content && vue.markRaw(content),
                    options: options || {},
                    data: options && options.data,
                    close: (params) => {
                        DynamicDialogEventBus.emit('close', { instance, params });
                    }
                };

                DynamicDialogEventBus.emit('open', { instance });

                return instance;
            }
        };

        app.config.unwrapInjectedRef = true; // Remove it after Vue 3.3. Details: https://vuejs.org/guide/components/provide-inject.html#working-with-reactivity
        app.config.globalProperties.$dialog = DialogService;
        app.provide(usedialog.PrimeVueDialogSymbol, DialogService);
    }
};

module.exports = DialogService;
