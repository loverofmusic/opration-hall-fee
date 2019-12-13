const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
module.exports = {
  //生成环境部署路径，默认为'/'
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  //当运行 build 时生成的生产环境构建文件的目录
  outputDir: "dist",
  //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  assetsDir: "",
  //指定生成的 index.html 的输出路径 (相对于 outputDir)
  indexPath: "index.html",
  //默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存,可设置false关闭
  filenameHashing: true,
  configureWebpack: {
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            warnings: false,
            compress: {
              pure_funcs: ["console.log", "console.debug"] //移除console
            }
          }
        })
      ]
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery"
      })
    ]
  },
  devServer: {
    // open: true, // 配置自动启动浏览器
    // host: 'localhost',
    // port: '8080',
    // 设置代理 devServer.proxy 可以是一个指向开发环境 API 服务器的字符串
    // proxy: {
    //   "/api": {
    //     target: "192.168.99.69:8081", // 域名 这会告诉开发服务器将任何未知请求 (没有匹配到静态文件的请求) 代理到http://localhost:8080
    //     changOrigin: true, // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
    //     pathRewrite: {
    //       "^/api": "fff" // // 替换target中的请求地址，也就是说，在请求的时候，url用'/proxy'代替'http://ip.taobao.com'
    //     }
    //   }
    // }
  }
};
