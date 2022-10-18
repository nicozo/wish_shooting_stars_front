import { NuxtConfig } from '@nuxt/types'

const config: NuxtConfig = {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Railsアプリのポート番号との重複を避ける
  server: {
    port: process.env.FRONT_PORT
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'front',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  publicRuntimeConfig: {
    appName: process.env.APP_NAME
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    `plugins/axios.js`
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios'
    // '@nuxtjs/i18n'
  ],

  // i18n: {
  //   // 対応言語の指定
  //   locales: ['ja', 'en'],
  //   // デフォルト言語の指定
  //   defaultLocale: 'ja',
  //   vueI18n: {
  //     // 翻訳対象のキーがない場合の言語を指定
  //     fallbackLocale: 'ja',
  //     // キーが存在しない場合のみ警告
  //     silentFallbackWarn: true,
  //     messages: {
  //       ja: require('./locales/ja.json'),
  //       en: require('./locales/en.json')
  //     }
  //   }
  // },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.NODE_ENV === "production" ? "https://wish-shooting-stars-api.herokuapp.com/" : process.env.API_URL
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  vuetify: {
    customVariables: ['~/assets/sass/variables.scss'],
    treeShake: true
  }
}

export default config