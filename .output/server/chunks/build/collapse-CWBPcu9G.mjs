import { q as useAppConfig, i as useState } from './server.mjs';
import { computed } from 'vue';
import { a as useTailwindBreakpoints } from './tailwind-B8vcEit7.mjs';

function useCollapse() {
  const app = useAppConfig();
  const menuItems = computed(() => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
    if (((_c = (_b = (_a = app.tairo) == null ? void 0 : _a.collapse) == null ? void 0 : _b.navigation) == null ? void 0 : _c.enabled) === false || ((_g = (_f = (_e = (_d = app.tairo) == null ? void 0 : _d.collapse) == null ? void 0 : _e.navigation) == null ? void 0 : _f.items) == null ? void 0 : _g.length) === 0) {
      return [];
    }
    return (_k = (_j = (_i = (_h = app.tairo) == null ? void 0 : _h.collapse) == null ? void 0 : _i.navigation) == null ? void 0 : _j.items) == null ? void 0 : _k.map(
      (navigation) => {
        var _a2;
        return {
          ...navigation,
          position: (_a2 = navigation.position) != null ? _a2 : "start"
        };
      }
    );
  });
  const isOpen = useState("collapse-open", () => true);
  const isMobileOpen = useState("collapse-mobile-open", () => false);
  const header = computed(() => {
    var _a, _b, _c;
    return (_c = (_b = (_a = app.tairo) == null ? void 0 : _a.collapse) == null ? void 0 : _b.navigation) == null ? void 0 : _c.header;
  });
  const footer = computed(() => {
    var _a, _b, _c;
    return (_c = (_b = (_a = app.tairo) == null ? void 0 : _a.collapse) == null ? void 0 : _b.navigation) == null ? void 0 : _c.footer;
  });
  function toggle() {
    const { lg } = useTailwindBreakpoints();
    if (lg.value) {
      isOpen.value = !isOpen.value;
    } else {
      isMobileOpen.value = !isMobileOpen.value;
    }
  }
  return {
    toggle,
    menuItems,
    isOpen,
    isMobileOpen,
    header,
    footer
  };
}

export { useCollapse as u };
//# sourceMappingURL=collapse-CWBPcu9G.mjs.map
