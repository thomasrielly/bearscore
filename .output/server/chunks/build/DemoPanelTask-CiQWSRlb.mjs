import { h as usePanels, u as useNuiDefaultProperty, j as useNinjaButton, _ as __nuxt_component_2, a as _sfc_main$b, d as __nuxt_component_0$1, c as _export_sfc } from './server.mjs';
import { _ as _sfc_main$6 } from './BaseButtonIcon-4hIYqjHe.mjs';
import { _ as _sfc_main$7 } from './BaseTag--Kgv_21F.mjs';
import { _ as _sfc_main$8 } from './BaseParagraph-BooaUBVB.mjs';
import { _ as _sfc_main$9 } from './BaseAvatar-Br9MXJI3.mjs';
import { _ as _sfc_main$a } from './BaseText-Bvoloqme.mjs';
import { _ as _sfc_main$c } from './BaseProgress-CWqy7H6p.mjs';
import { useSSRContext, defineComponent, ref, mergeProps, unref, withCtx, createVNode, toDisplayString, createTextVNode, isRef, toValue, openBlock, createBlock, Fragment, renderList, mergeModels, useModel, watchEffect, watch, nextTick, computed, resolveDynamicComponent, renderSlot } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrLooseEqual, ssrGetDynamicModelProps, ssrRenderSlot, ssrRenderVNode } from 'vue/server-renderer';
import { _ as _sfc_main$d } from './BaseInputHelpText-DNMtrE4A.mjs';
import { u as useNinjaId } from './input-id-DYCO6xqi.mjs';
import { o as onKeyStroke } from './index-BCPoQdcH.mjs';
import { FocusTrap } from '@headlessui/vue';
import '../routes/api/fetchData.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'consola/core';
import 'mongoose';
import 'node:fs';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import '@iconify/vue/dist/offline';
import '@iconify/vue';

