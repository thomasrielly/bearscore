import { _ as _sfc_main$4 } from './BaseButtonClose-Dwwfm2FK.mjs';
import { f as useRoute, q as useAppConfig, x as resolveComponentOrNative, i as useState, w as useNinjaWindowScroll, e as __nuxt_component_1, a as _sfc_main$b, _ as __nuxt_component_2, y as _sfc_main$8, b as _sfc_main$3$1 } from './server.mjs';
import { _ as _sfc_main$5 } from './BaseText-Bvoloqme.mjs';
import { useSSRContext, defineComponent, computed, unref, withCtx, createVNode, resolveDynamicComponent, mergeProps, openBlock, createBlock, Fragment, renderList, createCommentVNode, renderSlot, createTextVNode, toDisplayString, watch, ref } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderComponent, ssrRenderList, ssrRenderVNode, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';

function useTopnav() {
  const route = useRoute();
  const app = useAppConfig();
  const menuItems = computed(() => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
    if (((_c = (_b = (_a = app.tairo) == null ? void 0 : _a.topnav) == null ? void 0 : _b.navigation) == null ? void 0 : _c.enabled) === false || ((_g = (_f = (_e = (_d = app.tairo) == null ? void 0 : _d.topnav) == null ? void 0 : _e.navigation) == null ? void 0 : _f.items) == null ? void 0 : _g.length) === 0) {
      return [];
    }
    return (_k = (_j = (_i = (_h = app.tairo) == null ? void 0 : _h.topnav) == null ? void 0 : _i.navigation) == null ? void 0 : _j.items) == null ? void 0 : _k.map(
      (navigation) => ({
        ...navigation
      })
    );
  });
  const isMobileOpen = useState("collapse-open", () => false);
  const activeMenuItem = computed(() => {
    var _a;
    return (_a = menuItems.value) == null ? void 0 : _a.find((item) => {
      if (item.activePath) {
        return route.path.startsWith(item.activePath);
      }
      if (item.to) {
        return route.path.startsWith(item.to.toString());
      }
      return false;
    });
  });
  const selectedMenuItem = useState(
    "topnav-selected-menu-item",
    () => activeMenuItem.value
  );
  watch(activeMenuItem, (item) => {
    selectedMenuItem.value = item;
  });
  return {
    menuItems,
    activeMenuItem,
    selectedMenuItem,
    isMobileOpen
  };
}
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "TairoTopnavNavigation",
  __ssrInlineRender: true,
  props: {
    display: { default: "expanded-md" },
    position: { default: "absolute" }
  },
  setup(__props) {
    const props = __props;
    const { menuItems, isMobileOpen } = useTopnav();
    useAppConfig();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BaseButtonClose = _sfc_main$4;
      const _component_BaseButton = _sfc_main$3$1;
      const _component_NuxtLink = __nuxt_component_1;
      const _component_BaseText = _sfc_main$5;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["dark:bg-muted-800 border-muted-200 dark:border-muted-700 left-0 top-0 z-40 w-full border-b bg-white transition-all duration-300", [
          props.position === "fixed" && "fixed",
          props.position === "absolute" && "absolute"
        ]]
      }, _attrs))}><nav class="${ssrRenderClass([[
        props.display === "condensed" && "w-full",
        props.display === "horizontal-scroll" && "mx-auto w-full pe-4",
        props.display === "expanded-sm" && "mx-auto w-full max-w-5xl px-4 lg:px-0",
        props.display === "expanded-md" && "mx-auto w-full max-w-6xl px-4 lg:px-0",
        props.display === "expanded-lg" && "mx-auto w-full max-w-7xl px-4 lg:px-0",
        props.display === "expanded-xl" && "mx-auto w-full px-4 lg:px-0"
      ], "relative"])}"><div class="flex w-full flex-col items-center justify-between md:h-16 md:flex-row"><div class="w-full grow md:w-auto">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div><div class="${ssrRenderClass([unref(isMobileOpen) ? "flex" : "hidden", "dark:bg-muted-800 fixed start-0 top-0 z-20 w-full grow items-center bg-white p-3 md:static md:z-0 md:block md:w-auto md:bg-transparent md:p-0"])}"><div class="me-auto block md:hidden">`);
      _push(ssrRenderComponent(_component_BaseButtonClose, {
        color: "muted",
        rounded: "full",
        onClick: ($event) => isMobileOpen.value = false
      }, null, _parent));
      _push(`</div>`);
      ssrRenderSlot(_ctx.$slots, "toolbar", {}, () => {
        _push(ssrRenderComponent(_component_BaseButton, {
          to: "#",
          color: "primary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Get Started `);
            } else {
              return [
                createTextVNode(" Get Started ")
              ];
            }
          }),
          _: 1
        }, _parent));
      }, _push, _parent);
      _push(`</div></div></nav><div class="${ssrRenderClass([[
        props.display === "condensed" && "w-full",
        props.display === "horizontal-scroll" && "mx-auto w-full overflow-x-auto",
        props.display === "expanded-sm" && "mx-auto w-full max-w-5xl",
        props.display === "expanded-md" && "mx-auto w-full max-w-6xl",
        props.display === "expanded-lg" && "mx-auto w-full max-w-7xl",
        props.display === "expanded-xl" && "mx-auto w-full"
      ], "flex items-center"])}"><div class="flex overflow-x-auto lg:overflow-x-hidden"><!--[-->`);
      ssrRenderList(unref(menuItems), (item, index) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: index,
          to: item.to,
          class: "text-muted-400 hover:text-muted-500 dark:text-muted-500 dark:hover:text-muted-400 flex items-center justify-center border-b-2 border-transparent p-3 text-center transition-colors duration-300",
          "exact-active-class": "!border-primary-500 !text-muted-800 dark:!text-muted-100"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_BaseText, { size: "sm" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(item.name)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(item.name), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_BaseText, { size: "sm" }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(item.name), 1)
                  ]),
                  _: 2
                }, 1024)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/tairo-layout-topnav/components/TairoTopnavNavigation.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "TairoTopnavCircularMenu",
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
        class: ["after:bg-primary-600 after:shadow-primary-500/50 dark:after:shadow-muted-800/10 fixed bottom-[0.6em] end-[1em] z-[90] rotate-90 transition-transform duration-300 after:absolute after:end-0 after:top-0 after:block after:size-12 after:rounded-full after:shadow-lg after:transition-transform after:duration-300 after:content-['']", [
          unref(isOpened) ? "after:ease-[cubic-bezier(0.68, 1.55, 0.265, 1)] after:scale-[5.5]" : "",
          unref(isScrolled) ? "" : "translate-y-24"
        ]]
      }, _attrs))}><button type="button" class="bg-primary-500 shadow-primary-500/50 dark:shadow-muted-800/10 relative z-30 flex size-12 -rotate-90 items-center justify-center rounded-full text-white shadow-lg"><span class="${ssrRenderClass([unref(isOpened) ? "scale-90 top-0" : "-top-0.5", "relative block size-3 transition-all duration-300"])}"><span class="${ssrRenderClass([unref(isOpened) ? "-rotate-45 top-1" : "top-0.5", "bg-muted-50 absolute block h-0.5 w-full transition-all duration-300"])}"></span><span class="${ssrRenderClass([unref(isOpened) ? "opacity-0 translate-x-4" : "", "bg-muted-50 absolute top-1/2 block h-0.5 w-full transition-all duration-300"])}"></span><span class="${ssrRenderClass([unref(isOpened) ? "rotate-45 bottom-1.5" : "bottom-0", "bg-muted-50 absolute block h-0.5 w-full transition-all duration-300"])}"></span></span></button><div><!--[-->`);
      ssrRenderList(unref(tools), (tool, idx) => {
        _push(`<!--[-->`);
        if (tool.component) {
          _push(`<div class="${ssrRenderClass([unref(isOpened) ? toolOffsets[idx] : "translate-x-0 translate-y-0", "absolute end-[0.2em] top-[0.2em] z-20 flex -rotate-90 items-center justify-center transition-all duration-300"])}">`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/tairo-layout-topnav/components/TairoTopnavCircularMenu.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "TairoTopnavFooter",
  __ssrInlineRender: true,
  props: {
    display: { default: "expanded-lg" }
  },
  setup(__props) {
    var _a;
    const props = __props;
    const config = (_a = useAppConfig().tairo.topnav) == null ? void 0 : _a.footer;
    const year = (/* @__PURE__ */ new Date()).getFullYear();
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
      const _component_NuxtLink = __nuxt_component_1;
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "dark:bg-muted-900 border-muted-200 dark:border-muted-700 bg-muted-50 relative border-t" }, _attrs))}>`);
      if ((_b = (_a2 = unref(config)) == null ? void 0 : _a2.logoSeparator) == null ? void 0 : _b.component) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          "aria-label": "Go to Homepage",
          class: "dark:bg-muted-900 bg-muted-50 absolute inset-x-0 -top-4 mx-auto flex h-9 w-14 items-center justify-center"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(("resolveComponentOrNative" in _ctx ? _ctx.resolveComponentOrNative : unref(resolveComponentOrNative))(unref(config).logoSeparator.component)), unref(config).logoSeparator.props, null), _parent2, _scopeId);
            } else {
              return [
                (openBlock(), createBlock(resolveDynamicComponent(("resolveComponentOrNative" in _ctx ? _ctx.resolveComponentOrNative : unref(resolveComponentOrNative))(unref(config).logoSeparator.component)), unref(config).logoSeparator.props, null, 16))
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="${ssrRenderClass([[
        props.display === "expanded-sm" && "mx-auto w-full max-w-5xl",
        props.display === "expanded-md" && "mx-auto w-full max-w-6xl",
        props.display === "expanded-lg" && "mx-auto w-full max-w-7xl",
        props.display === "expanded-xl" && "mx-auto w-full"
      ], "ltablet:flex-row mx-auto flex flex-col items-center justify-between px-6 py-8 lg:flex-row"])}">`);
      if ((_d = (_c = unref(config)) == null ? void 0 : _c.logo) == null ? void 0 : _d.component) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          "aria-label": "Go to Homepage",
          class: "ltablet:w-1/5 block w-full lg:w-1/5"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(("resolveComponentOrNative" in _ctx ? _ctx.resolveComponentOrNative : unref(resolveComponentOrNative))(unref(config).logo.component)), unref(config).logo.props, null), _parent2, _scopeId);
            } else {
              return [
                (openBlock(), createBlock(resolveDynamicComponent(("resolveComponentOrNative" in _ctx ? _ctx.resolveComponentOrNative : unref(resolveComponentOrNative))(unref(config).logo.component)), unref(config).logo.props, null, 16))
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<div class="ltablet:w-1/5 block w-full lg:w-1/5"></div>`);
      }
      _push(`<div class="ltablet:mt-0 ltablet:gap-6 mt-6 flex flex-wrap items-center justify-center gap-4 lg:mt-0 lg:gap-6"><!--[-->`);
      ssrRenderList((_e = unref(config)) == null ? void 0 : _e.links, (link) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: link.to,
          to: link.to,
          rel: link.rel,
          target: link.target,
          class: "text-muted-600 hover:text-primary-500 dark:text-muted-200 dark:hover:text-primary-400 text-sm transition-colors duration-300"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(link.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(link.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div><div class="text-muted-500 dark:text-muted-400 ltablet:w-1/5 ltablet:justify-end ltablet:mt-0 mt-6 flex w-full items-center justify-center text-sm lg:mt-0 lg:w-1/5 lg:justify-end">`);
      if (((_g = (_f = unref(config)) == null ? void 0 : _f.copyright) == null ? void 0 : _g.name) && ((_i = (_h = unref(config)) == null ? void 0 : _h.copyright) == null ? void 0 : _i.to)) {
        _push(`<span class="inline-flex gap-1"><span>\xA9</span>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: unref(config).copyright.to,
          target: "_blank",
          rel: "noopener",
          class: "text-muted-600 hover:text-primary-500 dark:text-muted-200 dark:hover:text-primary-400 text-sm transition-colors duration-300"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(config).copyright.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(config).copyright.name), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        if ((_k = (_j = unref(config)) == null ? void 0 : _j.copyright) == null ? void 0 : _k.since) {
          _push(`<span>${ssrInterpolate(unref(config).copyright.since)}-${ssrInterpolate(unref(year))}.</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></footer>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/tairo-layout-topnav/components/TairoTopnavFooter.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TairoTopnavLayout",
  __ssrInlineRender: true,
  props: {
    topnav: { type: Boolean, default: true },
    toolbar: { type: Boolean, default: true },
    circularMenu: { type: Boolean, default: true },
    display: { default: "expanded-lg" }
  },
  setup(__props) {
    var _a;
    const props = __props;
    const route = useRoute();
    const config = (_a = useAppConfig().tairo) == null ? void 0 : _a.topnav;
    const { isMobileOpen } = useTopnav();
    const topnavEnabled = computed(() => {
      var _a2;
      return ((_a2 = config == null ? void 0 : config.navigation) == null ? void 0 : _a2.enabled) !== false && props.topnav !== false;
    });
    const toolbarEnabled = computed(() => {
      var _a2;
      return ((_a2 = config == null ? void 0 : config.toolbar) == null ? void 0 : _a2.enabled) !== false && props.toolbar !== false;
    });
    const circularMenuEnabled = computed(() => {
      var _a2;
      return ((_a2 = config == null ? void 0 : config.circularMenu) == null ? void 0 : _a2.enabled) !== false && props.circularMenu !== false;
    });
    const mainClass = computed(() => {
      if (props.display === "condensed") {
        return "bg-muted-50 dark:bg-muted-900 relative min-h-screen w-full overflow-x-hidden";
      }
      if (!topnavEnabled.value) {
        return "bg-muted-50 dark:bg-muted-900 relative min-h-screen w-full overflow-x-hidden px-4 transition-all duration-300 xl:px-10";
      }
      const list = [
        "bg-muted-50 dark:bg-muted-900 relative min-h-screen w-full overflow-x-hidden px-4 transition-all duration-300 xl:px-10"
      ];
      if (props.display === "horizontal-scroll") {
        list.push("!pe-0 xl:!pe-0");
      }
      return list;
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b;
      const _component_TairoTopnavNavigation = _sfc_main$3;
      const _component_NuxtLink = __nuxt_component_1;
      const _component_BaseHeading = _sfc_main$b;
      const _component_Icon = __nuxt_component_2;
      const _component_TairoPanels = _sfc_main$8;
      const _component_TairoTopnavCircularMenu = _sfc_main$2;
      const _component_TairoTopnavFooter = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="dark:bg-muted-900 bg-muted-50 pb-20">`);
      ssrRenderSlot(_ctx.$slots, "navigation", {}, () => {
        if (unref(topnavEnabled)) {
          _push(ssrRenderComponent(_component_TairoTopnavNavigation, {
            display: props.display,
            position: "fixed"
          }, {
            toolbar: withCtx((_, _push2, _parent2, _scopeId) => {
              var _a3, _b2, _c, _d;
              if (_push2) {
                if (unref(toolbarEnabled)) {
                  _push2(`<div${_scopeId}><div class="flex items-center justify-end gap-4 md:gap-2"${_scopeId}><!--[-->`);
                  ssrRenderList((_b2 = (_a3 = unref(config)) == null ? void 0 : _a3.toolbar) == null ? void 0 : _b2.tools, (tool) => {
                    _push2(`<!--[-->`);
                    if (tool.component) {
                      ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(("resolveComponentOrNative" in _ctx ? _ctx.resolveComponentOrNative : unref(resolveComponentOrNative))(tool.component)), mergeProps({
                        key: tool.component
                      }, tool.props), null), _parent2, _scopeId);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`<!--]-->`);
                  });
                  _push2(`<!--]--></div></div>`);
                } else {
                  _push2(`<!---->`);
                }
              } else {
                return [
                  unref(toolbarEnabled) ? (openBlock(), createBlock("div", { key: 0 }, [
                    createVNode("div", { class: "flex items-center justify-end gap-4 md:gap-2" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList((_d = (_c = unref(config)) == null ? void 0 : _c.toolbar) == null ? void 0 : _d.tools, (tool) => {
                        return openBlock(), createBlock(Fragment, null, [
                          tool.component ? (openBlock(), createBlock(resolveDynamicComponent(("resolveComponentOrNative" in _ctx ? _ctx.resolveComponentOrNative : unref(resolveComponentOrNative))(tool.component)), mergeProps({
                            key: tool.component
                          }, tool.props), null, 16)) : createCommentVNode("", true)
                        ], 64);
                      }), 256))
                    ])
                  ])) : createCommentVNode("", true)
                ];
              }
            }),
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              var _a3, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B;
              if (_push2) {
                if ((_c = (_b2 = (_a3 = unref(config)) == null ? void 0 : _a3.navigation) == null ? void 0 : _b2.logo) == null ? void 0 : _c.component) {
                  _push2(`<div class="flex h-16 w-full items-center gap-x-4"${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_NuxtLink, {
                    to: "/",
                    class: "flex items-center justify-center"
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      var _a4, _b3, _c2, _d2;
                      if (_push3) {
                        ssrRenderVNode(_push3, createVNode(resolveDynamicComponent(
                          ("resolveComponentOrNative" in _ctx ? _ctx.resolveComponentOrNative : unref(resolveComponentOrNative))((_a4 = unref(config)) == null ? void 0 : _a4.navigation.logo.component)
                        ), (_b3 = unref(config)) == null ? void 0 : _b3.navigation.logo.props, null), _parent3, _scopeId2);
                      } else {
                        return [
                          (openBlock(), createBlock(resolveDynamicComponent(
                            ("resolveComponentOrNative" in _ctx ? _ctx.resolveComponentOrNative : unref(resolveComponentOrNative))((_c2 = unref(config)) == null ? void 0 : _c2.navigation.logo.component)
                          ), (_d2 = unref(config)) == null ? void 0 : _d2.navigation.logo.props, null, 16))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent2, _scopeId));
                  if ((_e = (_d = unref(config)) == null ? void 0 : _d.toolbar) == null ? void 0 : _e.showTitle) {
                    _push2(ssrRenderComponent(_component_BaseHeading, {
                      as: "h1",
                      size: "lg",
                      weight: "light",
                      class: "text-muted-800 hidden md:block dark:text-white"
                    }, {
                      default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                        if (_push3) {
                          ssrRenderSlot(_ctx.$slots, "title", {}, () => {
                            _push3(`${ssrInterpolate(unref(route).meta.title)}`);
                          }, _push3, _parent3, _scopeId2);
                        } else {
                          return [
                            renderSlot(_ctx.$slots, "title", {}, () => [
                              createTextVNode(toDisplayString(unref(route).meta.title), 1)
                            ])
                          ];
                        }
                      }),
                      _: 3
                    }, _parent2, _scopeId));
                  } else {
                    _push2(`<!---->`);
                  }
                  if ((_h = (_g = (_f = unref(config)) == null ? void 0 : _f.navigation) == null ? void 0 : _g.header) == null ? void 0 : _h.component) {
                    ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(
                      ("resolveComponentOrNative" in _ctx ? _ctx.resolveComponentOrNative : unref(resolveComponentOrNative))((_k = (_j = (_i = unref(config)) == null ? void 0 : _i.navigation) == null ? void 0 : _j.header) == null ? void 0 : _k.component)
                    ), (_n = (_m = (_l = unref(config)) == null ? void 0 : _l.navigation) == null ? void 0 : _m.header) == null ? void 0 : _n.props, null), _parent2, _scopeId);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<div class="flex items-center justify-center md:hidden"${_scopeId}><button type="button"${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_Icon, {
                    name: "lucide:menu",
                    class: "text-muted-400 size-6"
                  }, null, _parent2, _scopeId));
                  _push2(`</button></div></div>`);
                } else {
                  _push2(`<!---->`);
                }
              } else {
                return [
                  ((_q = (_p = (_o = unref(config)) == null ? void 0 : _o.navigation) == null ? void 0 : _p.logo) == null ? void 0 : _q.component) ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "flex h-16 w-full items-center gap-x-4"
                  }, [
                    createVNode(_component_NuxtLink, {
                      to: "/",
                      class: "flex items-center justify-center"
                    }, {
                      default: withCtx(() => {
                        var _a4, _b3;
                        return [
                          (openBlock(), createBlock(resolveDynamicComponent(
                            ("resolveComponentOrNative" in _ctx ? _ctx.resolveComponentOrNative : unref(resolveComponentOrNative))((_a4 = unref(config)) == null ? void 0 : _a4.navigation.logo.component)
                          ), (_b3 = unref(config)) == null ? void 0 : _b3.navigation.logo.props, null, 16))
                        ];
                      }),
                      _: 1
                    }),
                    ((_s = (_r = unref(config)) == null ? void 0 : _r.toolbar) == null ? void 0 : _s.showTitle) ? (openBlock(), createBlock(_component_BaseHeading, {
                      key: 0,
                      as: "h1",
                      size: "lg",
                      weight: "light",
                      class: "text-muted-800 hidden md:block dark:text-white"
                    }, {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "title", {}, () => [
                          createTextVNode(toDisplayString(unref(route).meta.title), 1)
                        ])
                      ]),
                      _: 3
                    })) : createCommentVNode("", true),
                    ((_v = (_u = (_t = unref(config)) == null ? void 0 : _t.navigation) == null ? void 0 : _u.header) == null ? void 0 : _v.component) ? (openBlock(), createBlock(resolveDynamicComponent(
                      ("resolveComponentOrNative" in _ctx ? _ctx.resolveComponentOrNative : unref(resolveComponentOrNative))((_y = (_x = (_w = unref(config)) == null ? void 0 : _w.navigation) == null ? void 0 : _x.header) == null ? void 0 : _y.component)
                    ), mergeProps({ key: 1 }, (_B = (_A = (_z = unref(config)) == null ? void 0 : _z.navigation) == null ? void 0 : _A.header) == null ? void 0 : _B.props), null, 16)) : createCommentVNode("", true),
                    createVNode("div", { class: "flex items-center justify-center md:hidden" }, [
                      createVNode("button", {
                        type: "button",
                        onClick: ($event) => isMobileOpen.value = true
                      }, [
                        createVNode(_component_Icon, {
                          name: "lucide:menu",
                          class: "text-muted-400 size-6"
                        })
                      ], 8, ["onClick"])
                    ])
                  ])) : createCommentVNode("", true)
                ];
              }
            }),
            _: 3
          }, _parent));
        } else {
          _push(`<!---->`);
        }
      }, _push, _parent);
      _push(`<div class="${ssrRenderClass(unref(mainClass))}"><div class="${ssrRenderClass([[
        props.display === "condensed" && "w-full",
        props.display === "horizontal-scroll" && "mx-auto w-full overflow-x-auto",
        props.display === "expanded-sm" && "mx-auto w-full max-w-5xl",
        props.display === "expanded-md" && "mx-auto w-full max-w-6xl",
        props.display === "expanded-lg" && "mx-auto w-full max-w-7xl",
        props.display === "expanded-xl" && "mx-auto w-full"
      ], "pt-40 md:pt-36"])}">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div>`);
      _push(ssrRenderComponent(_component_TairoPanels, null, null, _parent));
      if (unref(circularMenuEnabled)) {
        _push(ssrRenderComponent(_component_TairoTopnavCircularMenu, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if ((_b = (_a2 = unref(config)) == null ? void 0 : _a2.footer) == null ? void 0 : _b.enabled) {
        _push(ssrRenderComponent(_component_TairoTopnavFooter, {
          display: props.display
        }, null, _parent));
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/tairo-layout-topnav/components/TairoTopnavLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=TairoTopnavLayout-CCYTXgLz.mjs.map
