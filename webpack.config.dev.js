const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devPath = path.resolve(__dirname, 'dev');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

const devConfig = {
    mode: 'development',
    output: {
        path: devPath,
        filename: '[name].min.js'
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ].concat(baseConfig.htmlArray),
    devServer: {
        contentBase: devPath,
        hot: true,
        port: 3000,
        disableHostCheck: true,
        proxy: {
            '/video': {
                target: 'http://casio.tanzhitv.com',
                changeOrigin: true,
                secure: false
            }
        }
    },
};

module.exports = merge(baseConfig.baseConfig,devConfig);

