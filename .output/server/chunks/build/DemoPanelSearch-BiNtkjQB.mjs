import { h as usePanels, _ as __nuxt_component_2, e as __nuxt_component_1 } from './server.mjs';
import { o as onKeyStroke } from './index-BCPoQdcH.mjs';
import { defineComponent, ref, computed, mergeProps, unref, withCtx, isRef, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { _ as _imports_2 } from './virtual_public-DdDoWPHO.mjs';
import { a as _imports_1, _ as _imports_2$1 } from './virtual_public-BBBXupO4.mjs';
import { FocusTrap, Combobox, ComboboxInput, TransitionRoot, ComboboxOptions, ComboboxOption } from '@headlessui/vue';
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
  __name: "DemoPanelSearch",
  __ssrInlineRender: true,
  setup(__props) {
    const { close } = usePanels();
    onKeyStroke("Escape", close);
    const people = [
      {
        id: 1,
        name: "Clarissa Perez",
        role: "Sales Manager",
        avatar: "/img/avatars/19.svg"
      },
      {
        id: 2,
        name: "Aaaron Splatter",
        role: "Project Manager",
        avatar: "/img/avatars/16.svg"
      },
      {
        id: 3,
        name: "Mike Miller",
        role: "UI/UX Designer",
        avatar: "/img/avatars/3.svg"
      },
      {
        id: 4,
        name: "Benedict Kessler",
        role: "Mobile Developer",
        avatar: "/img/avatars/22.svg"
      },
      {
        id: 5,
        name: "Maya Rosselini",
        role: "Product Manager",
        avatar: "/img/avatars/2.svg"
      }
    ];
    const selectedPerson = ref("");
    const query = ref("");
    const filteredPeople = computed(
      () => query.value === "" ? people : people.filter((person) => {
        return person.name.toLowerCase().includes(query.value.toLowerCase());
      })
    );
    const comboInput = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_2;
      const _component_NuxtLink = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "border-muted-200 dark:border-muted-700 dark:bg-muted-800 border bg-white" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(FocusTrap), { "initial-focus": unref(comboInput) }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-16 w-full items-center justify-between px-10"${_scopeId}><h2 class="font-heading text-muted-700 text-lg font-semibold dark:text-white"${_scopeId}> Search </h2><button type="button" class="text-muted-400 nui-focus hover:bg-muted-100 focus:bg-muted-100 hover:text-muted-600 focus:text-muted-600 dark:hover:bg-muted-700 dark:focus:bg-muted-700 flex size-10 items-center justify-center rounded-full transition-colors duration-300 dark:hover:text-white dark:focus:text-white"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "feather:chevron-left",
              class: "size-6"
            }, null, _parent2, _scopeId));
            _push2(`</button></div><div class="relative h-[calc(100dvh_-_64px)] w-full px-10"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Combobox), {
              modelValue: unref(selectedPerson),
              "onUpdate:modelValue": ($event) => isRef(selectedPerson) ? selectedPerson.value = $event : null,
              class: "relative z-10 mt-5",
              as: "div"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="group relative"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(ComboboxInput), {
                    ref_key: "comboInput",
                    ref: comboInput,
                    class: "border-muted-300 text-muted-600 focus:border-primary-500 focus:shadow-muted-300/50 dark:border-muted-700 dark:bg-muted-800 dark:text-muted-200 dark:placeholder:text-muted-600 dark:focus:border-muted-600 dark:focus:shadow-muted-800/50 h-12 w-full rounded-lg border bg-white py-3 pe-4 ps-10 font-sans text-sm leading-5 !outline-none transition duration-300 focus:shadow-lg",
                    "display-value": (person) => person.name,
                    placeholder: "Search...",
                    onChange: ($event) => query.value = $event.target.value
                  }, null, _parent3, _scopeId2));
                  _push3(`<div class="text-muted-400 group-focus-within:text-primary-500 absolute start-0 top-0 flex size-12 items-center justify-center transition-colors duration-300"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "feather:search",
                    class: "size-5"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                  _push3(ssrRenderComponent(unref(TransitionRoot), {
                    leave: "transition ease-in duration-100",
                    "leave-from": "opacity-100",
                    "leave-to": "opacity-0",
                    onAfterLeave: ($event) => query.value = ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(ComboboxOptions), {
                          as: "div",
                          class: "nui-slimscroll divide-muted-100 border-muted-200 dark:divide-muted-700 dark:border-muted-700 dark:bg-muted-800 absolute mt-1 max-h-60 w-full divide-y overflow-auto rounded-lg border bg-white py-1 text-base shadow-lg outline-none sm:text-sm"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (unref(filteredPeople).length === 0 && unref(query) !== "") {
                                _push5(`<div class="text-muted-700 relative cursor-default select-none px-4 py-2"${_scopeId4}> Nothing found. </div>`);
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(`<!--[-->`);
                              ssrRenderList(unref(filteredPeople), (person) => {
                                _push5(ssrRenderComponent(unref(ComboboxOption), {
                                  key: person.id,
                                  class: "p-2",
                                  as: "div",
                                  value: person
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<div class="hover:bg-muted-100 dark:hover:bg-muted-700 flex cursor-pointer items-center rounded-lg p-2 transition-colors duration-300"${_scopeId5}><div class="relative inline-flex size-9 items-center justify-center rounded-full"${_scopeId5}><img${ssrRenderAttr("src", person.avatar)} class="max-w-full rounded-full object-cover shadow-sm dark:border-transparent" alt=""${_scopeId5}></div><div class="ms-3"${_scopeId5}><h6 class="font-heading text-muted-800 text-sm font-semibold dark:text-white"${_scopeId5}>${ssrInterpolate(person.name)}</h6><p class="text-muted-400 font-sans text-xs"${_scopeId5}>${ssrInterpolate(person.role)}</p></div></div>`);
                                    } else {
                                      return [
                                        createVNode("div", { class: "hover:bg-muted-100 dark:hover:bg-muted-700 flex cursor-pointer items-center rounded-lg p-2 transition-colors duration-300" }, [
                                          createVNode("div", { class: "relative inline-flex size-9 items-center justify-center rounded-full" }, [
                                            createVNode("img", {
                                              src: person.avatar,
                                              class: "max-w-full rounded-full object-cover shadow-sm dark:border-transparent",
                                              alt: ""
                                            }, null, 8, ["src"])
                                          ]),
                                          createVNode("div", { class: "ms-3" }, [
                                            createVNode("h6", { class: "font-heading text-muted-800 text-sm font-semibold dark:text-white" }, toDisplayString(person.name), 1),
                                            createVNode("p", { class: "text-muted-400 font-sans text-xs" }, toDisplayString(person.role), 1)
                                          ])
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                unref(filteredPeople).length === 0 && unref(query) !== "" ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "text-muted-700 relative cursor-default select-none px-4 py-2"
                                }, " Nothing found. ")) : createCommentVNode("", true),
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(filteredPeople), (person) => {
                                  return openBlock(), createBlock(unref(ComboboxOption), {
                                    key: person.id,
                                    class: "p-2",
                                    as: "div",
                                    value: person
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "hover:bg-muted-100 dark:hover:bg-muted-700 flex cursor-pointer items-center rounded-lg p-2 transition-colors duration-300" }, [
                                        createVNode("div", { class: "relative inline-flex size-9 items-center justify-center rounded-full" }, [
                                          createVNode("img", {
                                            src: person.avatar,
                                            class: "max-w-full rounded-full object-cover shadow-sm dark:border-transparent",
                                            alt: ""
                                          }, null, 8, ["src"])
                                        ]),
                                        createVNode("div", { class: "ms-3" }, [
                                          createVNode("h6", { class: "font-heading text-muted-800 text-sm font-semibold dark:text-white" }, toDisplayString(person.name), 1),
                                          createVNode("p", { class: "text-muted-400 font-sans text-xs" }, toDisplayString(person.role), 1)
                                        ])
                                      ])
                                    ]),
                                    _: 2
                                  }, 1032, ["value"]);
                                }), 128))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(ComboboxOptions), {
                            as: "div",
                            class: "nui-slimscroll divide-muted-100 border-muted-200 dark:divide-muted-700 dark:border-muted-700 dark:bg-muted-800 absolute mt-1 max-h-60 w-full divide-y overflow-auto rounded-lg border bg-white py-1 text-base shadow-lg outline-none sm:text-sm"
                          }, {
                            default: withCtx(() => [
                              unref(filteredPeople).length === 0 && unref(query) !== "" ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "text-muted-700 relative cursor-default select-none px-4 py-2"
                              }, " Nothing found. ")) : createCommentVNode("", true),
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(filteredPeople), (person) => {
                                return openBlock(), createBlock(unref(ComboboxOption), {
                                  key: person.id,
                                  class: "p-2",
                                  as: "div",
                                  value: person
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "hover:bg-muted-100 dark:hover:bg-muted-700 flex cursor-pointer items-center rounded-lg p-2 transition-colors duration-300" }, [
                                      createVNode("div", { class: "relative inline-flex size-9 items-center justify-center rounded-full" }, [
                                        createVNode("img", {
                                          src: person.avatar,
                                          class: "max-w-full rounded-full object-cover shadow-sm dark:border-transparent",
                                          alt: ""
                                        }, null, 8, ["src"])
                                      ]),
                                      createVNode("div", { class: "ms-3" }, [
                                        createVNode("h6", { class: "font-heading text-muted-800 text-sm font-semibold dark:text-white" }, toDisplayString(person.name), 1),
                                        createVNode("p", { class: "text-muted-400 font-sans text-xs" }, toDisplayString(person.role), 1)
                                      ])
                                    ])
                                  ]),
                                  _: 2
                                }, 1032, ["value"]);
                              }), 128))
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "group relative" }, [
                      createVNode(unref(ComboboxInput), {
                        ref_key: "comboInput",
                        ref: comboInput,
                        class: "border-muted-300 text-muted-600 focus:border-primary-500 focus:shadow-muted-300/50 dark:border-muted-700 dark:bg-muted-800 dark:text-muted-200 dark:placeholder:text-muted-600 dark:focus:border-muted-600 dark:focus:shadow-muted-800/50 h-12 w-full rounded-lg border bg-white py-3 pe-4 ps-10 font-sans text-sm leading-5 !outline-none transition duration-300 focus:shadow-lg",
                        "display-value": (person) => person.name,
                        placeholder: "Search...",
                        onChange: ($event) => query.value = $event.target.value
                      }, null, 8, ["display-value", "onChange"]),
                      createVNode("div", { class: "text-muted-400 group-focus-within:text-primary-500 absolute start-0 top-0 flex size-12 items-center justify-center transition-colors duration-300" }, [
                        createVNode(_component_Icon, {
                          name: "feather:search",
                          class: "size-5"
                        })
                      ])
                    ]),
                    createVNode(unref(TransitionRoot), {
                      leave: "transition ease-in duration-100",
                      "leave-from": "opacity-100",
                      "leave-to": "opacity-0",
                      onAfterLeave: ($event) => query.value = ""
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(ComboboxOptions), {
                          as: "div",
                          class: "nui-slimscroll divide-muted-100 border-muted-200 dark:divide-muted-700 dark:border-muted-700 dark:bg-muted-800 absolute mt-1 max-h-60 w-full divide-y overflow-auto rounded-lg border bg-white py-1 text-base shadow-lg outline-none sm:text-sm"
                        }, {
                          default: withCtx(() => [
                            unref(filteredPeople).length === 0 && unref(query) !== "" ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "text-muted-700 relative cursor-default select-none px-4 py-2"
                            }, " Nothing found. ")) : createCommentVNode("", true),
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(filteredPeople), (person) => {
                              return openBlock(), createBlock(unref(ComboboxOption), {
                                key: person.id,
                                class: "p-2",
                                as: "div",
                                value: person
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "hover:bg-muted-100 dark:hover:bg-muted-700 flex cursor-pointer items-center rounded-lg p-2 transition-colors duration-300" }, [
                                    createVNode("div", { class: "relative inline-flex size-9 items-center justify-center rounded-full" }, [
                                      createVNode("img", {
                                        src: person.avatar,
                                        class: "max-w-full rounded-full object-cover shadow-sm dark:border-transparent",
                                        alt: ""
                                      }, null, 8, ["src"])
                                    ]),
                                    createVNode("div", { class: "ms-3" }, [
                                      createVNode("h6", { class: "font-heading text-muted-800 text-sm font-semibold dark:text-white" }, toDisplayString(person.name), 1),
                                      createVNode("p", { class: "text-muted-400 font-sans text-xs" }, toDisplayString(person.role), 1)
                                    ])
                                  ])
                                ]),
                                _: 2
                              }, 1032, ["value"]);
                            }), 128))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["onAfterLeave"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="py-6"${_scopeId}><h4 class="font-alt text-muted-400 mb-4 text-sm font-semibold uppercase"${_scopeId}> People </h4><ul class="space-y-4"${_scopeId}><li${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "#",
              class: "flex items-center"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="relative inline-flex size-9 items-center justify-center rounded-full"${_scopeId2}><img${ssrRenderAttr("src", _imports_2)} class="max-w-full rounded-full object-cover shadow-sm dark:border-transparent" alt=""${_scopeId2}></div><div class="ms-3"${_scopeId2}><h6 class="font-heading text-muted-800 text-sm font-semibold dark:text-white"${_scopeId2}> Mike Miller </h6><p class="text-muted-400 font-sans text-xs"${_scopeId2}> Frontend Developer </p></div>`);
                } else {
                  return [
                    createVNode("div", { class: "relative inline-flex size-9 items-center justify-center rounded-full" }, [
                      createVNode("img", {
                        src: _imports_2,
                        class: "max-w-full rounded-full object-cover shadow-sm dark:border-transparent",
                        alt: ""
                      })
                    ]),
                    createVNode("div", { class: "ms-3" }, [
                      createVNode("h6", { class: "font-heading text-muted-800 text-sm font-semibold dark:text-white" }, " Mike Miller "),
                      createVNode("p", { class: "text-muted-400 font-sans text-xs" }, " Frontend Developer ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</li><li${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "#",
              class: "flex items-center"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="relative inline-flex size-9 items-center justify-center rounded-full"${_scopeId2}><img${ssrRenderAttr("src", _imports_1)} class="max-w-full rounded-full object-cover shadow-sm dark:border-transparent" alt=""${_scopeId2}></div><div class="ms-3"${_scopeId2}><h6 class="font-heading text-muted-800 text-sm font-semibold dark:text-white"${_scopeId2}> John Sabierski </h6><p class="text-muted-400 font-sans text-xs"${_scopeId2}> Backend Developer </p></div>`);
                } else {
                  return [
                    createVNode("div", { class: "relative inline-flex size-9 items-center justify-center rounded-full" }, [
                      createVNode("img", {
                        src: _imports_1,
                        class: "max-w-full rounded-full object-cover shadow-sm dark:border-transparent",
                        alt: ""
                      })
                    ]),
                    createVNode("div", { class: "ms-3" }, [
                      createVNode("h6", { class: "font-heading text-muted-800 text-sm font-semibold dark:text-white" }, " John Sabierski "),
                      createVNode("p", { class: "text-muted-400 font-sans text-xs" }, " Backend Developer ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</li><li${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "#",
              class: "flex items-center"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="relative inline-flex size-9 items-center justify-center rounded-full"${_scopeId2}><img${ssrRenderAttr("src", _imports_2$1)} class="max-w-full rounded-full object-cover shadow-sm dark:border-transparent" alt=""${_scopeId2}></div><div class="ms-3"${_scopeId2}><h6 class="font-heading text-muted-800 text-sm font-semibold dark:text-white"${_scopeId2}> Ronald Cardine </h6><p class="text-muted-400 font-sans text-xs"${_scopeId2}> Frontend Developer </p></div>`);
                } else {
                  return [
                    createVNode("div", { class: "relative inline-flex size-9 items-center justify-center rounded-full" }, [
                      createVNode("img", {
                        src: _imports_2$1,
                        class: "max-w-full rounded-full object-cover shadow-sm dark:border-transparent",
                        alt: ""
                      })
                    ]),
                    createVNode("div", { class: "ms-3" }, [
                      createVNode("h6", { class: "font-heading text-muted-800 text-sm font-semibold dark:text-white" }, " Ronald Cardine "),
                      createVNode("p", { class: "text-muted-400 font-sans text-xs" }, " Frontend Developer ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</li></ul></div><div class="py-6"${_scopeId}><h4 class="font-alt text-muted-400 mb-4 text-sm font-semibold uppercase"${_scopeId}> Recent </h4><ul class="space-y-4"${_scopeId}><li${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "#",
              class: "flex items-center"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="dark:text-muted-50 relative inline-flex size-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "feather:chrome",
                    class: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="ms-3"${_scopeId2}><h6 class="font-heading text-muted-800 text-sm font-semibold dark:text-white"${_scopeId2}> Browser Support </h6><p class="text-muted-400 font-sans text-xs"${_scopeId2}> Blog article </p></div>`);
                } else {
                  return [
                    createVNode("div", { class: "dark:text-muted-50 relative inline-flex size-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500" }, [
                      createVNode(_component_Icon, {
                        name: "feather:chrome",
                        class: ""
                      })
                    ]),
                    createVNode("div", { class: "ms-3" }, [
                      createVNode("h6", { class: "font-heading text-muted-800 text-sm font-semibold dark:text-white" }, " Browser Support "),
                      createVNode("p", { class: "text-muted-400 font-sans text-xs" }, " Blog article ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</li><li${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "#",
              class: "flex items-center"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="bg-warning-100 text-warning-600 dark:bg-warning-500 dark:text-muted-50 relative inline-flex size-10 items-center justify-center rounded-full"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "feather:tv",
                    class: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="ms-3"${_scopeId2}><h6 class="font-heading text-muted-800 text-sm font-semibold dark:text-white"${_scopeId2}> Twitch new API </h6><p class="text-muted-400 font-sans text-xs"${_scopeId2}> Blog article </p></div>`);
                } else {
                  return [
                    createVNode("div", { class: "bg-warning-100 text-warning-600 dark:bg-warning-500 dark:text-muted-50 relative inline-flex size-10 items-center justify-center rounded-full" }, [
                      createVNode(_component_Icon, {
                        name: "feather:tv",
                        class: ""
                      })
                    ]),
                    createVNode("div", { class: "ms-3" }, [
                      createVNode("h6", { class: "font-heading text-muted-800 text-sm font-semibold dark:text-white" }, " Twitch new API "),
                      createVNode("p", { class: "text-muted-400 font-sans text-xs" }, " Blog article ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</li><li${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "#",
              class: "flex items-center"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="bg-primary-100 text-primary-600 dark:bg-primary-500 dark:text-muted-50 relative inline-flex size-10 items-center justify-center rounded-full"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "feather:twitter",
                    class: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="ms-3"${_scopeId2}><h6 class="font-heading text-muted-800 text-sm font-semibold dark:text-white"${_scopeId2}> Social integrations </h6><p class="text-muted-400 font-sans text-xs"${_scopeId2}> Blog article </p></div>`);
                } else {
                  return [
                    createVNode("div", { class: "bg-primary-100 text-primary-600 dark:bg-primary-500 dark:text-muted-50 relative inline-flex size-10 items-center justify-center rounded-full" }, [
                      createVNode(_component_Icon, {
                        name: "feather:twitter",
                        class: ""
                      })
                    ]),
                    createVNode("div", { class: "ms-3" }, [
                      createVNode("h6", { class: "font-heading text-muted-800 text-sm font-semibold dark:text-white" }, " Social integrations "),
                      createVNode("p", { class: "text-muted-400 font-sans text-xs" }, " Blog article ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</li></ul></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-16 w-full items-center justify-between px-10" }, [
                createVNode("h2", { class: "font-heading text-muted-700 text-lg font-semibold dark:text-white" }, " Search "),
                createVNode("button", {
                  type: "button",
                  class: "text-muted-400 nui-focus hover:bg-muted-100 focus:bg-muted-100 hover:text-muted-600 focus:text-muted-600 dark:hover:bg-muted-700 dark:focus:bg-muted-700 flex size-10 items-center justify-center rounded-full transition-colors duration-300 dark:hover:text-white dark:focus:text-white",
                  onClick: unref(close)
                }, [
                  createVNode(_component_Icon, {
                    name: "feather:chevron-left",
                    class: "size-6"
                  })
                ], 8, ["onClick"])
              ]),
              createVNode("div", { class: "relative h-[calc(100dvh_-_64px)] w-full px-10" }, [
                createVNode(unref(Combobox), {
                  modelValue: unref(selectedPerson),
                  "onUpdate:modelValue": ($event) => isRef(selectedPerson) ? selectedPerson.value = $event : null,
                  class: "relative z-10 mt-5",
                  as: "div"
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "group relative" }, [
                      createVNode(unref(ComboboxInput), {
                        ref_key: "comboInput",
                        ref: comboInput,
                        class: "border-muted-300 text-muted-600 focus:border-primary-500 focus:shadow-muted-300/50 dark:border-muted-700 dark:bg-muted-800 dark:text-muted-200 dark:placeholder:text-muted-600 dark:focus:border-muted-600 dark:focus:shadow-muted-800/50 h-12 w-full rounded-lg border bg-white py-3 pe-4 ps-10 font-sans text-sm leading-5 !outline-none transition duration-300 focus:shadow-lg",
                        "display-value": (person) => person.name,
                        placeholder: "Search...",
                        onChange: ($event) => query.value = $event.target.value
                      }, null, 8, ["display-value", "onChange"]),
                      createVNode("div", { class: "text-muted-400 group-focus-within:text-primary-500 absolute start-0 top-0 flex size-12 items-center justify-center transition-colors duration-300" }, [
                        createVNode(_component_Icon, {
                          name: "feather:search",
                          class: "size-5"
                        })
                      ])
                    ]),
                    createVNode(unref(TransitionRoot), {
                      leave: "transition ease-in duration-100",
                      "leave-from": "opacity-100",
                      "leave-to": "opacity-0",
                      onAfterLeave: ($event) => query.value = ""
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(ComboboxOptions), {
                          as: "div",
                          class: "nui-slimscroll divide-muted-100 border-muted-200 dark:divide-muted-700 dark:border-muted-700 dark:bg-muted-800 absolute mt-1 max-h-60 w-full divide-y overflow-auto rounded-lg border bg-white py-1 text-base shadow-lg outline-none sm:text-sm"
                        }, {
                          default: withCtx(() => [
                            unref(filteredPeople).length === 0 && unref(query) !== "" ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "text-muted-700 relative cursor-default select-none px-4 py-2"
                            }, " Nothing found. ")) : createCommentVNode("", true),
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(filteredPeople), (person) => {
                              return openBlock(), createBlock(unref(ComboboxOption), {
                                key: person.id,
                                class: "p-2",
                                as: "div",
                                value: person
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "hover:bg-muted-100 dark:hover:bg-muted-700 flex cursor-pointer items-center rounded-lg p-2 transition-colors duration-300" }, [
                                    createVNode("div", { class: "relative inline-flex size-9 items-center justify-center rounded-full" }, [
                                      createVNode("img", {
                                        src: person.avatar,
                                        class: "max-w-full rounded-full object-cover shadow-sm dark:border-transparent",
                                        alt: ""
                                      }, null, 8, ["src"])
                                    ]),
                                    createVNode("div", { class: "ms-3" }, [
                                      createVNode("h6", { class: "font-heading text-muted-800 text-sm font-semibold dark:text-white" }, toDisplayString(person.name), 1),
                                      createVNode("p", { class: "text-muted-400 font-sans text-xs" }, toDisplayString(person.role), 1)
                                    ])
                                  ])
                                ]),
                                _: 2
                              }, 1032, ["value"]);
                            }), 128))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["onAfterLeave"])
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode("div", { class: "py-6" }, [
                  createVNode("h4", { class: "font-alt text-muted-400 mb-4 text-sm font-semibold uppercase" }, " People "),
                  createVNode("ul", { class: "space-y-4" }, [
                    createVNode("li", null, [
                      createVNode(_component_NuxtLink, {
                        to: "#",
                        class: "flex items-center"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "relative inline-flex size-9 items-center justify-center rounded-full" }, [
                            createVNode("img", {
                              src: _imports_2,
                              class: "max-w-full rounded-full object-cover shadow-sm dark:border-transparent",
                              alt: ""
                            })
                          ]),
                          createVNode("div", { class: "ms-3" }, [
                            createVNode("h6", { class: "font-heading text-muted-800 text-sm font-semibold dark:text-white" }, " Mike Miller "),
                            createVNode("p", { class: "text-muted-400 font-sans text-xs" }, " Frontend Developer ")
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("li", null, [
                      createVNode(_component_NuxtLink, {
                        to: "#",
                        class: "flex items-center"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "relative inline-flex size-9 items-center justify-center rounded-full" }, [
                            createVNode("img", {
                              src: _imports_1,
                              class: "max-w-full rounded-full object-cover shadow-sm dark:border-transparent",
                              alt: ""
                            })
                          ]),
                          createVNode("div", { class: "ms-3" }, [
                            createVNode("h6", { class: "font-heading text-muted-800 text-sm font-semibold dark:text-white" }, " John Sabierski "),
                            createVNode("p", { class: "text-muted-400 font-sans text-xs" }, " Backend Developer ")
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("li", null, [
                      createVNode(_component_NuxtLink, {
                        to: "#",
                        class: "flex items-center"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "relative inline-flex size-9 items-center justify-center rounded-full" }, [
                            createVNode("img", {
                              src: _imports_2$1,
                              class: "max-w-full rounded-full object-cover shadow-sm dark:border-transparent",
                              alt: ""
                            })
                          ]),
                          createVNode("div", { class: "ms-3" }, [
                            createVNode("h6", { class: "font-heading text-muted-800 text-sm font-semibold dark:text-white" }, " Ronald Cardine "),
                            createVNode("p", { class: "text-muted-400 font-sans text-xs" }, " Frontend Developer ")
                          ])
                        ]),
                        _: 1
                      })
                    ])
                  ])
                ]),
                createVNode("div", { class: "py-6" }, [
                  createVNode("h4", { class: "font-alt text-muted-400 mb-4 text-sm font-semibold uppercase" }, " Recent "),
                  createVNode("ul", { class: "space-y-4" }, [
                    createVNode("li", null, [
                      createVNode(_component_NuxtLink, {
                        to: "#",
                        class: "flex items-center"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "dark:text-muted-50 relative inline-flex size-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500" }, [
                            createVNode(_component_Icon, {
                              name: "feather:chrome",
                              class: ""
                            })
                          ]),
                          createVNode("div", { class: "ms-3" }, [
                            createVNode("h6", { class: "font-heading text-muted-800 text-sm font-semibold dark:text-white" }, " Browser Support "),
                            createVNode("p", { class: "text-muted-400 font-sans text-xs" }, " Blog article ")
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("li", null, [
                      createVNode(_component_NuxtLink, {
                        to: "#",
                        class: "flex items-center"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "bg-warning-100 text-warning-600 dark:bg-warning-500 dark:text-muted-50 relative inline-flex size-10 items-center justify-center rounded-full" }, [
                            createVNode(_component_Icon, {
                              name: "feather:tv",
                              class: ""
                            })
                          ]),
                          createVNode("div", { class: "ms-3" }, [
                            createVNode("h6", { class: "font-heading text-muted-800 text-sm font-semibold dark:text-white" }, " Twitch new API "),
                            createVNode("p", { class: "text-muted-400 font-sans text-xs" }, " Blog article ")
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("li", null, [
                      createVNode(_component_NuxtLink, {
                        to: "#",
                        class: "flex items-center"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "bg-primary-100 text-primary-600 dark:bg-primary-500 dark:text-muted-50 relative inline-flex size-10 items-center justify-center rounded-full" }, [
                            createVNode(_component_Icon, {
                              name: "feather:twitter",
                              class: ""
                            })
                          ]),
                          createVNode("div", { class: "ms-3" }, [
                            createVNode("h6", { class: "font-heading text-muted-800 text-sm font-semibold dark:text-white" }, " Social integrations "),
                            createVNode("p", { class: "text-muted-400 font-sans text-xs" }, " Blog article ")
                          ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/DemoPanelSearch.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=DemoPanelSearch-BiNtkjQB.mjs.map
