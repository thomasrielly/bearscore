import { NuxtModule, RuntimeConfig } from 'nuxt/schema'
declare module 'nuxt/schema' {
  interface NuxtConfig {
    ["purge-comments"]?: typeof import("C:/Users/Nebula PC/Desktop/BearScore/layers/tairo/modules/purge-comments").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["mongoose"]?: typeof import("nuxt-mongoose").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["toaster"]?: typeof import("@cssninja/nuxt-toaster").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["vueuse"]?: typeof import("@vueuse/nuxt").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["colorMode"]?: typeof import("@nuxtjs/color-mode").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["tailwindcss"]?: typeof import("@nuxtjs/tailwindcss").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["icon"]?: typeof import("nuxt-icon").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["telemetry"]?: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    modules?: (undefined | null | false | NuxtModule | string | [NuxtModule | string, Record<string, any>] | ["C:/Users/Nebula PC/Desktop/BearScore/layers/tairo/modules/purge-comments", Exclude<NuxtConfig["purge-comments"], boolean>] | ["nuxt-mongoose", Exclude<NuxtConfig["mongoose"], boolean>] | ["@cssninja/nuxt-toaster", Exclude<NuxtConfig["toaster"], boolean>] | ["@vueuse/nuxt", Exclude<NuxtConfig["vueuse"], boolean>] | ["@nuxtjs/color-mode", Exclude<NuxtConfig["colorMode"], boolean>] | ["@nuxtjs/tailwindcss", Exclude<NuxtConfig["tailwindcss"], boolean>] | ["nuxt-icon", Exclude<NuxtConfig["icon"], boolean>] | ["@nuxt/telemetry", Exclude<NuxtConfig["telemetry"], boolean>])[],
  }
  interface RuntimeConfig {
   app: {
      baseURL: string,

      buildAssetsDir: string,

      cdnURL: string,
   },

   mongodbUri: string,

   mongoose: {
      uri: string,

      options: any,

      devtools: boolean,

      modelsDir: string,
   },
  }
  interface PublicRuntimeConfig {
   mongoose: {
      uri: string,
   },
  }
}
declare module 'vue' {
        interface ComponentCustomProperties {
          $config: RuntimeConfig
        }
      }