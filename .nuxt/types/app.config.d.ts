
import type { CustomAppConfig } from 'nuxt/schema'
import type { Defu } from 'defu'
import cfg0 from "C:/Users/Nebula PC/Desktop/BearScore/.app/app.config"
import cfg1 from "C:/Users/Nebula PC/Desktop/BearScore/layers/tairo-layout-sidebar/app.config"
import cfg2 from "C:/Users/Nebula PC/Desktop/BearScore/layers/tairo-layout-collapse/app.config"
import cfg3 from "C:/Users/Nebula PC/Desktop/BearScore/layers/tairo-layout-topnav/app.config"
import cfg4 from "C:/Users/Nebula PC/Desktop/BearScore/layers/tairo/app.config"
import cfg5 from "C:/Users/Nebula PC/Desktop/BearScore/node_modules/.pnpm/@shuriken-ui+nuxt@3.1.5_nuxt@3.11.2_vue@3.4.21/node_modules/@shuriken-ui/nuxt/app.config"

declare const inlineConfig = {
  "nuxt": {
    "buildId": "dev"
  }
}
type ResolvedAppConfig = Defu<typeof inlineConfig, [typeof cfg0, typeof cfg1, typeof cfg2, typeof cfg3, typeof cfg4, typeof cfg5]>
type IsAny<T> = 0 extends 1 & T ? true : false

type MergedAppConfig<Resolved extends Record<string, unknown>, Custom extends Record<string, unknown>> = {
  [K in keyof (Resolved & Custom)]: K extends keyof Custom
    ? unknown extends Custom[K]
      ? Resolved[K]
      : IsAny<Custom[K]> extends true
        ? Resolved[K]
        : Custom[K] extends Record<string, any>
            ? Resolved[K] extends Record<string, any>
              ? MergedAppConfig<Resolved[K], Custom[K]>
              : Exclude<Custom[K], undefined>
            : Exclude<Custom[K], undefined>
    : Resolved[K]
}

declare module 'nuxt/schema' {
  interface AppConfig extends MergedAppConfig<ResolvedAppConfig, CustomAppConfig> { }
}
declare module '@nuxt/schema' {
  interface AppConfig extends MergedAppConfig<ResolvedAppConfig, CustomAppConfig> { }
}
