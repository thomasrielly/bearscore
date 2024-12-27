import { c as _export_sfc, f as useRoute, q as useAppConfig, x as resolveComponentOrNative, w as useNinjaWindowScroll, _ as __nuxt_component_2, e as __nuxt_component_1, a as _sfc_main$b, y as _sfc_main$8 } from './server.mjs';
import { useSSRContext, defineComponent, computed, ref, mergeProps, unref, withCtx, createVNode, toDisplayString, resolveDynamicComponent, renderSlot, createTextVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderAttr, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderSlot, ssrRenderVNode } from 'vue/server-renderer';
import { u as useCollapse } from './collapse-CWBPcu9G.mjs';
import { _ as __nuxt_component_0 } from './client-only-CNnwE-2c.mjs';
import { a as useTailwindBreakpoints } from './tailwind-B8vcEit7.mjs';
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
import './index-BCPoQdcH.mjs';

const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "TairoCollapseNavigationCollapseLinks",
  __ssrInlineRender: true,
  props: {
    item: {},
    expanded: { type: Boolean }
  },
  emits: ["clicked"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const route = useRoute();
    const isActive = computed(() => {
      var _a;
      if (!((_a = props.item) == null ? void 0 : _a.activePath)) {
        return false;
      }
      return route.path.startsWith(props.item.activePath);
    });
    ref();
    const isOpen = ref(isActive.value);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_2;
      const _component_NuxtLink = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "group" }, _attrs))}><button class="${ssrRenderClass([props.expanded ? "gap-4 px-4" : "px-2 justify-center", "nui-focus text-muted-500 dark:text-muted-400/80 hover:bg-muted-100 dark:hover:bg-muted-700/60 hover:text-muted-600 dark:hover:text-muted-200 flex w-full cursor-pointer items-center rounded-lg py-3 transition-colors duration-300"])}"${ssrRenderAttr("data-nui-tooltip", props.expanded ? void 0 : _ctx.item.name)} data-nui-tooltip-position="end">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: _ctx.item.icon.name,
        class: [[_ctx.item.icon.class, unref(isActive) && "text-primary-500"], "shrink-0"]
      }, null, _parent));
      _push(`<span class="${ssrRenderClass([[
        unref(isActive) && "text-primary-500",
        !props.expanded ? "hidden" : "block"
      ], "block whitespace-nowrap font-sans text-sm"])}">${ssrInterpolate(_ctx.item.name)}</span><span class="${ssrRenderClass([!props.expanded ? "hidden" : "flex", "ms-auto items-center justify-center"])}">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:chevron-up",
        class: ["size-4 transition-transform duration-200", !unref(isOpen) ? "rotate-180" : ""]
      }, null, _parent));
      _push(`</span></button>`);
      if (props.expanded) {
        _push(`<ul class="${ssrRenderClass([{
          "max-h-0 overflow-hidden opacity-0 group-focus-within:max-h-max group-focus-within:overflow-visible group-focus-within:opacity-100": !unref(isOpen),
          "after:border-muted-200 max-h-max opacity-100": unref(isOpen)
        }, "border-muted-200 relative block ps-4"])}"><!--[-->`);
        ssrRenderList(props.item.children, (child) => {
          _push(`<li class="border-muted-300 dark:border-muted-700 ms-2 border-s-2 first:mt-2">`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: child.to,
            "exact-active-class": "!border-primary-500 !text-primary-500 dark:!text-primary-500",
            class: "nui-focus text-muted-500 hover:text-muted-600 dark:text-muted-400/80 dark:hover:text-muted-200 relative -start-0.5 flex cursor-pointer items-center gap-2 border-s-2 border-transparent py-2 ps-4 transition-colors duration-300"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_Icon, {
                  name: child.icon.name,
                  class: [child.icon.class, "shrink-0"]
                }, null, _parent2, _scopeId));
                _push2(`<span class="${ssrRenderClass([[!props.expanded ? "hidden" : "block"], "whitespace-nowrap font-sans text-[0.85rem]"])}"${_scopeId}>${ssrInterpolate(child.name)}</span>`);
              } else {
                return [
                  createVNode(_component_Icon, {
                    name: child.icon.name,
                    class: [child.icon.class, "shrink-0"]
                  }, null, 8, ["name", "class"]),
                  createVNode("span", {
                    class: ["whitespace-nowrap font-sans text-[0.85rem]", [!props.expanded ? "hidden" : "block"]]
                  }, toDisplayString(child.name), 3)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</li>`);
        });
        _push(`<!--]--></ul>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/tairo-layout-collapse/components/TairoCollapseNavigationCollapseLinks.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "TairoCollapseNavigation",
  __ssrInlineRender: true,
  setup(__props) {
    const { isOpen, isMobileOpen, menuItems } = useCollapse();
    const app = useAppConfig();
    const startMenuItems = computed(
      () => {
        var _a;
        return (_a = menuItems.value) == null ? void 0 : _a.filter(
          (sidebar) => !sidebar.position || sidebar.position === "start"
        );
      }
    );
    const endMenuItems = computed(
      () => {
        var _a;
        return (_a = menuItems.value) == null ? void 0 : _a.filter((sidebar) => sidebar.position === "end");
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_TairoCollapseNavigationCollapseLinks = _sfc_main$6;
      const _component_NuxtLink = __nuxt_component_1;
      const _component_Icon = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["dark:bg-muted-800 border-muted-200 dark:border-muted-700 fixed start-0 top-0 z-[60] flex h-full flex-col border-r bg-white transition-all duration-300", [
          !unref(isOpen) ? "w-[80px]" : "w-[280px]",
          unref(isMobileOpen) ? "translate-x-0 lg:translate-x-0" : "-translate-x-full lg:translate-x-0"
        ]]
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "header", {}, () => {
        var _a2, _b2, _c, _d, _e, _f, _g, _h;
        if ((_d = (_c = (_b2 = (_a2 = unref(app).tairo) == null ? void 0 : _a2.collapse) == null ? void 0 : _b2.navigation) == null ? void 0 : _c.header) == null ? void 0 : _d.component) {
          ssrRenderVNode(_push, createVNode(resolveDynamicComponent(
            ("resolveComponentOrNative" in _ctx ? _ctx.resolveComponentOrNative : unref(resolveComponentOrNative))(
              (_h = (_g = (_f = (_e = unref(app).tairo) == null ? void 0 : _e.collapse) == null ? void 0 : _f.navigation) == null ? void 0 : _g.header) == null ? void 0 : _h.component
            )
          ), null, null), _parent);
        } else {
          _push(`<!---->`);
        }
      }, _push, _parent);
      _push(`<div class="${ssrRenderClass([!unref(isOpen) ? "px-4" : "px-6 nui-slimscroll overflow-y-auto", "relative flex w-full grow flex-col py-6"])}">`);
      if ((_a = unref(startMenuItems)) == null ? void 0 : _a.length) {
        _push(`<ul class="space-y-2"><!--[-->`);
        ssrRenderList(unref(startMenuItems), (item, index) => {
          var _a2, _b2, _c;
          _push(`<li>`);
          if ((_a2 = item == null ? void 0 : item.component) == null ? void 0 : _a2.name) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(("resolveComponentOrNative" in _ctx ? _ctx.resolveComponentOrNative : unref(resolveComponentOrNative))((_b2 = item == null ? void 0 : item.component) == null ? void 0 : _b2.name)), (_c = item == null ? void 0 : item.component) == null ? void 0 : _c.props, null), _parent);
          } else if (item.children) {
            _push(ssrRenderComponent(_component_TairoCollapseNavigationCollapseLinks, {
              item,
              expanded: unref(isOpen),
              onClicked: ($event) => isOpen.value = true
            }, null, _parent));
          } else if (item.to) {
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: item.to,
              "data-nui-tooltip": unref(isOpen) ? void 0 : item.name,
              "data-nui-tooltip-position": "end",
              "exact-active-class": "!bg-primary-500/10 dark:!bg-primary-500/20 !text-primary-500 dark:!text-primary-500",
              class: ["nui-focus text-muted-500 dark:text-muted-400/80 hover:bg-muted-100 dark:hover:bg-muted-700/60 hover:text-muted-600 dark:hover:text-muted-200 flex cursor-pointer items-center gap-4 rounded-lg py-3 transition-colors duration-300", !unref(isOpen) ? "px-1 justify-center" : "px-4"]
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(_component_Icon, {
                    name: item.icon.name,
                    class: item.icon.class
                  }, null, _parent2, _scopeId));
                  _push2(`<span class="${ssrRenderClass([!unref(isOpen) ? "hidden" : "block", "whitespace-nowrap font-sans text-sm"])}"${_scopeId}>${ssrInterpolate(item.name)}</span>`);
                } else {
                  return [
                    createVNode(_component_Icon, {
                      name: item.icon.name,
                      class: item.icon.class
                    }, null, 8, ["name", "class"]),
                    createVNode("span", {
                      class: ["whitespace-nowrap font-sans text-sm", !unref(isOpen) ? "hidden" : "block"]
                    }, toDisplayString(item.name), 3)
                  ];
                }
              }),
              _: 2
            }, _parent));
          } else if (item.divider) {
            _push(`<div class="border-muted-200 dark:border-muted-700 my-3 h-px w-full border-t"></div>`);
          } else {
            _push(`<button class="${ssrRenderClass([!unref(isOpen) ? "px-1 justify-center" : "px-4", "nui-focus text-muted-500 dark:text-muted-400/80 hover:bg-muted-100 dark:hover:bg-muted-700/60 hover:text-muted-600 dark:hover:text-muted-200 flex w-full cursor-pointer items-center gap-4 rounded-lg py-3 transition-colors duration-300"])}">`);
            _push(ssrRenderComponent(_component_Icon, {
              name: item.icon.name,
              class: item.icon.class
            }, null, _parent));
            _push(`<span class="${ssrRenderClass([!unref(isOpen) ? "hidden" : "block", "whitespace-nowrap font-sans text-sm"])}">${ssrInterpolate(item.name)}</span></button>`);
          }
          _push(`</li>`);
        });
        _push(`<!--]--></ul>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mb-2 grow"></div>`);
      if ((_b = unref(endMenuItems)) == null ? void 0 : _b.length) {
        _push(`<ul class="space-y-2"><!--[-->`);
        ssrRenderList(unref(endMenuItems), (item, index) => {
          var _a2, _b2, _c;
          _push(`<li>`);
          if ((_a2 = item == null ? void 0 : item.component) == null ? void 0 : _a2.name) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(("resolveComponentOrNative" in _ctx ? _ctx.resolveComponentOrNative : unref(resolveComponentOrNative))((_b2 = item == null ? void 0 : item.component) == null ? void 0 : _b2.name)), (_c = item == null ? void 0 : item.component) == null ? void 0 : _c.props, null), _parent);
          } else if (item.children) {
            _push(ssrRenderComponent(_component_TairoCollapseNavigationCollapseLinks, {
              item,
              expanded: unref(isOpen),
              onClicked: ($event) => isOpen.value = true
            }, null, _parent));
          } else if (item.to) {
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: item.to,
              "exact-active-class": "!bg-primary-500/10 dark:!bg-primary-500/20 !text-primary-500 dark:!text-primary-500",
              class: ["nui-focus text-muted-500 dark:text-muted-400/80 hover:bg-muted-100 dark:hover:bg-muted-700/60 hover:text-muted-600 dark:hover:text-muted-200 flex cursor-pointer items-center gap-4 rounded-lg py-3 transition-colors duration-300", !unref(isOpen) ? "px-1 justify-center" : "px-4"]
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(_component_Icon, {
                    name: item.icon.name,
                    class: item.icon.class
                  }, null, _parent2, _scopeId));
                  _push2(`<span class="${ssrRenderClass([!unref(isOpen) ? "hidden" : "block", "whitespace-nowrap font-sans text-sm"])}"${_scopeId}>${ssrInterpolate(item.name)}</span>`);
                } else {
                  return [
                    createVNode(_component_Icon, {
                      name: item.icon.name,
                      class: item.icon.class
                    }, null, 8, ["name", "class"]),
                    createVNode("span", {
                      class: ["whitespace-nowrap font-sans text-sm", !unref(isOpen) ? "hidden" : "block"]
                    }, toDisplayString(item.name), 3)
                  ];
                }
              }),
              _: 2
            }, _parent));
          } else if (item.divider) {
            _push(`<div class="border-muted-200 dark:border-muted-700 my-3 h-px w-full border-t"></div>`);
          } else {
            _push(`<button class="${ssrRenderClass([!unref(isOpen) ? "px-1 justify-center" : "px-4", "nui-focus text-muted-500 dark:text-muted-400/80 hover:bg-muted-100 dark:hover:bg-muted-700/60 hover:text-muted-600 dark:hover:text-muted-200 flex w-full cursor-pointer items-center gap-4 rounded-lg py-3 transition-colors duration-300"])}">`);
            _push(ssrRenderComponent(_component_Icon, {
              name: item.icon.name,
              class: item.icon.class
            }, null, _parent));
            _push(`<span class="${ssrRenderClass([!unref(isOpen) ? "hidden" : "block", "whitespace-nowrap font-sans text-sm"])}">${ssrInterpolate(item.name)}</span></button>`);
          }
          _push(`</li>`);
        });
        _push(`<!--]--></ul>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      ssrRenderSlot(_ctx.$slots, "footer", {}, () => {
        var _a2, _b2, _c, _d, _e, _f, _g, _h;
        if ((_d = (_c = (_b2 = (_a2 = unref(app).tairo) == null ? void 0 : _a2.collapse) == null ? void 0 : _b2.navigation) == null ? void 0 : _c.footer) == null ? void 0 : _d.component) {
          ssrRenderVNode(_push, createVNode(resolveDynamicComponent(
            ("resolveComponentOrNative" in _ctx ? _ctx.resolveComponentOrNative : unref(resolveComponentOrNative))(
              (_h = (_g = (_f = (_e = unref(app).tairo) == null ? void 0 : _e.collapse) == null ? void 0 : _f.navigation) == null ? void 0 : _g.footer) == null ? void 0 : _h.component
            )
          ), null, null), _parent);
        } else {
          _push(`<!---->`);
        }
      }, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/tairo-layout-collapse/components/TairoCollapseNavigation.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "TairoCollapseBurger",
  __ssrInlineRender: true,
  setup(__props) {
    const { isOpen, isMobileOpen, toggle } = useCollapse();
    useTailwindBreakpoints();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0;
      _push(`<button${ssrRenderAttrs(mergeProps({
        type: "button",
        "aria-label": unref(isOpen) ? "Close navigation" : "Open navigation",
        class: "flex size-10 items-center justify-center"
      }, _attrs))}>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`</button>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/tairo-layout-collapse/components/TairoCollapseBurger.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "TairoCollapseToolbar",
  __ssrInlineRender: true,
  props: {
    collapse: { type: Boolean, default: true },
    horizontalScroll: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const app = useAppConfig();
    const route = useRoute();
    const showNavBurger = computed(() => {
      var _a, _b, _c;
      return props.collapse && ((_c = (_b = (_a = app.tairo) == null ? void 0 : _a.collapse) == null ? void 0 : _b.toolbar) == null ? void 0 : _c.showNavBurger);
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f;
      const _component_TairoCollapseBurger = _sfc_main$4;
      const _component_BaseHeading = _sfc_main$b;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["relative mb-5 flex h-16 items-center gap-2", props.horizontalScroll && "pe-4 xl:pe-10"]
      }, _attrs))}>`);
      if (unref(showNavBurger)) {
        _push(ssrRenderComponent(_component_TairoCollapseBurger, { class: "-ms-3" }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if ((_c = (_b = (_a = unref(app).tairo) == null ? void 0 : _a.collapse) == null ? void 0 : _b.toolbar) == null ? void 0 : _c.showTitle) {
        _push(ssrRenderComponent(_component_BaseHeading, {
          as: "h1",
          size: "2xl",
          weight: "light",
          class: "text-muted-800 hidden md:block dark:text-white"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "title", {}, () => {
                _push2(`${ssrInterpolate(unref(route).meta.title)}`);
              }, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "title", {}, () => [
                  createTextVNode(toDisplayString(unref(route).meta.title), 1)
                ])
              ];
            }
          }),
          _: 3
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="ms-auto"></div><!--[-->`);
      ssrRenderList((_f = (_e = (_d = unref(app).tairo) == null ? void 0 : _d.collapse) == null ? void 0 : _e.toolbar) == null ? void 0 : _f.tools, (tool) => {
        _push(`<!--[-->`);
        if (tool.component) {
          ssrRenderVNode(_push, createVNode(resolveDynamicComponent(("resolveComponentOrNative" in _ctx ? _ctx.resolveComponentOrNative : unref(resolveComponentOrNative))(tool.component)), mergeProps({
            key: tool.component
          }, tool.props), null), _parent);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/tairo-layout-collapse/components/TairoCollapseToolbar.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "TairoCollapseCircularMenu",
  __ssrInlineRender: true,
  setup(__props) {
    const { y } = useNinjaWindowScroll();
    const app = useAppConfig();
    const isOpened = ref(false);
    const isScrolled = computed(() => {
      if (y.value < 60) {
        isOpened.value = false;
      }
      return y.value > 60;
    });
    const toolOffsets = [
      "translate-x-[-6.5em] rtl:translate-x-[6.5em] translate-y-[-0.25em]",
      "translate-x-[-5.75em] rtl:translate-x-[5.75em] translate-y-[3em]",
      "translate-x-[-3.15em] rtl:translate-x-[3.15em] translate-y-[5.5em]",
      "translate-x-[0em] translate-y-[6.5em]"
    ];
    const tools = computed(() => {
      var _a, _b, _c, _d;
      return ((_d = (_c = (_b = (_a = app.tairo) == null ? void 0 : _a.collapse) == null ? void 0 : _b.circularMenu) == null ? void 0 : _c.tools) == null ? void 0 : _d.slice(0, 4)) || [];
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["after:bg-primary-600 after:shadow-primary-500/50 dark:after:shadow-muted-800/10 fixed end-[1em] top-[0.6em] z-[90] transition-transform duration-300 after:absolute after:right-0 after:top-0 after:block after:size-12 after:rounded-full after:shadow-lg after:transition-transform after:duration-300 after:content-['']", [
          unref(isOpened) ? "after:ease-[cubic-bezier(0.68, 1.55, 0.265, 1)] after:scale-[5.5]" : "",
          unref(isScrolled) ? "" : "-translate-y-24"
        ]]
      }, _attrs))}><button type="button" class="bg-primary-500 shadow-primary-500/50 dark:shadow-muted-800/10 relative z-30 flex size-12 items-center justify-center rounded-full text-white shadow-lg"><span class="${ssrRenderClass([unref(isOpened) ? "scale-90 top-0" : "-top-0.5", "relative block size-3 transition-all duration-300"])}"><span class="${ssrRenderClass([unref(isOpened) ? "-rotate-45 top-1" : "top-0.5", "bg-muted-50 absolute block h-0.5 w-full transition-all duration-300"])}"></span><span class="${ssrRenderClass([unref(isOpened) ? "opacity-0 translate-x-4" : "", "bg-muted-50 absolute top-1/2 block h-0.5 w-full transition-all duration-300"])}"></span><span class="${ssrRenderClass([unref(isOpened) ? "rotate-45 bottom-1.5" : "bottom-0", "bg-muted-50 absolute block h-0.5 w-full transition-all duration-300"])}"></span></span></button><div><!--[-->`);
      ssrRenderList(unref(tools), (tool, idx) => {
        _push(`<!--[-->`);
        if (tool.component) {
          _push(`<div class="${ssrRenderClass([unref(isOpened) ? toolOffsets[idx] : "translate-x-0 translate-y-0", "absolute right-[0.2em] top-[0.2em] z-20 flex items-center justify-center transition-all duration-300"])}">`);
          ssrRenderVNode(_push, createVNode(resolveDynamicComponent(("resolveComponentOrNative" in _ctx ? _ctx.resolveComponentOrNative : unref(resolveComponentOrNative))(tool.component)), tool.props, null), _parent);
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/tairo-layout-collapse/components/TairoCollapseCircularMenu.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "TairoCollapseLayout",
  __ssrInlineRender: true,
  props: {
    collapse: { type: Boolean, default: true },
    toolbar: { type: Boolean, default: true },
    circularMenu: { type: Boolean, default: true },
    condensed: { type: Boolean },
    horizontalScroll: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const app = useAppConfig();
    const { isOpen, isMobileOpen, toggle } = useCollapse();
    const collapseEnabled = computed(() => {
      var _a, _b, _c;
      return ((_c = (_b = (_a = app.tairo) == null ? void 0 : _a.collapse) == null ? void 0 : _b.navigation) == null ? void 0 : _c.enabled) !== false && props.collapse !== false;
    });
    const toolbarEnabled = computed(() => {
      var _a, _b, _c;
      return ((_c = (_b = (_a = app.tairo) == null ? void 0 : _a.collapse) == null ? void 0 : _b.toolbar) == null ? void 0 : _c.enabled) !== false && props.toolbar !== false;
    });
    const circularMenuEnabled = computed(() => {
      var _a, _b, _c;
      return ((_c = (_b = (_a = app.tairo) == null ? void 0 : _a.collapse) == null ? void 0 : _b.circularMenu) == null ? void 0 : _c.enabled) !== false && props.circularMenu !== false;
    });
    const mainClass = computed(() => {
      if (props.condensed) {
        return "bg-muted-100 dark:bg-muted-900 relative min-h-screen w-full overflow-x-hidden";
      }
      if (!collapseEnabled.value) {
        return "bg-muted-100 dark:bg-muted-900 relative min-h-screen w-full overflow-x-hidden px-4 transition-all duration-300 xl:px-10";
      }
      const list = [
        "bg-muted-100 dark:bg-muted-900 relative min-h-screen w-full overflow-x-hidden px-4 transition-all duration-300 xl:px-10"
      ];
      if (isOpen.value) {
        list.push("lg:max-w-[calc(100%_-_280px)] lg:ms-[280px]");
      } else {
        list.push("lg:max-w-[calc(100%_-_80px)] lg:ms-[80px]");
      }
      if (props.horizontalScroll) {
        list.push("!pe-0 xl:!pe-0");
      }
      return list;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TairoCollapseNavigation = _sfc_main$5;
      const _component_TairoCollapseToolbar = _sfc_main$3;
      const _component_TairoPanels = _sfc_main$8;
      const _component_TairoCollapseCircularMenu = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-muted-100 dark:bg-muted-900 pb-20" }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "navigation", {}, () => {
        if (unref(collapseEnabled)) {
          _push(ssrRenderComponent(_component_TairoCollapseNavigation, null, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<div role="button" tabindex="0" class="${ssrRenderClass([
          unref(isMobileOpen) ? "opacity-50 dark:opacity-75" : "opacity-0 pointer-events-none",
          "bg-muted-800 dark:bg-muted-900 fixed start-0 top-0 z-[59] block size-full transition-opacity duration-300 lg:hidden"
        ])}"></div>`);
      }, _push, _parent);
      _push(`<div class="${ssrRenderClass(unref(mainClass))}"><div class="${ssrRenderClass([
        props.condensed && !props.horizontalScroll && "w-full",
        !props.condensed && props.horizontalScroll && "mx-auto w-full",
        !props.condensed && !props.horizontalScroll && "mx-auto w-full max-w-7xl"
      ])}">`);
      ssrRenderSlot(_ctx.$slots, "toolbar", {}, () => {
        if (unref(toolbarEnabled)) {
          _push(ssrRenderComponent(_component_TairoCollapseToolbar, {
            collapse: props.collapse,
            "horizontal-scroll": props.horizontalScroll
          }, {
            title: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                ssrRenderSlot(_ctx.$slots, "toolbar-title", {}, null, _push2, _parent2, _scopeId);
              } else {
                return [
                  renderSlot(_ctx.$slots, "toolbar-title")
                ];
              }
            }),
            _: 3
          }, _parent));
        } else {
          _push(`<!---->`);
        }
      }, _push, _parent);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div>`);
      _push(ssrRenderComponent(_component_TairoPanels, null, null, _parent));
      if (unref(circularMenuEnabled)) {
        _push(ssrRenderComponent(_component_TairoCollapseCircularMenu, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/tairo-layout-collapse/components/TairoCollapseLayout.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_TairoCollapseLayout = _sfc_main$1;
  _push(ssrRenderComponent(_component_TairoCollapseLayout, _attrs, {
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
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/tairo-layout-collapse/layouts/collapse.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const collapse = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { collapse as default };
//# sourceMappingURL=collapse-D79yPw3h.mjs.map
