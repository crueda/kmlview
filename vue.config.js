const path = require('path')
const webpack = require('webpack')

let config

if (process.env.VUE_APP_BOOK) {
  config = {
    lintOnSave: false,
    pages: {
      index: {
        entry: 'src/vue-book/book-main.js',
        template: 'public/index.html',
      },
    },
  }
}

if (!process.env.VUE_APP_BOOK) {
  config = {
    lintOnSave: false,
    pages: {
      index: {
        // entry for the page
        entry: 'src/app/main.js',
        // the source template
        template: 'public/index.html',
        // output as dist/index.html
        filename: 'index.html',
        // when using title option,
        // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
        title: 'Kyros Password',
        // chunks to include on this page, by default includes
        // extracted common chunks and vendor chunks.
        chunks: ['chunk-vendors', 'chunk-common', 'index'],
      },
    },
    configureWebpack: {
      plugins: [
        new webpack.DefinePlugin({
          // allow access to process.env from within the vue app
          'process.env': {
            VUE_APP_API_URL: JSON.stringify(process.env.VUE_APP_API_URL),
            VUE_APP_BASE: JSON.stringify(process.env.VUE_APP_BASE),
          },
        }),
      ],
      resolve: {
        alias: {
          'vue$': 'vue/dist/vue.esm.js',
          '@': path.resolve('src'),
        },
      },
    },
    css: {
      loaderOptions: {
        sass: {
          // Preload vuestic-ui variables and mixins for every component
          data: `@import "~vuestic-ui/src/components/vuestic-sass/resources/resources.scss";`,
        },
      },
    },
  }
}

//config.publicPath = process.env.VUE_APP_BASE + '/'
config.publicPath = 'https://web-demos.kyroslbs.com/kmlview/'
module.exports = config
