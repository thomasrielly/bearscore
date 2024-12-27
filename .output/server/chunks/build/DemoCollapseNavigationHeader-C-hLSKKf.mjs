import { i as useState, e as __nuxt_component_1, _ as __nuxt_component_2 } from './server.mjs';
import __nuxt_component_0 from './TairoLogo-ByXlo29i.mjs';
import { u as useCollapse } from './collapse-CWBPcu9G.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderComponent, ssrRenderClass } from 'vue/server-renderer';
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
import './tailwind-B8vcEit7.mjs';
import './index-BCPoQdcH.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DemoCollapseNavigationHeader",
  __ssrInlineRender: true,
  setup(__props) {
    const { isOpen, isMobileOpen } = useCollapse();
    useState("search-open", () => false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_1;
      const _component_TairoLogo = __nuxt_component_0;
      const _component_Icon = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex h-16 w-full items-center justify-between px-6" }, _attrs))}><div class="flex size-16 items-center justify-center">`);
      ssrRenderSlot(_ctx.$slots, "logo", {}, () => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "flex items-center justify-center"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_TairoLogo, { class: "text-primary-500 size-10" }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_TairoLogo, { class: "text-primary-500 size-10" })
              ];
            }
          }),
          _: 1
        }, _parent));
      }, _push, _parent);
      _push(`</div><button type="button" class="${ssrRenderClass([!unref(isOpen) ? "hidden" : "lg:flex", "nui-mask nui-mask-blob hover:bg-muted-200 dark:hover:bg-muted-700/60 text-muted-500 dark:text-muted-400 hidden size-10 cursor-pointer items-center justify-center transition-colors duration-300"])}">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:search",
        class: "size-4"
      }, null, _parent));
      _push(`</button><button type="button" class="nui-mask nui-mask-blob hover:bg-muted-200 dark:hover:bg-muted-800 text-muted-700 dark:text-muted-400 flex size-10 cursor-pointer items-center justify-center transition-colors duration-300 lg:hidden">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:arrow-left",
        class: "size-5"
      }, null, _parent));
      _push(`</button></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/DemoCollapseNavigationHeader.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=DemoCollapseNavigationHeader-C-hLSKKf.mjs.map
