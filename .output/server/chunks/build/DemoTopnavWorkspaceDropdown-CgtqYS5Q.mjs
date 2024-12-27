import { _ as _sfc_main$1 } from './BaseAvatar-Br9MXJI3.mjs';
import { _ as _sfc_main$2 } from './BaseText-Bvoloqme.mjs';
import { _ as __nuxt_component_2, a as _sfc_main$b, b as _sfc_main$3$1 } from './server.mjs';
import { _ as _sfc_main$3 } from './BaseInput-CmYsBoKW.mjs';
import { _ as _sfc_main$4 } from './BaseParagraph-BooaUBVB.mjs';
import { b as onClickOutside } from './index-BCPoQdcH.mjs';
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
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
import './BaseInputHelpText-DNMtrE4A.mjs';
import './input-id-DYCO6xqi.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DemoTopnavWorkspaceDropdown",
  __ssrInlineRender: true,
  setup(__props) {
    const workspaces = ref([
      {
        id: 1,
        name: "Personal Loan",
        logo: "/img/logos/companies/stripe.svg"
      }
    ]);
    const selectedWorkspace = ref(workspaces.value[0]);
    const target = ref(null);
    const open = ref(false);
    onClickOutside(target, () => open.value = false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BaseAvatar = _sfc_main$1;
      const _component_BaseText = _sfc_main$2;
      const _component_Icon = __nuxt_component_2;
      const _component_BaseInput = _sfc_main$3;
      const _component_BaseHeading = _sfc_main$b;
      const _component_BaseParagraph = _sfc_main$4;
      const _component_BaseButton = _sfc_main$3$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "target",
        ref: target,
        class: "group/workspace relative z-10 ms-auto w-full max-w-[170px] md:ms-0 md:max-w-[240px]"
      }, _attrs))}><button type="button" class="${ssrRenderClass([open.value && "bg-muted-100 dark:bg-muted-900/60", "group-hover/workspace:bg-muted-100 dark:group-hover/workspace:bg-muted-900/60 w-full max-w-[170px] rounded-xl py-2 pe-3 ps-2 transition-colors duration-300 md:max-w-[240px]"])}"><span class="flex w-full items-center gap-3 text-start">`);
      _push(ssrRenderComponent(_component_BaseAvatar, {
        size: "xxs",
        src: selectedWorkspace.value.logo
      }, null, _parent));
      _push(`<div>`);
      _push(ssrRenderComponent(_component_BaseText, {
        size: "sm",
        class: "text-muted-800 dark:text-muted-200 line-clamp-1 block"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(selectedWorkspace.value.name)}`);
          } else {
            return [
              createTextVNode(toDisplayString(selectedWorkspace.value.name), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:chevrons-up-down",
        class: ["text-muted-400 ms-auto size-4 transition-transform duration-300", open.value && "rotate-180"]
      }, null, _parent));
      _push(`</span></button>`);
      if (open.value) {
        _push(`<div class="border-muted-200 dark:border-muted-800 dark:bg-muted-950 shadow-muted-400/10 dark:shadow-muted-800/10 absolute end-0 top-12 w-full min-w-[280px] overflow-hidden rounded-xl border bg-white shadow-xl md:start-0 md:min-w-[575px]"><div><div class="border-muted-200 dark:border-muted-700 flex items-center border-b">`);
        _push(ssrRenderComponent(_component_BaseInput, {
          icon: "lucide:search",
          placeholder: "Find Loan Type",
          classes: {
            input: "border-none !outline-none !bg-transparent"
          }
        }, null, _parent));
        _push(`<button type="button" class="border-muted-200 dark:border-muted-700 me-2 ms-auto rounded-lg border px-2 py-1">`);
        _push(ssrRenderComponent(_component_BaseText, { size: "xs" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Esc `);
            } else {
              return [
                createTextVNode(" Esc ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</button></div><div class="flex h-[calc(100%_-_2.5rem)] flex-col p-3">`);
        _push(ssrRenderComponent(_component_BaseHeading, {
          as: "h4",
          size: "sm",
          weight: "medium",
          class: "text-muted-400"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Demos `);
            } else {
              return [
                createTextVNode(" Demos ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="my-3"><ul><li><div class="flex justify-between items-center"><div>`);
        _push(ssrRenderComponent(_component_BaseHeading, {
          size: "sm",
          weight: "medium"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Stripe Payment Solutions `);
            } else {
              return [
                createTextVNode(" Stripe Payment Solutions ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_BaseParagraph, {
          size: "xs",
          class: "text-muted-400"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` A payment solution for start-ups `);
            } else {
              return [
                createTextVNode(" A payment solution for start-ups ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><button type="button" class="border-muted-200 dark:border-muted-700 me-2 ms-auto rounded-lg border px-2 py-1">`);
        _push(ssrRenderComponent(_component_BaseText, { size: "xs" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Edit `);
            } else {
              return [
                createTextVNode(" Edit ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</button></div></li></ul></div><div class="mt-auto">`);
        _push(ssrRenderComponent(_component_BaseButton, {
          rounded: "md",
          class: "w-full"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "lucide:plus",
                class: "size-4"
              }, null, _parent2, _scopeId));
              _push2(`<span${_scopeId}>Create Demo</span>`);
            } else {
              return [
                createVNode(_component_Icon, {
                  name: "lucide:plus",
                  class: "size-4"
                }),
                createVNode("span", null, "Create Demo")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/DemoTopnavWorkspaceDropdown.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=DemoTopnavWorkspaceDropdown-CgtqYS5Q.mjs.map
