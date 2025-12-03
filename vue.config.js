// vue.config.js
module.exports = {
	transpileDependencies: ['@dcloudio/uni-ui'],
	devServer: {
		proxy: {
			['/dev-api']: {
				target: 'https://hkqq.huakewang.com',
				// ws: true,
				changeOrigin: true,
				pathRewrite: {
					['^' + "/dev-api"]: ''
				}
			},
		}
	},
	configureWebpack:{
		output: {
     	 // 资源文件路径配置
      		publicPath: './'
    	}
	}
}
