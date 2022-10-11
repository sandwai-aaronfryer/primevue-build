'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var ToastEventBus = _interopDefault(require('primevue/toasteventbus'));
var usetoast = require('primevue/usetoast');

var ToastService = {
    install: (app) => {
        const ToastService = {
            add: (message) => {
                ToastEventBus.emit('add', message);
            },
            removeGroup: (group) => {
                ToastEventBus.emit('remove-group', group);
            },
            removeAllGroups: () => {
                ToastEventBus.emit('remove-all-groups');
            }
        };
        app.config.globalProperties.$toast = ToastService;
        app.provide(usetoast.PrimeVueToastSymbol, ToastService);
    }
};

module.exports = ToastService;
