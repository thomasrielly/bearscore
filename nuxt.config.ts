import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  extends: [
    '../layers/tairo-layout-sidebar',
    '../layers/tairo-layout-collapse',
    '../layers/tairo-layout-topnav',
    '../layers/tairo',
  ],

  css: [
    '@fontsource-variable/inter/index.css',
    '@fontsource-variable/karla/index.css',
  ],

  modules: ['nuxt-mongoose'],

  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI || 'mongodb+srv://saasbear:Faraz123.$@cluster0.jbsks3h.mongodb.net/test?retryWrites=true&w=majority',
    public: {
      mongoose: {
        uri: process.env.MONGODB_URI || 'mongodb+srv://saasbear:Faraz123.$@cluster0.jbsks3h.mongodb.net/test?retryWrites=true&w=majority',
      },
    },
  },
});
