import { u as useNuiDefaultProperty } from './server.mjs';
import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderStyle } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "BaseProgress",
  __ssrInlineRender: true,
  props: {
    value: { default: void 0 },
    max: { default: 100 },
    color: { default: void 0 },
    contrast: { default: void 0 },
    rounded: { default: void 0 },
    size: { default: void 0 },
    classes: { default: () => ({}) }
  },
  setup(__props) {
    const props = __props;
    const color = useNuiDefaultProperty(props, "BaseProgress", "color");
    const contrast = useNuiDefaultProperty(props, "BaseProgress", "contrast");
    const rounded = useNuiDefaultProperty(props, "BaseProgress", "rounded");
    const size = useNuiDefaultProperty(props, "BaseProgress", "size");
    const colors = {
      primary: "nui-progress-primary",
      info: "nui-progress-info",
      success: "nui-progress-success",
      warning: "nui-progress-warning",
      danger: "nui-progress-danger",
      light: "nui-progress-light",
      dark: "nui-progress-dark",
      black: "nui-progress-black"
    };
    const contrasts = {
      default: "nui-progress-default",
      contrast: "nui-progress-contrast"
    };
    const radiuses = {
      none: "",
      sm: "nui-progress-rounded-sm",
      md: "nui-progress-rounded-md",
      lg: "nui-progress-rounded-lg",
      full: "nui-progress-rounded-full"
    };
    const sizes = {
      xs: "nui-progress-xs",
      sm: "nui-progress-sm",
      md: "nui-progress-md",
      lg: "nui-progress-lg",
      xl: "nui-progress-xl"
    };
    const value = computed(() => {
      const { value: value2, max } = props;
      if (max === 0) {
        return 0;
      }
      return typeof value2 === "number" ? value2 / max * 100 : void 0;
    });
    const isIndeterminate = computed(() => typeof value.value !== "number");
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      _push(`<div${ssrRenderAttrs(mergeProps({
        role: "progressbar",
        "aria-valuenow": unref(value),
        "aria-valuemax": props.max,
        class: ["nui-progress", [
          unref(size) && sizes[unref(size)],
          unref(contrast) && contrasts[unref(contrast)],
          unref(color) && colors[unref(color)],
          unref(rounded) && radiuses[unref(rounded)],
          (_a = props.classes) == null ? void 0 : _a.wrapper
        ]]
      }, _attrs))}><div class="${ssrRenderClass([[
        unref(isIndeterminate) && "nui-progress-indeterminate animate-nui-progress-indeterminate",
        (_b = props.classes) == null ? void 0 : _b.progress
      ], "nui-progress-bar"])}" style="${ssrRenderStyle(!unref(isIndeterminate) ? `width: ${unref(value)}%` : "width: 100%")}"></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@shuriken-ui+nuxt@3.1.5_nuxt@3.11.2_vue@3.4.21/node_modules/@shuriken-ui/nuxt/components/base/BaseProgress.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=BaseProgress-CWqy7H6p.mjs.map
