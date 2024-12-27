import { _ as _sfc_main$6 } from './BaseCard-CHm243us.mjs';
import { _ as _sfc_main$7 } from './BaseInput-CmYsBoKW.mjs';
import { c as _export_sfc, u as useNuiDefaultProperty, d as __nuxt_component_0, _ as __nuxt_component_2$1, b as _sfc_main$3$1, a as _sfc_main$b, e as __nuxt_component_1 } from './server.mjs';
import { useSSRContext, defineComponent, mergeModels, useModel, ref, computed, mergeProps, unref, withCtx, createTextVNode, toDisplayString, watch, createVNode, openBlock, createBlock, Fragment, renderList, createCommentVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrRenderSlot, ssrInterpolate, ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
import { _ as _sfc_main$4 } from './BaseInputHelpText-DNMtrE4A.mjs';
import { u as useNinjaId } from './input-id-DYCO6xqi.mjs';
import { _ as _sfc_main$8 } from './BaseParagraph-BooaUBVB.mjs';
import { _ as _sfc_main$9 } from './BaseButtonIcon-4hIYqjHe.mjs';
import { _ as _sfc_main$a } from './BaseTag--Kgv_21F.mjs';
import { _ as _sfc_main$5 } from './BaseAvatar-Br9MXJI3.mjs';
import { _ as _sfc_main$c } from './TairoModal-bB80b7IJ.mjs';
import { _ as _sfc_main$d } from './BaseButtonClose-Dwwfm2FK.mjs';
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
import 'vue-router';
import '@iconify/vue/dist/offline';
import '@iconify/vue';
import '@headlessui/vue';

const _sfc_main$3 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    "aria-hidden": "true",
    viewBox: "0 0 24 24"
  }, _attrs))}><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6 9 6 6 6-6"></path></svg>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@shuriken-ui+nuxt@3.1.5_nuxt@3.11.2_vue@3.4.21/node_modules/@shuriken-ui/nuxt/components/icon/IconChevronDown.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "BaseSelect",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    id: { default: void 0 },
    label: { default: "" },
    labelFloat: { type: Boolean },
    icon: { default: void 0 },
    placeholder: { default: "" },
    loading: { type: Boolean },
    disabled: { type: Boolean },
    colorFocus: { type: Boolean },
    error: { type: [String, Boolean], default: false },
    contrast: { default: void 0 },
    rounded: { default: void 0 },
    size: { default: void 0 },
    classes: { default: () => ({}) }
  }, {
    "modelValue": {},
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose }) {
    const props = __props;
    useModel(__props, "modelValue");
    const contrast = useNuiDefaultProperty(props, "BaseSelect", "contrast");
    const rounded = useNuiDefaultProperty(props, "BaseSelect", "rounded");
    const size = useNuiDefaultProperty(props, "BaseSelect", "size");
    const selectRef = ref();
    const id = useNinjaId(() => props.id);
    const radiuses = {
      none: "",
      sm: "nui-select-rounded-sm",
      md: "nui-select-rounded-md",
      lg: "nui-select-rounded-lg",
      full: "nui-select-rounded-full"
    };
    const sizes = {
      sm: "nui-select-sm",
      md: "nui-select-md",
      lg: "nui-select-lg"
    };
    const contrasts = {
      default: "nui-select-default",
      "default-contrast": "nui-select-default-contrast",
      muted: "nui-select-muted",
      "muted-contrast": "nui-select-muted-contrast"
    };
    __expose({
      /**
       * The underlying HTMLInputElement element.
       */
      el: selectRef,
      /**
       * The internal id of the radio input.
       */
      id
    });
    const placeholder = computed(() => {
      if (props.loading) {
        return;
      }
      if (props.labelFloat) {
        return props.label;
      }
      return props.placeholder;
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      const _component_BasePlaceload = __nuxt_component_0;
      const _component_Icon = __nuxt_component_2$1;
      const _component_IconChevronDown = __nuxt_component_2;
      const _component_BaseInputHelpText = _sfc_main$4;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["nui-select-wrapper", [
          unref(contrast) && contrasts[unref(contrast)],
          unref(size) && sizes[unref(size)],
          unref(rounded) && radiuses[unref(rounded)],
          props.error && !props.loading && "nui-select-error",
          props.loading && "nui-select-loading",
          props.labelFloat && "nui-select-label-float",
          props.icon && "nui-has-icon",
          props.colorFocus && "nui-select-focus",
          (_a = props.classes) == null ? void 0 : _a.wrapper
        ]]
      }, _attrs))}>`);
      if ("label" in _ctx.$slots && !props.labelFloat || props.label && !props.labelFloat) {
        _push(`<label${ssrRenderAttr("for", unref(id))} class="${ssrRenderClass([(_b = props.classes) == null ? void 0 : _b.label, "nui-select-label"])}">`);
        ssrRenderSlot(_ctx.$slots, "label", {}, () => {
          _push(`${ssrInterpolate(props.label)}`);
        }, _push, _parent);
        _push(`</label>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="${ssrRenderClass([(_c = props.classes) == null ? void 0 : _c.outer, "nui-select-outer"])}"><select${ssrRenderAttrs(mergeProps({
        id: unref(id),
        ref_key: "selectRef",
        ref: selectRef
      }, _ctx.$attrs, {
        disabled: props.disabled,
        class: ["nui-select", (_d = props.classes) == null ? void 0 : _d.select]
      }))}>`);
      if (unref(placeholder)) {
        _push(`<option value="" disabled hidden>${ssrInterpolate(unref(placeholder))}</option>`);
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</select>`);
      if ("label" in _ctx.$slots && props.labelFloat || props.label && props.labelFloat) {
        _push(`<label${ssrRenderAttr("for", unref(id))} class="${ssrRenderClass([(_e = props.classes) == null ? void 0 : _e.label, "nui-label-float"])}">`);
        ssrRenderSlot(_ctx.$slots, "label", {}, () => {
          _push(`${ssrInterpolate(props.label)}`);
        }, _push, _parent);
        _push(`</label>`);
      } else {
        _push(`<!---->`);
      }
      if (props.loading) {
        _push(`<div class="nui-select-placeload">`);
        _push(ssrRenderComponent(_component_BasePlaceload, { class: "nui-placeload" }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (props.icon) {
        _push(`<div class="${ssrRenderClass([(_f = props.classes) == null ? void 0 : _f.icon, "nui-select-icon"])}">`);
        ssrRenderSlot(_ctx.$slots, "icon", {}, () => {
          _push(ssrRenderComponent(_component_Icon, {
            class: "nui-select-icon-inner",
            name: props.icon
          }, null, _parent));
        }, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="${ssrRenderClass([(_g = props.classes) == null ? void 0 : _g.chevron, "nui-select-chevron nui-chevron"])}">`);
      _push(ssrRenderComponent(_component_IconChevronDown, { class: "nui-select-chevron-inner" }, null, _parent));
      _push(`</div>`);
      if (props.error && typeof props.error === "string") {
        _push(ssrRenderComponent(_component_BaseInputHelpText, {
          color: "danger",
          class: (_h = props.classes) == null ? void 0 : _h.error
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(props.error)}`);
            } else {
              return [
                createTextVNode(toDisplayString(props.error), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@shuriken-ui+nuxt@3.1.5_nuxt@3.11.2_vue@3.4.21/node_modules/@shuriken-ui/nuxt/components/form/BaseSelect.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "BaseAvatarGroup",
  __ssrInlineRender: true,
  props: {
    avatars: {},
    limit: { default: void 0 },
    size: { default: void 0 },
    classes: { default: () => ({}) }
  },
  setup(__props) {
    const props = __props;
    const sizes = {
      xxs: "nui-avatar-group-xxs",
      xs: "nui-avatar-group-xs",
      sm: "nui-avatar-group-sm",
      md: "nui-avatar-group-md",
      lg: "nui-avatar-group-lg",
      xl: "nui-avatar-group-lg",
      "2xl": "nui-avatar-group-lg",
      "3xl": "nui-avatar-group-lg",
      "4xl": "nui-avatar-group-lg"
    };
    const size = useNuiDefaultProperty(props, "BaseAvatarGroup", "size");
    const limit = useNuiDefaultProperty(props, "BaseAvatarGroup", "limit");
    const avatarDisplay = computed(() => {
      if (props.avatars && limit.value !== void 0 && props.avatars.length > limit.value) {
        return props.avatars.slice(0, limit.value - 1);
      }
      return props.avatars;
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_BaseAvatar = _sfc_main$5;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["nui-avatar-group", [unref(size) && sizes[unref(size)], (_a = props.classes) == null ? void 0 : _a.wrapper]]
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, () => {
        var _a2;
        _push(`<!--[-->`);
        ssrRenderList(unref(avatarDisplay), (avatar) => {
          var _a3;
          _push(`<div class="${ssrRenderClass([(_a3 = props.classes) == null ? void 0 : _a3.outer, "nui-avatar-outer"])}">`);
          _push(ssrRenderComponent(_component_BaseAvatar, mergeProps(typeof avatar === "string" ? { src: avatar } : avatar, {
            size: props.size,
            rounded: "full",
            tabindex: "0",
            class: "bg-primary-500/20 text-primary-500 !scale-90"
          }), null, _parent));
          _push(`</div>`);
        });
        _push(`<!--]-->`);
        if (unref(limit) !== void 0 && _ctx.avatars.length > unref(limit)) {
          _push(`<div class="${ssrRenderClass([(_a2 = props.classes) == null ? void 0 : _a2.count, "nui-avatar-count"])}"><div class="nui-avatar-count-inner"><span class="nui-avatar-count-text"> +${ssrInterpolate(_ctx.avatars.length - unref(limit) + 1)}</span></div></div>`);
        } else {
          _push(`<!---->`);
        }
      }, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@shuriken-ui+nuxt@3.1.5_nuxt@3.11.2_vue@3.4.21/node_modules/@shuriken-ui/nuxt/components/base/BaseAvatarGroup.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const demosPerPage = 9;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const search = ref("");
    const location = ref("");
    ref("");
    const selectedCategory = ref("all");
    const selectedRange = ref("all");
    const currentPage = ref(1);
    const isModal3XlOpen = ref(false);
    const selectedDemo = ref(null);
    const demos = ref(demosData);
    const likedDemos = ref([]);
    const rangeValues = {
      all: [0, Infinity],
      "<10k": [0, 1e4],
      "10k-20k": [1e4, 2e4],
      "20k-40k": [2e4, 4e4],
      "40k-75k": [4e4, 75e3],
      "75k+": [75e3, Infinity]
    };
    const selectedDemos = computed(() => {
      let filteredDemos = demos.value;
      if (selectedRange.value !== "all") {
        const [minRangeValue, maxRangeValue] = rangeValues[selectedRange.value];
        filteredDemos = filteredDemos.filter((demo) => {
          const demoValue = demo.averageCost;
          return demoValue >= minRangeValue && demoValue <= maxRangeValue;
        });
      }
      if (search.value.trim() !== "") {
        const searchTerm = search.value.trim().toLowerCase();
        filteredDemos = filteredDemos.filter(
          (demo) => demo.company.toLowerCase().includes(searchTerm) || demo.title.toLowerCase().includes(searchTerm) || demo.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
        );
      }
      if (location.value.trim() !== "") {
        const locationTerm = location.value.trim().toLowerCase();
        filteredDemos = filteredDemos.filter(
          (demo) => demo.location.toLowerCase().includes(locationTerm)
        );
      }
      if (selectedCategory.value !== "all") {
        filteredDemos = filteredDemos.filter(
          (demo) => demo.category === selectedCategory.value
        );
      }
      return filteredDemos;
    });
    const paginatedDemos = computed(() => {
      const start = (currentPage.value - 1) * demosPerPage;
      const end = start + demosPerPage;
      return selectedDemos.value.slice(start, end);
    });
    const totalPages = computed(() => {
      return Math.ceil(selectedDemos.value.length / demosPerPage);
    });
    const changePage = (page) => {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
      }
    };
    const openModal = (demo) => {
      selectedDemo.value = demo;
      isModal3XlOpen.value = true;
    };
    const toggleLike = (demo) => {
      const index2 = likedDemos.value.indexOf(demo.company);
      if (index2 === -1) {
        likedDemos.value.push(demo.company);
      } else {
        likedDemos.value.splice(index2, 1);
      }
    };
    watch([search, location, selectedCategory, selectedRange], () => {
      currentPage.value = 1;
    });
    const resetFilters = () => {
      search.value = "";
      location.value = "";
      selectedCategory.value = "all";
      selectedRange.value = "all";
      currentPage.value = 1;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BaseCard = _sfc_main$6;
      const _component_BaseInput = _sfc_main$7;
      const _component_BaseSelect = _sfc_main$2;
      const _component_BaseButton = _sfc_main$3$1;
      const _component_BaseHeading = _sfc_main$b;
      const _component_BaseParagraph = _sfc_main$8;
      const _component_BaseButtonIcon = _sfc_main$9;
      const _component_Icon = __nuxt_component_2$1;
      const _component_BaseTag = _sfc_main$a;
      const _component_BaseAvatarGroup = _sfc_main$1;
      const _component_nuxt_link = __nuxt_component_1;
      const _component_TairoModal = _sfc_main$c;
      const _component_BaseButtonClose = _sfc_main$d;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-5e803a19><div class="relative" data-v-5e803a19>`);
      _push(ssrRenderComponent(_component_BaseCard, {
        rounded: "lg",
        class: "ptablet:py-6 ptablet:px-4 ptablet:grid ptablet:grid-cols-12 ltablet:divide-x divide-muted-200 dark:divide-muted-700 mb-10 flex w-full flex-col items-center py-2 sm:flex-row sm:py-0 lg:divide-x"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ptablet:ps-4 ptablet:col-span-6 w-full py-2 pe-4 ps-4 sm:w-auto sm:grow sm:ps-2" data-v-5e803a19${_scopeId}>`);
            _push2(ssrRenderComponent(_component_BaseInput, {
              modelValue: search.value,
              "onUpdate:modelValue": ($event) => search.value = $event,
              modelModifiers: { trim: true },
              rounded: "lg",
              icon: "lucide:search",
              placeholder: "Tech Keywords"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="ptablet:col-span-6 w-full flex-1 px-4 py-2 sm:w-auto" data-v-5e803a19${_scopeId}>`);
            _push2(ssrRenderComponent(_component_BaseInput, {
              modelValue: location.value,
              "onUpdate:modelValue": ($event) => location.value = $event,
              modelModifiers: { trim: true },
              rounded: "lg",
              icon: "lucide:map-pin",
              placeholder: "Location"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="ptablet:col-span-6 w-full flex-1 px-4 py-2 sm:w-auto" data-v-5e803a19${_scopeId}>`);
            _push2(ssrRenderComponent(_component_BaseSelect, {
              modelValue: selectedCategory.value,
              "onUpdate:modelValue": ($event) => selectedCategory.value = $event,
              rounded: "lg",
              icon: "lucide:laptop",
              label: "",
              "hide-label": ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<option value="all" data-v-5e803a19${_scopeId2}> All </option><option value="Sales" data-v-5e803a19${_scopeId2}> Sales </option><option value="Marketing" data-v-5e803a19${_scopeId2}> Marketing </option><option value="Analytics" data-v-5e803a19${_scopeId2}> Analytics </option><option value="Content" data-v-5e803a19${_scopeId2}> Content </option><option value="Collaboration" data-v-5e803a19${_scopeId2}> Collaboration </option><option value="IT" data-v-5e803a19${_scopeId2}> IT </option><option value="Security and Compliance" data-v-5e803a19${_scopeId2}> Security and Compliance </option><option value="HR" data-v-5e803a19${_scopeId2}> HR </option><option value="Commerce" data-v-5e803a19${_scopeId2}> Commerce </option><option value="DevOps" data-v-5e803a19${_scopeId2}> DevOps </option>`);
                } else {
                  return [
                    createVNode("option", { value: "all" }, " All "),
                    createVNode("option", { value: "Sales" }, " Sales "),
                    createVNode("option", { value: "Marketing" }, " Marketing "),
                    createVNode("option", { value: "Analytics" }, " Analytics "),
                    createVNode("option", { value: "Content" }, " Content "),
                    createVNode("option", { value: "Collaboration" }, " Collaboration "),
                    createVNode("option", { value: "IT" }, " IT "),
                    createVNode("option", { value: "Security and Compliance" }, " Security and Compliance "),
                    createVNode("option", { value: "HR" }, " HR "),
                    createVNode("option", { value: "Commerce" }, " Commerce "),
                    createVNode("option", { value: "DevOps" }, " DevOps ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="ptablet:col-span-6 w-full flex-1 px-4 py-2 sm:w-auto" data-v-5e803a19${_scopeId}>`);
            _push2(ssrRenderComponent(_component_BaseSelect, {
              modelValue: selectedRange.value,
              "onUpdate:modelValue": ($event) => selectedRange.value = $event,
              rounded: "lg",
              icon: "lucide:dollar-sign",
              label: "",
              "hide-label": ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<option value="" data-v-5e803a19${_scopeId2}> Select a range </option><option value="all" data-v-5e803a19${_scopeId2}> All </option><option value="&lt;10k" data-v-5e803a19${_scopeId2}> &lt; 10k </option><option value="10k-20k" data-v-5e803a19${_scopeId2}> 10k ~ 20k </option><option value="20k-40k" data-v-5e803a19${_scopeId2}> 20k ~ 40k </option><option value="40k-75k" data-v-5e803a19${_scopeId2}> 40k ~ 75k </option><option value="75k+" data-v-5e803a19${_scopeId2}> 75k+ </option>`);
                } else {
                  return [
                    createVNode("option", { value: "" }, " Select a range "),
                    createVNode("option", { value: "all" }, " All "),
                    createVNode("option", { value: "<10k" }, " < 10k "),
                    createVNode("option", { value: "10k-20k" }, " 10k ~ 20k "),
                    createVNode("option", { value: "20k-40k" }, " 20k ~ 40k "),
                    createVNode("option", { value: "40k-75k" }, " 40k ~ 75k "),
                    createVNode("option", { value: "75k+" }, " 75k+ ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="ptablet:col-span-12 w-full px-4 py-2 sm:w-auto" data-v-5e803a19${_scopeId}>`);
            _push2(ssrRenderComponent(_component_BaseButton, {
              rounded: "lg",
              color: "primary",
              class: "ptablet:w-full w-full sm:w-32",
              onClick: resetFilters
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Reset `);
                } else {
                  return [
                    createTextVNode(" Reset ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "ptablet:ps-4 ptablet:col-span-6 w-full py-2 pe-4 ps-4 sm:w-auto sm:grow sm:ps-2" }, [
                createVNode(_component_BaseInput, {
                  modelValue: search.value,
                  "onUpdate:modelValue": ($event) => search.value = $event,
                  modelModifiers: { trim: true },
                  rounded: "lg",
                  icon: "lucide:search",
                  placeholder: "Tech Keywords"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ]),
              createVNode("div", { class: "ptablet:col-span-6 w-full flex-1 px-4 py-2 sm:w-auto" }, [
                createVNode(_component_BaseInput, {
                  modelValue: location.value,
                  "onUpdate:modelValue": ($event) => location.value = $event,
                  modelModifiers: { trim: true },
                  rounded: "lg",
                  icon: "lucide:map-pin",
                  placeholder: "Location"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ]),
              createVNode("div", { class: "ptablet:col-span-6 w-full flex-1 px-4 py-2 sm:w-auto" }, [
                createVNode(_component_BaseSelect, {
                  modelValue: selectedCategory.value,
                  "onUpdate:modelValue": ($event) => selectedCategory.value = $event,
                  rounded: "lg",
                  icon: "lucide:laptop",
                  label: "",
                  "hide-label": ""
                }, {
                  default: withCtx(() => [
                    createVNode("option", { value: "all" }, " All "),
                    createVNode("option", { value: "Sales" }, " Sales "),
                    createVNode("option", { value: "Marketing" }, " Marketing "),
                    createVNode("option", { value: "Analytics" }, " Analytics "),
                    createVNode("option", { value: "Content" }, " Content "),
                    createVNode("option", { value: "Collaboration" }, " Collaboration "),
                    createVNode("option", { value: "IT" }, " IT "),
                    createVNode("option", { value: "Security and Compliance" }, " Security and Compliance "),
                    createVNode("option", { value: "HR" }, " HR "),
                    createVNode("option", { value: "Commerce" }, " Commerce "),
                    createVNode("option", { value: "DevOps" }, " DevOps ")
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"])
              ]),
              createVNode("div", { class: "ptablet:col-span-6 w-full flex-1 px-4 py-2 sm:w-auto" }, [
                createVNode(_component_BaseSelect, {
                  modelValue: selectedRange.value,
                  "onUpdate:modelValue": ($event) => selectedRange.value = $event,
                  rounded: "lg",
                  icon: "lucide:dollar-sign",
                  label: "",
                  "hide-label": ""
                }, {
                  default: withCtx(() => [
                    createVNode("option", { value: "" }, " Select a range "),
                    createVNode("option", { value: "all" }, " All "),
                    createVNode("option", { value: "<10k" }, " < 10k "),
                    createVNode("option", { value: "10k-20k" }, " 10k ~ 20k "),
                    createVNode("option", { value: "20k-40k" }, " 20k ~ 40k "),
                    createVNode("option", { value: "40k-75k" }, " 40k ~ 75k "),
                    createVNode("option", { value: "75k+" }, " 75k+ ")
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"])
              ]),
              createVNode("div", { class: "ptablet:col-span-12 w-full px-4 py-2 sm:w-auto" }, [
                createVNode(_component_BaseButton, {
                  rounded: "lg",
                  color: "primary",
                  class: "ptablet:w-full w-full sm:w-32",
                  onClick: resetFilters
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Reset ")
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="grid grid-cols-12 gap-6" data-v-5e803a19><div class="col-span-12" data-v-5e803a19><div class="mb-6 mt-12 sm:mt-0" data-v-5e803a19>`);
      _push(ssrRenderComponent(_component_BaseHeading, {
        as: "h3",
        size: "lg",
        weight: "light",
        lead: "tight",
        class: "text-muted-800 dark:text-white"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span data-v-5e803a19${_scopeId}>Showing ${ssrInterpolate(selectedDemos.value.length)} SaaS Technologies</span>`);
          } else {
            return [
              createVNode("span", null, "Showing " + toDisplayString(selectedDemos.value.length) + " SaaS Technologies", 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_BaseParagraph, { size: "sm" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="text-muted-500" data-v-5e803a19${_scopeId}> These are the matching technologies we found </span>`);
          } else {
            return [
              createVNode("span", { class: "text-muted-500" }, " These are the matching technologies we found ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="grid grid-cols-1 gap-6 lg:grid-cols-3" data-v-5e803a19><!--[-->`);
      ssrRenderList(paginatedDemos.value, (demo, index2) => {
        _push(`<div class="relative" data-v-5e803a19>`);
        _push(ssrRenderComponent(_component_BaseCard, {
          rounded: "lg",
          class: "p-6"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="absolute top-2 right-2" data-v-5e803a19${_scopeId}>`);
              _push2(ssrRenderComponent(_component_BaseButtonIcon, {
                rounded: "full",
                onClick: ($event) => toggleLike(demo)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_Icon, {
                      name: "ph:heart-duotone",
                      class: ["size-4", { "text-red-500": likedDemos.value.includes(demo.company) }]
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_Icon, {
                        name: "ph:heart-duotone",
                        class: ["size-4", { "text-red-500": likedDemos.value.includes(demo.company) }]
                      }, null, 8, ["class"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div><div class="flex w-full flex-col gap-4 sm:flex-row" data-v-5e803a19${_scopeId}><div${ssrRenderAttr("data-nui-tooltip", demo.company)} data-v-5e803a19${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: demo.logo,
                class: "size-10 shrink-0"
              }, null, _parent2, _scopeId));
              _push2(`</div><div data-v-5e803a19${_scopeId}>`);
              _push2(ssrRenderComponent(_component_BaseHeading, {
                as: "h4",
                size: "md",
                weight: "semibold",
                lead: "tight",
                class: "after:text-muted-800 mb-4 dark:text-white"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span data-v-5e803a19${_scopeId2}>${ssrInterpolate(demo.company)}</span>`);
                  } else {
                    return [
                      createVNode("span", null, toDisplayString(demo.company), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_BaseParagraph, { size: "sm" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span class="text-muted-500 dark:text-muted-400 line-clamp-4" data-v-5e803a19${_scopeId2}>${ssrInterpolate(demo.description)}</span>`);
                  } else {
                    return [
                      createVNode("span", { class: "text-muted-500 dark:text-muted-400 line-clamp-4" }, toDisplayString(demo.description), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`<div class="flex flex-wrap items-center gap-2 py-4" data-v-5e803a19${_scopeId}><!--[-->`);
              ssrRenderList(demo.tags, (tag) => {
                _push2(ssrRenderComponent(_component_BaseTag, {
                  key: tag,
                  color: "default",
                  size: "sm",
                  class: "text-xs"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(tag)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(tag), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]--></div><div class="mb-4" data-v-5e803a19${_scopeId}>`);
              _push2(ssrRenderComponent(_component_BaseTag, {
                color: "default",
                size: "sm",
                class: "text-xs"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(demo.category)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(demo.category), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div><div class="mb-4" data-v-5e803a19${_scopeId}>`);
              _push2(ssrRenderComponent(_component_BaseTag, {
                color: "default",
                size: "sm",
                class: "text-xs"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Cost Range: ${ssrInterpolate(demo.costRange)}`);
                  } else {
                    return [
                      createTextVNode(" Cost Range: " + toDisplayString(demo.costRange), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div><div class="flex justify-between items-center mb-4" data-v-5e803a19${_scopeId}>`);
              _push2(ssrRenderComponent(_component_BaseAvatarGroup, {
                avatars: demo.team,
                limit: 2,
                size: "xs"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="flex items-center justify-between" data-v-5e803a19${_scopeId}><div class="flex gap-2" data-v-5e803a19${_scopeId}>`);
              _push2(ssrRenderComponent(_component_nuxt_link, {
                to: { name: "reviews-id", params: { id: demo.company } }
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_BaseButton, {
                      rounded: "lg",
                      color: "default",
                      class: "w-24"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Reviews `);
                        } else {
                          return [
                            createTextVNode(" Reviews ")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_BaseButton, {
                        rounded: "lg",
                        color: "default",
                        class: "w-24"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Reviews ")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_BaseButton, {
                rounded: "lg",
                color: "primary",
                class: "w-24",
                onClick: ($event) => openModal(demo)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Demo `);
                  } else {
                    return [
                      createTextVNode(" Demo ")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_nuxt_link, {
                to: { name: "company-id", params: { id: demo.company } }
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_BaseButton, {
                      rounded: "lg",
                      color: "default",
                      class: "w-24"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Company `);
                        } else {
                          return [
                            createTextVNode(" Company ")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_BaseButton, {
                        rounded: "lg",
                        color: "default",
                        class: "w-24"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Company ")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div></div></div></div>`);
            } else {
              return [
                createVNode("div", { class: "absolute top-2 right-2" }, [
                  createVNode(_component_BaseButtonIcon, {
                    rounded: "full",
                    onClick: ($event) => toggleLike(demo)
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Icon, {
                        name: "ph:heart-duotone",
                        class: ["size-4", { "text-red-500": likedDemos.value.includes(demo.company) }]
                      }, null, 8, ["class"])
                    ]),
                    _: 2
                  }, 1032, ["onClick"])
                ]),
                createVNode("div", { class: "flex w-full flex-col gap-4 sm:flex-row" }, [
                  createVNode("div", {
                    "data-nui-tooltip": demo.company
                  }, [
                    createVNode(_component_Icon, {
                      name: demo.logo,
                      class: "size-10 shrink-0"
                    }, null, 8, ["name"])
                  ], 8, ["data-nui-tooltip"]),
                  createVNode("div", null, [
                    createVNode(_component_BaseHeading, {
                      as: "h4",
                      size: "md",
                      weight: "semibold",
                      lead: "tight",
                      class: "after:text-muted-800 mb-4 dark:text-white"
                    }, {
                      default: withCtx(() => [
                        createVNode("span", null, toDisplayString(demo.company), 1)
                      ]),
                      _: 2
                    }, 1024),
                    createVNode(_component_BaseParagraph, { size: "sm" }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "text-muted-500 dark:text-muted-400 line-clamp-4" }, toDisplayString(demo.description), 1)
                      ]),
                      _: 2
                    }, 1024),
                    createVNode("div", { class: "flex flex-wrap items-center gap-2 py-4" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(demo.tags, (tag) => {
                        return openBlock(), createBlock(_component_BaseTag, {
                          key: tag,
                          color: "default",
                          size: "sm",
                          class: "text-xs"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(tag), 1)
                          ]),
                          _: 2
                        }, 1024);
                      }), 128))
                    ]),
                    createVNode("div", { class: "mb-4" }, [
                      createVNode(_component_BaseTag, {
                        color: "default",
                        size: "sm",
                        class: "text-xs"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(demo.category), 1)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    createVNode("div", { class: "mb-4" }, [
                      createVNode(_component_BaseTag, {
                        color: "default",
                        size: "sm",
                        class: "text-xs"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Cost Range: " + toDisplayString(demo.costRange), 1)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    createVNode("div", { class: "flex justify-between items-center mb-4" }, [
                      createVNode(_component_BaseAvatarGroup, {
                        avatars: demo.team,
                        limit: 2,
                        size: "xs"
                      }, null, 8, ["avatars"])
                    ]),
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", { class: "flex gap-2" }, [
                        createVNode(_component_nuxt_link, {
                          to: { name: "reviews-id", params: { id: demo.company } }
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_BaseButton, {
                              rounded: "lg",
                              color: "default",
                              class: "w-24"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Reviews ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 2
                        }, 1032, ["to"]),
                        createVNode(_component_BaseButton, {
                          rounded: "lg",
                          color: "primary",
                          class: "w-24",
                          onClick: ($event) => openModal(demo)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Demo ")
                          ]),
                          _: 2
                        }, 1032, ["onClick"]),
                        createVNode(_component_nuxt_link, {
                          to: { name: "company-id", params: { id: demo.company } }
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_BaseButton, {
                              rounded: "lg",
                              color: "default",
                              class: "w-24"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Company ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 2
                        }, 1032, ["to"])
                      ])
                    ])
                  ])
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div><div class="flex justify-center mt-6" data-v-5e803a19>`);
      _push(ssrRenderComponent(_component_BaseButton, {
        disabled: currentPage.value === 1,
        onClick: ($event) => changePage(currentPage.value - 1),
        rounded: "lg",
        color: "default",
        class: "mx-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Previous `);
          } else {
            return [
              createTextVNode(" Previous ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--[-->`);
      ssrRenderList(totalPages.value, (page) => {
        _push(ssrRenderComponent(_component_BaseButton, {
          key: page,
          onClick: ($event) => changePage(page),
          rounded: "lg",
          color: page === currentPage.value ? "primary" : "default",
          class: "mx-2"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(page)}`);
            } else {
              return [
                createTextVNode(toDisplayString(page), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]-->`);
      _push(ssrRenderComponent(_component_BaseButton, {
        disabled: currentPage.value === totalPages.value,
        onClick: ($event) => changePage(currentPage.value + 1),
        rounded: "lg",
        color: "default",
        class: "mx-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Next `);
          } else {
            return [
              createTextVNode(" Next ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
      _push(ssrRenderComponent(_component_TairoModal, {
        open: isModal3XlOpen.value,
        size: "3xl",
        onClose: ($event) => isModal3XlOpen.value = false,
        class: "bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
      }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center w-full justify-between p-4 md:p-6 border-b border-gray-200 dark:border-gray-700" data-v-5e803a19${_scopeId}><div class="flex items-center" data-v-5e803a19${_scopeId}>`);
            if (selectedDemo.value) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: selectedDemo.value.logo,
                class: "w-10 h-10 mr-2"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<h3 class="font-heading dark:text-white text-lg font-medium leading-6" data-v-5e803a19${_scopeId}>${ssrInterpolate(selectedDemo.value ? selectedDemo.value.title : "")} Demo Video </h3></div>`);
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
            _push2(`<div class="relative pb-9/16" data-v-5e803a19${_scopeId}>`);
            if (selectedDemo.value) {
              _push2(`<iframe${ssrRenderAttr("src", `https://www.youtube.com/embed/${selectedDemo.value.video.split("v=")[1].split("&")[0]}?autoplay=1`)} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg" data-v-5e803a19${_scopeId}></iframe>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5e803a19"]]);

export { index as default };
//# sourceMappingURL=index-BppERJYn.mjs.map
