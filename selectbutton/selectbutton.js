this.primevue = this.primevue || {};
this.primevue.selectbutton = (function (utils, Ripple, vue) {
    'use strict';

    Ripple = Ripple && Ripple.hasOwnProperty('default') ? Ripple['default'] : Ripple;

    var script = {
        name: 'SelectButton',
        emits: ['update:modelValue', 'focus', 'blur', 'change'],
        props: {
            modelValue: null,
            options: Array,
            optionLabel: null,
            optionValue: null,
            optionDisabled: null,
    		multiple: Boolean,
            disabled: Boolean,
            dataKey: null,
            ariaLabelledBy: null
        },
        methods: {
            getOptionLabel(option) {
                return this.optionLabel ? utils.ObjectUtils.resolveFieldData(option, this.optionLabel) : option;
            },
            getOptionValue(option) {
                return this.optionValue ? utils.ObjectUtils.resolveFieldData(option, this.optionValue) : option;
            },
            getOptionRenderKey(option) {
                return this.dataKey ? utils.ObjectUtils.resolveFieldData(option, this.dataKey) : this.getOptionLabel(option);
            },
            isOptionDisabled(option) {
                return this.optionDisabled ? utils.ObjectUtils.resolveFieldData(option, this.optionDisabled) : false;
            },
            onOptionSelect(event, option) {
                if (this.disabled || this.isOptionDisabled(option)) {
                    return;
                }

                let selected = this.isSelected(option);
                let optionValue = this.getOptionValue(option);
                let newValue;

                if(this.multiple) {
                    if (selected)
                        newValue = this.modelValue.filter(val => !utils.ObjectUtils.equals(val, optionValue, this.equalityKey));
                    else
                        newValue = this.modelValue ? [...this.modelValue, optionValue]: [optionValue];
                }
                else {
                    newValue = optionValue;
                }

                this.$emit('update:modelValue', newValue);
                this.$emit('change', {event: event, value: newValue});
            },
            isSelected(option) {
                let selected = false;
                let optionValue = this.getOptionValue(option);

                if (this.multiple) {
                    if (this.modelValue) {
                        for (let val of this.modelValue) {
                            if (utils.ObjectUtils.equals(val, optionValue, this.equalityKey)) {
                                selected = true;
                                break;
                            }
                        }
                    }
                }
                else {
                    selected = utils.ObjectUtils.equals(this.modelValue, optionValue, this.equalityKey);
                }

                return selected;
            },
            onFocus(event) {
                this.$emit('focus', event);
            },
            onBlur(event) {
                this.$emit('blur', event);
            },
            getButtonClass(option) {
                return ['p-button p-component', {
                    'p-highlight': this.isSelected(option),
                    'p-disabled': this.isOptionDisabled(option)
                }];
            }
        },
    	computed: {
            containerClass() {
                return ['p-selectbutton p-buttonset p-component', {
                    'p-disabled': this.disabled
                }];
            },
            equalityKey() {
                return this.optionValue ? null : this.dataKey;
            }
        },
        directives: {
            'ripple': Ripple
        }
    };

    const _hoisted_1 = ["aria-label", "aria-pressed", "onClick", "onKeydown", "tabindex", "aria-labelledby"];
    const _hoisted_2 = { class: "p-button-label" };

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      const _directive_ripple = vue.resolveDirective("ripple");

      return (vue.openBlock(), vue.createElementBlock("div", {
        class: vue.normalizeClass($options.containerClass),
        role: "group"
      }, [
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.options, (option, i) => {
          return vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
            key: $options.getOptionRenderKey(option),
            "aria-label": $options.getOptionLabel(option),
            role: "button",
            "aria-pressed": $options.isSelected(option),
            onClick: $event => ($options.onOptionSelect($event, option, i)),
            onKeydown: [
              vue.withKeys(vue.withModifiers($event => ($options.onOptionSelect($event, option, i)), ["prevent"]), ["enter"]),
              vue.withKeys(vue.withModifiers($event => ($options.onOptionSelect($event, option)), ["prevent"]), ["space"])
            ],
            tabindex: $options.isOptionDisabled(option) ? null : '0',
            onFocus: _cache[0] || (_cache[0] = $event => ($options.onFocus($event))),
            onBlur: _cache[1] || (_cache[1] = $event => ($options.onBlur($event))),
            "aria-labelledby": $props.ariaLabelledBy,
            class: vue.normalizeClass($options.getButtonClass(option))
          }, [
            vue.renderSlot(_ctx.$slots, "option", {
              option: option,
              index: i
            }, () => [
              vue.createElementVNode("span", _hoisted_2, vue.toDisplayString($options.getOptionLabel(option)), 1)
            ])
          ], 42, _hoisted_1)), [
            [_directive_ripple]
          ])
        }), 128))
      ], 2))
    }

    script.render = render;

    return script;

}(primevue.utils, primevue.ripple, Vue));
