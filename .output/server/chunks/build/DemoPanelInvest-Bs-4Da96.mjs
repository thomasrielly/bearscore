import { h as usePanels, a as _sfc_main$b, _ as __nuxt_component_2, b as _sfc_main$3 } from './server.mjs';
import { _ as _sfc_main$1 } from './BaseParagraph-BooaUBVB.mjs';
import { o as onKeyStroke } from './index-BCPoQdcH.mjs';
import { defineComponent, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { FocusTrap } from '@headlessui/vue';
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
  __name: "DemoPanelInvest",
  __ssrInlineRender: true,
  props: {
    option: { default: void 0 }
  },
  setup(__props) {
    const props = __props;
    const { close } = usePanels();
    onKeyStroke("Escape", close);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BaseHeading = _sfc_main$b;
      const _component_BaseParagraph = _sfc_main$1;
      const _component_Icon = __nuxt_component_2;
      const _component_BaseButton = _sfc_main$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "border-muted-200 dark:border-muted-700 dark:bg-muted-800 border-l bg-white" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(FocusTrap), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<div class="border-muted-200 dark:border-muted-700 flex h-20 w-full items-center justify-between border-b px-6"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_component_BaseHeading, { weight: "medium" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a2, _b2;
                if (_push3) {
                  _push3(`${ssrInterpolate((_a2 = props.option) == null ? void 0 : _a2.title)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString((_b2 = props.option) == null ? void 0 : _b2.title), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_BaseParagraph, {
              size: "sm",
              class: "text-muted-400"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a2, _b2;
                if (_push3) {
                  _push3(`${ssrInterpolate((_a2 = props.option) == null ? void 0 : _a2.subtitle)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString((_b2 = props.option) == null ? void 0 : _b2.subtitle), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><button type="button" class="nui-mask nui-mask-blob hover:bg-muted-100 focus:bg-muted-100 dark:hover:bg-muted-700 dark:focus:bg-muted-700 text-muted-700 dark:text-muted-400 flex size-10 cursor-pointer items-center justify-center outline-transparent transition-colors duration-300"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:arrow-right",
              class: "size-4"
            }, null, _parent2, _scopeId));
            _push2(`</button></div><div class="nui-slimscroll relative h-[calc(100dvh_-_80px)] w-full overflow-y-auto px-6"${_scopeId}><div class="py-10"${_scopeId}><div class="space-y-6"${_scopeId}><div class="border-muted-200 dark:border-muted-800 grid grid-cols-12 border-b pb-6"${_scopeId}><div class="col-span-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_BaseHeading, {
              size: "sm",
              weight: "medium",
              class: "text-muted-400"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a2, _b2;
                if (_push3) {
                  _push3(`${ssrInterpolate((_a2 = props.option) == null ? void 0 : _a2.benefits.concept.label)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString((_b2 = props.option) == null ? void 0 : _b2.benefits.concept.label), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="col-span-8"${_scopeId}><ul class="list-disc space-y-1"${_scopeId}><!--[-->`);
            ssrRenderList(_ctx.option.benefits.concept.features, (feature) => {
              _push2(`<li${_scopeId}>`);
              _push2(ssrRenderComponent(_component_BaseParagraph, {
                size: "sm",
                class: "text-muted-600 dark:text-muted-500"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(feature)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(feature), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</li>`);
            });
            _push2(`<!--]--></ul></div></div><div class="border-muted-200 dark:border-muted-800 grid grid-cols-12 border-b pb-6"${_scopeId}><div class="col-span-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_BaseHeading, {
              size: "sm",
              weight: "medium",
              class: "text-muted-400"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a2, _b2;
                if (_push3) {
                  _push3(`${ssrInterpolate((_a2 = props.option) == null ? void 0 : _a2.benefits.pros.label)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString((_b2 = props.option) == null ? void 0 : _b2.benefits.pros.label), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="col-span-8"${_scopeId}><ul class="list-disc space-y-1"${_scopeId}><!--[-->`);
            ssrRenderList(_ctx.option.benefits.pros.features, (feature) => {
              _push2(`<li${_scopeId}>`);
              _push2(ssrRenderComponent(_component_BaseParagraph, {
                size: "sm",
                class: "text-muted-600 dark:text-muted-500"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(feature)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(feature), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</li>`);
            });
            _push2(`<!--]--></ul></div></div><div class="border-muted-200 dark:border-muted-800 grid grid-cols-12 border-b pb-6"${_scopeId}><div class="col-span-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_BaseHeading, {
              size: "sm",
              weight: "medium",
              class: "text-muted-400"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a2, _b2;
                if (_push3) {
                  _push3(`${ssrInterpolate((_a2 = props.option) == null ? void 0 : _a2.benefits.cons.label)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString((_b2 = props.option) == null ? void 0 : _b2.benefits.cons.label), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="col-span-8"${_scopeId}><ul class="list-disc space-y-1"${_scopeId}><!--[-->`);
            ssrRenderList(_ctx.option.benefits.cons.features, (feature) => {
              _push2(`<li${_scopeId}>`);
              _push2(ssrRenderComponent(_component_BaseParagraph, {
                size: "sm",
                class: "text-muted-600 dark:text-muted-500"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(feature)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(feature), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</li>`);
            });
            _push2(`<!--]--></ul></div></div></div><div class="mt-6 flex items-center justify-between"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><img${ssrRenderAttr("src", (_a = props.option) == null ? void 0 : _a.provider.logo)} class="size-10" alt=""${_scopeId}>`);
            _push2(ssrRenderComponent(_component_BaseHeading, {
              size: "md",
              weight: "medium",
              class: "text-muted-800 dark:text-muted-100"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a2, _b2;
                if (_push3) {
                  _push3(`${ssrInterpolate((_a2 = props.option) == null ? void 0 : _a2.provider.name)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString((_b2 = props.option) == null ? void 0 : _b2.provider.name), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_component_BaseButton, {
              rounded: "md",
              color: "primary",
              shadow: "hover"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Get Started `);
                } else {
                  return [
                    createTextVNode(" Get Started ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "border-muted-200 dark:border-muted-700 flex h-20 w-full items-center justify-between border-b px-6" }, [
                createVNode("div", null, [
                  createVNode(_component_BaseHeading, { weight: "medium" }, {
                    default: withCtx(() => {
                      var _a2;
                      return [
                        createTextVNode(toDisplayString((_a2 = props.option) == null ? void 0 : _a2.title), 1)
                      ];
                    }),
                    _: 1
                  }),
                  createVNode(_component_BaseParagraph, {
                    size: "sm",
                    class: "text-muted-400"
                  }, {
                    default: withCtx(() => {
                      var _a2;
                      return [
                        createTextVNode(toDisplayString((_a2 = props.option) == null ? void 0 : _a2.subtitle), 1)
                      ];
                    }),
                    _: 1
                  })
                ]),
                createVNode("button", {
                  type: "button",
                  class: "nui-mask nui-mask-blob hover:bg-muted-100 focus:bg-muted-100 dark:hover:bg-muted-700 dark:focus:bg-muted-700 text-muted-700 dark:text-muted-400 flex size-10 cursor-pointer items-center justify-center outline-transparent transition-colors duration-300",
                  onClick: unref(close)
                }, [
                  createVNode(_component_Icon, {
                    name: "lucide:arrow-right",
                    class: "size-4"
                  })
                ], 8, ["onClick"])
              ]),
              createVNode("div", { class: "nui-slimscroll relative h-[calc(100dvh_-_80px)] w-full overflow-y-auto px-6" }, [
                createVNode("div", { class: "py-10" }, [
                  createVNode("div", { class: "space-y-6" }, [
                    createVNode("div", { class: "border-muted-200 dark:border-muted-800 grid grid-cols-12 border-b pb-6" }, [
                      createVNode("div", { class: "col-span-4" }, [
                        createVNode(_component_BaseHeading, {
                          size: "sm",
                          weight: "medium",
                          class: "text-muted-400"
                        }, {
                          default: withCtx(() => {
                            var _a2;
                            return [
                              createTextVNode(toDisplayString((_a2 = props.option) == null ? void 0 : _a2.benefits.concept.label), 1)
                            ];
                          }),
                          _: 1
                        })
                      ]),
                      createVNode("div", { class: "col-span-8" }, [
                        createVNode("ul", { class: "list-disc space-y-1" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(_ctx.option.benefits.concept.features, (feature) => {
                            return openBlock(), createBlock("li", { key: feature }, [
                              createVNode(_component_BaseParagraph, {
                                size: "sm",
                                class: "text-muted-600 dark:text-muted-500"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(feature), 1)
                                ]),
                                _: 2
                              }, 1024)
                            ]);
                          }), 128))
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "border-muted-200 dark:border-muted-800 grid grid-cols-12 border-b pb-6" }, [
                      createVNode("div", { class: "col-span-4" }, [
                        createVNode(_component_BaseHeading, {
                          size: "sm",
                          weight: "medium",
                          class: "text-muted-400"
                        }, {
                          default: withCtx(() => {
                            var _a2;
                            return [
                              createTextVNode(toDisplayString((_a2 = props.option) == null ? void 0 : _a2.benefits.pros.label), 1)
                            ];
                          }),
                          _: 1
                        })
                      ]),
                      createVNode("div", { class: "col-span-8" }, [
                        createVNode("ul", { class: "list-disc space-y-1" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(_ctx.option.benefits.pros.features, (feature) => {
                            return openBlock(), createBlock("li", { key: feature }, [
                              createVNode(_component_BaseParagraph, {
                                size: "sm",
                                class: "text-muted-600 dark:text-muted-500"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(feature), 1)
                                ]),
                                _: 2
                              }, 1024)
                            ]);
                          }), 128))
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "border-muted-200 dark:border-muted-800 grid grid-cols-12 border-b pb-6" }, [
                      createVNode("div", { class: "col-span-4" }, [
                        createVNode(_component_BaseHeading, {
                          size: "sm",
                          weight: "medium",
                          class: "text-muted-400"
                        }, {
                          default: withCtx(() => {
                            var _a2;
                            return [
                              createTextVNode(toDisplayString((_a2 = props.option) == null ? void 0 : _a2.benefits.cons.label), 1)
                            ];
                          }),
                          _: 1
                        })
                      ]),
                      createVNode("div", { class: "col-span-8" }, [
                        createVNode("ul", { class: "list-disc space-y-1" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(_ctx.option.benefits.cons.features, (feature) => {
                            return openBlock(), createBlock("li", { key: feature }, [
                              createVNode(_component_BaseParagraph, {
                                size: "sm",
                                class: "text-muted-600 dark:text-muted-500"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(feature), 1)
                                ]),
                                _: 2
                              }, 1024)
                            ]);
                          }), 128))
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "mt-6 flex items-center justify-between" }, [
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      createVNode("img", {
                        src: (_b = props.option) == null ? void 0 : _b.provider.logo,
                        class: "size-10",
                        alt: ""
                      }, null, 8, ["src"]),
                      createVNode(_component_BaseHeading, {
                        size: "md",
                        weight: "medium",
                        class: "text-muted-800 dark:text-muted-100"
                      }, {
                        default: withCtx(() => {
                          var _a2;
                          return [
                            createTextVNode(toDisplayString((_a2 = props.option) == null ? void 0 : _a2.provider.name), 1)
                          ];
                        }),
                        _: 1
                      })
                    ]),
                    createVNode("div", null, [
                      createVNode(_component_BaseButton, {
                        rounded: "md",
                        color: "primary",
                        shadow: "hover"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Get Started ")
                        ]),
                        _: 1
                      })
                    ])
                  ])
                ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/DemoPanelInvest.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=DemoPanelInvest-Bs-4Da96.mjs.map