const _sfc_main$5 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    "aria-hidden": "true",
    viewBox: "0 0 17 12"
  }, _attrs))}><path fill="currentColor" d="M16.576.414a1.386 1.386 0 0 1 0 1.996l-9.404 9.176A1.461 1.461 0 0 1 6.149 12c-.37 0-.74-.139-1.023-.414L.424 6.998a1.386 1.386 0 0 1 0-1.996 1.47 1.47 0 0 1 2.046 0l3.68 3.59L14.53.414a1.47 1.47 0 0 1 2.046 0z"></path></svg>`);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@shuriken-ui+nuxt@3.1.5_nuxt@3.11.2_vue@3.4.21/node_modules/@shuriken-ui/nuxt/components/icon/IconCheck.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main$4 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    "aria-hidden": "true",
    viewBox: "0 0 24 24"
  }, _attrs))}><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M2 12h20"></path></svg>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@shuriken-ui+nuxt@3.1.5_nuxt@3.11.2_vue@3.4.21/node_modules/@shuriken-ui/nuxt/components/icon/IconIndeterminate.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "BaseCheckbox",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    value: { default: void 0 },
    trueValue: { default: true },
    falseValue: { default: false },
    id: { default: void 0 },
    label: { default: void 0 },
    error: { type: [String, Boolean], default: "" },
    disabled: { type: Boolean },
    indeterminate: { type: Boolean },
    color: { default: void 0 },
    rounded: { default: void 0 },
    classes: { default: () => ({}) }
  }, {
    "modelValue": {},
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose }) {
    const props = __props;
    const [modelValue] = useModel(__props, "modelValue");
    const color = useNuiDefaultProperty(props, "BaseCheckbox", "color");
    const rounded = useNuiDefaultProperty(props, "BaseCheckbox", "rounded");
    const inputRef = ref();
    const id = useNinjaId(() => props.id);
    const radiuses = {
      none: "",
      sm: "nui-checkbox-rounded-sm",
      md: "nui-checkbox-rounded-md",
      lg: "nui-checkbox-rounded-lg",
      full: "nui-checkbox-rounded-full"
    };
    const colors = {
      default: "nui-checkbox-default",
      muted: "nui-checkbox-muted",
      light: "nui-checkbox-light",
      dark: "nui-checkbox-dark",
      black: "nui-checkbox-black",
      primary: "nui-checkbox-primary",
      info: "nui-checkbox-info",
      success: "nui-checkbox-success",
      warning: "nui-checkbox-warning",
      danger: "nui-checkbox-danger"
    };
    watchEffect(() => {
      var _a;
      if (inputRef.value) {
        inputRef.value.indeterminate = (_a = props.indeterminate) != null ? _a : false;
      }
    });
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
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      const _component_IconCheck = __nuxt_component_0;
      const _component_IconIndeterminate = __nuxt_component_1;
      const _component_BaseInputHelpText = _sfc_main$d;
      let _temp0;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["nui-checkbox", [
          props.disabled && "opacity-50",
          unref(rounded) && radiuses[unref(rounded)],
          unref(color) && colors[unref(color)],
          (_a = props.classes) == null ? void 0 : _a.wrapper
        ]]
      }, _attrs))}><div class="nui-checkbox-outer"><input${ssrRenderAttrs((_temp0 = mergeProps({
        id: unref(id),
        ref_key: "inputRef",
        ref: inputRef,
        checked: ssrLooseEqual(unref(modelValue), props.trueValue),
        value: props.value,
        "true-value": props.trueValue,
        "false-value": props.falseValue,
        class: (_b = props.classes) == null ? void 0 : _b.input,
        disabled: props.disabled
      }, _ctx.$attrs, {
        class: "nui-checkbox-input",
        type: "checkbox"
      }), mergeProps(_temp0, ssrGetDynamicModelProps(_temp0, unref(modelValue)))))}><div class="nui-checkbox-inner"></div>`);
      _push(ssrRenderComponent(_component_IconCheck, { class: "nui-icon-check" }, null, _parent));
      _push(ssrRenderComponent(_component_IconIndeterminate, { class: "nui-icon-indeterminate" }, null, _parent));
      _push(`</div><div class="nui-checkbox-label-wrapper">`);
      if (props.label || "default" in _ctx.$slots) {
        _push(`<label${ssrRenderAttr("for", unref(id))} class="${ssrRenderClass([(_c = props.classes) == null ? void 0 : _c.label, "nui-checkbox-label-text"])}">`);
        ssrRenderSlot(_ctx.$slots, "default", {}, () => {
          _push(`${ssrInterpolate(props.label)}`);
        }, _push, _parent);
        _push(`</label>`);
      } else {
        _push(`<!---->`);
      }
      if (props.error && typeof props.error === "string") {
        _push(`<div class="nui-checkbox-error">`);
        _push(ssrRenderComponent(_component_BaseInputHelpText, { color: "danger" }, {
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
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@shuriken-ui+nuxt@3.1.5_nuxt@3.11.2_vue@3.4.21/node_modules/@shuriken-ui/nuxt/components/form/BaseCheckbox.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "BaseTextarea",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    id: { default: void 0 },
    name: { default: void 0 },
    label: { default: void 0 },
    labelFloat: { type: Boolean },
    placeholder: { default: "" },
    colorFocus: { type: Boolean },
    loading: { type: Boolean },
    disabled: { type: Boolean },
    readonly: { type: Boolean },
    error: { type: [String, Boolean], default: false },
    addon: { type: Boolean },
    rows: { default: 4 },
    resize: { type: Boolean },
    autogrow: { type: Boolean },
    maxHeight: { default: void 0 },
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
    const [modelValue, modelModifiers] = useModel(__props, "modelValue", {
      set(value) {
        if (modelModifiers.trim && typeof value === "string") {
          return value.trim();
        }
        return value;
      }
    });
    const contrast = useNuiDefaultProperty(props, "BaseTextarea", "contrast");
    const rounded = useNuiDefaultProperty(props, "BaseTextarea", "rounded");
    const size = useNuiDefaultProperty(props, "BaseTextarea", "size");
    const textareaRef = ref();
    const id = useNinjaId(() => props.id);
    const radiuses = {
      none: "",
      sm: "nui-textarea-rounded-sm",
      md: "nui-textarea-rounded-md",
      lg: "nui-textarea-rounded-lg",
      full: "nui-textarea-rounded-lg"
    };
    const sizes = {
      sm: "nui-textarea-sm",
      md: "nui-textarea-md",
      lg: "nui-textarea-lg"
    };
    const contrasts = {
      default: "nui-textarea-default",
      "default-contrast": "nui-textarea-default-contrast",
      muted: "nui-textarea-muted",
      "muted-contrast": "nui-textarea-muted-contrast"
    };
    function fitSize() {
      var _a;
      if (!textareaRef.value) {
        return;
      }
      if (props.autogrow) {
        textareaRef.value.style.height = "auto";
        textareaRef.value.style.height = Math.min(
          (_a = props.maxHeight) != null ? _a : Number.POSITIVE_INFINITY,
          1 + textareaRef.value.scrollHeight
        ) + "px";
      }
    }
    watch(
      [() => props.autogrow, () => props.maxHeight, textareaRef, modelValue],
      async () => {
        await nextTick();
        fitSize();
      },
      {
        immediate: true
      }
    );
    __expose({
      /**
       * The underlying HTMLTextAreaElement element.
       */
      el: textareaRef,
      /**
       * The internal id of the radio input.
       */
      id,
      /**
       * A method to resize the textarea to fit its content.
       */
      fitSize
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g;
      const _component_BasePlaceload = __nuxt_component_0$1;
      const _component_BaseInputHelpText = _sfc_main$d;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["nui-textarea-wrapper", [
          unref(contrast) && contrasts[unref(contrast)],
          unref(size) && sizes[unref(size)],
          unref(rounded) && radiuses[unref(rounded)],
          props.error && !props.loading && "nui-textarea-error",
          props.loading && "nui-textarea-loading",
          props.labelFloat && "nui-textarea-label-float",
          !props.resize && "nui-textarea-not-resize",
          props.addon && "nui-has-addon",
          props.colorFocus && "nui-textarea-focus",
          (_a = props.classes) == null ? void 0 : _a.wrapper
        ]]
      }, _attrs))}>`);
      if (props.label && !props.labelFloat) {
        _push(`<label${ssrRenderAttr("for", unref(id))} class="${ssrRenderClass([(_b = props.classes) == null ? void 0 : _b.label, "nui-textarea-label"])}">${ssrInterpolate(props.label)}</label>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="nui-textarea-outer">`);
      if (unref(modelModifiers).lazy) {
        _push(`<textarea${ssrRenderAttrs(mergeProps({
          id: unref(id),
          ref_key: "textareaRef",
          ref: textareaRef
        }, _ctx.$attrs, {
          class: ["nui-textarea", [(_c = props.classes) == null ? void 0 : _c.textarea]],
          name: props.name,
          placeholder: props.placeholder,
          readonly: props.readonly,
          disabled: props.disabled,
          rows: props.rows
        }), "textarea")}>${ssrInterpolate(unref(modelValue))}</textarea>`);
      } else {
        _push(`<textarea${ssrRenderAttrs(mergeProps({
          id: unref(id),
          ref_key: "textareaRef",
          ref: textareaRef
        }, _ctx.$attrs, {
          class: ["nui-textarea", [
            props.colorFocus && "nui-textarea-focus",
            (_d = props.classes) == null ? void 0 : _d.textarea
          ]],
          name: props.name,
          placeholder: props.placeholder,
          readonly: props.readonly,
          disabled: props.disabled,
          rows: props.rows
        }), "textarea")}>${ssrInterpolate(unref(modelValue))}</textarea>`);
      }
      if (props.label && props.labelFloat) {
        _push(`<label${ssrRenderAttr("for", unref(id))} class="${ssrRenderClass([(_e = props.classes) == null ? void 0 : _e.label, "nui-label-float"])}">`);
        ssrRenderSlot(_ctx.$slots, "label", {}, () => {
          _push(`${ssrInterpolate(props.label)}`);
        }, _push, _parent);
        _push(`</label>`);
      } else {
        _push(`<!---->`);
      }
      if (props.loading) {
        _push(`<div class="nui-textarea-placeload">`);
        _push(ssrRenderComponent(_component_BasePlaceload, { class: "nui-placeload" }, null, _parent));
        _push(ssrRenderComponent(_component_BasePlaceload, { class: "nui-placeload" }, null, _parent));
        _push(ssrRenderComponent(_component_BasePlaceload, { class: "nui-placeload" }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (props.addon) {
        _push(`<div class="${ssrRenderClass([(_f = props.classes) == null ? void 0 : _f.addon, "nui-textarea-addon"])}">`);
        ssrRenderSlot(_ctx.$slots, "addon", {}, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (props.error && typeof props.error === "string") {
        _push(ssrRenderComponent(_component_BaseInputHelpText, {
          color: "danger",
          class: (_g = props.classes) == null ? void 0 : _g.error
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@shuriken-ui+nuxt@3.1.5_nuxt@3.11.2_vue@3.4.21/node_modules/@shuriken-ui/nuxt/components/form/BaseTextarea.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "BaseButtonAction",
  __ssrInlineRender: true,
  props: {
    to: { default: void 0 },
    href: { default: void 0 },
    rel: { default: "" },
    target: { default: "" },
    type: { default: void 0 },
    loading: { type: Boolean },
    disabled: { type: Boolean },
    color: { default: void 0 },
    rounded: { default: void 0 }
  },
  setup(__props) {
    const props = __props;
    const color = useNuiDefaultProperty(props, "BaseButtonAction", "color");
    const rounded = useNuiDefaultProperty(props, "BaseButtonAction", "rounded");
    const radiuses = {
      none: "",
      sm: "nui-button-rounded-sm",
      md: "nui-button-rounded-md",
      lg: "nui-button-rounded-lg",
      full: "nui-button-rounded-full"
    };
    const colors = {
      default: "nui-button-default",
      "default-contrast": "nui-button-default-contrast",
      muted: "nui-button-muted",
      "muted-contrast": "nui-button-muted-contrast",
      light: "nui-button-light",
      dark: "nui-button-dark",
      black: "nui-button-black",
      primary: "nui-button-primary",
      info: "nui-button-info",
      success: "nui-button-success",
      warning: "nui-button-warning",
      danger: "nui-button-danger",
      none: ""
    };
    const classes = computed(() => [
      "nui-button-action",
      props.loading && "nui-button-loading",
      color.value && colors[color.value],
      rounded.value && radiuses[rounded.value]
    ]);
    const { attributes, is } = useNinjaButton(props);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BasePlaceload = __nuxt_component_0$1;
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(is)), mergeProps(unref(attributes), { class: unref(classes) }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!props.loading) {
              ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            } else {
              _push2(ssrRenderComponent(_component_BasePlaceload, { class: "h-3 w-8 rounded" }, null, _parent2, _scopeId));
            }
          } else {
            return [
              !props.loading ? renderSlot(_ctx.$slots, "default", { key: 0 }) : (openBlock(), createBlock(_component_BasePlaceload, {
                key: 1,
                class: "h-3 w-8 rounded"
              }))
            ];
          }
        }),
        _: 3
      }), _parent);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@shuriken-ui+nuxt@3.1.5_nuxt@3.11.2_vue@3.4.21/node_modules/@shuriken-ui/nuxt/components/base/BaseButtonAction.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DemoPanelTask",
  __ssrInlineRender: true,
  props: {
    task: { default: void 0 },
    project: { default: void 0 }
  },
  emits: ["message"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { close } = usePanels();
    onKeyStroke("Escape", close);
    const commentArea = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_2;
      const _component_BaseButtonIcon = _sfc_main$6;
      const _component_BaseTag = _sfc_main$7;
      const _component_BaseHeading = _sfc_main$b;
      const _component_BaseParagraph = _sfc_main$8;
      const _component_BaseAvatar = _sfc_main$9;
      const _component_BaseText = _sfc_main$a;
      const _component_BaseProgress = _sfc_main$c;
      const _component_BaseCheckbox = _sfc_main$3;
      const _component_BaseTextarea = _sfc_main$2;
      const _component_BaseButtonAction = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "border-muted-200 dark:border-muted-700 dark:bg-muted-800 border bg-white" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(FocusTrap), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v;
          if (_push2) {
            _push2(`<div class="flex h-16 w-full items-center justify-between px-10"${_scopeId}><h2 class="font-heading text-muted-700 text-lg font-semibold dark:text-white"${_scopeId}> Task Details </h2><button type="button" class="text-muted-400 nui-focus hover:bg-muted-100 focus:bg-muted-100 hover:text-muted-600 focus:text-muted-600 dark:hover:bg-muted-700 dark:focus:bg-muted-700 flex size-10 items-center justify-center rounded-full transition-colors duration-300 dark:hover:text-white dark:focus:text-white"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "feather:chevron-right",
              class: "size-6"
            }, null, _parent2, _scopeId));
            _push2(`</button></div><div class="nui-slimscroll relative h-[calc(100vh_-_64px)] w-full overflow-y-auto px-10 py-5"${_scopeId}><div${_scopeId}><div class="mb-4 flex items-center justify-between"${_scopeId}><div class="flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_BaseButtonIcon, {
              rounded: "full",
              "data-nui-tooltip": "Edit task",
              "data-nui-tooltip-position": "end",
              size: "sm"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, { name: "lucide:edit-3" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Icon, { name: "lucide:edit-3" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h4 class="text-muted-400 font-sans text-xs font-semibold uppercase"${_scopeId}> Overview </h4></div>`);
            _push2(ssrRenderComponent(_component_BaseTag, {
              rounded: "full",
              variant: "pastel",
              color: "muted",
              class: "m-0 -ms-1 inline-flex h-6 scale-90 items-center gap-1 py-0 text-xs font-semibold"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j2, _k2, _l2, _m2, _n2;
                if (_push3) {
                  _push3(`<span class="${ssrRenderClass([[
                    ((_a2 = props.task) == null ? void 0 : _a2.status) === 0 && "bg-info-500",
                    ((_b2 = props.task) == null ? void 0 : _b2.status) === 1 && "bg-primary-500",
                    ((_c2 = props.task) == null ? void 0 : _c2.status) === 2 && "bg-danger-500",
                    ((_d2 = props.task) == null ? void 0 : _d2.status) === 3 && "bg-warning-500",
                    ((_e2 = props.task) == null ? void 0 : _e2.status) === 4 && "bg-yellow-400",
                    ((_f2 = props.task) == null ? void 0 : _f2.status) === 5 && "bg-success-500"
                  ], "block size-2 rounded-full"])}"${_scopeId2}></span><span${_scopeId2}>Task #${ssrInterpolate((_g2 = props.task) == null ? void 0 : _g2.id)}</span>`);
                } else {
                  return [
                    createVNode("span", {
                      class: ["block size-2 rounded-full", [
                        ((_h2 = props.task) == null ? void 0 : _h2.status) === 0 && "bg-info-500",
                        ((_i2 = props.task) == null ? void 0 : _i2.status) === 1 && "bg-primary-500",
                        ((_j2 = props.task) == null ? void 0 : _j2.status) === 2 && "bg-danger-500",
                        ((_k2 = props.task) == null ? void 0 : _k2.status) === 3 && "bg-warning-500",
                        ((_l2 = props.task) == null ? void 0 : _l2.status) === 4 && "bg-yellow-400",
                        ((_m2 = props.task) == null ? void 0 : _m2.status) === 5 && "bg-success-500"
                      ]]
                    }, null, 2),
                    createVNode("span", null, "Task #" + toDisplayString((_n2 = props.task) == null ? void 0 : _n2.id), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="border-muted-200 dark:border-muted-700 border-b pb-6"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_BaseHeading, {
              as: "h3",
              size: "md",
              weight: "medium",
              class: "mb-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a2, _b2;
                if (_push3) {
                  _push3(`${ssrInterpolate((_a2 = props.task) == null ? void 0 : _a2.name)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString((_b2 = props.task) == null ? void 0 : _b2.name), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_BaseParagraph, {
              size: "xs",
              class: "text-muted-500 dark:text-muted-400"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a2, _b2;
                if (_push3) {
                  _push3(`${ssrInterpolate((_a2 = props.task) == null ? void 0 : _a2.description)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString((_b2 = props.task) == null ? void 0 : _b2.description), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="mt-4 flex items-center justify-between"${_scopeId}><div class="flex shrink-0 items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_BaseAvatar, {
              src: (_a = props.task) == null ? void 0 : _a.assignee.src,
              size: "xs",
              class: "shrink-0"
            }, null, _parent2, _scopeId));
            _push2(`<div${_scopeId}>`);
            _push2(ssrRenderComponent(_component_BaseText, {
              size: "xs",
              class: "text-muted-400",
              lead: "none"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Assigned to `);
                } else {
                  return [
                    createTextVNode(" Assigned to ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_BaseHeading, {
              as: "h4",
              size: "sm",
              weight: "medium"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a2, _b2;
                if (_push3) {
                  _push3(`${ssrInterpolate((_a2 = props.task) == null ? void 0 : _a2.assignee.tooltip)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString((_b2 = props.task) == null ? void 0 : _b2.assignee.tooltip), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="max-w-[120px] grow"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_BaseText, {
              size: "xs",
              class: "text-muted-400 mb-2",
              lead: "none"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a2, _b2;
                if (_push3) {
                  _push3(`${ssrInterpolate((_a2 = props.task) == null ? void 0 : _a2.completion)}% complete `);
                } else {
                  return [
                    createTextVNode(toDisplayString((_b2 = props.task) == null ? void 0 : _b2.completion) + "% complete ", 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_BaseProgress, {
              value: (_b = props.task) == null ? void 0 : _b.completion,
              size: "xs",
              color: ((_c = props.task) == null ? void 0 : _c.status) === 5 ? "success" : "primary"
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div class="border-muted-200 dark:border-muted-700 border-b py-6"${_scopeId}><h4 class="text-muted-400 font-sans text-xs font-semibold uppercase"${_scopeId}> Checklist </h4>`);
            if (((_d = props.task) == null ? void 0 : _d.checklist.length) === 0) {
              _push2(`<div${_scopeId}><div class="text-muted-400 mt-10 flex items-center justify-center"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: "ph:file-thin",
                class: "size-10"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="mb-6 mt-2 text-center"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_BaseHeading, {
                as: "h4",
                size: "md",
                weight: "light",
                class: "mb-1"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span${_scopeId2}>Nothing to show</span>`);
                  } else {
                    return [
                      createVNode("span", null, "Nothing to show")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_BaseParagraph, {
                size: "xs",
                lead: "tight",
                class: "text-muted-500 dark:text-muted-400 mx-auto max-w-[200px] !font-sans"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span${_scopeId2}>There is no checklist to show in here for now.</span>`);
                  } else {
                    return [
                      createVNode("span", null, "There is no checklist to show in here for now.")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              _push2(`<div class="mt-6 space-y-4"${_scopeId}><!--[-->`);
              ssrRenderList((_e = props.task) == null ? void 0 : _e.checklist, (item, index) => {
                _push2(`<div rounded="lg"${_scopeId}><div class="flex w-full items-center gap-2"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_BaseCheckbox, {
                  modelValue: item.done,
                  "onUpdate:modelValue": ($event) => item.done = $event,
                  class: "shrink-0",
                  color: "primary",
                  label: item.text,
                  classes: {
                    wrapper: "!items-start max-w-[240px]",
                    label: "text-[0.85rem] text-muted-500 dark:text-muted-300 leading-snug"
                  }
                }, null, _parent2, _scopeId));
                _push2(`</div></div>`);
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`</div><div class="border-muted-200 dark:border-muted-700 border-b py-6"${_scopeId}><h4 class="text-muted-400 font-sans text-xs font-semibold uppercase"${_scopeId}> Attached Files (${ssrInterpolate((_f = props.task) == null ? void 0 : _f.files.length)}) </h4>`);
            if (((_g = props.task) == null ? void 0 : _g.files.length) === 0) {
              _push2(`<div${_scopeId}><div class="text-muted-400 mt-10 flex items-center justify-center"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: "ph:file-thin",
                class: "size-10"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="mb-6 mt-2 text-center"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_BaseHeading, {
                as: "h4",
                size: "md",
                weight: "light",
                class: "mb-1"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span${_scopeId2}>Nothing to show</span>`);
                  } else {
                    return [
                      createVNode("span", null, "Nothing to show")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_BaseParagraph, {
                size: "xs",
                lead: "tight",
                class: "text-muted-500 dark:text-muted-400 mx-auto max-w-[200px] !font-sans"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span${_scopeId2}>There are no attached files to show in here for now.</span>`);
                  } else {
                    return [
                      createVNode("span", null, "There are no attached files to show in here for now.")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              _push2(`<div class="mt-6 space-y-4"${_scopeId}><!--[-->`);
              ssrRenderList((_h = props.task) == null ? void 0 : _h.files, (file, index) => {
                _push2(`<div rounded="lg"${_scopeId}><div class="flex w-full items-center gap-2"${_scopeId}><img${ssrRenderAttr("src", file.icon)}${ssrRenderAttr("alt", file.name)} class="max-w-[40px]"${_scopeId}><div${_scopeId}>`);
                _push2(ssrRenderComponent(_component_BaseHeading, {
                  tag: "h3",
                  size: "sm",
                  weight: "medium"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(file.name)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(file.name), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_BaseParagraph, {
                  size: "xs",
                  class: "text-muted-400"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<span${_scopeId2}>${ssrInterpolate(file.size)}</span><span class="px-1 text-base leading-tight"${_scopeId2}> \xB7 </span><span${_scopeId2}>v${ssrInterpolate(file.version)}</span>`);
                    } else {
                      return [
                        createVNode("span", null, toDisplayString(file.size), 1),
                        createVNode("span", { class: "px-1 text-base leading-tight" }, " \xB7 "),
                        createVNode("span", null, "v" + toDisplayString(file.version), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div><div class="ms-auto"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_BaseButtonIcon, {
                  rounded: "full",
                  "data-nui-tooltip": "Download file",
                  size: "sm"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_Icon, { name: "lucide:arrow-down" }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_Icon, { name: "lucide:arrow-down" })
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div></div></div>`);
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`</div><div class="py-6"${_scopeId}><h4 class="text-muted-400 font-sans text-xs font-semibold uppercase"${_scopeId}> Comments (${ssrInterpolate((_i = props.task) == null ? void 0 : _i.comments.length)}) </h4>`);
            if (((_j = props.task) == null ? void 0 : _j.comments.length) === 0) {
              _push2(`<div${_scopeId}><div class="text-muted-400 mt-10 flex items-center justify-center"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: "ph:chat-circle-thin",
                class: "size-10"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="mb-6 mt-2 text-center"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_BaseHeading, {
                as: "h4",
                size: "md",
                weight: "light",
                class: "mb-1"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span${_scopeId2}>Nothing to show</span>`);
                  } else {
                    return [
                      createVNode("span", null, "Nothing to show")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_BaseParagraph, {
                size: "xs",
                lead: "tight",
                class: "text-muted-500 dark:text-muted-400 mx-auto max-w-[200px] !font-sans"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span${_scopeId2}>There are no comments to show in here for now.</span>`);
                  } else {
                    return [
                      createVNode("span", null, "There are no comments to show in here for now.")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              _push2(`<div class="mt-6 flex flex-col gap-8"${_scopeId}><!--[-->`);
              ssrRenderList((_k = props.task) == null ? void 0 : _k.comments, (comment, c) => {
                _push2(`<div class="flex gap-3"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_BaseAvatar, {
                  src: comment.author.picture,
                  size: "xs"
                }, null, _parent2, _scopeId));
                _push2(`<div${_scopeId}>`);
                _push2(ssrRenderComponent(_component_BaseHeading, {
                  as: "h3",
                  size: "sm",
                  weight: "medium"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(comment.author.name)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(comment.author.name), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_BaseText, {
                  size: "xs",
                  class: "text-muted-400 mb-2",
                  lead: "none"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` posted ${ssrInterpolate(comment.author.posted)}`);
                    } else {
                      return [
                        createTextVNode(" posted " + toDisplayString(comment.author.posted), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_BaseParagraph, {
                  size: "xs",
                  class: "text-muted-500 dark:text-muted-400"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(comment.text)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(comment.text), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div></div>`);
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_component_BaseTextarea, {
              modelValue: unref(commentArea),
              "onUpdate:modelValue": ($event) => isRef(commentArea) ? commentArea.value = $event : null,
              rounded: "sm",
              placeholder: "Write a comment...",
              rows: 4,
              addon: ""
            }, {
              addon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_BaseAvatar, {
                    src: "/img/avatars/2.svg",
                    class: "me-1",
                    size: "xs"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_BaseHeading, {
                    as: "h4",
                    size: "sm",
                    weight: "semibold",
                    class: "text-muted-800 dark:text-white"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Maya `);
                      } else {
                        return [
                          createTextVNode(" Maya ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div><div class="flex items-center gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_BaseButtonAction, {
                    color: "primary",
                    onClick: ($event) => emits("message", { from: "maya", comment: ("toValue" in _ctx ? _ctx.toValue : unref(toValue))(unref(commentArea)) })
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Publish `);
                      } else {
                        return [
                          createTextVNode(" Publish ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      createVNode(_component_BaseAvatar, {
                        src: "/img/avatars/2.svg",
                        class: "me-1",
                        size: "xs"
                      }),
                      createVNode(_component_BaseHeading, {
                        as: "h4",
                        size: "sm",
                        weight: "semibold",
                        class: "text-muted-800 dark:text-white"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Maya ")
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      createVNode(_component_BaseButtonAction, {
                        color: "primary",
                        onClick: ($event) => emits("message", { from: "maya", comment: ("toValue" in _ctx ? _ctx.toValue : unref(toValue))(unref(commentArea)) })
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Publish ")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-16 w-full items-center justify-between px-10" }, [
                createVNode("h2", { class: "font-heading text-muted-700 text-lg font-semibold dark:text-white" }, " Task Details "),
                createVNode("button", {
                  type: "button",
                  class: "text-muted-400 nui-focus hover:bg-muted-100 focus:bg-muted-100 hover:text-muted-600 focus:text-muted-600 dark:hover:bg-muted-700 dark:focus:bg-muted-700 flex size-10 items-center justify-center rounded-full transition-colors duration-300 dark:hover:text-white dark:focus:text-white",
                  onClick: unref(close)
                }, [
                  createVNode(_component_Icon, {
                    name: "feather:chevron-right",
                    class: "size-6"
                  })
                ], 8, ["onClick"])
              ]),
              createVNode("div", { class: "nui-slimscroll relative h-[calc(100vh_-_64px)] w-full overflow-y-auto px-10 py-5" }, [
                createVNode("div", null, [
                  createVNode("div", { class: "mb-4 flex items-center justify-between" }, [
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      createVNode(_component_BaseButtonIcon, {
                        rounded: "full",
                        "data-nui-tooltip": "Edit task",
                        "data-nui-tooltip-position": "end",
                        size: "sm"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_Icon, { name: "lucide:edit-3" })
                        ]),
                        _: 1
                      }),
                      createVNode("h4", { class: "text-muted-400 font-sans text-xs font-semibold uppercase" }, " Overview ")
                    ]),
                    createVNode(_component_BaseTag, {
                      rounded: "full",
                      variant: "pastel",
                      color: "muted",
                      class: "m-0 -ms-1 inline-flex h-6 scale-90 items-center gap-1 py-0 text-xs font-semibold"
                    }, {
                      default: withCtx(() => {
                        var _a2, _b2, _c2, _d2, _e2, _f2, _g2;
                        return [
                          createVNode("span", {
                            class: ["block size-2 rounded-full", [
                              ((_a2 = props.task) == null ? void 0 : _a2.status) === 0 && "bg-info-500",
                              ((_b2 = props.task) == null ? void 0 : _b2.status) === 1 && "bg-primary-500",
                              ((_c2 = props.task) == null ? void 0 : _c2.status) === 2 && "bg-danger-500",
                              ((_d2 = props.task) == null ? void 0 : _d2.status) === 3 && "bg-warning-500",
                              ((_e2 = props.task) == null ? void 0 : _e2.status) === 4 && "bg-yellow-400",
                              ((_f2 = props.task) == null ? void 0 : _f2.status) === 5 && "bg-success-500"
                            ]]
                          }, null, 2),
                          createVNode("span", null, "Task #" + toDisplayString((_g2 = props.task) == null ? void 0 : _g2.id), 1)
                        ];
                      }),
                      _: 1
                    })
                  ]),
                  createVNode("div", { class: "border-muted-200 dark:border-muted-700 border-b pb-6" }, [
                    createVNode(_component_BaseHeading, {
                      as: "h3",
                      size: "md",
                      weight: "medium",
                      class: "mb-2"
                    }, {
                      default: withCtx(() => {
                        var _a2;
                        return [
                          createTextVNode(toDisplayString((_a2 = props.task) == null ? void 0 : _a2.name), 1)
                        ];
                      }),
                      _: 1
                    }),
                    createVNode(_component_BaseParagraph, {
                      size: "xs",
                      class: "text-muted-500 dark:text-muted-400"
                    }, {
                      default: withCtx(() => {
                        var _a2;
                        return [
                          createTextVNode(toDisplayString((_a2 = props.task) == null ? void 0 : _a2.description), 1)
                        ];
                      }),
                      _: 1
                    }),
                    createVNode("div", { class: "mt-4 flex items-center justify-between" }, [
                      createVNode("div", { class: "flex shrink-0 items-center gap-2" }, [
                        createVNode(_component_BaseAvatar, {
                          src: (_l = props.task) == null ? void 0 : _l.assignee.src,
                          size: "xs",
                          class: "shrink-0"
                        }, null, 8, ["src"]),
                        createVNode("div", null, [
                          createVNode(_component_BaseText, {
                            size: "xs",
                            class: "text-muted-400",
                            lead: "none"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Assigned to ")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_BaseHeading, {
                            as: "h4",
                            size: "sm",
                            weight: "medium"
                          }, {
                            default: withCtx(() => {
                              var _a2;
                              return [
                                createTextVNode(toDisplayString((_a2 = props.task) == null ? void 0 : _a2.assignee.tooltip), 1)
                              ];
                            }),
                            _: 1
                          })
                        ])
                      ]),
                      createVNode("div", { class: "max-w-[120px] grow" }, [
                        createVNode(_component_BaseText, {
                          size: "xs",
                          class: "text-muted-400 mb-2",
                          lead: "none"
                        }, {
                          default: withCtx(() => {
                            var _a2;
                            return [
                              createTextVNode(toDisplayString((_a2 = props.task) == null ? void 0 : _a2.completion) + "% complete ", 1)
                            ];
                          }),
                          _: 1
                        }),
                        createVNode(_component_BaseProgress, {
                          value: (_m = props.task) == null ? void 0 : _m.completion,
                          size: "xs",
                          color: ((_n = props.task) == null ? void 0 : _n.status) === 5 ? "success" : "primary"
                        }, null, 8, ["value", "color"])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "border-muted-200 dark:border-muted-700 border-b py-6" }, [
                    createVNode("h4", { class: "text-muted-400 font-sans text-xs font-semibold uppercase" }, " Checklist "),
                    ((_o = props.task) == null ? void 0 : _o.checklist.length) === 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                      createVNode("div", { class: "text-muted-400 mt-10 flex items-center justify-center" }, [
                        createVNode(_component_Icon, {
                          name: "ph:file-thin",
                          class: "size-10"
                        })
                      ]),
                      createVNode("div", { class: "mb-6 mt-2 text-center" }, [
                        createVNode(_component_BaseHeading, {
                          as: "h4",
                          size: "md",
                          weight: "light",
                          class: "mb-1"
                        }, {
                          default: withCtx(() => [
                            createVNode("span", null, "Nothing to show")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_BaseParagraph, {
                          size: "xs",
                          lead: "tight",
                          class: "text-muted-500 dark:text-muted-400 mx-auto max-w-[200px] !font-sans"
                        }, {
                          default: withCtx(() => [
                            createVNode("span", null, "There is no checklist to show in here for now.")
                          ]),
                          _: 1
                        })
                      ])
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "mt-6 space-y-4"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList((_p = props.task) == null ? void 0 : _p.checklist, (item, index) => {
                        return openBlock(), createBlock("div", {
                          key: index,
                          rounded: "lg"
                        }, [
                          createVNode("div", { class: "flex w-full items-center gap-2" }, [
                            createVNode(_component_BaseCheckbox, {
                              modelValue: item.done,
                              "onUpdate:modelValue": ($event) => item.done = $event,
                              class: "shrink-0",
                              color: "primary",
                              label: item.text,
                              classes: {
                                wrapper: "!items-start max-w-[240px]",
                                label: "text-[0.85rem] text-muted-500 dark:text-muted-300 leading-snug"
                              }
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])
                          ])
                        ]);
                      }), 128))
                    ]))
                  ]),
                  createVNode("div", { class: "border-muted-200 dark:border-muted-700 border-b py-6" }, [
                    createVNode("h4", { class: "text-muted-400 font-sans text-xs font-semibold uppercase" }, " Attached Files (" + toDisplayString((_q = props.task) == null ? void 0 : _q.files.length) + ") ", 1),
                    ((_r = props.task) == null ? void 0 : _r.files.length) === 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                      createVNode("div", { class: "text-muted-400 mt-10 flex items-center justify-center" }, [
                        createVNode(_component_Icon, {
                          name: "ph:file-thin",
                          class: "size-10"
                        })
                      ]),
                      createVNode("div", { class: "mb-6 mt-2 text-center" }, [
                        createVNode(_component_BaseHeading, {
                          as: "h4",
                          size: "md",
                          weight: "light",
                          class: "mb-1"
                        }, {
                          default: withCtx(() => [
                            createVNode("span", null, "Nothing to show")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_BaseParagraph, {
                          size: "xs",
                          lead: "tight",
                          class: "text-muted-500 dark:text-muted-400 mx-auto max-w-[200px] !font-sans"
                        }, {
                          default: withCtx(() => [
                            createVNode("span", null, "There are no attached files to show in here for now.")
                          ]),
                          _: 1
                        })
                      ])
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "mt-6 space-y-4"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList((_s = props.task) == null ? void 0 : _s.files, (file, index) => {
                        return openBlock(), createBlock("div", {
                          key: index,
                          rounded: "lg"
                        }, [
                          createVNode("div", { class: "flex w-full items-center gap-2" }, [
                            createVNode("img", {
                              src: file.icon,
                              alt: file.name,
                              class: "max-w-[40px]"
                            }, null, 8, ["src", "alt"]),
                            createVNode("div", null, [
                              createVNode(_component_BaseHeading, {
                                tag: "h3",
                                size: "sm",
                                weight: "medium"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(file.name), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(_component_BaseParagraph, {
                                size: "xs",
                                class: "text-muted-400"
                              }, {
                                default: withCtx(() => [
                                  createVNode("span", null, toDisplayString(file.size), 1),
                                  createVNode("span", { class: "px-1 text-base leading-tight" }, " \xB7 "),
                                  createVNode("span", null, "v" + toDisplayString(file.version), 1)
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            createVNode("div", { class: "ms-auto" }, [
                              createVNode(_component_BaseButtonIcon, {
                                rounded: "full",
                                "data-nui-tooltip": "Download file",
                                size: "sm"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_Icon, { name: "lucide:arrow-down" })
                                ]),
                                _: 1
                              })
                            ])
                          ])
                        ]);
                      }), 128))
                    ]))
                  ]),
                  createVNode("div", { class: "py-6" }, [
                    createVNode("h4", { class: "text-muted-400 font-sans text-xs font-semibold uppercase" }, " Comments (" + toDisplayString((_t = props.task) == null ? void 0 : _t.comments.length) + ") ", 1),
                    ((_u = props.task) == null ? void 0 : _u.comments.length) === 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                      createVNode("div", { class: "text-muted-400 mt-10 flex items-center justify-center" }, [
                        createVNode(_component_Icon, {
                          name: "ph:chat-circle-thin",
                          class: "size-10"
                        })
                      ]),
                      createVNode("div", { class: "mb-6 mt-2 text-center" }, [
                        createVNode(_component_BaseHeading, {
                          as: "h4",
                          size: "md",
                          weight: "light",
                          class: "mb-1"
                        }, {
                          default: withCtx(() => [
                            createVNode("span", null, "Nothing to show")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_BaseParagraph, {
                          size: "xs",
                          lead: "tight",
                          class: "text-muted-500 dark:text-muted-400 mx-auto max-w-[200px] !font-sans"
                        }, {
                          default: withCtx(() => [
                            createVNode("span", null, "There are no comments to show in here for now.")
                          ]),
                          _: 1
                        })
                      ])
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "mt-6 flex flex-col gap-8"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList((_v = props.task) == null ? void 0 : _v.comments, (comment, c) => {
                        return openBlock(), createBlock("div", {
                          key: c,
                          class: "flex gap-3"
                        }, [
                          createVNode(_component_BaseAvatar, {
                            src: comment.author.picture,
                            size: "xs"
                          }, null, 8, ["src"]),
                          createVNode("div", null, [
                            createVNode(_component_BaseHeading, {
                              as: "h3",
                              size: "sm",
                              weight: "medium"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(comment.author.name), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_component_BaseText, {
                              size: "xs",
                              class: "text-muted-400 mb-2",
                              lead: "none"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" posted " + toDisplayString(comment.author.posted), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_component_BaseParagraph, {
                              size: "xs",
                              class: "text-muted-500 dark:text-muted-400"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(comment.text), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ])
                        ]);
                      }), 128))
                    ]))
                  ]),
                  createVNode("div", null, [
                    createVNode(_component_BaseTextarea, {
                      modelValue: unref(commentArea),
                      "onUpdate:modelValue": ($event) => isRef(commentArea) ? commentArea.value = $event : null,
                      rounded: "sm",
                      placeholder: "Write a comment...",
                      rows: 4,
                      addon: ""
                    }, {
                      addon: withCtx(() => [
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode(_component_BaseAvatar, {
                            src: "/img/avatars/2.svg",
                            class: "me-1",
                            size: "xs"
                          }),
                          createVNode(_component_BaseHeading, {
                            as: "h4",
                            size: "sm",
                            weight: "semibold",
                            class: "text-muted-800 dark:text-white"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Maya ")
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode(_component_BaseButtonAction, {
                            color: "primary",
                            onClick: ($event) => emits("message", { from: "maya", comment: ("toValue" in _ctx ? _ctx.toValue : unref(toValue))(unref(commentArea)) })
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Publish ")
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ])
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/DemoPanelTask.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=DemoPanelTask-CiQWSRlb.mjs.map
