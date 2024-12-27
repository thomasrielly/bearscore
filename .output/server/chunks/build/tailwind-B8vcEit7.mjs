import { computed } from 'vue';
import { a as useMediaQuery } from './index-BCPoQdcH.mjs';

function useCssVarWithRGB(name) {
  {
    return computed(() => "transparent");
  }
}
function useTailwindColors() {
  const primary = useCssVarWithRGB();
  const success = useCssVarWithRGB();
  const info = useCssVarWithRGB();
  const warning = useCssVarWithRGB();
  const danger = useCssVarWithRGB();
  const yellow = useCssVarWithRGB();
  const title = useCssVarWithRGB();
  const subtitle = useCssVarWithRGB();
  return {
    primary,
    info,
    success,
    warning,
    danger,
    yellow,
    title,
    subtitle
  };
}
function useTailwindBreakpoints() {
  const xs = useMediaQuery("(max-width: 639px)");
  const sm = useMediaQuery("(min-width: 640px)");
  const md = useMediaQuery("(min-width: 768px)");
  const lg = useMediaQuery("(min-width: 1025px)");
  const ptablet = useMediaQuery(
    "(min-width: 768px) and (max-width: 1024px) and (orientation: portrait)"
  );
  const ltablet = useMediaQuery(
    "(min-width: 768px) and (max-width: 1024px) and (orientation: landscape)"
  );
  const xl = useMediaQuery("(min-width: 1280px)");
  const doublexl = useMediaQuery("(min-width: 1536px)");
  return {
    xs,
    sm,
    md,
    lg,
    ptablet,
    ltablet,
    xl,
    doublexl
  };
}

export { useTailwindBreakpoints as a, useTailwindColors as u };
//# sourceMappingURL=tailwind-B8vcEit7.mjs.map
