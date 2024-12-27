
import { updateAppConfig } from '#app/config'
import { defuFn } from 'defu'

const inlineConfig = {
  "nuxt": {
    "buildId": "dev"
  }
}

// Vite - webpack is handled directly in #app/config
if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    updateAppConfig(newModule.default)
  })
}

import cfg0 from "C:/Users/Nebula PC/Desktop/BearScore/.app/app.config.ts"
import cfg1 from "C:/Users/Nebula PC/Desktop/BearScore/layers/tairo-layout-sidebar/app.config.ts"
import cfg2 from "C:/Users/Nebula PC/Desktop/BearScore/layers/tairo-layout-collapse/app.config.ts"
import cfg3 from "C:/Users/Nebula PC/Desktop/BearScore/layers/tairo-layout-topnav/app.config.ts"
import cfg4 from "C:/Users/Nebula PC/Desktop/BearScore/layers/tairo/app.config.ts"
import cfg5 from "C:/Users/Nebula PC/Desktop/BearScore/node_modules/.pnpm/@shuriken-ui+nuxt@3.1.5_nuxt@3.11.2_vue@3.4.21/node_modules/@shuriken-ui/nuxt/app.config.ts"

export default /*@__PURE__*/ defuFn(cfg0, cfg1, cfg2, cfg3, cfg4, cfg5, inlineConfig)
