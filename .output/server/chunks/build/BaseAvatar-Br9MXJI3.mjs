import { u as useNuiDefaultProperty } from './server.mjs';
import { defineComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderSlot, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "BaseAvatar",
  __ssrInlineRender: true,
  props: {
    src: { default: void 0 },
    srcDark: { default: void 0 },
    badgeSrc: { default: void 0 },
    text: { default: "?" },
    mask: { default: void 0 },
    dot: { type: [Boolean, String], default: false },
    ring: { type: [Boolean, String], default: false },
    color: { default: void 0 },
    rounded: { default: void 0 },
    size: { default: void 0 },
    classes: { default: () => ({}) }
  },
  setup(__props) {
    const props = __props;
    const color = useNuiDefaultProperty(props, "BaseAvatar", "color");
    const rounded = useNuiDefaultProperty(props, "BaseAvatar", "rounded");
    const size = useNuiDefaultProperty(props, "BaseAvatar", "size");
    const colors = {
      white: "bg-white dark:bg-muted-800 text-muted-600 dark:text-muted-200",
      muted: "bg-muted-100 dark:bg-muted-800 text-muted-600 dark:text-muted-200",
      primary: "bg-primary-500/20 text-primary-500",
      info: "bg-info-500/20 text-info-500",
      success: "bg-success-500/20 text-success-500",
      warning: "bg-warning-500/20 text-warning-500",
      danger: "bg-danger-500/20 text-danger-500",
      yellow: "bg-yellow-500/20 text-yellow-400",
      pink: "bg-pink-500/20 text-pink-400",
      indigo: "bg-indigo-500/20 text-indigo-500",
      violet: "bg-violet-500/20 text-violet-500"
    };
    const dots = {
      success: "nui-dot-success",
      primary: "nui-dot-primary",
      info: "nui-dot-info",
      warning: "nui-dot-warning",
      danger: "nui-dot-danger",
      pink: "nui-dot-pink",
      yellow: "nui-dot-yellow"
    };
    const rings = {
      success: "nui-ring-success",
      primary: "nui-ring-primary",
      info: "nui-ring-info",
      warning: "nui-ring-warning",
      danger: "nui-ring-danger",
      pink: "nui-ring-pink",
      yellow: "nui-ring-yellow"
    };
    const sizes = {
      xxs: "nui-avatar-xxs",
      xs: "nui-avatar-xs",
      sm: "nui-avatar-sm",
      md: "nui-avatar-md",
      lg: "nui-avatar-lg",
      xl: "nui-avatar-xl",
      "2xl": "nui-avatar-2xl",
      "3xl": "nui-avatar-3xl",
      "4xl": "nui-avatar-4xl"
    };
    const radiuses = {
      none: "nui-avatar-rounded-none",
      sm: "nui-avatar-rounded-sm",
      md: "nui-avatar-rounded-md",
      lg: "nui-avatar-rounded-lg",
      full: "nui-avatar-rounded-full"
    };
    const masks = {
      hex: "nui-mask-hex",
      hexed: "nui-mask-hexed",
      deca: "nui-mask-deca",
      blob: "nui-mask-blob",
      diamond: "nui-mask-diamond"
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["nui-avatar", [
          unref(size) && sizes[unref(size)],
          unref(rounded) && radiuses[unref(rounded)],
          !props.src && unref(color) && colors[unref(color)],
          props.mask && (props.rounded === "none" || unref(rounded) === "none") && `nui-avatar-mask ${masks[props.mask]}`,
          props.ring && (props.ring === true ? `nui-avatar-ring ${rings["primary"]}` : `nui-avatar-ring ${rings[props.ring]}`),
          (_a = props.classes) == null ? void 0 : _a.wrapper
        ]]
      }, _attrs))}><div class="${ssrRenderClass([(_b = props.classes) == null ? void 0 : _b.inner, "nui-avatar-inner"])}">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, () => {
        var _a2, _b2;
        if (props.src) {
          _push(`<img${ssrRenderAttr("src", props.src)} class="${ssrRenderClass([[
            unref(rounded) && radiuses[unref(rounded)],
            props.srcDark ? "dark:hidden" : "",
            (_a2 = props.classes) == null ? void 0 : _a2.img
          ], "nui-avatar-img"])}">`);
        } else {
          _push(`<!---->`);
        }
        if (props.src && props.srcDark) {
          _push(`<img${ssrRenderAttr("src", props.srcDark)} class="${ssrRenderClass([[unref(rounded) && radiuses[unref(rounded)], (_b2 = props.classes) == null ? void 0 : _b2.img], "nui-avatar-img hidden dark:block"])}">`);
        } else {
          _push(`<!---->`);
        }
        if (!props.src) {
          _push(`<span class="nui-avatar-text">${ssrInterpolate(props.text)}</span>`);
        } else {
          _push(`<!---->`);
        }
      }, _push, _parent);
      _push(`</div>`);
      if ("badge" in _ctx.$slots || props.badgeSrc) {
        _push(`<div class="${ssrRenderClass([(_c = props.classes) == null ? void 0 : _c.badge, "nui-avatar-badge"])}">`);
        ssrRenderSlot(_ctx.$slots, "badge", {}, () => {
          if (props.badgeSrc) {
            _push(`<img${ssrRenderAttr("src", props.badgeSrc)} class="nui-badge-img" alt="">`);
          } else {
            _push(`<!---->`);
          }
        }, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (props.dot) {
        _push(`<span class="${ssrRenderClass([[
          props.dot === true ? dots["primary"] : dots[props.dot],
          (_d = props.classes) == null ? void 0 : _d.dot
        ], "nui-avatar-dot"])}"></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@shuriken-ui+nuxt@3.1.5_nuxt@3.11.2_vue@3.4.21/node_modules/@shuriken-ui/nuxt/components/base/BaseAvatar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=BaseAvatar-Br9MXJI3.mjs.map
