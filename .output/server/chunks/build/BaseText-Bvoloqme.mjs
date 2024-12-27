import { u as useNuiDefaultProperty } from './server.mjs';
import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "BaseText",
  __ssrInlineRender: true,
  props: {
    lead: { default: void 0 },
    size: { default: void 0 },
    weight: { default: void 0 }
  },
  setup(__props) {
    const props = __props;
    const lead = useNuiDefaultProperty(props, "BaseText", "lead");
    const size = useNuiDefaultProperty(props, "BaseText", "size");
    const weight = useNuiDefaultProperty(props, "BaseText", "weight");
    const sizes = {
      xs: "nui-content-xs",
      sm: "nui-content-sm",
      md: "nui-content-md",
      lg: "nui-content-lg",
      xl: "nui-content-xl",
      "2xl": "nui-content-2xl",
      "3xl": "nui-content-3xl",
      "4xl": "nui-content-4xl",
      "5xl": "nui-content-5xl",
      "6xl": "nui-content-6xl",
      "7xl": "nui-content-7xl",
      "8xl": "nui-content-8xl",
      "9xl": "nui-content-9xl"
    };
    const weights = {
      light: "nui-weight-light",
      normal: "nui-weight-normal",
      medium: "nui-weight-medium",
      semibold: "nui-weight-semibold",
      bold: "nui-weight-bold",
      extrabold: "nui-weight-extrabold"
    };
    const leads = {
      none: "nui-lead-none",
      tight: "nui-lead-tight",
      snug: "nui-lead-snug",
      normal: "nui-lead-normal",
      relaxed: "nui-lead-relaxed",
      loose: "nui-lead-loose"
    };
    const classes = computed(() => [
      "nui-text",
      size.value && sizes[size.value],
      weight.value && weights[weight.value],
      lead.value && leads[lead.value]
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@shuriken-ui+nuxt@3.1.5_nuxt@3.11.2_vue@3.4.21/node_modules/@shuriken-ui/nuxt/components/base/BaseText.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=BaseText-Bvoloqme.mjs.map
