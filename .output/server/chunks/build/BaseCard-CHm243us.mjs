import { u as useNuiDefaultProperty } from './server.mjs';
import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "BaseCard",
  __ssrInlineRender: true,
  props: {
    shadow: { default: void 0 },
    color: { default: void 0 },
    rounded: { default: void 0 }
  },
  setup(__props) {
    const props = __props;
    const color = useNuiDefaultProperty(props, "BaseCard", "color");
    const rounded = useNuiDefaultProperty(props, "BaseCard", "rounded");
    const radiuses = {
      none: "",
      sm: "nui-card-rounded-sm",
      md: "nui-card-rounded-md",
      lg: "nui-card-rounded-lg"
    };
    const colors = {
      default: "nui-card-default",
      "default-contrast": "nui-card-default-contrast",
      muted: "nui-card-muted",
      "muted-contrast": "nui-card-muted-contrast",
      dark: "nui-card-dark",
      black: "nui-card-black",
      primary: "nui-card-primary",
      info: "nui-card-info",
      success: "nui-card-success",
      warning: "nui-card-warning",
      danger: "nui-card-danger",
      none: ""
    };
    const shadows = {
      flat: "nui-card-shadow",
      hover: "nui-card-shadow-hover"
    };
    const classes = computed(() => [
      "nui-card",
      rounded.value && radiuses[rounded.value],
      color.value && colors[color.value],
      props.shadow && shadows[props.shadow]
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: unref(classes) }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@shuriken-ui+nuxt@3.1.5_nuxt@3.11.2_vue@3.4.21/node_modules/@shuriken-ui/nuxt/components/base/BaseCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=BaseCard-CHm243us.mjs.map
