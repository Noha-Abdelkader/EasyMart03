// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/style.scss'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  plugins:['@/plugins/ant'],
  modules: ['@nuxt/image' ,'@pinia/nuxt'],
  pinia: {
    // autoImports: [
    //   // automatically imports `defineStore`
    //   "defineStore", // import { defineStore } from 'pinia'
    //   "storeToRefs", // import { storeToRef } from 'pinia'
    //   ["defineStore", "definePiniaStore"], // import { defineStore as definePiniaStore } from 'pinia'
    // ],
  },
  // veeValidate: {
  //   // disable or enable auto imports
  //   autoImports: true,
  //   // Use different names for components
  //   componentNames: {
  //     Form: 'VeeForm',
  //     Field: 'VeeField',
  //     FieldArray: 'VeeFieldArray',
  //     ErrorMessage: 'VeeErrorMessage',
  //   },
  // },
  // image: {
  //   provider: 'static',
  //   // Optionally, set a global fallback image
  //   static: {
  //     defaults: {
  //       fallback: '~/assets/images/placeholder.png'
  //     }
  //   }
  // }
})