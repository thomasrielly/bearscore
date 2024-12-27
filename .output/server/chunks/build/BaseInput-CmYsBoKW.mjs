import { u as useNuiDefaultProperty, d as __nuxt_component_0, _ as __nuxt_component_2 } from './server.mjs';
import { _ as _sfc_main$1 } from './BaseInputHelpText-DNMtrE4A.mjs';
import { defineComponent, mergeModels, useModel, ref, computed, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { u as useNinjaId } from './input-id-DYCO6xqi.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrRenderSlot, ssrInterpolate, ssrGetDynamicModelProps, ssrRenderComponent } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "BaseInput",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    id: { default: void 0 },
    type: { default: "text" },
    label: { default: void 0 },
    labelFloat: { type: Boolean },
    icon: { default: void 0 },
    placeholder: { default: void 0 },
    error: { type: [String, Boolean], default: false },
    colorFocus: { type: Boolean },
    loading: { type: Boolean },
    contrast: { default: void 0 },
    rounded: { default: void 0 },
    size: { default: void 0 },
    classes: { default: () => ({}) }
  }, {
    "modelValue": {},
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose }) {
    const props = __props;
    function looseToNumber(val) {
      const n = Number.parseFloat(val);
      return Number.isNaN(n) ? val : n;
    }
    const [modelValue, modelModifiers] = useModel(__props, "modelValue", {
      set(value) {
        if (modelModifiers.number) {
          return looseToNumber(value);
        } else if (modelModifiers.trim && typeof value === "string") {
          return value.trim();
        }
        return value;
      }
    });
    const contrast = useNuiDefaultProperty(props, "BaseInput", "contrast");
    const rounded = useNuiDefaultProperty(props, "BaseInput", "rounded");
    const size = useNuiDefaultProperty(props, "BaseInput", "size");
    const inputRef = ref();
    const id = useNinjaId(() => props.id);
    const radiuses = {
      none: "",
      sm: "nui-input-rounded-sm",
      md: "nui-input-rounded-md",
      lg: "nui-input-rounded-lg",
      full: "nui-input-rounded-full"
    };
    const sizes = {
      sm: "nui-input-sm",
      md: "nui-input-md",
      lg: "nui-input-lg"
    };
    const contrasts = {
      default: "nui-input-default",
      "default-contrast": "nui-input-default-contrast",
      muted: "nui-input-muted",
      "muted-contrast": "nui-input-muted-contrast"
    };
    __expose({
      /**
       * The underlying HTMLInputElement element.
       */
      el: inputRef,
      /**
       * The internal id of the radio input.
       */
      id
    });
    const placeholder = computed(() => {
      if (props.loading) {
        return;
      }
      if (props.labelFloat) {
        return props.label;
      }
      return props.placeholder;
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      const _component_BasePlaceload = __nuxt_component_0;
      const _component_Icon = __nuxt_component_2;
      const _component_BaseInputHelpText = _sfc_main$1;
      let _temp0, _temp1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["nui-input-wrapper", [
          unref(contrast) && contrasts[unref(contrast)],
          unref(size) && sizes[unref(size)],
          unref(rounded) && radiuses[unref(rounded)],
          props.error && !props.loading && "nui-input-error",
          props.loading && "nui-input-loading",
          props.labelFloat && "nui-input-label-float",
          props.icon && "nui-has-icon",
          props.colorFocus && "nui-input-focus",
          (_a = props.classes) == null ? void 0 : _a.wrapper
        ]]
      }, _attrs))}>`);
      if ("label" in _ctx.$slots && !props.labelFloat || props.label && !props.labelFloat) {
        _push(`<label${ssrRenderAttr("for", unref(id))} class="${ssrRenderClass([(_b = props.classes) == null ? void 0 : _b.label, "nui-input-label"])}">`);
        ssrRenderSlot(_ctx.$slots, "label", {}, () => {
          _push(`${ssrInterpolate(props.label)}`);
        }, _push, _parent);
        _push(`</label>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="${ssrRenderClass([(_c = props.classes) == null ? void 0 : _c.outer, "nui-input-outer"])}"><div>`);
      if (unref(modelModifiers).lazy) {
        _push(`<input${ssrRenderAttrs((_temp0 = mergeProps({
          id: unref(id),
          ref_key: "inputRef",
          ref: inputRef,
          type: props.type
        }, _ctx.$attrs, {
          class: ["nui-input", (_d = props.classes) == null ? void 0 : _d.input],
          placeholder: unref(placeholder)
        }), mergeProps(_temp0, ssrGetDynamicModelProps(_temp0, unref(modelValue)))))}>`);
      } else {
        _push(`<input${ssrRenderAttrs((_temp1 = mergeProps({
          id: unref(id),
          ref_key: "inputRef",
          ref: inputRef,
          type: props.type
        }, _ctx.$attrs, {
          class: ["nui-input", (_e = props.classes) == null ? void 0 : _e.input],
          placeholder: unref(placeholder)
        }), mergeProps(_temp1, ssrGetDynamicModelProps(_temp1, unref(modelValue)))))}>`);
      }
      if ("label" in _ctx.$slots && props.labelFloat || props.label && props.labelFloat) {
        _push(`<label${ssrRenderAttr("for", unref(id))} class="${ssrRenderClass([(_f = props.classes) == null ? void 0 : _f.label, "nui-label-float"])}">`);
        ssrRenderSlot(_ctx.$slots, "label", {}, () => {
          _push(`${ssrInterpolate(props.label)}`);
        }, _push, _parent);
        _push(`</label>`);
      } else {
        _push(`<!---->`);
      }
      if (props.loading) {
        _push(`<div class="nui-input-placeload">`);
        _push(ssrRenderComponent(_component_BasePlaceload, { class: "nui-placeload" }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (props.icon) {
        _push(`<div class="${ssrRenderClass([(_g = props.classes) == null ? void 0 : _g.icon, "nui-input-icon"])}">`);
        ssrRenderSlot(_ctx.$slots, "icon", {}, () => {
          _push(ssrRenderComponent(_component_Icon, {
            name: props.icon,
            class: "nui-input-icon-inner"
          }, null, _parent));
        }, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "action", {}, null, _push, _parent);
      _push(`</div>`);
      if (props.error && typeof props.error === "string") {
        _push(ssrRenderComponent(_component_BaseInputHelpText, {
          color: "danger",
          class: (_h = props.classes) == null ? void 0 : _h.error
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(props.error)}`);
            } else {
              return [
                createTextVNode(toDisplayString(props.error), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@shuriken-ui+nuxt@3.1.5_nuxt@3.11.2_vue@3.4.21/node_modules/@shuriken-ui/nuxt/components/form/BaseInput.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=BaseInput-CmYsBoKW.mjs.map
