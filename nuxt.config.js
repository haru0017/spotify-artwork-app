export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    htmlAttrs: {
      lang: 'en',
      prefix: 'og: http://ogp.me/ns#'
    },
    title: 'spotify-artwork-app',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Spotify artwork viewer inspired by itunes artwork screensaver.' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'spotify-artwork-app'},
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'https://spotify-artwork-app.vercel.app' },
      { hid: 'og:title', property: 'og:title', content: 'spotify-artwork-app' },
      { hid: 'og:description', property: 'og:description', content: 'Spotify artwork viewer inspired by itunes artwork screensaver.' },
      { hid: 'og:image', property: 'og:image', content: 'https://spotify-artwork-app.vercel.app/ogp.png' },
      { name: 'twitter:card', content: 'sammary_large_image' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // Add nuxt-typed-vuex
    'nuxt-typed-vuex',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://tailwindcss.nuxtjs.org/setup/
    '@nuxtjs/tailwindcss'
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    // Add nuxt-typed-vuex
    transpile: [/typed-vuex/],
  },

  // Environment variable
  publicRuntimeConfig: {
    apiKey: process.env.API_KEY
  }
}
