import { u as useNuiDefaultProperty, j as useNinjaButton, d as __nuxt_component_0 } from './server.mjs';
import { defineComponent, computed, createVNode, resolveDynamicComponent, unref, mergeProps, withCtx, renderSlot, openBlock, createBlock, useSSRContext } from 'vue';
import { ssrRenderVNode, ssrRenderSlot, ssrRenderComponent } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "BaseButtonIcon",
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
    rounded: { default: void 0 },
    size: { default: void 0 }
  },
  setup(__props) {
    const props = __props;
    const color = useNuiDefaultProperty(props, "BaseButtonIcon", "color");
    const rounded = useNuiDefaultProperty(props, "BaseButtonIcon", "rounded");
    const size = useNuiDefaultProperty(props, "BaseButtonIcon", "size");
    const radiuses = {
      none: "",
      sm: "nui-button-rounded-sm",
      md: "nui-button-rounded-md",
      lg: "nui-button-rounded-lg",
      full: "nui-button-rounded-full"
    };
    const sizes = {
      sm: "nui-button-small",
      md: "nui-button-medium",
      lg: "nui-button-large"
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
      "nui-button-icon",
      props.loading && "nui-button-loading",
      rounded.value && radiuses[rounded.value],
      size.value && sizes[size.value],
      color.value && colors[color.value]
    ]);
    const { attributes, is } = useNinjaButton(props);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BasePlaceload = __nuxt_component_0;
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(is)), mergeProps(unref(attributes), { class: unref(classes) }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!props.loading) {
              ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            } else {
              _push2(ssrRenderComponent(_component_BasePlaceload, { class: "size-4 rounded-md" }, null, _parent2, _scopeId));
            }
          } else {
            return [
              !props.loading ? renderSlot(_ctx.$slots, "default", { key: 0 }) : (openBlock(), createBlock(_component_BasePlaceload, {
                key: 1,
                class: "size-4 rounded-md"
              }))
            ];
          }
        }),
        _: 3
      }), _parent);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@shuriken-ui+nuxt@3.1.5_nuxt@3.11.2_vue@3.4.21/node_modules/@shuriken-ui/nuxt/components/base/BaseButtonIcon.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=BaseButtonIcon-4hIYqjHe.mjs.map
