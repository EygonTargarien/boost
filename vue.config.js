const path = require('path');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
	lintOnSave: false,
	configureWebpack: {
		resolve: {
			alias: {
				'@'             : path.resolve(__dirname, 'src'),
				'@assets'       : path.resolve(__dirname, 'src/assets'),
				'@img'          : path.resolve(__dirname, 'src/assets/img'),
				'@css'          : path.resolve(__dirname, 'src/assets/css'),
				'@css_template' : path.resolve(__dirname, 'src/assets/css/template'),
				'@views'        : path.resolve(__dirname, 'src/views/'),
				'@common'       : path.resolve(__dirname, 'src/common'),
				'@form'         : path.resolve(__dirname, 'src/common/form'),
				'@components'   : path.resolve(__dirname, 'src/common/components'),
				'@layouts'      : path.resolve(__dirname, 'src/layouts/')
			},
		},
	},

	css: {
		loaderOptions: {
			sass: {
				prependData: `@import "~@assets/css/values.scss";`
			}
		}
	},


};
