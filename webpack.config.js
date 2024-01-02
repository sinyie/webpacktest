const path = require('path');
// 引入獨立提取出css檔案的套件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
	// 設定打包後的 JavaScript 檔案放置路徑，通常都會搭配 path 模組以形成絕對路徑，__dirname為檔案的絕對路徑
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
		rules: [
			{
        // 針對sass或scss檔案處理
        test: /\.s[ac]ss$/i,
        // 新增 loader (第三步)
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true, // 启用css-loader的sourcemap
            },
          },
          {
            // Run postcss actions
            loader: 'postcss-loader',
            options: {
              // `postcssOptions` is needed for postcss 8.x;
              // if you use postcss 7.x skip the key
              postcssOptions: {
                // postcss plugins, can be exported to postcss.config.js
                plugins: function () {
                  return [
                    require('autoprefixer')
                  ];
                },
              },
              sourceMap: true, // 启用postcss-loader的sourcemap
            }
          }, 
          {
            // compiles Sass to CSS
            loader: 'sass-loader',
            options: {
              sourceMap: true, // 启用sass-loader的sourcemap
            },
          }
        ]
      },
		]
	},
  // 創建實例
  plugins: [
    new MiniCssExtractPlugin(
      {
        filename: 'layout.css'
      }
    ),
  ],
  devtool: 'source-map', // 启用webpack的sourcemap
};