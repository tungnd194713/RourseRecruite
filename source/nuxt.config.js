export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'console',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=M+PLUS+1p'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/styles/style.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '~/plugins/vee-validate.js', mode: 'client'},
    '~/plugins/api',
    '~/plugins/repositories',
    '~/plugins/handle-response.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/i18n',
    '@nuxtjs/style-resources',
    '@nuxtjs/dotenv',
    '@nuxtjs/auth',
  ],

  i18n: {
    locales: ['vi', 'ja'],
    defaultLocale: 'ja',
    vueI18n: {
      fallbackLocale: 'ja',
      messages: {
        'vi': require('./locales/vi.json'),
        'ja': require('./locales/ja.json'),
      }
    }
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'companies/login',
            method: 'post',
            propertyName: 'access_token' // property of token in JSON data of API login
          },
          tokenRequired: false,
          logout: false,
          user: {
            url: 'companies/me',
            method: 'get',
            propertyName: false
          },
        }
      },
      facebook: {
        endpoints: {
          userInfo: 'https://graph.facebook.com/v6.0/me?fields=id,name,picture{url}'
        },
        clientId: process.env.FACEBOOK_CLIENT_ID,
        scope: ['public_profile', 'email']
      },
      watchLoggedIn: true,
      redirect: {
        login: '/login',
        logout: '/',
        callback: '/login',
        home: '/'
      },
      token: {
        prefix: '_token.',
        global: true,
      }
    }
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_URL,
    proxyHeaders: false,
    credentials: false,
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.API_URL
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {

  },
}
