export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  mode: 'universal',
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
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=M+PLUS+1p'}
    ],
    script: [
      { src: "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js", type: "text/javascript"},
    ],
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
    '~/plugins/handle-response.js',
    '~/plugins/vue-select.js',
    {src: '~/plugins/vuelidate'},
    { src: '~/plugins/datepicker.js', ssr: false },
    { src: "@/plugins/vClickOutside", ssr: false },
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
    '@nuxtjs/moment',
    '@nuxtjs/toast',
		"vue2-editor/nuxt",
  ],

  toast: {
    position: 'top-right',
    duration: 3000,
    register: [
      {
        name: 'my-error',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error'
        }
      }
    ]
  },

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
          logout: {
            url: '/companies/logout',
            method: 'post'
          },
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
        logout: '/login',
        callback: '/login',
        home: '/jobs'
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

  // moment nuxtjs
  moment: {
    defaultLocale: 'ja',
    locales: ['ja'],
    defaultTimezone: 'Asia/Tokyo',
    timezone: true
  },


  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    standalone: true,
		extend(config, { isDev, isClient }) {
      config.resolve.alias.vue = "vue/dist/vue.common";
      // Sets webpack's mode to development if `isDev` is true.
      if (isDev) {
        config.mode = 'development'
      }
    }
  },
}
