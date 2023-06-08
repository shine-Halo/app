const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  productionSourceMap:false,//打包后文件中没有.map格式文件
  transpileDependencies: true,
  lintOnSave:false, //关闭检查语法提醒
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
      // pathRewrite: { '^http://gmall-h5-api.atguigu.cn/api/product/getBaseCategoryList': '' },
       // changeOrigin:true
      },
    },
  },
})

