const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const distPath = path.resolve(__dirname, './dist');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');


const buildConfig = {
    mode: 'production',
    output: {
        path: distPath,
        filename: 'js/[name].[hash].min.js',
        publicPath: './' // 可根据自己实际情况修改
    },
    plugins: [
        new CleanWebpackPlugin([distPath],{allowExternal: true}),
        new CopyWebpackPlugin([
            { from: 'src/static', to: path.resolve(distPath, 'static'), force: true }
        ]),
        new MiniCssExtractPlugin({
            filename: "css/[name].[hash].css",
        })
    ].concat(baseConfig.htmlArray)
};

module.exports = merge(baseConfig.baseConfig,buildConfig);

