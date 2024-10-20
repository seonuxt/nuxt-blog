const pkg = require('./package')

module.exports = {
  head: {
    title: 'blog',
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

  loading: { color: '#409EFF' },

  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/theme/index.scss'
  ],

  plugins: [
    '@/plugins/globals',
    '@/plugins/axios'
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],

  components: true,

  buildModules: [],

  modules: [
    '@nuxtjs/axios'
  ],

  axios: {},

  env: {
    appName: 'Фото Блог'
  },

  build: {
    transpile: [/^element-ui/],
    extend(config, ctx) {}
  }
}

