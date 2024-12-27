import { e as __nuxt_component_1 } from './server.mjs';
import { defineComponent, computed, mergeProps, unref, withCtx, openBlock, createBlock, renderSlot, createTextVNode, toDisplayString, createCommentVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderClass, ssrRenderSlot, ssrInterpolate } from 'vue/server-renderer';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TairoTocAnchor",
  __ssrInlineRender: true,
  props: {
    label: { default: void 0 },
    id: { default: void 0 },
    level: { default: void 0 },
    prefix: { default: "#" },
    prefixClasses: { default: "opacity-0 group-hover/toc:opacity-100 group-focus/toc:opacity-100 group-visible/toc:opacity-100 leading-6 text-primary-300 absolute -start-5 top-0" },
    suffix: { default: "" },
    suffixClasses: { default: "opacity-0 group-hover/toc:opacity-100 group-focus/toc:opacity-100 group-visible/toc:opacity-100 leading-6 text-primary-300 absolute -end-5 -top-1" }
  },
  setup(__props) {
    const props = __props;
    const slug = computed(
      () => props.label.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "")
    );
    const anchor = computed(() => props.id || slug.value);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_1;
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
        id: unref(anchor),
        to: `#${unref(anchor)}`,
        "data-toc-level": props.level,
        "data-toc-label": props.label,
        class: "tairo-toc-anchor nui-focus group/toc relative",
        style: { scrollMarginTop: "1.5rem" }
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (props.prefix || "prefix" in _ctx.$slots) {
              _push2(`<span class="${ssrRenderClass(props.prefixClasses)}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "prefix", {}, () => {
                _push2(`${ssrInterpolate(props.prefix)}`);
              }, _push2, _parent2, _scopeId);
              _push2(`</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<span${_scopeId}>${ssrInterpolate(props.label)}</span>`);
            if (props.suffix || "suffix" in _ctx.$slots) {
              _push2(`<span class="${ssrRenderClass(props.suffixClasses)}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "suffix", {}, () => {
                _push2(`${ssrInterpolate(props.suffix)}`);
              }, _push2, _parent2, _scopeId);
              _push2(`</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              props.prefix || "prefix" in _ctx.$slots ? (openBlock(), createBlock("span", {
                key: 0,
                class: props.prefixClasses
              }, [
                renderSlot(_ctx.$slots, "prefix", {}, () => [
                  createTextVNode(toDisplayString(props.prefix), 1)
                ])
              ], 2)) : createCommentVNode("", true),
              createVNode("span", null, toDisplayString(props.label), 1),
              props.suffix || "suffix" in _ctx.$slots ? (openBlock(), createBlock("span", {
                key: 1,
                class: props.suffixClasses
              }, [
                renderSlot(_ctx.$slots, "suffix", {}, () => [
                  createTextVNode(toDisplayString(props.suffix), 1)
                ])
              ], 2)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/tairo/components/global/TairoTocAnchor.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=TairoTocAnchor-BHzc7zOV.mjs.map
