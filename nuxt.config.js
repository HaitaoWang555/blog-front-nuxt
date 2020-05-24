import serveConfig from './config/server-config'
const isDev = process.env.NODE_ENV === 'development'

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s',
    title: serveConfig.blogName || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    { src: '~/assets/style.scss' },
    '@mdi/font/css/materialdesignicons.css'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: '@/plugins/global' }],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/proxy'],
  proxy: {
    '/api': {
      target: serveConfig.devProxyURL,
      pathRewrite: {
        '^/api': '/api'
      }
    },
    '/upload': {
      target: serveConfig.devProxyURL,
      pathRewrite: {
        '^/upload': '/upload'
      }
    }
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    defaultAssets: false,
    treeShake: true,
    theme: {
      dark: true
    }
  },
  /*
   ** Build configuration
   */
  build: {
    filenames: {
      app: isDev ? '[name].js' : 'js/[name]-[chunkhash:7].js',
      chunk: isDev ? '[name].js' : 'js/[name]-[chunkhash:7].js',
      vendor: isDev ? '[name].js' : 'js/[name]-[chunkhash:7].js',
      css: isDev ? '[name].css' : 'css/[name]-[chunkhash:7].css'
    },
    extractCSS: !isDev,
    html: { minify: { collapseWhitespace: true } },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
