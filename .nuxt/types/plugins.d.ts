// Generated by Nuxt'
import type { Plugin } from '#app'

type Decorate<T extends Record<string, any>> = { [K in keyof T as K extends string ? `$${K}` : never]: T[K] }

type IsAny<T> = 0 extends 1 & T ? true : false
type InjectionType<A extends Plugin> = IsAny<A> extends true ? unknown : A extends Plugin<infer T> ? Decorate<T> : unknown

type NuxtAppInjections = 
  InjectionType<typeof import("../../../node_modules/.pnpm/nuxt@3.11.2_@unocss+reset@0.59.1_eslint@8.57.0_floating-vue@5.2.2_typescript@5.4.5_unocss@0.59.1_vue-tsc@2.0.12/node_modules/nuxt/dist/app/plugins/check-outdated-build.client").default> &
  InjectionType<typeof import("../../../node_modules/.pnpm/nuxt@3.11.2_@unocss+reset@0.59.1_eslint@8.57.0_floating-vue@5.2.2_typescript@5.4.5_unocss@0.59.1_vue-tsc@2.0.12/node_modules/nuxt/dist/app/plugins/revive-payload.server").default> &
  InjectionType<typeof import("../../../node_modules/.pnpm/nuxt@3.11.2_@unocss+reset@0.59.1_eslint@8.57.0_floating-vue@5.2.2_typescript@5.4.5_unocss@0.59.1_vue-tsc@2.0.12/node_modules/nuxt/dist/app/plugins/revive-payload.client").default> &
  InjectionType<typeof import("../../../node_modules/.pnpm/nuxt@3.11.2_@unocss+reset@0.59.1_eslint@8.57.0_floating-vue@5.2.2_typescript@5.4.5_unocss@0.59.1_vue-tsc@2.0.12/node_modules/nuxt/dist/head/runtime/plugins/unhead").default> &
  InjectionType<typeof import("../../../node_modules/.pnpm/nuxt@3.11.2_@unocss+reset@0.59.1_eslint@8.57.0_floating-vue@5.2.2_typescript@5.4.5_unocss@0.59.1_vue-tsc@2.0.12/node_modules/nuxt/dist/pages/runtime/plugins/router").default> &
  InjectionType<typeof import("../../../node_modules/.pnpm/nuxt@3.11.2_@unocss+reset@0.59.1_eslint@8.57.0_floating-vue@5.2.2_typescript@5.4.5_unocss@0.59.1_vue-tsc@2.0.12/node_modules/nuxt/dist/pages/runtime/plugins/prefetch.client").default> &
  InjectionType<typeof import("../../../node_modules/.pnpm/nuxt@3.11.2_@unocss+reset@0.59.1_eslint@8.57.0_floating-vue@5.2.2_typescript@5.4.5_unocss@0.59.1_vue-tsc@2.0.12/node_modules/nuxt/dist/pages/runtime/plugins/check-if-page-unused").default> &
  InjectionType<typeof import("../../../node_modules/.pnpm/@nuxtjs+color-mode@3.4.0/node_modules/@nuxtjs/color-mode/dist/runtime/plugin.server").default> &
  InjectionType<typeof import("../../../node_modules/.pnpm/@nuxtjs+color-mode@3.4.0/node_modules/@nuxtjs/color-mode/dist/runtime/plugin.client").default> &
  InjectionType<typeof import("../../../node_modules/.pnpm/@cssninja+nuxt-toaster@0.3.12_vue@3.4.21/node_modules/@cssninja/nuxt-toaster/dist/runtime/plugin").default> &
  InjectionType<typeof import("../../../node_modules/.pnpm/nuxt@3.11.2_@unocss+reset@0.59.1_eslint@8.57.0_floating-vue@5.2.2_typescript@5.4.5_unocss@0.59.1_vue-tsc@2.0.12/node_modules/nuxt/dist/app/plugins/chunk-reload.client").default> &
  InjectionType<typeof import("../../../node_modules/.pnpm/nuxt@3.11.2_@unocss+reset@0.59.1_eslint@8.57.0_floating-vue@5.2.2_typescript@5.4.5_unocss@0.59.1_vue-tsc@2.0.12/node_modules/nuxt/dist/app/plugins/dev-server-logs").default> &
  InjectionType<typeof import("../../../node_modules/.pnpm/nuxt@3.11.2_@unocss+reset@0.59.1_eslint@8.57.0_floating-vue@5.2.2_typescript@5.4.5_unocss@0.59.1_vue-tsc@2.0.12/node_modules/nuxt/dist/app/plugins/check-if-layout-used").default> &
  InjectionType<typeof import("../../../layers/tairo/plugins/directives").default>

declare module '#app' {
  interface NuxtApp extends NuxtAppInjections { }

  interface NuxtAppLiterals {
    pluginName: 'nuxt:revive-payload:client' | 'nuxt:head' | 'nuxt:router' | 'nuxt:revive-payload:server' | 'nuxt:global-components' | 'nuxt:prefetch' | 'nuxt:checkIfPageUnused' | 'nuxt:chunk-reload' | 'nuxt:checkIfLayoutUsed'
  }
}

declare module 'vue' {
  interface ComponentCustomProperties extends NuxtAppInjections { }
}

export { }
