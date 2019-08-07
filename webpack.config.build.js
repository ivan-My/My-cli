const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const { htmlArray, baseConfig } = require('./webpack.config.base');
const distPath = path.resolve(__dirname, './dist'); //打包目录

const buildConfig = {
  plugins: [
    new CleanWebpackPlugin([distPath], { allowExternal: true }),
    new CopyWebpackPlugin([
      { from: 'src/static', to: path.resolve(distPath, 'static'), force: true }
    ]),
    new MiniCssExtractPlugin({
      filename: './css/[name].[hash].css'
    })
  ].concat(htmlArray)
};

module.exports = merge(baseConfig, buildConfig);
