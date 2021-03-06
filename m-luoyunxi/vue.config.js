// vue.config.js
const path = require("path");
//打包分析体积
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
//打包uglify
const TerserPlugin = require("terser-webpack-plugin");

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: './',
  // 使用运行时编译器的 Vue 构建版本
  runtimeCompiler: true,

  // 开启生产环境SourceMap，设为false打包时不生成.map文件
  productionSourceMap: false,

  // 关闭ESLint，如果你需要使用ESLint，把lintOnSave设为true即可
  lintOnSave: false,
  devServer: {
    open: false, // 是否自动打开浏览器页面
    host: "0.0.0.0", // 指定使用一个 host，默认是 localhost
    port: 8080 // 端口地址
    // https: false, // 使用https提供服务
    // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
    // proxy: "http://api.zhuishushenqi.com"
  },

  chainWebpack: config => {},

  configureWebpack: config => {
    // 生产环境打包分析体积

    if (process.env.NODE_ENV === "production") {
      //返回一个将会被合并的对象
      return {
        optimization: {
          minimizer: [
            //用terser代替uglify
            new TerserPlugin({
              terserOptions: {
                compress: {
                  //去除debug和console
                  // drop_console: true,
                  drop_debugger: true
                }
              }
            })
          ]
        },
        // plugins: [new BundleAnalyzerPlugin()]
      };
    }
  },
};
