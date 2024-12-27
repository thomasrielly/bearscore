import { h as usePanels, a as _sfc_main$b, _ as __nuxt_component_2, b as _sfc_main$3$1, e as __nuxt_component_1 } from './server.mjs';
import { _ as _sfc_main$2 } from './BaseParagraph-BooaUBVB.mjs';
import { _ as _sfc_main$3 } from './BaseProgress-CWqy7H6p.mjs';
import { _ as _sfc_main$4 } from './BaseText-Bvoloqme.mjs';
import __nuxt_component_0 from './TairoLogo-ByXlo29i.mjs';
import { useSSRContext, defineComponent, ref, computed, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, createCommentVNode, Fragment, renderList } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { o as onKeyStroke } from './index-BCPoQdcH.mjs';
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
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import '@iconify/vue/dist/offline';
import '@iconify/vue';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';

const _imports_0 = publicAssetsURL("/img/illustrations/card-chip.svg");
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "DemoCreditCardReal",
  __ssrInlineRender: true,
  props: {
    name: { default: "\u2022\u2022\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022\u2022\u2022" },
    number: { default: "\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022" },
    expiryYear: { default: "\u2022\u2022" },
    expiryMonth: { default: "\u2022\u2022" },
    cvc: { default: "\u2022\u2022\u2022" },
    centered: { type: Boolean, default: true },
    contrast: { default: "low" }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TairoLogo = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["border-muted-200 dark:border-muted-800 shadow-muted-400/10 dark:shadow-muted-800/10 relative h-[200px] w-full max-w-[315px] rounded-xl border bg-white p-6 shadow-xl", [
          props.centered ? "mx-auto" : "",
          props.contrast === "high" && "dark:bg-muted-950",
          props.contrast === "low" && "dark:bg-muted-900"
        ]]
      }, _attrs))}><div class="flex h-full flex-col gap-3"><div class="flex items-center gap-2"><div class="bg-muted-200 dark:bg-muted-700 size-2 rounded-full"></div><span class="text-muted-400 font-sans text-sm"> Mastercard </span></div><div class="mt-auto space-y-1"><img class="mb-3 w-11"${ssrRenderAttr("src", _imports_0)} alt="Card chip" width="44" height="31"><div><h5 class="font-heading text-muted-500 text-sm" x-text="cardholder">${ssrInterpolate(props.name)}</h5></div><div><p class="font-heading text-muted-400 text-xs"><span>${ssrInterpolate(props.number)}</span></p></div><div class="font-heading text-muted-400 flex w-full items-center gap-2 text-xs"><div class="flex items-center gap-2"><span>EXP</span><span>${ssrInterpolate(props.expiryMonth)}/${ssrInterpolate(props.expiryYear)}</span></div><div class="flex items-center gap-2"><span>CVC</span><span>${ssrInterpolate(props.cvc)}</span></div></div></div></div><div class="absolute end-5 top-4 flex"><div class="-me-2 size-9 rounded-full bg-rose-500/60"></div><div class="relative z-10 -ms-2 size-9 rounded-full bg-yellow-500/60"></div></div><div class="absolute bottom-7 end-5 flex">`);
      _push(ssrRenderComponent(_component_TairoLogo, { class: "text-primary-500 size-10" }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/DemoCreditCardReal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DemoPanelCard",
  __ssrInlineRender: true,
  props: {
    card: { default: void 0 }
  },
  setup(__props) {
    const props = __props;
    const { close } = usePanels();
    onKeyStroke("Escape", close);
    const detailsExpanded = ref(false);
    const daySpentProgress = computed(() => {
      var _a, _b;
      return ((_a = props.card) == null ? void 0 : _a.daySpent) / ((_b = props.card) == null ? void 0 : _b.limits.spend) * 100;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BaseHeading = _sfc_main$b;
      const _component_Icon = __nuxt_component_2;
      const _component_BaseParagraph = _sfc_main$2;
      const _component_BaseProgress = _sfc_main$3;
      const _component_BaseText = _sfc_main$4;
      const _component_DemoCreditCardReal = _sfc_main$1;
      const _component_BaseButton = _sfc_main$3$1;
      const _component_NuxtLink = __nuxt_component_1;
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
                  _push3(` Card Details `);
                } else {
                  return [
                    createTextVNode(" Card Details ")
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
            _push2(`</button></div><div class="nui-slimscroll relative h-[calc(100dvh_-_80px)] w-full overflow-y-auto p-6"${_scopeId}><div class="mb-3"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_component_BaseHeading, {
              as: "h4",
              size: "sm",
              weight: "medium",
              class: "text-muted-800 dark:text-muted-100"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.card.name)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.card.name), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_BaseParagraph, {
              size: "xs",
              class: "text-muted-400"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.card.cardInfo.name)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.card.cardInfo.name), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="text-end"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_BaseHeading, {
              as: "h4",
              size: "sm",
              weight: "medium",
              class: "text-muted-800 dark:text-muted-100"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` $${ssrInterpolate(_ctx.card.daySpent.toFixed(2))}`);
                } else {
                  return [
                    createTextVNode(" $" + toDisplayString(_ctx.card.daySpent.toFixed(2)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_BaseParagraph, {
              size: "xs",
              class: "text-muted-400"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Spent today `);
                } else {
                  return [
                    createTextVNode(" Spent today ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
            _push2(ssrRenderComponent(_component_BaseProgress, {
              value: unref(daySpentProgress),
              size: "xs",
              class: "my-2"
            }, null, _parent2, _scopeId));
            _push2(`<div class="pt-2"${_scopeId}><button type="button" class="nui-focus mb-3 flex w-full items-center"${_scopeId}><span class="text-muted-500 dark:text-muted-400 flex w-full items-center justify-between"${_scopeId}><span class="flex items-center gap-1"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:chevron-down",
              class: ["size-3 transition-transform duration-300", unref(detailsExpanded) ? "rotate-180" : ""]
            }, null, _parent2, _scopeId));
            if (!unref(detailsExpanded)) {
              _push2(ssrRenderComponent(_component_BaseText, { size: "xs" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Show details `);
                  } else {
                    return [
                      createTextVNode(" Show details ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (unref(detailsExpanded)) {
              _push2(ssrRenderComponent(_component_BaseText, { size: "xs" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Hide details `);
                  } else {
                    return [
                      createTextVNode(" Hide details ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</span>`);
            if (!unref(detailsExpanded)) {
              _push2(ssrRenderComponent(_component_BaseText, { size: "xs" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` $${ssrInterpolate(_ctx.card.funds.available.toFixed(2))} available \xB7 $${ssrInterpolate(_ctx.card.limits.spend.toFixed(2))} limit `);
                  } else {
                    return [
                      createTextVNode(" $" + toDisplayString(_ctx.card.funds.available.toFixed(2)) + " available \xB7 $" + toDisplayString(_ctx.card.limits.spend.toFixed(2)) + " limit ", 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</span></button>`);
            if (unref(detailsExpanded)) {
              _push2(`<div class="bg-muted-100 dark:bg-muted-900 rounded-xl p-6"${_scopeId}><div class="border-muted-200 dark:border-muted-700 mb-3 flex items-center justify-between border-b pb-3"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_BaseHeading, {
                as: "h5",
                size: "xs",
                weight: "medium",
                class: "text-muted-600 dark:text-muted-300"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Total daily limit `);
                  } else {
                    return [
                      createTextVNode(" Total daily limit ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_BaseText, {
                size: "sm",
                weight: "medium",
                class: "text-muted-800 dark:text-muted-100"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` $${ssrInterpolate((_ctx.card.limits.spend + _ctx.card.limits.withdraw).toFixed(2))}`);
                  } else {
                    return [
                      createTextVNode(" $" + toDisplayString((_ctx.card.limits.spend + _ctx.card.limits.withdraw).toFixed(2)), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div><div class="space-y-4"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><div class="bg-muted-800 size-2 rounded-full"${_scopeId}></div>`);
              _push2(ssrRenderComponent(_component_BaseParagraph, {
                size: "sm",
                class: "text-muted-700 dark:text-muted-400"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Posted `);
                  } else {
                    return [
                      createTextVNode(" Posted ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<span data-nui-tooltip="Settled transactions"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: "lucide:help-circle",
                class: "text-muted-400 size-3"
              }, null, _parent2, _scopeId));
              _push2(`</span></div>`);
              _push2(ssrRenderComponent(_component_BaseText, {
                size: "sm",
                weight: "medium",
                class: "text-muted-800 dark:text-muted-100"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` $${ssrInterpolate(_ctx.card.funds.posted.toFixed(2))}`);
                  } else {
                    return [
                      createTextVNode(" $" + toDisplayString(_ctx.card.funds.posted.toFixed(2)), 1)
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
                    _push3(` Pending `);
                  } else {
                    return [
                      createTextVNode(" Pending ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<span data-nui-tooltip="Unsettled transactions or temporary holds"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: "lucide:help-circle",
                class: "text-muted-400 size-3"
              }, null, _parent2, _scopeId));
              _push2(`</span></div>`);
              _push2(ssrRenderComponent(_component_BaseText, {
                size: "sm",
                weight: "medium",
                class: "text-muted-800 dark:text-muted-100"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` $${ssrInterpolate(_ctx.card.funds.pending.toFixed(2))}`);
                  } else {
                    return [
                      createTextVNode(" $" + toDisplayString(_ctx.card.funds.pending.toFixed(2)), 1)
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
                    _push3(` Unavailable `);
                  } else {
                    return [
                      createTextVNode(" Unavailable ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<span data-nui-tooltip="Unavailable funds due to spend on other cards. Reach out for assistance."${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: "lucide:help-circle",
                class: "text-muted-400 size-3"
              }, null, _parent2, _scopeId));
              _push2(`</span></div>`);
              _push2(ssrRenderComponent(_component_BaseText, {
                size: "sm",
                weight: "medium",
                class: "text-muted-800 dark:text-muted-100"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` $${ssrInterpolate(_ctx.card.funds.unavailable.toFixed(2))}`);
                  } else {
                    return [
                      createTextVNode(" $" + toDisplayString(_ctx.card.funds.unavailable.toFixed(2)), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div><div class="flex items-center justify-between"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><div class="size-2 rounded-full bg-white"${_scopeId}></div>`);
              _push2(ssrRenderComponent(_component_BaseParagraph, {
                size: "sm",
                class: "text-muted-700 dark:text-muted-400"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Available to spend `);
                  } else {
                    return [
                      createTextVNode(" Available to spend ")
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
                    _push3(` $${ssrInterpolate(_ctx.card.funds.available.toFixed(2))}`);
                  } else {
                    return [
                      createTextVNode(" $" + toDisplayString(_ctx.card.funds.available.toFixed(2)), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="mt-4 w-full space-y-5"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_DemoCreditCardReal, {
              status: _ctx.card.cardInfo.status,
              name: _ctx.card.cardInfo.name,
              number: _ctx.card.cardInfo.number,
              brand: _ctx.card.cardInfo.brand
            }, null, _parent2, _scopeId));
            _push2(`<div class="space-y-4 px-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_BaseParagraph, {
              size: "xs",
              class: "text-muted-400 text-center"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` This card was issued on ${ssrInterpolate(_ctx.card.creationDate)}`);
                } else {
                  return [
                    createTextVNode(" This card was issued on " + toDisplayString(_ctx.card.creationDate), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="flex items-center justify-between gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_BaseButton, {
              rounded: "md",
              size: "sm"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Disable `);
                } else {
                  return [
                    createTextVNode(" Disable ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_BaseButton, {
              variant: "pastel",
              color: "muted",
              rounded: "md",
              size: "sm"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Replace `);
                } else {
                  return [
                    createTextVNode(" Replace ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_BaseButton, {
              variant: "pastel",
              color: "muted",
              rounded: "md",
              size: "sm"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Cancel `);
                } else {
                  return [
                    createTextVNode(" Cancel ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="border-muted-200 dark:border-muted-700 border-t"${_scopeId}><div class="pt-6"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_BaseParagraph, {
              size: "xs",
              class: "text-muted-400 mb-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Billing address `);
                } else {
                  return [
                    createTextVNode(" Billing address ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<!--[-->`);
            ssrRenderList(_ctx.card.address, (item) => {
              _push2(ssrRenderComponent(_component_BaseParagraph, {
                key: item,
                size: "sm",
                weight: "medium",
                class: "text-muted-600 dark:text-muted-300"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(item)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(item), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></div></div><div class="border-muted-200 dark:border-muted-700 border-t"${_scopeId}><div class="space-y-4 py-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_BaseParagraph, {
              size: "sm",
              weight: "medium",
              class: "text-muted-600 dark:text-muted-300"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Daily spend limit `);
                } else {
                  return [
                    createTextVNode(" Daily spend limit ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_BaseParagraph, {
              size: "sm",
              weight: "medium",
              class: "text-muted-600 dark:text-muted-300"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` $${ssrInterpolate(_ctx.card.limits.spend.toFixed(2))}`);
                } else {
                  return [
                    createTextVNode(" $" + toDisplayString(_ctx.card.limits.spend.toFixed(2)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_component_BaseParagraph, {
              size: "sm",
              weight: "medium",
              class: "text-muted-600 dark:text-muted-300"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Daily withdrawal limit `);
                } else {
                  return [
                    createTextVNode(" Daily withdrawal limit ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_BaseParagraph, {
              size: "xs",
              class: "text-muted-400 mb-1"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Cash withdrawn today `);
                } else {
                  return [
                    createTextVNode(" Cash withdrawn today ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_component_BaseParagraph, {
              size: "sm",
              weight: "medium",
              class: "text-muted-600 dark:text-muted-300 mb-1"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` $${ssrInterpolate(_ctx.card.limits.withdraw.toFixed(2))}`);
                } else {
                  return [
                    createTextVNode(" $" + toDisplayString(_ctx.card.limits.withdraw.toFixed(2)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_BaseParagraph, {
              size: "xs",
              class: "text-muted-400 mb-1"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` $${ssrInterpolate(_ctx.card.dayWithdraw.toFixed(2))}`);
                } else {
                  return [
                    createTextVNode(" $" + toDisplayString(_ctx.card.dayWithdraw.toFixed(2)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="flex items-center justify-between"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_BaseParagraph, {
              size: "sm",
              weight: "medium",
              class: "text-muted-600 dark:text-muted-300"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Account `);
                } else {
                  return [
                    createTextVNode(" Account ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "#",
              class: "text-muted-600 nui-focus dark:text-muted-300 font-sans text-sm font-medium underline-offset-4 hover:underline",
              "data-nui-tooltip": "View Account"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Checking ${ssrInterpolate(_ctx.card.account)}`);
                } else {
                  return [
                    createTextVNode(" Checking " + toDisplayString(_ctx.card.account), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="flex items-center justify-between"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_BaseParagraph, {
              size: "sm",
              weight: "medium",
              class: "text-muted-600 dark:text-muted-300"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Card type `);
                } else {
                  return [
                    createTextVNode(" Card type ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_BaseParagraph, {
              size: "sm",
              weight: "medium",
              class: "text-muted-600 dark:text-muted-300 capitalize"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.card.cardInfo.type)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.card.cardInfo.type), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div></div></div></div>`);
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
                    createTextVNode(" Card Details ")
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
              createVNode("div", { class: "nui-slimscroll relative h-[calc(100dvh_-_80px)] w-full overflow-y-auto p-6" }, [
                createVNode("div", { class: "mb-3" }, [
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode("div", null, [
                      createVNode(_component_BaseHeading, {
                        as: "h4",
                        size: "sm",
                        weight: "medium",
                        class: "text-muted-800 dark:text-muted-100"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.card.name), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_BaseParagraph, {
                        size: "xs",
                        class: "text-muted-400"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.card.cardInfo.name), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("div", { class: "text-end" }, [
                      createVNode(_component_BaseHeading, {
                        as: "h4",
                        size: "sm",
                        weight: "medium",
                        class: "text-muted-800 dark:text-muted-100"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" $" + toDisplayString(_ctx.card.daySpent.toFixed(2)), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_BaseParagraph, {
                        size: "xs",
                        class: "text-muted-400"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Spent today ")
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  createVNode(_component_BaseProgress, {
                    value: unref(daySpentProgress),
                    size: "xs",
                    class: "my-2"
                  }, null, 8, ["value"]),
                  createVNode("div", { class: "pt-2" }, [
                    createVNode("button", {
                      type: "button",
                      class: "nui-focus mb-3 flex w-full items-center",
                      onClick: ($event) => detailsExpanded.value = !unref(detailsExpanded)
                    }, [
                      createVNode("span", { class: "text-muted-500 dark:text-muted-400 flex w-full items-center justify-between" }, [
                        createVNode("span", { class: "flex items-center gap-1" }, [
                          createVNode(_component_Icon, {
                            name: "lucide:chevron-down",
                            class: ["size-3 transition-transform duration-300", unref(detailsExpanded) ? "rotate-180" : ""]
                          }, null, 8, ["class"]),
                          !unref(detailsExpanded) ? (openBlock(), createBlock(_component_BaseText, {
                            key: 0,
                            size: "xs"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Show details ")
                            ]),
                            _: 1
                          })) : createCommentVNode("", true),
                          unref(detailsExpanded) ? (openBlock(), createBlock(_component_BaseText, {
                            key: 1,
                            size: "xs"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Hide details ")
                            ]),
                            _: 1
                          })) : createCommentVNode("", true)
                        ]),
                        !unref(detailsExpanded) ? (openBlock(), createBlock(_component_BaseText, {
                          key: 0,
                          size: "xs"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" $" + toDisplayString(_ctx.card.funds.available.toFixed(2)) + " available \xB7 $" + toDisplayString(_ctx.card.limits.spend.toFixed(2)) + " limit ", 1)
                          ]),
                          _: 1
                        })) : createCommentVNode("", true)
                      ])
                    ], 8, ["onClick"]),
                    unref(detailsExpanded) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "bg-muted-100 dark:bg-muted-900 rounded-xl p-6"
                    }, [
                      createVNode("div", { class: "border-muted-200 dark:border-muted-700 mb-3 flex items-center justify-between border-b pb-3" }, [
                        createVNode(_component_BaseHeading, {
                          as: "h5",
                          size: "xs",
                          weight: "medium",
                          class: "text-muted-600 dark:text-muted-300"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Total daily limit ")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_BaseText, {
                          size: "sm",
                          weight: "medium",
                          class: "text-muted-800 dark:text-muted-100"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" $" + toDisplayString((_ctx.card.limits.spend + _ctx.card.limits.withdraw).toFixed(2)), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("div", { class: "space-y-4" }, [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode("div", { class: "bg-muted-800 size-2 rounded-full" }),
                            createVNode(_component_BaseParagraph, {
                              size: "sm",
                              class: "text-muted-700 dark:text-muted-400"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Posted ")
                              ]),
                              _: 1
                            }),
                            createVNode("span", { "data-nui-tooltip": "Settled transactions" }, [
                              createVNode(_component_Icon, {
                                name: "lucide:help-circle",
                                class: "text-muted-400 size-3"
                              })
                            ])
                          ]),
                          createVNode(_component_BaseText, {
                            size: "sm",
                            weight: "medium",
                            class: "text-muted-800 dark:text-muted-100"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" $" + toDisplayString(_ctx.card.funds.posted.toFixed(2)), 1)
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
                                createTextVNode(" Pending ")
                              ]),
                              _: 1
                            }),
                            createVNode("span", { "data-nui-tooltip": "Unsettled transactions or temporary holds" }, [
                              createVNode(_component_Icon, {
                                name: "lucide:help-circle",
                                class: "text-muted-400 size-3"
                              })
                            ])
                          ]),
                          createVNode(_component_BaseText, {
                            size: "sm",
                            weight: "medium",
                            class: "text-muted-800 dark:text-muted-100"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" $" + toDisplayString(_ctx.card.funds.pending.toFixed(2)), 1)
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
                                createTextVNode(" Unavailable ")
                              ]),
                              _: 1
                            }),
                            createVNode("span", { "data-nui-tooltip": "Unavailable funds due to spend on other cards. Reach out for assistance." }, [
                              createVNode(_component_Icon, {
                                name: "lucide:help-circle",
                                class: "text-muted-400 size-3"
                              })
                            ])
                          ]),
                          createVNode(_component_BaseText, {
                            size: "sm",
                            weight: "medium",
                            class: "text-muted-800 dark:text-muted-100"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" $" + toDisplayString(_ctx.card.funds.unavailable.toFixed(2)), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode("div", { class: "size-2 rounded-full bg-white" }),
                            createVNode(_component_BaseParagraph, {
                              size: "sm",
                              class: "text-muted-700 dark:text-muted-400"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Available to spend ")
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
                              createTextVNode(" $" + toDisplayString(_ctx.card.funds.available.toFixed(2)), 1)
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ])) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "mt-4 w-full space-y-5" }, [
                    createVNode(_component_DemoCreditCardReal, {
                      status: _ctx.card.cardInfo.status,
                      name: _ctx.card.cardInfo.name,
                      number: _ctx.card.cardInfo.number,
                      brand: _ctx.card.cardInfo.brand
                    }, null, 8, ["status", "name", "number", "brand"]),
                    createVNode("div", { class: "space-y-4 px-2" }, [
                      createVNode(_component_BaseParagraph, {
                        size: "xs",
                        class: "text-muted-400 text-center"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" This card was issued on " + toDisplayString(_ctx.card.creationDate), 1)
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "flex items-center justify-between gap-2" }, [
                        createVNode(_component_BaseButton, {
                          rounded: "md",
                          size: "sm"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Disable ")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_BaseButton, {
                          variant: "pastel",
                          color: "muted",
                          rounded: "md",
                          size: "sm"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Replace ")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_BaseButton, {
                          variant: "pastel",
                          color: "muted",
                          rounded: "md",
                          size: "sm"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Cancel ")
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    createVNode("div", { class: "border-muted-200 dark:border-muted-700 border-t" }, [
                      createVNode("div", { class: "pt-6" }, [
                        createVNode(_component_BaseParagraph, {
                          size: "xs",
                          class: "text-muted-400 mb-2"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Billing address ")
                          ]),
                          _: 1
                        }),
                        (openBlock(true), createBlock(Fragment, null, renderList(_ctx.card.address, (item) => {
                          return openBlock(), createBlock(_component_BaseParagraph, {
                            key: item,
                            size: "sm",
                            weight: "medium",
                            class: "text-muted-600 dark:text-muted-300"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item), 1)
                            ]),
                            _: 2
                          }, 1024);
                        }), 128))
                      ])
                    ]),
                    createVNode("div", { class: "border-muted-200 dark:border-muted-700 border-t" }, [
                      createVNode("div", { class: "space-y-4 py-6" }, [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode(_component_BaseParagraph, {
                            size: "sm",
                            weight: "medium",
                            class: "text-muted-600 dark:text-muted-300"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Daily spend limit ")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_BaseParagraph, {
                            size: "sm",
                            weight: "medium",
                            class: "text-muted-600 dark:text-muted-300"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" $" + toDisplayString(_ctx.card.limits.spend.toFixed(2)), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("div", null, [
                            createVNode(_component_BaseParagraph, {
                              size: "sm",
                              weight: "medium",
                              class: "text-muted-600 dark:text-muted-300"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Daily withdrawal limit ")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_BaseParagraph, {
                              size: "xs",
                              class: "text-muted-400 mb-1"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Cash withdrawn today ")
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("div", null, [
                            createVNode(_component_BaseParagraph, {
                              size: "sm",
                              weight: "medium",
                              class: "text-muted-600 dark:text-muted-300 mb-1"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" $" + toDisplayString(_ctx.card.limits.withdraw.toFixed(2)), 1)
                              ]),
                              _: 1
                            }),
                            createVNode(_component_BaseParagraph, {
                              size: "xs",
                              class: "text-muted-400 mb-1"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" $" + toDisplayString(_ctx.card.dayWithdraw.toFixed(2)), 1)
                              ]),
                              _: 1
                            })
                          ])
                        ]),
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode(_component_BaseParagraph, {
                            size: "sm",
                            weight: "medium",
                            class: "text-muted-600 dark:text-muted-300"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Account ")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_NuxtLink, {
                            to: "#",
                            class: "text-muted-600 nui-focus dark:text-muted-300 font-sans text-sm font-medium underline-offset-4 hover:underline",
                            "data-nui-tooltip": "View Account"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Checking " + toDisplayString(_ctx.card.account), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode(_component_BaseParagraph, {
                            size: "sm",
                            weight: "medium",
                            class: "text-muted-600 dark:text-muted-300"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Card type ")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_BaseParagraph, {
                            size: "sm",
                            weight: "medium",
                            class: "text-muted-600 dark:text-muted-300 capitalize"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(_ctx.card.cardInfo.type), 1)
                            ]),
                            _: 1
                          })
                        ])
                      ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/DemoPanelCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=DemoPanelCard-PiqJAhpF.mjs.map
