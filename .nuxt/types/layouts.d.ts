import type { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = "default" | "sidebar" | "collapse" | "topnav" | "empty"
declare module "../../../node_modules/.pnpm/nuxt@3.11.2_@unocss+reset@0.59.1_eslint@8.57.0_floating-vue@5.2.2_typescript@5.4.5_unocss@0.59.1_vue-tsc@2.0.12/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}