const {
  defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config.module
      .rule('svg-sprite')
      .use('svgo-loader')
      .loader('svgo-loader');
  },

  pluginOptions: {
    svgSprive: {
      spriteFilename: './img/icons.svg',
      removeAttrs: {
        attrs: '(stroke|fill)'
      },
    },


  }
})