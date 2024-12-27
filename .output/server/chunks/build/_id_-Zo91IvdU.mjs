import { useSSRContext, defineComponent, ref, onUpdated, h, mergeProps, withCtx, renderSlot, createVNode, computed, unref, toDisplayString, createTextVNode, withKeys, openBlock, createBlock, createCommentVNode, Fragment, renderList, watch, TransitionGroup } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderSlot, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList } from 'vue/server-renderer';
import { c as _export_sfc, u as useNuiDefaultProperty, f as useRoute, _ as __nuxt_component_2, a as _sfc_main$b, e as __nuxt_component_1, b as _sfc_main$3$1, g as _sfc_main$5$1 } from './server.mjs';
import { _ as _sfc_main$c } from './BaseInput-CmYsBoKW.mjs';
import { _ as _sfc_main$8 } from './BaseCard-CHm243us.mjs';
import { _ as _sfc_main$9 } from './BaseAvatar-Br9MXJI3.mjs';
import { _ as _sfc_main$a } from './BaseParagraph-BooaUBVB.mjs';
import { _ as _sfc_main$d } from './BaseTag--Kgv_21F.mjs';
import { o as onKeyStroke } from './index-BCPoQdcH.mjs';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { useRoute as useRoute$1, useRouter } from 'vue-router';
import { d as demosData } from './demos-Cj8BemVk.mjs';
import '../routes/api/fetchData.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'consola/core';
import 'mongoose';
import 'node:fs';
import 'node:url';
import 'unhead';
import '@unhead/shared';
import '@iconify/vue/dist/offline';
import '@iconify/vue';
import './BaseInputHelpText-DNMtrE4A.mjs';
import './input-id-DYCO6xqi.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';

