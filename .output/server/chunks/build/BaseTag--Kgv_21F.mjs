import { u as useNuiDefaultProperty } from './server.mjs';
import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "BaseTag",
  __ssrInlineRender: true,
  props: {
    shadow: { default: void 0 },
    color: { default: void 0 },
    rounded: { default: void 0 },
    size: { default: void 0 },
    variant: { default: void 0 }
  },
  setup(__props) {
    const props = __props;
    const color = useNuiDefaultProperty(props, "BaseTag", "color");
    const rounded = useNuiDefaultProperty(props, "BaseTag", "rounded");
    const size = useNuiDefaultProperty(props, "BaseTag", "size");
    const variant = useNuiDefaultProperty(props, "BaseTag", "variant");
    const variants = {
      solid: "nui-tag-solid",
      pastel: "nui-tag-pastel",
      outline: "nui-tag-outline"
    };
    const radiuses = {
      none: "",
      sm: "nui-tag-rounded-sm",
      md: "nui-tag-rounded-md",
      lg: "nui-tag-rounded-lg",
      full: "nui-tag-rounded-full"
    };
    const colors = {
      default: "nui-tag-default",
      "default-contrast": "nui-tag-default-contrast",
      muted: "nui-tag-muted",
      "muted-contrast": "nui-tag-muted-contrast",
      light: "nui-tag-light",
      dark: "nui-tag-dark",
      black: "nui-tag-black",
      primary: "nui-tag-primary",
      info: "nui-tag-info",
      success: "nui-tag-success",
      warning: "nui-tag-warning",
      danger: "nui-tag-danger"
    };
    const sizes = {
      sm: "nui-tag-sm",
      md: "nui-tag-md"
    };
    const shadows = {
      flat: "nui-tag-shadow",
      hover: "nui-tag-shadow-hover"
    };
    const classes = computed(() => [
      "nui-tag",
      size.value && sizes[size.value],
      rounded.value && radiuses[rounded.value],
      variant.value && variants[variant.value],
      color.value && colors[color.value],
      props.shadow && shadows[props.shadow]
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(mergeProps({ class: unref(classes) }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</span>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@shuriken-ui+nuxt@3.1.5_nuxt@3.11.2_vue@3.4.21/node_modules/@shuriken-ui/nuxt/components/base/BaseTag.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=BaseTag--Kgv_21F.mjs.map
