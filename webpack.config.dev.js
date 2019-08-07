const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const { htmlArray, baseConfig } = require('./webpack.config.base');
const devPath = path.resolve(__dirname, 'dev'); //开发目录

const devConfig = {
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      { from: 'src/static', to: path.resolve(devPath, 'static'), force: true }
    ]),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ].concat(htmlArray),
  devServer: {
    contentBase: devPath,
    hot: true,
    port: 3000,
    disableHostCheck: true
    //跨域设置
    // proxy: {
    //     '/video': {
    //         target: 'http://www.baidu.com',
    //         changeOrigin: true,
    //         secure: false
    //     }
    // }
  }
};

module.exports = merge(baseConfig, devConfig);
