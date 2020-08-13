import axios from 'axios'
import serveConfig from './config/server-config'
const isDev = process.env.NODE_ENV === 'development'

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   https://vue-meta.nuxtjs.org/api/
   */
  head: {
    titleTemplate: '%s - ' + serveConfig.blogName,
    title: serveConfig.blogName || '',
    htmlAttrs: {
      lang: 'zh-CN'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: '王海涛的个人博客网站'
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content:
          'JavaScript, git, Java, Sql, CSS, Web APIs, Windows, Linux, Interview Work'
      },
      { name: '王海涛', content: '15124505701@163.com' }
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
  plugins: [
    { src: '@/plugins/global' },
    { src: '@/plugins/analytics.js', mode: 'client' }
  ],
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
      dark: true,
      options: { variations: false }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    analyze: !isDev,
    filenames: {
      app: isDev ? '[name].js' : 'js/[name]-[chunkhash:7].js',
      chunk: isDev ? '[name].js' : 'js/[name]-[chunkhash:7].js',
      vendor: isDev ? '[name].js' : 'js/[name]-[chunkhash:7].js',
      css: isDev ? '[name].css' : 'css/[name]-[chunkhash:7].css'
    },
    extractCSS: isDev ? false : { ignoreOrder: true },
    html: { minify: { collapseWhitespace: true } },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  generate: {
    interval: 100,
    routes() {
      return axios
        .get('http://localhost:8085/api/portal/article/allPublish')
        .then((res) => {
          return res.data.data.list.map((article) => {
            return { route: '/article/' + article.id, payload: article }
          })
        })
    }
  }
}
