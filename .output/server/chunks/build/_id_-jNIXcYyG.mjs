import { c as _export_sfc, u as useNuiDefaultProperty, _ as __nuxt_component_2, a as _sfc_main$b, b as _sfc_main$3 } from './server.mjs';
import { _ as _sfc_main$2 } from './BaseParagraph-BooaUBVB.mjs';
import { useSSRContext, defineComponent, mergeProps, unref, computed, ref, shallowRef, withCtx, createVNode, toDisplayString, createTextVNode, openBlock, createBlock, Fragment, renderList, createCommentVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderList } from 'vue/server-renderer';
import { _ as _sfc_main$4 } from './BaseCard-CHm243us.mjs';
import { _ as _sfc_main$5 } from './BaseAvatar-Br9MXJI3.mjs';
import { _ as _sfc_main$6 } from './BaseText-Bvoloqme.mjs';
import { _ as _sfc_main$7 } from './TairoModal-bB80b7IJ.mjs';
import { _ as _sfc_main$8 } from './BaseButtonClose-Dwwfm2FK.mjs';
import { useRoute } from 'vue-router';
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
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import '@iconify/vue/dist/offline';
import '@iconify/vue';
import '@headlessui/vue';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "BaseProse",
  __ssrInlineRender: true,
  props: {
    rounded: { default: void 0 }
  },
  setup(__props) {
    const props = __props;
    const rounded = useNuiDefaultProperty(props, "BaseProse", "rounded");
    const radiuses = {
      none: "nui-prose-rounded-none",
      sm: "nui-prose-rounded-sm",
      md: "nui-prose-rounded-md",
      lg: "nui-prose-rounded-lg"
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["nui-prose", unref(rounded) && radiuses[unref(rounded)]]
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@shuriken-ui+nuxt@3.1.5_nuxt@3.11.2_vue@3.4.21/node_modules/@shuriken-ui/nuxt/components/base/BaseProse.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const demos = demosData;
    const company = computed(() => {
      return demos.find((demo) => demo.company === route.params.id);
    });
    const activeTab = ref("tab-1");
    const isModal3XlOpen = ref(false);
    const selectedDemo = shallowRef(null);
    const openModal = (demo) => {
      selectedDemo.value = demo;
      isModal3XlOpen.value = true;
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_Icon = __nuxt_component_2;
      const _component_BaseHeading = _sfc_main$b;
      const _component_BaseParagraph = _sfc_main$2;
      const _component_BaseProse = _sfc_main$1;
      const _component_BaseButton = _sfc_main$3;
      const _component_BaseCard = _sfc_main$4;
      const _component_BaseAvatar = _sfc_main$5;
      const _component_BaseText = _sfc_main$6;
      const _component_TairoModal = _sfc_main$7;
      const _component_BaseButtonClose = _sfc_main$8;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-a58520dd><div class="ltablet:h-[410px] dark:bg-muted-800 absolute start-0 top-0 h-[590px] w-full bg-white lg:h-[410px]" data-v-a58520dd></div><div class="ltablet:h-64 ltablet:flex-row relative flex h-[460px] w-full flex-col lg:h-64 lg:flex-row" data-v-a58520dd><div class="ltablet:flex-row relative z-10 flex w-full flex-col gap-6 lg:flex-row" data-v-a58520dd><div class="ltablet:mx-0 mx-auto lg:mx-0" data-v-a58520dd>`);
      if ((_a = company.value) == null ? void 0 : _a.logo) {
        _push(ssrRenderComponent(_component_Icon, {
          name: company.value.logo,
          class: "size-16 shrink-0"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="ltablet:text-left text-center lg:text-left" data-v-a58520dd>`);
      _push(ssrRenderComponent(_component_BaseHeading, {
        as: "h2",
        size: "xl",
        weight: "semibold",
        class: "ltablet:justify-start flex items-center justify-center gap-2 lg:justify-start"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b;
          if (_push2) {
            _push2(`<span class="text-muted-800 dark:text-white" data-v-a58520dd${_scopeId}>${ssrInterpolate((_a2 = company.value) == null ? void 0 : _a2.company)}</span>`);
          } else {
            return [
              createVNode("span", { class: "text-muted-800 dark:text-white" }, toDisplayString((_b = company.value) == null ? void 0 : _b.company), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6" data-v-a58520dd><div class="flex items-center" data-v-a58520dd>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:web",
        class: "text-primary-500 size-6 mr-2"
      }, null, _parent));
      _push(ssrRenderComponent(_component_BaseParagraph, {
        size: "sm",
        class: "text-muted-800 dark:text-muted-100"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b, _c, _d;
          if (_push2) {
            _push2(`<a${ssrRenderAttr("href", (_a2 = company.value) == null ? void 0 : _a2.website)} target="_blank" data-v-a58520dd${_scopeId}>${ssrInterpolate((_b = company.value) == null ? void 0 : _b.website)}</a>`);
          } else {
            return [
              createVNode("a", {
                href: (_c = company.value) == null ? void 0 : _c.website,
                target: "_blank"
              }, toDisplayString((_d = company.value) == null ? void 0 : _d.website), 9, ["href"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex items-center" data-v-a58520dd>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:domain",
        class: "text-primary-500 size-6 mr-2"
      }, null, _parent));
      _push(ssrRenderComponent(_component_BaseParagraph, {
        size: "sm",
        class: "text-muted-800 dark:text-muted-100"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b;
          if (_push2) {
            _push2(`${ssrInterpolate((_a2 = company.value) == null ? void 0 : _a2.industry)}`);
          } else {
            return [
              createTextVNode(toDisplayString((_b = company.value) == null ? void 0 : _b.industry), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex items-center" data-v-a58520dd>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:account-group",
        class: "text-primary-500 size-6 mr-2"
      }, null, _parent));
      _push(ssrRenderComponent(_component_BaseParagraph, {
        size: "sm",
        class: "text-muted-800 dark:text-muted-100"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b;
          if (_push2) {
            _push2(`${ssrInterpolate((_a2 = company.value) == null ? void 0 : _a2.companySize)}`);
          } else {
            return [
              createTextVNode(toDisplayString((_b = company.value) == null ? void 0 : _b.companySize), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex items-center" data-v-a58520dd>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:map-marker",
        class: "text-primary-500 size-6 mr-2"
      }, null, _parent));
      _push(ssrRenderComponent(_component_BaseParagraph, {
        size: "sm",
        class: "text-muted-800 dark:text-muted-100"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b;
          if (_push2) {
            _push2(`${ssrInterpolate((_a2 = company.value) == null ? void 0 : _a2.headquarters)}`);
          } else {
            return [
              createTextVNode(toDisplayString((_b = company.value) == null ? void 0 : _b.headquarters), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex items-center" data-v-a58520dd>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:subdirectory-arrow-right",
        class: "text-primary-500 size-6 mr-2"
      }, null, _parent));
      _push(ssrRenderComponent(_component_BaseParagraph, {
        size: "sm",
        class: "text-muted-800 dark:text-muted-100"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b;
          if (_push2) {
            _push2(`${ssrInterpolate((_a2 = company.value) == null ? void 0 : _a2.subCategory)}`);
          } else {
            return [
              createTextVNode(toDisplayString((_b = company.value) == null ? void 0 : _b.subCategory), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
      _push(ssrRenderComponent(_component_BaseProse, { class: "ltablet:mx-0 prose-sm mx-auto mb-6 max-w-xl lg:mx-0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b;
          if (_push2) {
            _push2(`<p class="line-clamp-3 text-muted-800 dark:text-muted-100" data-v-a58520dd${_scopeId}>${ssrInterpolate((_a2 = company.value) == null ? void 0 : _a2.overview)}</p>`);
          } else {
            return [
              createVNode("p", { class: "line-clamp-3 text-muted-800 dark:text-muted-100" }, toDisplayString((_b = company.value) == null ? void 0 : _b.overview), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="ltablet:justify-start ltablet:ms-auto ltablet:mt-0 mt-4 flex shrink-0 justify-center lg:ms-auto lg:mt-0 lg:justify-start" data-v-a58520dd>`);
      _push(ssrRenderComponent(_component_BaseButton, { class: "ltablet:w-auto ltablet:mx-0 mx-auto w-52 lg:mx-0 lg:w-auto" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:plus",
              class: "size-4"
            }, null, _parent2, _scopeId));
            _push2(`<span data-v-a58520dd${_scopeId}>Contact</span>`);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "lucide:plus",
                class: "size-4"
              }),
              createVNode("span", null, "Contact")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="ltablet:bottom-[-70px] absolute bottom-[-48px] start-0 flex items-end gap-2 lg:bottom-[-70px]" data-v-a58520dd><button type="button" class="${ssrRenderClass([
        activeTab.value === "tab-1" ? "border-primary-500 text-muted-800 dark:text-muted-100" : "border-transparent text-muted-400 dark:text-muted-400",
        "inline-flex items-center justify-center border-b-2 px-4 py-3 font-sans text-sm"
      ])}" data-v-a58520dd><span data-v-a58520dd>Demos</span></button><button type="button" class="${ssrRenderClass([
        activeTab.value === "tab-2" ? "border-primary-500 text-muted-800 dark:text-muted-100" : "border-transparent text-muted-400 dark:text-muted-400",
        "inline-flex items-center justify-center border-b-2 px-4 py-3 font-sans text-sm"
      ])}" data-v-a58520dd><span data-v-a58520dd>Reviews</span></button></div></div><div class="w-full" data-v-a58520dd>`);
      if (activeTab.value === "tab-1") {
        _push(`<div class="mt-28" data-v-a58520dd>`);
        _push(ssrRenderComponent(_component_BaseCard, { class: "p-8" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-v-a58520dd${_scopeId}><!--[-->`);
              ssrRenderList(unref(demos).filter((d) => {
                var _a2;
                return d.company === ((_a2 = company.value) == null ? void 0 : _a2.company);
              }), (demo) => {
                _push2(ssrRenderComponent(_component_BaseCard, {
                  key: demo.title,
                  class: "p-4"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="flex items-center gap-4" data-v-a58520dd${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_Icon, {
                        name: demo.logo,
                        class: "size-10 shrink-0"
                      }, null, _parent3, _scopeId2));
                      _push3(`<div data-v-a58520dd${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_BaseHeading, {
                        as: "h4",
                        size: "md",
                        weight: "semibold",
                        lead: "tight",
                        class: "text-muted-800 dark:text-white"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<span data-v-a58520dd${_scopeId3}>${ssrInterpolate(demo.title)}</span>`);
                          } else {
                            return [
                              createVNode("span", null, toDisplayString(demo.title), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_BaseParagraph, {
                        size: "sm",
                        class: "text-muted-500 dark:text-muted-400"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<span class="line-clamp-2" data-v-a58520dd${_scopeId3}>${ssrInterpolate(demo.description)}</span>`);
                          } else {
                            return [
                              createVNode("span", { class: "line-clamp-2" }, toDisplayString(demo.description), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_BaseButton, {
                        class: "mt-2",
                        color: "primary",
                        size: "sm",
                        variant: "pastel",
                        rounded: "md",
                        onClick: ($event) => openModal(demo)
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_Icon, {
                              name: "mdi:play",
                              class: "size-4"
                            }, null, _parent4, _scopeId3));
                            _push4(`<span data-v-a58520dd${_scopeId3}>Watch Video</span>`);
                          } else {
                            return [
                              createVNode(_component_Icon, {
                                name: "mdi:play",
                                class: "size-4"
                              }),
                              createVNode("span", null, "Watch Video")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`</div></div>`);
                    } else {
                      return [
                        createVNode("div", { class: "flex items-center gap-4" }, [
                          createVNode(_component_Icon, {
                            name: demo.logo,
                            class: "size-10 shrink-0"
                          }, null, 8, ["name"]),
                          createVNode("div", null, [
                            createVNode(_component_BaseHeading, {
                              as: "h4",
                              size: "md",
                              weight: "semibold",
                              lead: "tight",
                              class: "text-muted-800 dark:text-white"
                            }, {
                              default: withCtx(() => [
                                createVNode("span", null, toDisplayString(demo.title), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_component_BaseParagraph, {
                              size: "sm",
                              class: "text-muted-500 dark:text-muted-400"
                            }, {
                              default: withCtx(() => [
                                createVNode("span", { class: "line-clamp-2" }, toDisplayString(demo.description), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_component_BaseButton, {
                              class: "mt-2",
                              color: "primary",
                              size: "sm",
                              variant: "pastel",
                              rounded: "md",
                              onClick: ($event) => openModal(demo)
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_Icon, {
                                  name: "mdi:play",
                                  class: "size-4"
                                }),
                                createVNode("span", null, "Watch Video")
                              ]),
                              _: 2
                            }, 1032, ["onClick"])
                          ])
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
            } else {
              return [
                createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(demos).filter((d) => {
                    var _a2;
                    return d.company === ((_a2 = company.value) == null ? void 0 : _a2.company);
                  }), (demo) => {
                    return openBlock(), createBlock(_component_BaseCard, {
                      key: demo.title,
                      class: "p-4"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex items-center gap-4" }, [
                          createVNode(_component_Icon, {
                            name: demo.logo,
                            class: "size-10 shrink-0"
                          }, null, 8, ["name"]),
                          createVNode("div", null, [
                            createVNode(_component_BaseHeading, {
                              as: "h4",
                              size: "md",
                              weight: "semibold",
                              lead: "tight",
                              class: "text-muted-800 dark:text-white"
                            }, {
                              default: withCtx(() => [
                                createVNode("span", null, toDisplayString(demo.title), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_component_BaseParagraph, {
                              size: "sm",
                              class: "text-muted-500 dark:text-muted-400"
                            }, {
                              default: withCtx(() => [
                                createVNode("span", { class: "line-clamp-2" }, toDisplayString(demo.description), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_component_BaseButton, {
                              class: "mt-2",
                              color: "primary",
                              size: "sm",
                              variant: "pastel",
                              rounded: "md",
                              onClick: ($event) => openModal(demo)
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_Icon, {
                                  name: "mdi:play",
                                  class: "size-4"
                                }),
                                createVNode("span", null, "Watch Video")
                              ]),
                              _: 2
                            }, 1032, ["onClick"])
                          ])
                        ])
                      ]),
                      _: 2
                    }, 1024);
                  }), 128))
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else if (activeTab.value === "tab-2") {
        _push(`<div class="mt-28" data-v-a58520dd>`);
        _push(ssrRenderComponent(_component_BaseCard, { class: "p-8" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            var _a2, _b;
            if (_push2) {
              _push2(`<div class="mb-8 flex items-center gap-2" data-v-a58520dd${_scopeId}><h4 class="text-muted-400 dark:text-muted-400 font-sans text-xs font-semibold uppercase" data-v-a58520dd${_scopeId}> Reviews </h4></div><div class="grid gap-6 sm:grid-cols-2" data-v-a58520dd${_scopeId}><!--[-->`);
              ssrRenderList((_a2 = company.value) == null ? void 0 : _a2.reviews, (review) => {
                _push2(`<div class="bg-muted-100 dark:bg-muted-700/60 rounded-md p-5" data-v-a58520dd${_scopeId}><div class="flex flex-col py-4" data-v-a58520dd${_scopeId}>`);
                _push2(ssrRenderComponent(_component_BaseAvatar, {
                  src: review.src,
                  size: "lg",
                  class: "mx-auto"
                }, null, _parent2, _scopeId));
                _push2(`<div class="py-4 text-center" data-v-a58520dd${_scopeId}>`);
                _push2(ssrRenderComponent(_component_BaseHeading, {
                  tag: "h3",
                  size: "md",
                  weight: "medium",
                  class: "text-muted-800 dark:text-muted-100"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(review.username)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(review.username), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_BaseText, {
                  size: "xs",
                  class: "text-muted-400 dark:text-muted-400 mb-4"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<span data-v-a58520dd${_scopeId2}>${ssrInterpolate(review.position)}</span>`);
                    } else {
                      return [
                        createVNode("span", null, toDisplayString(review.position), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_BaseParagraph, {
                  size: "xs",
                  class: "text-muted-800 dark:text-muted-100"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<span data-v-a58520dd${_scopeId2}>${ssrInterpolate(review.review)}</span>`);
                    } else {
                      return [
                        createVNode("span", null, toDisplayString(review.review), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`<div class="mt-4" data-v-a58520dd${_scopeId}>`);
                _push2(ssrRenderComponent(_component_BaseText, {
                  size: "xs",
                  class: "text-primary-500 dark:text-primary-500"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<span data-v-a58520dd${_scopeId2}>${ssrInterpolate(review.rating)} stars</span>`);
                    } else {
                      return [
                        createVNode("span", null, toDisplayString(review.rating) + " stars", 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div></div></div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              return [
                createVNode("div", { class: "mb-8 flex items-center gap-2" }, [
                  createVNode("h4", { class: "text-muted-400 dark:text-muted-400 font-sans text-xs font-semibold uppercase" }, " Reviews ")
                ]),
                createVNode("div", { class: "grid gap-6 sm:grid-cols-2" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList((_b = company.value) == null ? void 0 : _b.reviews, (review) => {
                    return openBlock(), createBlock("div", {
                      key: review.username,
                      class: "bg-muted-100 dark:bg-muted-700/60 rounded-md p-5"
                    }, [
                      createVNode("div", { class: "flex flex-col py-4" }, [
                        createVNode(_component_BaseAvatar, {
                          src: review.src,
                          size: "lg",
                          class: "mx-auto"
                        }, null, 8, ["src"]),
                        createVNode("div", { class: "py-4 text-center" }, [
                          createVNode(_component_BaseHeading, {
                            tag: "h3",
                            size: "md",
                            weight: "medium",
                            class: "text-muted-800 dark:text-muted-100"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(review.username), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_component_BaseText, {
                            size: "xs",
                            class: "text-muted-400 dark:text-muted-400 mb-4"
                          }, {
                            default: withCtx(() => [
                              createVNode("span", null, toDisplayString(review.position), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_component_BaseParagraph, {
                            size: "xs",
                            class: "text-muted-800 dark:text-muted-100"
                          }, {
                            default: withCtx(() => [
                              createVNode("span", null, toDisplayString(review.review), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode("div", { class: "mt-4" }, [
                            createVNode(_component_BaseText, {
                              size: "xs",
                              class: "text-primary-500 dark:text-primary-500"
                            }, {
                              default: withCtx(() => [
                                createVNode("span", null, toDisplayString(review.rating) + " stars", 1)
                              ]),
                              _: 2
                            }, 1024)
                          ])
                        ])
                      ])
                    ]);
                  }), 128))
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_component_TairoModal, {
        open: isModal3XlOpen.value,
        size: "3xl",
        onClose: ($event) => isModal3XlOpen.value = false,
        class: "bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
      }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center w-full justify-between p-4 md:p-6 border-b border-gray-200 dark:border-gray-700" data-v-a58520dd${_scopeId}><div class="flex items-center" data-v-a58520dd${_scopeId}>`);
            if (selectedDemo.value) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: selectedDemo.value.logo,
                class: "w-10 h-10 mr-2"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<h3 class="font-heading dark:text-white text-lg font-medium leading-6" data-v-a58520dd${_scopeId}>${ssrInterpolate(selectedDemo.value ? selectedDemo.value.title : "")} Demo Video </h3></div>`);
            _push2(ssrRenderComponent(_component_BaseButtonClose, {
              onClick: ($event) => isModal3XlOpen.value = false
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center w-full justify-between p-4 md:p-6 border-b border-gray-200 dark:border-gray-700" }, [
                createVNode("div", { class: "flex items-center" }, [
                  selectedDemo.value ? (openBlock(), createBlock(_component_Icon, {
                    key: 0,
                    name: selectedDemo.value.logo,
                    class: "w-10 h-10 mr-2"
                  }, null, 8, ["name"])) : createCommentVNode("", true),
                  createVNode("h3", { class: "font-heading dark:text-white text-lg font-medium leading-6" }, toDisplayString(selectedDemo.value ? selectedDemo.value.title : "") + " Demo Video ", 1)
                ]),
                createVNode(_component_BaseButtonClose, {
                  onClick: ($event) => isModal3XlOpen.value = false
                }, null, 8, ["onClick"])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="relative pb-9/16" data-v-a58520dd${_scopeId}>`);
            if (selectedDemo.value) {
              _push2(`<iframe${ssrRenderAttr("src", `https://www.youtube.com/embed/${selectedDemo.value.video.split("v=")[1].split("&")[0]}?autoplay=1`)} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg" data-v-a58520dd${_scopeId}></iframe>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "relative pb-9/16" }, [
                selectedDemo.value ? (openBlock(), createBlock("iframe", {
                  key: 0,
                  src: `https://www.youtube.com/embed/${selectedDemo.value.video.split("v=")[1].split("&")[0]}?autoplay=1`,
                  frameborder: "0",
                  allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                  allowfullscreen: "",
                  class: "absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                }, null, 8, ["src"])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/company/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a58520dd"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-jNIXcYyG.mjs.map
