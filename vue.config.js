module.exports = {
      devServer: {
          proxy: {
              '/shopmng/*': {
                  target: 'http://localhost:3000',   //node.js服务器运行的地址
                  ws: true,
                  changeOrigin: true,
                  pathRewrite: {
                    '^/shopmng': ''  //路径重写 
                 }
             },
         }
     }
}