const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "TairoContentWrapper",
  __ssrInlineRender: true,
  props: {
    reverse: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if ("left" in _ctx.$slots || "right" in _ctx.$slots) {
        _push(`<div class="${ssrRenderClass([props.reverse && "sm:flex-row-reverse", "mb-6 flex w-full flex-col items-center justify-between gap-4 sm:flex-row"])}"><div class="flex w-full items-center gap-4 sm:w-auto">`);
        ssrRenderSlot(_ctx.$slots, "left", {}, null, _push, _parent);
        _push(`</div><div class="flex w-full items-center justify-end gap-4 sm:w-auto">`);
        ssrRenderSlot(_ctx.$slots, "right", {}, null, _push, _parent);
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/tairo/components/TairoContentWrapper.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "DemoFlexTableRow",
  __ssrInlineRender: true,
  props: {
    rounded: {},
    spaced: { type: Boolean },
    condensed: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BaseCard = _sfc_main$8;
      _push(ssrRenderComponent(_component_BaseCard, mergeProps({
        rounded: props.rounded,
        class: ["relative", [
          props.spaced ? "px-2 py-6 sm:py-4" : "py-6 sm:py-2",
          props.condensed ? "top-px first:rounded-t-lg last:rounded-b-lg [&:not(:first-child)]:border-t-0" : ""
        ]]
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            _push2(`<div class="flex w-full flex-col sm:flex-row sm:items-center"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "start", {}, null, _push2, _parent2, _scopeId);
            _push2(`<div class="flex flex-col gap-2 sm:flex-row sm:items-center"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "end", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div></div>`);
          } else {
            return [
              renderSlot(_ctx.$slots, "default"),
              createVNode("div", { class: "flex w-full flex-col sm:flex-row sm:items-center" }, [
                renderSlot(_ctx.$slots, "start"),
                createVNode("div", { class: "flex flex-col gap-2 sm:flex-row sm:items-center" }, [
                  renderSlot(_ctx.$slots, "end")
                ])
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/DemoFlexTableRow.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "BaseIconBox",
  __ssrInlineRender: true,
  props: {
    mask: { default: void 0 },
    bordered: { type: Boolean, default: false },
    color: { default: void 0 },
    rounded: { default: void 0 },
    size: { default: void 0 },
    variant: { default: void 0 }
  },
  setup(__props) {
    const props = __props;
    const color = useNuiDefaultProperty(props, "BaseIconBox", "color");
    const rounded = useNuiDefaultProperty(props, "BaseIconBox", "rounded");
    const size = useNuiDefaultProperty(props, "BaseIconBox", "size");
    const variant = useNuiDefaultProperty(props, "BaseIconBox", "variant");
    const radiuses = {
      none: "",
      sm: "nui-box-rounded-sm",
      md: "nui-box-rounded-md",
      lg: "nui-box-rounded-lg",
      full: "nui-box-rounded-full"
    };
    const sizes = {
      xs: "nui-box-xs",
      sm: "nui-box-sm",
      md: "nui-box-md",
      lg: "nui-box-lg",
      xl: "nui-box-xl",
      "2xl": "nui-box-2xl"
    };
    const variants = {
      solid: "nui-box-solid",
      pastel: "nui-box-pastel",
      outline: "nui-box-outline"
    };
    const colors = {
      none: "",
      default: "nui-box-default",
      "default-contrast": "nui-box-default-contrast",
      muted: "nui-box-muted",
      "muted-contrast": "nui-box-muted-contrast",
      light: "nui-box-light",
      dark: "nui-box-dark",
      black: "nui-box-black",
      primary: "nui-box-primary",
      info: "nui-box-info",
      success: "nui-box-success",
      warning: "nui-box-warning",
      danger: "nui-box-danger"
    };
    const masks = {
      hex: "nui-mask nui-mask-hex",
      hexed: "nui-mask nui-mask-hexed",
      deca: "nui-mask nui-mask-deca",
      blob: "nui-mask nui-mask-blob",
      diamond: "nui-mask nui-mask-diamond"
    };
    const classes = computed(() => [
      "nui-icon-box",
      props.bordered && "nui-box-bordered",
      rounded.value && radiuses[rounded.value],
      size.value && sizes[size.value],
      variant.value && variants[variant.value],
      color.value && colors[color.value],
      rounded.value === "none" && props.mask && masks[props.mask]
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: unref(classes) }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@shuriken-ui+nuxt@3.1.5_nuxt@3.11.2_vue@3.4.21/node_modules/@shuriken-ui/nuxt/components/base/BaseIconBox.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "DemoFlexTableStart",
  __ssrInlineRender: true,
  props: {
    title: {},
    subtitle: { default: void 0 },
    icon: { default: void 0 },
    picture: { default: void 0 },
    avatar: { default: void 0 },
    badge: { default: void 0 },
    initials: { default: void 0 },
    label: { default: void 0 },
    hideLabel: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BaseAvatar = _sfc_main$9;
      const _component_BaseIconBox = _sfc_main$5;
      const _component_Icon = __nuxt_component_2;
      const _component_BaseHeading = _sfc_main$b;
      const _component_BaseParagraph = _sfc_main$a;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["relative mb-4 flex grow items-center gap-2 px-6 sm:mb-0 sm:px-2", props.picture && !props.avatar && !props.icon ? "" : "h-10"]
      }, _attrs))}>`);
      if (props.label) {
        _push(`<span class="${ssrRenderClass([props.hideLabel ? "sm:hidden" : "", "text-muted-400 absolute hidden font-sans text-xs font-medium uppercase sm:-top-10 sm:start-2 sm:block"])}">${ssrInterpolate(props.label)}</span>`);
      } else {
        _push(`<!---->`);
      }
      if (props.avatar && !props.icon && !props.picture || props.initials && !props.icon && !props.picture) {
        _push(ssrRenderComponent(_component_BaseAvatar, {
          src: props.avatar,
          "badge-src": props.badge,
          text: props.initials,
          class: "bg-primary-500/20 text-primary-500",
          size: "md"
        }, null, _parent));
      } else if (props.icon && !props.avatar && !props.picture) {
        _push(ssrRenderComponent(_component_BaseIconBox, {
          icon: props.icon,
          size: "sm",
          class: "bg-primary-500/20 text-primary-500",
          color: "none"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: props.icon,
                class: "size-5"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_Icon, {
                  name: props.icon,
                  class: "size-5"
                }, null, 8, ["name"])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else if (props.picture && !props.avatar && !props.icon) {
        _push(`<div class="relative shrink-0"><img${ssrRenderAttr("src", props.picture)}${ssrRenderAttr("alt", props.title)} class="h-12 w-16 rounded-lg object-cover"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div>`);
      _push(ssrRenderComponent(_component_BaseHeading, {
        as: "h4",
        size: "sm",
        weight: "medium",
        lead: "tight",
        class: "text-muted-700 dark:text-muted-100"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>${ssrInterpolate(props.title)}</span>`);
          } else {
            return [
              createVNode("span", null, toDisplayString(props.title), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_BaseParagraph, {
        size: "xs",
        lead: "tight",
        class: "text-muted-500 dark:text-muted-400"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>${ssrInterpolate(props.subtitle)}</span>`);
          } else {
            return [
              createVNode("span", null, toDisplayString(props.subtitle), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/DemoFlexTableStart.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "DemoFlexTableCell",
  __ssrInlineRender: true,
  props: {
    label: {},
    hideLabel: { type: Boolean },
    tabletHidden: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["relative flex h-8 items-center justify-end px-6 sm:h-10 sm:justify-center sm:px-2", props.tabletHidden && "ptablet:hidden"]
      }, _attrs))}>`);
      if (props.label) {
        _push(`<span class="${ssrRenderClass([props.hideLabel ? "sm:hidden" : "", "text-muted-400 absolute start-8 top-1/2 mx-auto -translate-y-1/2 text-center font-sans text-xs font-medium uppercase sm:inset-x-0 sm:-top-10 sm:translate-y-0"])}">${ssrInterpolate(props.label)}</span>`);
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/DemoFlexTableCell.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = defineComponent({
  props: {
    /**
     * The HTML tag to use for the wrapper
     *
     * @default div
     */
    as: {
      type: String,
      default: "div"
    },
    /**
     * Keys to trigger the next focusable element
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values
     */
    nextKeys: {
      type: [Array, String],
      default: "PageDown"
    },
    /**
     * Keys to trigger the previous focusable element
     */
    prevKeys: {
      type: [Array, String],
      default: "PageUp"
    },
    /**
     * Prevent the default behavior of the keys
     */
    prevent: {
      type: Boolean,
      default: true
    }
  },
  setup(props, { slots }) {
    const wrapper = ref();
    function checkFocusables() {
    }
    onUpdated(checkFocusables);
    onKeyStroke(props.nextKeys, (event) => {
    });
    onKeyStroke(props.prevKeys, (event) => {
    });
    return () => {
      var _a;
      return h(props.as, { ref: wrapper }, (_a = slots == null ? void 0 : slots.default) == null ? void 0 : _a.call(slots));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@shuriken-ui+nuxt@3.1.5_nuxt@3.11.2_vue@3.4.21/node_modules/@shuriken-ui/nuxt/components/base/BaseFocusLoop.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "BasePagination",
  __ssrInlineRender: true,
  props: {
    itemPerPage: {},
    totalItems: {},
    currentPage: { default: 1 },
    maxLinksDisplayed: { default: 3 },
    noRouter: { type: Boolean },
    routerQueryKey: { default: "page" },
    previousIcon: { default: "lucide:chevron-left" },
    nextIcon: { default: "lucide:chevron-right" },
    ellipsis: { default: "\u2026" },
    color: { default: void 0 },
    rounded: { default: void 0 },
    classes: { default: () => ({}) }
  },
  emits: ["update:currentPage"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const color = useNuiDefaultProperty(props, "BasePagination", "color");
    const rounded = useNuiDefaultProperty(props, "BasePagination", "rounded");
    const radiuses = {
      none: "",
      sm: "nui-pagination-rounded-sm",
      md: "nui-pagination-rounded-md",
      lg: "nui-pagination-rounded-lg",
      full: "nui-pagination-rounded-full"
    };
    const colors = {
      primary: "nui-pagination-primary",
      dark: "nui-pagination-dark",
      black: "nui-pagination-black"
    };
    const route = useRoute();
    const lastPage = computed(
      () => Math.ceil(props.totalItems / props.itemPerPage) || 1
    );
    const totalPageDisplayed = computed(
      () => lastPage.value > props.maxLinksDisplayed + 2 ? props.maxLinksDisplayed + 2 : lastPage.value
    );
    const pages = computed(() => {
      const _pages = [];
      let firstButton = props.currentPage - Math.floor(totalPageDisplayed.value / 2);
      let lastButton = firstButton + (totalPageDisplayed.value - Math.ceil(totalPageDisplayed.value % 2));
      if (firstButton < 1) {
        firstButton = 1;
        lastButton = firstButton + (totalPageDisplayed.value - 1);
      }
      if (lastButton > lastPage.value) {
        lastButton = lastPage.value;
        firstButton = lastButton - (totalPageDisplayed.value - 1);
      }
      for (let page = firstButton; page <= lastButton; page += 1) {
        if (page === firstButton || page === lastButton) {
          continue;
        }
        _pages.push(page);
      }
      return _pages;
    });
    const showLastLink = computed(() => lastPage.value > 1);
    const paginatedLink = (page = 1) => {
      if (props.noRouter) {
        return {};
      }
      const _page = Math.max(1, Math.min(page, lastPage.value));
      const query = {
        ...route.query
      };
      if (props.routerQueryKey) {
        query[props.routerQueryKey] = _page <= 1 ? void 0 : _page;
      }
      return {
        query
      };
    };
    const handleLinkClick = (e, page = 1) => {
      const _page = Math.max(1, Math.min(page, lastPage.value));
      emits("update:currentPage", _page);
      if (props.noRouter) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      const _component_BaseFocusLoop = _sfc_main$2;
      const _component_NuxtLink = __nuxt_component_1;
      const _component_Icon = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["nui-pagination", [
          unref(rounded) && radiuses[unref(rounded)],
          unref(color) && colors[unref(color)],
          (_a = props.classes) == null ? void 0 : _a.wrapper
        ]]
      }, _attrs))}>`);
      _push(ssrRenderComponent(_component_BaseFocusLoop, {
        as: "ul",
        class: ["nui-pagination-list", [unref(rounded) && radiuses[unref(rounded)], (_b = props.classes) == null ? void 0 : _b.list]]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b2, _c2, _d, _e, _f, _g, _h;
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "before-pagination", {}, null, _push2, _parent2, _scopeId);
            _push2(`<li${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: paginatedLink(1),
              tabindex: "0",
              class: ["nui-pagination-link", [
                _ctx.currentPage === 1 && "nui-active",
                unref(rounded) && radiuses[unref(rounded)],
                (_a2 = props.classes) == null ? void 0 : _a2.link
              ]],
              onKeydown: (e) => e.target.click(),
              onClick: (e) => handleLinkClick(e, 1)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` 1 `);
                } else {
                  return [
                    createTextVNode(" 1 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</li>`);
            if (unref(showLastLink) && unref(pages).length > 0 && unref(pages)[0] > 2) {
              _push2(`<li${_scopeId}><span class="${ssrRenderClass([[unref(rounded) && radiuses[unref(rounded)], (_b2 = props.classes) == null ? void 0 : _b2.ellipsis], "nui-pagination-ellipsis"])}"${_scopeId}>${ssrInterpolate(props.ellipsis)}</span></li>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(unref(pages), (page) => {
              var _a3;
              _push2(`<li${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtLink, {
                to: paginatedLink(page),
                tabindex: "0",
                "aria-current": _ctx.currentPage === page ? "page" : void 0,
                class: ["nui-pagination-link", [
                  _ctx.currentPage === page && "nui-active",
                  unref(rounded) && radiuses[unref(rounded)],
                  (_a3 = props.classes) == null ? void 0 : _a3.link
                ]],
                onKeydown: (e) => e.target.click(),
                onClick: (e) => handleLinkClick(e, page)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(page)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(page), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</li>`);
            });
            _push2(`<!--]-->`);
            if (unref(showLastLink) && unref(pages)[unref(pages).length - 1] < unref(lastPage) - 1) {
              _push2(`<li${_scopeId}><span class="${ssrRenderClass([[unref(rounded) && radiuses[unref(rounded)], (_c2 = props.classes) == null ? void 0 : _c2.ellipsis], "nui-pagination-ellipsis"])}"${_scopeId}>${ssrInterpolate(props.ellipsis)}</span></li>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(showLastLink)) {
              _push2(`<li${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtLink, {
                to: paginatedLink(unref(lastPage)),
                tabindex: "0",
                class: ["nui-pagination-link", [
                  _ctx.currentPage === unref(lastPage) && "nui-active",
                  unref(rounded) && radiuses[unref(rounded)],
                  (_d = props.classes) == null ? void 0 : _d.link
                ]],
                onKeydown: (e) => e.target.click(),
                onClick: (e) => handleLinkClick(e, unref(lastPage))
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(lastPage))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(unref(lastPage)), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</li>`);
            } else {
              _push2(`<!---->`);
            }
            ssrRenderSlot(_ctx.$slots, "after-pagination", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "before-pagination"),
              createVNode("li", null, [
                createVNode(_component_NuxtLink, {
                  to: paginatedLink(1),
                  tabindex: "0",
                  class: ["nui-pagination-link", [
                    _ctx.currentPage === 1 && "nui-active",
                    unref(rounded) && radiuses[unref(rounded)],
                    (_e = props.classes) == null ? void 0 : _e.link
                  ]],
                  onKeydown: withKeys((e) => e.target.click(), ["space"]),
                  onClick: (e) => handleLinkClick(e, 1)
                }, {
                  default: withCtx(() => [
                    createTextVNode(" 1 ")
                  ]),
                  _: 1
                }, 8, ["to", "class", "onKeydown", "onClick"])
              ]),
              unref(showLastLink) && unref(pages).length > 0 && unref(pages)[0] > 2 ? (openBlock(), createBlock("li", { key: 0 }, [
                createVNode("span", {
                  class: ["nui-pagination-ellipsis", [unref(rounded) && radiuses[unref(rounded)], (_f = props.classes) == null ? void 0 : _f.ellipsis]]
                }, toDisplayString(props.ellipsis), 3)
              ])) : createCommentVNode("", true),
              (openBlock(true), createBlock(Fragment, null, renderList(unref(pages), (page) => {
                var _a3;
                return openBlock(), createBlock("li", { key: page }, [
                  createVNode(_component_NuxtLink, {
                    to: paginatedLink(page),
                    tabindex: "0",
                    "aria-current": _ctx.currentPage === page ? "page" : void 0,
                    class: ["nui-pagination-link", [
                      _ctx.currentPage === page && "nui-active",
                      unref(rounded) && radiuses[unref(rounded)],
                      (_a3 = props.classes) == null ? void 0 : _a3.link
                    ]],
                    onKeydown: withKeys((e) => e.target.click(), ["space"]),
                    onClick: (e) => handleLinkClick(e, page)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(page), 1)
                    ]),
                    _: 2
                  }, 1032, ["to", "aria-current", "class", "onKeydown", "onClick"])
                ]);
              }), 128)),
              unref(showLastLink) && unref(pages)[unref(pages).length - 1] < unref(lastPage) - 1 ? (openBlock(), createBlock("li", { key: 1 }, [
                createVNode("span", {
                  class: ["nui-pagination-ellipsis", [unref(rounded) && radiuses[unref(rounded)], (_g = props.classes) == null ? void 0 : _g.ellipsis]]
                }, toDisplayString(props.ellipsis), 3)
              ])) : createCommentVNode("", true),
              unref(showLastLink) ? (openBlock(), createBlock("li", { key: 2 }, [
                createVNode(_component_NuxtLink, {
                  to: paginatedLink(unref(lastPage)),
                  tabindex: "0",
                  class: ["nui-pagination-link", [
                    _ctx.currentPage === unref(lastPage) && "nui-active",
                    unref(rounded) && radiuses[unref(rounded)],
                    (_h = props.classes) == null ? void 0 : _h.link
                  ]],
                  onKeydown: withKeys((e) => e.target.click(), ["space"]),
                  onClick: (e) => handleLinkClick(e, unref(lastPage))
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(lastPage)), 1)
                  ]),
                  _: 1
                }, 8, ["to", "class", "onKeydown", "onClick"])
              ])) : createCommentVNode("", true),
              renderSlot(_ctx.$slots, "after-pagination")
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(ssrRenderComponent(_component_BaseFocusLoop, {
        class: ["nui-pagination-buttons", [unref(rounded) && radiuses[unref(rounded)], (_c = props.classes) == null ? void 0 : _c.buttons]]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b2, _c2, _d;
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "before-navigation", {}, null, _push2, _parent2, _scopeId);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: paginatedLink(_ctx.currentPage - 1),
              tabindex: "0",
              class: ["nui-pagination-button", (_a2 = props.classes) == null ? void 0 : _a2.button],
              onKeydown: (e) => e.target.click(),
              onClick: (e) => handleLinkClick(e, _ctx.currentPage - 1)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "previous-icon", {}, () => {
                    _push3(ssrRenderComponent(_component_Icon, {
                      name: _ctx.previousIcon,
                      class: "pagination-button-icon"
                    }, null, _parent3, _scopeId2));
                  }, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    renderSlot(_ctx.$slots, "previous-icon", {}, () => [
                      createVNode(_component_Icon, {
                        name: _ctx.previousIcon,
                        class: "pagination-button-icon"
                      }, null, 8, ["name"])
                    ])
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: paginatedLink(_ctx.currentPage + 1),
              tabindex: "0",
              class: ["nui-pagination-button", (_b2 = props.classes) == null ? void 0 : _b2.button],
              onKeydown: (e) => e.target.click(),
              onClick: (e) => handleLinkClick(e, _ctx.currentPage + 1)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "next-icon", {}, () => {
                    _push3(ssrRenderComponent(_component_Icon, {
                      name: _ctx.nextIcon,
                      class: "pagination-button-icon"
                    }, null, _parent3, _scopeId2));
                  }, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    renderSlot(_ctx.$slots, "next-icon", {}, () => [
                      createVNode(_component_Icon, {
                        name: _ctx.nextIcon,
                        class: "pagination-button-icon"
                      }, null, 8, ["name"])
                    ])
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
            ssrRenderSlot(_ctx.$slots, "after-navigation", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "before-navigation"),
              createVNode(_component_NuxtLink, {
                to: paginatedLink(_ctx.currentPage - 1),
                tabindex: "0",
                class: ["nui-pagination-button", (_c2 = props.classes) == null ? void 0 : _c2.button],
                onKeydown: withKeys((e) => e.target.click(), ["space"]),
                onClick: (e) => handleLinkClick(e, _ctx.currentPage - 1)
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "previous-icon", {}, () => [
                    createVNode(_component_Icon, {
                      name: _ctx.previousIcon,
                      class: "pagination-button-icon"
                    }, null, 8, ["name"])
                  ])
                ]),
                _: 3
              }, 8, ["to", "class", "onKeydown", "onClick"]),
              createVNode(_component_NuxtLink, {
                to: paginatedLink(_ctx.currentPage + 1),
                tabindex: "0",
                class: ["nui-pagination-button", (_d = props.classes) == null ? void 0 : _d.button],
                onKeydown: withKeys((e) => e.target.click(), ["space"]),
                onClick: (e) => handleLinkClick(e, _ctx.currentPage + 1)
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "next-icon", {}, () => [
                    createVNode(_component_Icon, {
                      name: _ctx.nextIcon,
                      class: "pagination-button-icon"
                    }, null, 8, ["name"])
                  ])
                ]),
                _: 3
              }, 8, ["to", "class", "onKeydown", "onClick"]),
              renderSlot(_ctx.$slots, "after-navigation")
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@shuriken-ui+nuxt@3.1.5_nuxt@3.11.2_vue@3.4.21/node_modules/@shuriken-ui/nuxt/components/base/BasePagination.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _imports_0 = publicAssetsURL("/img/illustrations/placeholders/flat/placeholder-search-4.svg");
const _imports_1 = publicAssetsURL("/img/illustrations/placeholders/flat/placeholder-search-4-dark.svg");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute$1();
    const router = useRouter();
    const page = computed(() => {
      var _a;
      return parseInt((_a = route.query.page) != null ? _a : "1");
    });
    const filter = ref("");
    const perPage = ref(10);
    watch([filter, perPage], () => {
      router.push({
        query: {
          page: 1
        }
      });
    });
    computed(() => {
      return {
        filter: filter.value,
        perPage: perPage.value,
        page: page.value
      };
    });
    const companyId = computed(() => route.params.id.toLowerCase());
    const company = computed(() => {
      return demosData.find((demo) => demo.company.toLowerCase() === companyId.value);
    });
    const reviews = computed(() => {
      var _a2;
      var _a;
      return (_a2 = (_a = company.value) == null ? void 0 : _a.reviews) != null ? _a2 : [];
    });
    const totalPages = computed(() => {
      return Math.ceil(reviews.value.length / perPage.value);
    });
    const paginatedReviews = computed(() => {
      const start = (page.value - 1) * perPage.value;
      const end = start + perPage.value;
      return reviews.value.slice(start, end);
    });
    const changePage = (newPage) => {
      if (newPage >= 1 && newPage <= totalPages.value) {
        router.push({
          query: {
            ...route.query,
            page: newPage
          }
        });
      }
    };
    function statusColor(itemStatus) {
      switch (itemStatus) {
        case "user":
          return "success";
        case "manager":
          return "info";
        case "suspended":
          return "warning";
        default:
          return "default";
      }
    }
    function ratingLabel(rating) {
      switch (rating) {
        case 1:
          return "Very Poor";
        case 2:
          return "Poor";
        case 3:
          return "Average";
        case 4:
          return "Good";
        case 5:
          return "Excellent";
        default:
          return "";
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TairoContentWrapper = _sfc_main$7;
      const _component_Icon = __nuxt_component_2;
      const _component_BaseHeading = _sfc_main$b;
      const _component_BaseInput = _sfc_main$c;
      const _component_BaseButton = _sfc_main$3$1;
      const _component_BasePlaceholderPage = _sfc_main$5$1;
      const _component_DemoFlexTableRow = _sfc_main$6;
      const _component_DemoFlexTableStart = _sfc_main$4;
      const _component_DemoFlexTableCell = _sfc_main$3;
      const _component_BaseTag = _sfc_main$d;
      const _component_BasePagination = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-bfe9e955>`);
      _push(ssrRenderComponent(_component_TairoContentWrapper, null, {
        left: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_BaseInput, {
              modelValue: filter.value,
              "onUpdate:modelValue": ($event) => filter.value = $event,
              icon: "lucide:search",
              rounded: "full",
              placeholder: "Filter reviews...",
              classes: {
                wrapper: "w-full sm:w-auto"
              }
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_BaseInput, {
                modelValue: filter.value,
                "onUpdate:modelValue": ($event) => filter.value = $event,
                icon: "lucide:search",
                rounded: "full",
                placeholder: "Filter reviews...",
                classes: {
                  wrapper: "w-full sm:w-auto"
                }
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        right: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_BaseButton, {
              color: "primary",
              rounded: "full",
              class: "w-full sm:w-32"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "lucide:plus",
                    class: "size-4"
                  }, null, _parent3, _scopeId2));
                  _push3(`<span data-v-bfe9e955${_scopeId2}>Review</span>`);
                } else {
                  return [
                    createVNode(_component_Icon, {
                      name: "lucide:plus",
                      class: "size-4"
                    }),
                    createVNode("span", null, "Review")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_BaseButton, {
                color: "primary",
                rounded: "full",
                class: "w-full sm:w-32"
              }, {
                default: withCtx(() => [
                  createVNode(_component_Icon, {
                    name: "lucide:plus",
                    class: "size-4"
                  }),
                  createVNode("span", null, "Review")
                ]),
                _: 1
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d;
          if (_push2) {
            _push2(`<div class="flex items-center space-x-4 mb-6" data-v-bfe9e955${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: (_a = company.value) == null ? void 0 : _a.logo,
              class: "size-8"
            }, null, _parent2, _scopeId));
            _push2(`<h1 class="text-2xl font-bold" data-v-bfe9e955${_scopeId}>${ssrInterpolate((_b = company.value) == null ? void 0 : _b.title)} Reviews</h1></div><div class="mb-6 mt-12 sm:mt-0" data-v-bfe9e955${_scopeId}>`);
            _push2(ssrRenderComponent(_component_BaseHeading, {
              as: "h3",
              size: "lg",
              weight: "light",
              lead: "tight",
              class: "text-muted-800 dark:text-white"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span data-v-bfe9e955${_scopeId2}>${ssrInterpolate(reviews.value.length)} Reviews</span>`);
                } else {
                  return [
                    createVNode("span", null, toDisplayString(reviews.value.length) + " Reviews", 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div data-v-bfe9e955${_scopeId}>`);
            if (paginatedReviews.value.length === 0) {
              _push2(`<div data-v-bfe9e955${_scopeId}>`);
              _push2(ssrRenderComponent(_component_BasePlaceholderPage, {
                title: "No matching results",
                subtitle: "Looks like we couldn't find any matching results for your search terms. Try other search terms."
              }, {
                image: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<img class="block dark:hidden"${ssrRenderAttr("src", _imports_0)} alt="Placeholder image" data-v-bfe9e955${_scopeId2}><img class="hidden dark:block"${ssrRenderAttr("src", _imports_1)} alt="Placeholder image" data-v-bfe9e955${_scopeId2}>`);
                  } else {
                    return [
                      createVNode("img", {
                        class: "block dark:hidden",
                        src: _imports_0,
                        alt: "Placeholder image"
                      }),
                      createVNode("img", {
                        class: "hidden dark:block",
                        src: _imports_1,
                        alt: "Placeholder image"
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<div class="pt-6" data-v-bfe9e955${_scopeId}><!--[-->`);
              ssrRenderList(paginatedReviews.value, (item, index) => {
                _push2(ssrRenderComponent(_component_DemoFlexTableRow, {
                  key: index,
                  rounded: "none",
                  condensed: "",
                  spaced: ""
                }, {
                  start: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_DemoFlexTableStart, {
                        label: "user",
                        "hide-label": index > 0,
                        title: item.username,
                        subtitle: item.position,
                        avatar: item.src
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_DemoFlexTableStart, {
                          label: "user",
                          "hide-label": index > 0,
                          title: item.username,
                          subtitle: item.position,
                          avatar: item.src
                        }, null, 8, ["hide-label", "title", "subtitle", "avatar"])
                      ];
                    }
                  }),
                  end: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_DemoFlexTableCell, {
                        label: "location",
                        "hide-label": index > 0,
                        class: "w-full sm:w-40 cell"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<span class="text-muted-500 dark:text-muted-400 font-sans text-sm" data-v-bfe9e955${_scopeId3}>${ssrInterpolate(item.location)}</span>`);
                          } else {
                            return [
                              createVNode("span", { class: "text-muted-500 dark:text-muted-400 font-sans text-sm" }, toDisplayString(item.location), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_DemoFlexTableCell, {
                        label: "industry",
                        "hide-label": index > 0,
                        class: "w-full sm:w-40 cell"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<span class="text-muted-500 dark:text-muted-400 font-sans text-sm" data-v-bfe9e955${_scopeId3}>${ssrInterpolate(item.industry)}</span>`);
                          } else {
                            return [
                              createVNode("span", { class: "text-muted-500 dark:text-muted-400 font-sans text-sm" }, toDisplayString(item.industry), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_DemoFlexTableCell, {
                        label: "status",
                        "hide-label": index > 0,
                        class: "w-full sm:w-16 cell"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_BaseTag, {
                              color: statusColor(item.status),
                              rounded: "full",
                              variant: "pastel",
                              size: "sm",
                              class: "capitalize"
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(item.status)}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(item.status), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_BaseTag, {
                                color: statusColor(item.status),
                                rounded: "full",
                                variant: "pastel",
                                size: "sm",
                                class: "capitalize"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.status), 1)
                                ]),
                                _: 2
                              }, 1032, ["color"])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_DemoFlexTableCell, {
                        label: "rating",
                        "hide-label": index > 0,
                        class: "w-full sm:w-36 cell"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<div class="flex w-full justify-end gap-1 sm:justify-center"${ssrRenderAttr("data-nui-tooltip", ratingLabel(item.rating))} data-v-bfe9e955${_scopeId3}><span class="${ssrRenderClass([
                              item.rating >= 1 ? "bg-primary-500" : "bg-muted-200 dark:bg-muted-700",
                              "block size-2 rounded-full"
                            ])}" data-v-bfe9e955${_scopeId3}></span><span class="${ssrRenderClass([
                              item.rating >= 2 ? "bg-primary-500" : "bg-muted-200 dark:bg-muted-700",
                              "block size-2 rounded-full"
                            ])}" data-v-bfe9e955${_scopeId3}></span><span class="${ssrRenderClass([
                              item.rating >= 3 ? "bg-primary-500" : "bg-muted-200 dark:bg-muted-700",
                              "block size-2 rounded-full"
                            ])}" data-v-bfe9e955${_scopeId3}></span><span class="${ssrRenderClass([
                              item.rating >= 4 ? "bg-primary-500" : "bg-muted-200 dark:bg-muted-700",
                              "block size-2 rounded-full"
                            ])}" data-v-bfe9e955${_scopeId3}></span><span class="${ssrRenderClass([
                              item.rating === 5 ? "bg-primary-500" : "bg-muted-200 dark:bg-muted-700",
                              "block size-2 rounded-full"
                            ])}" data-v-bfe9e955${_scopeId3}></span></div>`);
                          } else {
                            return [
                              createVNode("div", {
                                class: "flex w-full justify-end gap-1 sm:justify-center",
                                "data-nui-tooltip": ratingLabel(item.rating)
                              }, [
                                createVNode("span", {
                                  class: [
                                    "block size-2 rounded-full",
                                    item.rating >= 1 ? "bg-primary-500" : "bg-muted-200 dark:bg-muted-700"
                                  ]
                                }, null, 2),
                                createVNode("span", {
                                  class: [
                                    "block size-2 rounded-full",
                                    item.rating >= 2 ? "bg-primary-500" : "bg-muted-200 dark:bg-muted-700"
                                  ]
                                }, null, 2),
                                createVNode("span", {
                                  class: [
                                    "block size-2 rounded-full",
                                    item.rating >= 3 ? "bg-primary-500" : "bg-muted-200 dark:bg-muted-700"
                                  ]
                                }, null, 2),
                                createVNode("span", {
                                  class: [
                                    "block size-2 rounded-full",
                                    item.rating >= 4 ? "bg-primary-500" : "bg-muted-200 dark:bg-muted-700"
                                  ]
                                }, null, 2),
                                createVNode("span", {
                                  class: [
                                    "block size-2 rounded-full",
                                    item.rating === 5 ? "bg-primary-500" : "bg-muted-200 dark:bg-muted-700"
                                  ]
                                }, null, 2)
                              ], 8, ["data-nui-tooltip"])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_DemoFlexTableCell, {
                        label: "review",
                        "hide-label": index > 0,
                        class: "review-cell w-full sm:w-96 cell"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<span class="text-muted-500 dark:text-muted-400 font-sans text-sm review-text" data-v-bfe9e955${_scopeId3}>${ssrInterpolate(item.review)}</span>`);
                          } else {
                            return [
                              createVNode("span", { class: "text-muted-500 dark:text-muted-400 font-sans text-sm review-text" }, toDisplayString(item.review), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_DemoFlexTableCell, {
                          label: "location",
                          "hide-label": index > 0,
                          class: "w-full sm:w-40 cell"
                        }, {
                          default: withCtx(() => [
                            createVNode("span", { class: "text-muted-500 dark:text-muted-400 font-sans text-sm" }, toDisplayString(item.location), 1)
                          ]),
                          _: 2
                        }, 1032, ["hide-label"]),
                        createVNode(_component_DemoFlexTableCell, {
                          label: "industry",
                          "hide-label": index > 0,
                          class: "w-full sm:w-40 cell"
                        }, {
                          default: withCtx(() => [
                            createVNode("span", { class: "text-muted-500 dark:text-muted-400 font-sans text-sm" }, toDisplayString(item.industry), 1)
                          ]),
                          _: 2
                        }, 1032, ["hide-label"]),
                        createVNode(_component_DemoFlexTableCell, {
                          label: "status",
                          "hide-label": index > 0,
                          class: "w-full sm:w-16 cell"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_BaseTag, {
                              color: statusColor(item.status),
                              rounded: "full",
                              variant: "pastel",
                              size: "sm",
                              class: "capitalize"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(item.status), 1)
                              ]),
                              _: 2
                            }, 1032, ["color"])
                          ]),
                          _: 2
                        }, 1032, ["hide-label"]),
                        createVNode(_component_DemoFlexTableCell, {
                          label: "rating",
                          "hide-label": index > 0,
                          class: "w-full sm:w-36 cell"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", {
                              class: "flex w-full justify-end gap-1 sm:justify-center",
                              "data-nui-tooltip": ratingLabel(item.rating)
                            }, [
                              createVNode("span", {
                                class: [
                                  "block size-2 rounded-full",
                                  item.rating >= 1 ? "bg-primary-500" : "bg-muted-200 dark:bg-muted-700"
                                ]
                              }, null, 2),
                              createVNode("span", {
                                class: [
                                  "block size-2 rounded-full",
                                  item.rating >= 2 ? "bg-primary-500" : "bg-muted-200 dark:bg-muted-700"
                                ]
                              }, null, 2),
                              createVNode("span", {
                                class: [
                                  "block size-2 rounded-full",
                                  item.rating >= 3 ? "bg-primary-500" : "bg-muted-200 dark:bg-muted-700"
                                ]
                              }, null, 2),
                              createVNode("span", {
                                class: [
                                  "block size-2 rounded-full",
                                  item.rating >= 4 ? "bg-primary-500" : "bg-muted-200 dark:bg-muted-700"
                                ]
                              }, null, 2),
                              createVNode("span", {
                                class: [
                                  "block size-2 rounded-full",
                                  item.rating === 5 ? "bg-primary-500" : "bg-muted-200 dark:bg-muted-700"
                                ]
                              }, null, 2)
                            ], 8, ["data-nui-tooltip"])
                          ]),
                          _: 2
                        }, 1032, ["hide-label"]),
                        createVNode(_component_DemoFlexTableCell, {
                          label: "review",
                          "hide-label": index > 0,
                          class: "review-cell w-full sm:w-96 cell"
                        }, {
                          default: withCtx(() => [
                            createVNode("span", { class: "text-muted-500 dark:text-muted-400 font-sans text-sm review-text" }, toDisplayString(item.review), 1)
                          ]),
                          _: 2
                        }, 1032, ["hide-label"])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
            }
            if (reviews.value.length !== 0) {
              _push2(`<div class="mt-4" data-v-bfe9e955${_scopeId}>`);
              _push2(ssrRenderComponent(_component_BasePagination, {
                "total-items": reviews.value.length,
                "item-per-page": perPage.value,
                "current-page": page.value,
                rounded: "full",
                onChange: changePage
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center space-x-4 mb-6" }, [
                createVNode(_component_Icon, {
                  name: (_c = company.value) == null ? void 0 : _c.logo,
                  class: "size-8"
                }, null, 8, ["name"]),
                createVNode("h1", { class: "text-2xl font-bold" }, toDisplayString((_d = company.value) == null ? void 0 : _d.title) + " Reviews", 1)
              ]),
              createVNode("div", { class: "mb-6 mt-12 sm:mt-0" }, [
                createVNode(_component_BaseHeading, {
                  as: "h3",
                  size: "lg",
                  weight: "light",
                  lead: "tight",
                  class: "text-muted-800 dark:text-white"
                }, {
                  default: withCtx(() => [
                    createVNode("span", null, toDisplayString(reviews.value.length) + " Reviews", 1)
                  ]),
                  _: 1
                })
              ]),
              createVNode("div", null, [
                paginatedReviews.value.length === 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                  createVNode(_component_BasePlaceholderPage, {
                    title: "No matching results",
                    subtitle: "Looks like we couldn't find any matching results for your search terms. Try other search terms."
                  }, {
                    image: withCtx(() => [
                      createVNode("img", {
                        class: "block dark:hidden",
                        src: _imports_0,
                        alt: "Placeholder image"
                      }),
                      createVNode("img", {
                        class: "hidden dark:block",
                        src: _imports_1,
                        alt: "Placeholder image"
                      })
                    ]),
                    _: 1
                  })
                ])) : (openBlock(), createBlock("div", {
                  key: 1,
                  class: "pt-6"
                }, [
                  createVNode(TransitionGroup, {
                    "enter-active-class": "transform-gpu",
                    "enter-from-class": "opacity-0 -translate-x-full",
                    "enter-to-class": "opacity-100 translate-x-0",
                    "leave-active-class": "absolute transform-gpu",
                    "leave-from-class": "opacity-100 translate-x-0",
                    "leave-to-class": "opacity-0 -translate-x-full"
                  }, {
                    default: withCtx(() => [
                      (openBlock(true), createBlock(Fragment, null, renderList(paginatedReviews.value, (item, index) => {
                        return openBlock(), createBlock(_component_DemoFlexTableRow, {
                          key: index,
                          rounded: "none",
                          condensed: "",
                          spaced: ""
                        }, {
                          start: withCtx(() => [
                            createVNode(_component_DemoFlexTableStart, {
                              label: "user",
                              "hide-label": index > 0,
                              title: item.username,
                              subtitle: item.position,
                              avatar: item.src
                            }, null, 8, ["hide-label", "title", "subtitle", "avatar"])
                          ]),
                          end: withCtx(() => [
                            createVNode(_component_DemoFlexTableCell, {
                              label: "location",
                              "hide-label": index > 0,
                              class: "w-full sm:w-40 cell"
                            }, {
                              default: withCtx(() => [
                                createVNode("span", { class: "text-muted-500 dark:text-muted-400 font-sans text-sm" }, toDisplayString(item.location), 1)
                              ]),
                              _: 2
                            }, 1032, ["hide-label"]),
                            createVNode(_component_DemoFlexTableCell, {
                              label: "industry",
                              "hide-label": index > 0,
                              class: "w-full sm:w-40 cell"
                            }, {
                              default: withCtx(() => [
                                createVNode("span", { class: "text-muted-500 dark:text-muted-400 font-sans text-sm" }, toDisplayString(item.industry), 1)
                              ]),
                              _: 2
                            }, 1032, ["hide-label"]),
                            createVNode(_component_DemoFlexTableCell, {
                              label: "status",
                              "hide-label": index > 0,
                              class: "w-full sm:w-16 cell"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_BaseTag, {
                                  color: statusColor(item.status),
                                  rounded: "full",
                                  variant: "pastel",
                                  size: "sm",
                                  class: "capitalize"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(item.status), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["color"])
                              ]),
                              _: 2
                            }, 1032, ["hide-label"]),
                            createVNode(_component_DemoFlexTableCell, {
                              label: "rating",
                              "hide-label": index > 0,
                              class: "w-full sm:w-36 cell"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", {
                                  class: "flex w-full justify-end gap-1 sm:justify-center",
                                  "data-nui-tooltip": ratingLabel(item.rating)
                                }, [
                                  createVNode("span", {
                                    class: [
                                      "block size-2 rounded-full",
                                      item.rating >= 1 ? "bg-primary-500" : "bg-muted-200 dark:bg-muted-700"
                                    ]
                                  }, null, 2),
                                  createVNode("span", {
                                    class: [
                                      "block size-2 rounded-full",
                                      item.rating >= 2 ? "bg-primary-500" : "bg-muted-200 dark:bg-muted-700"
                                    ]
                                  }, null, 2),
                                  createVNode("span", {
                                    class: [
                                      "block size-2 rounded-full",
                                      item.rating >= 3 ? "bg-primary-500" : "bg-muted-200 dark:bg-muted-700"
                                    ]
                                  }, null, 2),
                                  createVNode("span", {
                                    class: [
                                      "block size-2 rounded-full",
                                      item.rating >= 4 ? "bg-primary-500" : "bg-muted-200 dark:bg-muted-700"
                                    ]
                                  }, null, 2),
                                  createVNode("span", {
                                    class: [
                                      "block size-2 rounded-full",
                                      item.rating === 5 ? "bg-primary-500" : "bg-muted-200 dark:bg-muted-700"
                                    ]
                                  }, null, 2)
                                ], 8, ["data-nui-tooltip"])
                              ]),
                              _: 2
                            }, 1032, ["hide-label"]),
                            createVNode(_component_DemoFlexTableCell, {
                              label: "review",
                              "hide-label": index > 0,
                              class: "review-cell w-full sm:w-96 cell"
                            }, {
                              default: withCtx(() => [
                                createVNode("span", { class: "text-muted-500 dark:text-muted-400 font-sans text-sm review-text" }, toDisplayString(item.review), 1)
                              ]),
                              _: 2
                            }, 1032, ["hide-label"])
                          ]),
                          _: 2
                        }, 1024);
                      }), 128))
                    ]),
                    _: 1
                  })
                ])),
                reviews.value.length !== 0 ? (openBlock(), createBlock("div", {
                  key: 2,
                  class: "mt-4"
                }, [
                  createVNode(_component_BasePagination, {
                    "total-items": reviews.value.length,
                    "item-per-page": perPage.value,
                    "current-page": page.value,
                    rounded: "full",
                    onChange: changePage
                  }, null, 8, ["total-items", "item-per-page", "current-page"])
                ])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/reviews/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bfe9e955"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-Zo91IvdU.mjs.map
