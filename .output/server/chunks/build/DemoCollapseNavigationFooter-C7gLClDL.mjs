import _sfc_main$1 from './DemoAccountMenu-C0Plw7G-.mjs';
import { u as useCollapse } from './collapse-CWBPcu9G.mjs';
import { defineComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass } from 'vue/server-renderer';
import './server.mjs';
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
import './virtual_public-YCuLXoeU.mjs';
import '@headlessui/vue';
import './tailwind-B8vcEit7.mjs';
import './index-BCPoQdcH.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DemoCollapseNavigationFooter",
  __ssrInlineRender: true,
  setup(__props) {
    const { isOpen } = useCollapse();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_DemoAccountMenu = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["flex h-16 w-full items-center gap-4 transition-all duration-150", !unref(isOpen) ? "px-2 justify-center" : "px-6"]
      }, _attrs))}>`);
      _push(ssrRenderComponent(_component_DemoAccountMenu, null, null, _parent));
      _push(`<span class="${ssrRenderClass([!unref(isOpen) ? "hidden" : "block", "text-muted-500 dark:text-muted-400/80 whitespace-nowrap font-sans text-sm"])}"> My Account </span></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/DemoCollapseNavigationFooter.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=DemoCollapseNavigationFooter-C7gLClDL.mjs.map
