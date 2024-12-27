import { _ as __nuxt_component_0$1, a as _sfc_main$4, b as _sfc_main$1 } from './TairoSubsidebarMenu-BIxLRVC4.mjs';
import { defineComponent, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import './server.mjs';
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
import './tailwind-B8vcEit7.mjs';
import './index-BCPoQdcH.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DemoSubsidebarDashboards",
  __ssrInlineRender: true,
  setup(__props) {
    const navigation = [
      {
        name: "Personal",
        children: [
          {
            name: "Personal V1",
            icon: "ph:coffee-duotone",
            to: "/dashboards",
            exact: true
          },
          {
            name: "Personal V2",
            icon: "ph:chart-pie-slice-duotone",
            to: "/dashboards/personal-2"
          },
          {
            name: "Personal 4",
            icon: "ph:cactus-duotone",
            to: "/dashboards/personal-3"
          },
          {
            name: "Personal balance",
            icon: "ph:money-duotone",
            to: "/dashboards/balance"
          }
        ]
      },
      {
        name: "Finance",
        children: [
          {
            name: "Analytics dashboard",
            icon: "ph:gauge-duotone",
            to: "/dashboards/analytics"
          },
          {
            name: "Overview dashboard",
            icon: "ph:projector-screen-chart-duotone",
            to: "/dashboards/overview"
          },
          {
            name: "Quickview dashboard",
            icon: "ph:app-window-duotone",
            to: "/dashboards/quickview"
          },
          {
            name: "Stock dashboard",
            icon: "ph:coin-duotone",
            to: "/dashboards/stocks"
          },
          {
            name: "Trading dashboard",
            icon: "ph:read-cv-logo-duotone",
            to: "/dashboards/trading"
          },
          {
            name: "Sales dashboard",
            icon: "ph:shopping-cart-duotone",
            to: "/dashboards/sales"
          }
        ]
      },
      {
        name: "Banking",
        children: [
          {
            name: "Banking V1",
            icon: "ph:bank-duotone",
            to: "/dashboards/banking-1"
          },
          {
            name: "Banking V2",
            icon: "ph:bank-duotone",
            to: "/dashboards/banking-2"
          },
          {
            name: "Banking V3",
            icon: "ph:bank-duotone",
            to: "/dashboards/banking-3"
          },
          {
            name: "Banking V4",
            icon: "ph:bank-duotone",
            to: "/dashboards/banking-4"
          },
          {
            name: "Banking V5",
            icon: "ph:bank-duotone",
            to: "/dashboards/banking-5"
          }
        ]
      },
      {
        name: "Business",
        children: [
          {
            name: "Flights booking",
            icon: "ph:airplane-duotone",
            to: "/dashboards/flights"
          },
          {
            name: "Company board",
            icon: "ph:buildings-duotone",
            to: "/dashboards/company"
          },
          {
            name: "HR board",
            icon: "ph:users-four-duotone",
            to: "/dashboards/human-resources"
          },
          {
            name: "Course dashboard",
            icon: "ph:graduation-cap-duotone",
            to: "/dashboards/course"
          },
          {
            name: "Jobs dashboard",
            icon: "ph:briefcase-duotone",
            to: "/dashboards/jobs"
          }
        ]
      },
      {
        name: "Lifestyle",
        children: [
          {
            name: "Influencer",
            icon: "ph:crown-duotone",
            to: "/dashboards/influencer"
          },
          {
            name: "Hobbies",
            icon: "ph:confetti-duotone",
            to: "/dashboards/hobbies"
          },
          {
            name: "Health",
            icon: "ph:pill-duotone",
            to: "/dashboards/health"
          },
          {
            name: "Writer",
            icon: "ph:pen-nib-duotone",
            to: "/dashboards/writer"
          },
          {
            name: "Video",
            icon: "ph:video-camera-duotone",
            to: "/dashboards/video"
          },
          {
            name: "Soccer",
            icon: "ph:soccer-ball-duotone",
            to: "/dashboards/soccer"
          }
        ]
      },
      {
        name: "Ecommerce",
        children: [
          {
            name: "Ecommerce",
            icon: "ph:storefront-duotone",
            to: "/dashboards/ecommerce"
          }
        ]
      },
      {
        name: "Apps",
        children: [
          {
            name: "Calendar",
            icon: "ph:calendar-blank-duotone",
            to: "/dashboards/calendar"
          },
          {
            name: "Food delivery",
            icon: "ph:cookie-duotone",
            to: "/dashboards/delivery"
          },
          {
            name: "Maps v1",
            icon: "ph:map-pin-duotone",
            to: "/dashboards/map-left"
          },
          {
            name: "Maps v2",
            icon: "ph:map-pin-duotone",
            to: "/dashboards/map-right"
          },
          {
            name: "Inbox",
            icon: "ph:envelope-duotone",
            to: "/dashboards/inbox"
          },
          {
            name: "Messaging v1",
            icon: "ph:chat-circle-duotone",
            to: "/dashboards/messaging"
          },
          {
            name: "Messaging v2",
            icon: "ph:chat-teardrop-duotone",
            to: "/dashboards/messaging-2"
          }
        ]
      },
      {
        divider: true
      },
      {
        name: "Wizard",
        to: "/wizard"
      },
      {
        divider: true
      },
      {
        name: "Charts",
        children: [
          {
            name: "Apex Charts",
            icon: "ph:chart-pie-slice-duotone",
            to: "/dashboards/charts"
          }
        ]
      },
      {
        name: "Widgets",
        children: [
          {
            name: "UI Widgets",
            icon: "ph:square-half-duotone",
            to: "/dashboards/widgets",
            exact: true
          },
          {
            name: "Creative Widgets",
            icon: "ph:square-half-bottom-duotone",
            to: "/dashboards/widgets/creative"
          },
          {
            name: "List Widgets",
            icon: "ph:square-half-duotone",
            to: "/dashboards/widgets/list"
          }
        ]
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TairoSubsidebar = __nuxt_component_0$1;
      const _component_TairoSubsidebarHeader = _sfc_main$4;
      const _component_TairoSubsidebarMenu = _sfc_main$1;
      _push(ssrRenderComponent(_component_TairoSubsidebar, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_TairoSubsidebarHeader, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_TairoSubsidebarHeader)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_TairoSubsidebarMenu, { navigation }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_TairoSubsidebarMenu, { navigation })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/DemoSubsidebarDashboards.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=DemoSubsidebarDashboards-CSKsjhWO.mjs.map
