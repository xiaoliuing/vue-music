const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
module.exports = {
  css: {
    extract: IS_PROD,
    sourceMap: false,
    loaderOptions: {
      scss: {
        // 向全局sass样式传入共享的全局变量, $src可以配置图片cdn前缀
        // 详情: https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
        prependData: `
        @import "./src/assets/scss/variable.scss";
        @import "./src/assets/scss/mixin.scss";
        $src: "${process.env.VUE_APP_OSS_SRC}";
        `
      }
    }
  },
  lintOnSave: false,
  chainWebpack: config => {
    // 添加别名
    config.resolve.alias
      .set('assets', path.resolve('./src/assets'))
  },
  configureWebpack: {
    resolve: {
      extensions: ['ts', 'vue', 'json']
    }
  }
}
