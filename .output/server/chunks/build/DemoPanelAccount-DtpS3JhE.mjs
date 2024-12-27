import { h as usePanels, a as _sfc_main$b, _ as __nuxt_component_2, d as __nuxt_component_0 } from './server.mjs';
import { _ as _sfc_main$2 } from './BaseParagraph-BooaUBVB.mjs';
import { _ as _sfc_main$3 } from './BaseText-Bvoloqme.mjs';
import { _ as __nuxt_component_0$1 } from './client-only-CNnwE-2c.mjs';
import { useSSRContext, defineComponent, reactive, ref, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { o as onKeyStroke, u as useIntersectionObserver } from './index-BCPoQdcH.mjs';
import { u as useTailwindColors } from './tailwind-B8vcEit7.mjs';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AddonApexcharts",
  __ssrInlineRender: true,
  props: {
    type: {},
    height: {},
    width: {},
    series: {},
    options: {}
  },
  setup(__props) {
    const { isLoaded } = useLazyApexCharts();
    const target = ref(null);
    const targetIsVisible = ref(false);
    const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        targetIsVisible.value = isIntersecting;
        stop();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BasePlaceload = __nuxt_component_0;
      const _component_ClientOnly = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "target",
        ref: target
      }, _attrs))}>`);
      if (!unref(isLoaded) && !unref(targetIsVisible)) {
        _push(ssrRenderComponent(_component_BasePlaceload, {
          class: "m-4 w-[calc(100%-32px)]",
          style: { height: `${_ctx.height - 32}px` }
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AddonApexcharts.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DemoPanelAccount",
  __ssrInlineRender: true,
  props: {
    account: { default: void 0 }
  },
  setup(__props) {
    const props = __props;
    const { close } = usePanels();
    onKeyStroke("Escape", close);
    const demoAreaBalance = reactive(useDemoAreaBalance());
    function useDemoAreaBalance() {
      const { primary } = useTailwindColors();
      const type = "area";
      const height = 250;
      const options = {
        chart: {
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: [2, 2, 2],
          curve: "smooth"
        },
        colors: [primary.value],
        legend: {
          show: false,
          position: "top"
        },
        grid: {
          show: false,
          padding: {
            left: -10,
            right: 0,
            bottom: 10
          }
        },
        xaxis: {
          type: "datetime",
          categories: [
            "2022-09-19T00:00:00.000Z",
            "2022-09-20T01:30:00.000Z",
            "2022-09-21T02:30:00.000Z",
            "2022-09-22T03:30:00.000Z",
            "2022-09-23T04:30:00.000Z",
            "2022-09-24T05:30:00.000Z",
            "2022-09-25T06:30:00.000Z"
          ]
        },
        yaxis: {
          labels: {
            show: false,
            offsetX: -15
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          }
        },
        tooltip: {
          x: {
            format: "dd/MM/yy HH:mm"
          },
          y: {
            formatter: (val) => `$${val}`
          }
        }
      };
      const series = ref(props.account.history);
      return {
        type,
        height,
        options,
        series
      };
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BaseHeading = _sfc_main$b;
      const _component_Icon = __nuxt_component_2;
      const _component_BaseParagraph = _sfc_main$2;
      const _component_BaseText = _sfc_main$3;
      const _component_AddonApexcharts = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "border-muted-200 dark:border-muted-700 dark:bg-muted-800 border-l bg-white" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(FocusTrap), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="border-muted-200 dark:border-muted-700 flex h-20 w-full items-center justify-between border-b px-6"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_BaseHeading, {
              as: "h3",
              size: "xs",
              weight: "semibold",
              class: "text-muted-500 dark:text-muted-100 uppercase"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Account Details `);
                } else {
                  return [
                    createTextVNode(" Account Details ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<button type="button" class="nui-mask nui-mask-blob hover:bg-muted-100 focus:bg-muted-100 dark:hover:bg-muted-700 dark:focus:bg-muted-700 text-muted-700 dark:text-muted-400 flex size-10 cursor-pointer items-center justify-center outline-transparent transition-colors duration-300"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:arrow-right",
              class: "size-4"
            }, null, _parent2, _scopeId));
            _push2(`</button></div><div class="nui-slimscroll relative h-[calc(100dvh_-_5rem)] w-full overflow-y-auto overflow-x-hidden p-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_component_BaseHeading, {
              as: "h4",
              size: "lg",
              weight: "medium",
              class: "text-muted-800 dark:text-muted-100 capitalize"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(props.account.type)} ${ssrInterpolate(props.account.number)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(props.account.type) + " " + toDisplayString(props.account.number), 1)
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
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.account.owner.name)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.account.owner.name), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="py-6 pe-4 text-end"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_BaseParagraph, {
              size: "xs",
              class: "text-muted-400 mb-1"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Account balance `);
                } else {
                  return [
                    createTextVNode(" Account balance ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_BaseParagraph, {
              size: "2xl",
              weight: "medium",
              class: "text-muted-800 dark:text-muted-100 mb-1"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` $${ssrInterpolate(_ctx.account.balance.toFixed(2))}`);
                } else {
                  return [
                    createTextVNode(" $" + toDisplayString(_ctx.account.balance.toFixed(2)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="space-y-4 py-6 pe-4"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><div class="bg-muted-500 size-2 rounded-full"${_scopeId}></div>`);
            _push2(ssrRenderComponent(_component_BaseParagraph, {
              size: "sm",
              class: "text-muted-700 dark:text-muted-400"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Routing number `);
                } else {
                  return [
                    createTextVNode(" Routing number ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_BaseText, { "data-nui-tooltip": "The wire routing number" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "lucide:help-circle",
                    class: "text-muted-400 size-3"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Icon, {
                      name: "lucide:help-circle",
                      class: "text-muted-400 size-3"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_BaseText, {
              size: "sm",
              weight: "medium",
              class: "text-muted-800 dark:text-muted-100"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.account.details.routingNumber)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.account.details.routingNumber), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="flex items-center justify-between"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><div class="bg-muted-500 size-2 rounded-full"${_scopeId}></div>`);
            _push2(ssrRenderComponent(_component_BaseParagraph, {
              size: "sm",
              class: "text-muted-700 dark:text-muted-400"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Account number `);
                } else {
                  return [
                    createTextVNode(" Account number ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_BaseText, { "data-nui-tooltip": "Your full account number" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "lucide:help-circle",
                    class: "text-muted-400 size-3"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Icon, {
                      name: "lucide:help-circle",
                      class: "text-muted-400 size-3"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_BaseText, {
              size: "sm",
              weight: "medium",
              class: "text-muted-800 dark:text-muted-100"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.account.details.accountNumber)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.account.details.accountNumber), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="flex items-center justify-between"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><div class="bg-muted-300 size-2 rounded-full"${_scopeId}></div>`);
            _push2(ssrRenderComponent(_component_BaseParagraph, {
              size: "sm",
              class: "text-muted-700 dark:text-muted-400"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` IBAN `);
                } else {
                  return [
                    createTextVNode(" IBAN ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_BaseText, { "data-nui-tooltip": "The international identifier" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "lucide:help-circle",
                    class: "text-muted-400 size-3"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Icon, {
                      name: "lucide:help-circle",
                      class: "text-muted-400 size-3"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_BaseText, {
              size: "sm",
              weight: "medium",
              class: "text-muted-800 dark:text-muted-100"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.account.details.iban)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.account.details.iban), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="flex items-center justify-between"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><div class="bg-muted-200 size-2 rounded-full"${_scopeId}></div>`);
            _push2(ssrRenderComponent(_component_BaseParagraph, {
              size: "sm",
              class: "text-muted-700 dark:text-muted-400"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Bank code `);
                } else {
                  return [
                    createTextVNode(" Bank code ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_BaseText, {
              size: "sm",
              weight: "medium",
              class: "text-muted-800 dark:text-muted-100"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.account.details.bankCode)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.account.details.bankCode), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="-mt-6 p-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_AddonApexcharts, unref(demoAreaBalance), null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "border-muted-200 dark:border-muted-700 flex h-20 w-full items-center justify-between border-b px-6" }, [
                createVNode(_component_BaseHeading, {
                  as: "h3",
                  size: "xs",
                  weight: "semibold",
                  class: "text-muted-500 dark:text-muted-100 uppercase"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Account Details ")
                  ]),
                  _: 1
                }),
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
              createVNode("div", { class: "nui-slimscroll relative h-[calc(100dvh_-_5rem)] w-full overflow-y-auto overflow-x-hidden p-6" }, [
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("div", null, [
                    createVNode(_component_BaseHeading, {
                      as: "h4",
                      size: "lg",
                      weight: "medium",
                      class: "text-muted-800 dark:text-muted-100 capitalize"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(props.account.type) + " " + toDisplayString(props.account.number), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_BaseParagraph, {
                      size: "sm",
                      class: "text-muted-400"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.account.owner.name), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode("div", { class: "py-6 pe-4 text-end" }, [
                    createVNode(_component_BaseParagraph, {
                      size: "xs",
                      class: "text-muted-400 mb-1"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Account balance ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_BaseParagraph, {
                      size: "2xl",
                      weight: "medium",
                      class: "text-muted-800 dark:text-muted-100 mb-1"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" $" + toDisplayString(_ctx.account.balance.toFixed(2)), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                createVNode("div", { class: "space-y-4 py-6 pe-4" }, [
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      createVNode("div", { class: "bg-muted-500 size-2 rounded-full" }),
                      createVNode(_component_BaseParagraph, {
                        size: "sm",
                        class: "text-muted-700 dark:text-muted-400"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Routing number ")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_BaseText, { "data-nui-tooltip": "The wire routing number" }, {
                        default: withCtx(() => [
                          createVNode(_component_Icon, {
                            name: "lucide:help-circle",
                            class: "text-muted-400 size-3"
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode(_component_BaseText, {
                      size: "sm",
                      weight: "medium",
                      class: "text-muted-800 dark:text-muted-100"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.account.details.routingNumber), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      createVNode("div", { class: "bg-muted-500 size-2 rounded-full" }),
                      createVNode(_component_BaseParagraph, {
                        size: "sm",
                        class: "text-muted-700 dark:text-muted-400"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Account number ")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_BaseText, { "data-nui-tooltip": "Your full account number" }, {
                        default: withCtx(() => [
                          createVNode(_component_Icon, {
                            name: "lucide:help-circle",
                            class: "text-muted-400 size-3"
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode(_component_BaseText, {
                      size: "sm",
                      weight: "medium",
                      class: "text-muted-800 dark:text-muted-100"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.account.details.accountNumber), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      createVNode("div", { class: "bg-muted-300 size-2 rounded-full" }),
                      createVNode(_component_BaseParagraph, {
                        size: "sm",
                        class: "text-muted-700 dark:text-muted-400"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" IBAN ")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_BaseText, { "data-nui-tooltip": "The international identifier" }, {
                        default: withCtx(() => [
                          createVNode(_component_Icon, {
                            name: "lucide:help-circle",
                            class: "text-muted-400 size-3"
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode(_component_BaseText, {
                      size: "sm",
                      weight: "medium",
                      class: "text-muted-800 dark:text-muted-100"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.account.details.iban), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      createVNode("div", { class: "bg-muted-200 size-2 rounded-full" }),
                      createVNode(_component_BaseParagraph, {
                        size: "sm",
                        class: "text-muted-700 dark:text-muted-400"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Bank code ")
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode(_component_BaseText, {
                      size: "sm",
                      weight: "medium",
                      class: "text-muted-800 dark:text-muted-100"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.account.details.bankCode), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                createVNode("div", { class: "-mt-6 p-4" }, [
                  createVNode(_component_AddonApexcharts, unref(demoAreaBalance), null, 16)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/DemoPanelAccount.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=DemoPanelAccount-DtpS3JhE.mjs.map
