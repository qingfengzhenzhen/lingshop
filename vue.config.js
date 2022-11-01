const port = process.env.port || process.env.npm_config_port || 8080 // dev port

module.exports = {
  lintOnSave: false,
  assetsDir: 'static',
  parallel: false,
  publicPath:"./",
  productionSourceMap:false,
  devServer: {
		port: port,
		open: true,
		proxy: {
			// 标记
			'/hr': {
				// 代理的接口地址
				// devServer 会发请求的地址
				target: 'https://apiShop.vicoshipments.com',
				// target: 'http://localhost:90',
				// 改成任意一个小伙伴的地址即可
				// target: 'http://192.168.16.213:8080/api',
				// 设置为true 开启跨域
				changeOrigin: true,
				pathRewrite: {
					'^/hr': ''
				}
			}
		},
	},
}
