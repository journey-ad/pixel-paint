let webpack = require('webpack')
let LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? './.'
    : '/',
  css: {
    loaderOptions: {
      sass: {
        // @/ is an alias to src/
        // so this assumes you have a file named `src/variables.scss`
        data: '@import "@/style/variable.scss";'
      }
    }
  },
  chainWebpack: config => {
    config.plugin('ignore')
      .use(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))
    config.plugin('loadshReplace')
      .use(new LodashModuleReplacementPlugin())
  }
}
