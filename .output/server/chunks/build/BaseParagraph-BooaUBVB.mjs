import { u as useNuiDefaultProperty } from './server.mjs';
import { defineComponent, computed, createVNode, resolveDynamicComponent, unref, mergeProps, withCtx, renderSlot, useSSRContext } from 'vue';
import { ssrRenderVNode, ssrRenderSlot } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "BaseParagraph",
  __ssrInlineRender: true,
  props: {
    as: { default: void 0 },
    lead: { default: void 0 },
    size: { default: void 0 },
    weight: { default: void 0 }
  },
  setup(__props) {
    const props = __props;
    const as = useNuiDefaultProperty(props, "BaseParagraph", "as");
    const lead = useNuiDefaultProperty(props, "BaseParagraph", "lead");
    const size = useNuiDefaultProperty(props, "BaseParagraph", "size");
    const weight = useNuiDefaultProperty(props, "BaseParagraph", "weight");
    const sizes = {
      xs: "nui-paragraph-xs",
      sm: "nui-paragraph-sm",
      md: "nui-paragraph-md",
      lg: "nui-paragraph-lg",
      xl: "nui-paragraph-xl",
      "2xl": "nui-paragraph-2xl",
      "3xl": "nui-paragraph-3xl",
      "4xl": "nui-paragraph-4xl",
      "5xl": "nui-paragraph-5xl",
      "6xl": "nui-paragraph-6xl",
      "7xl": "nui-paragraph-7xl",
      "8xl": "nui-paragraph-8xl",
      "9xl": "nui-paragraph-9xl"
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
      "nui-paragraph",
      size.value && sizes[size.value],
      weight.value && weights[weight.value],
      lead.value && leads[lead.value]
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(props.as ? props.as : unref(as)), mergeProps({ class: unref(classes) }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@shuriken-ui+nuxt@3.1.5_nuxt@3.11.2_vue@3.4.21/node_modules/@shuriken-ui/nuxt/components/base/BaseParagraph.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=BaseParagraph-BooaUBVB.mjs.map
