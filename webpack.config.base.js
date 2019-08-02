const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const srcRoot = path.resolve(__dirname, 'src');
const containerDir = path.resolve(srcRoot, 'containers');
const mainFile = 'main.js';

const fielConfig = ['index', 'detail',]
function getHtmlArray(entryMap) {
    let htmlArray = [];
    Object.keys(entryMap).forEach((key) => {
        let fullPathName = path.resolve(containerDir, key);
        if (fs.existsSync(fullPathName)) {
            htmlArray.push(new HtmlWebpackPlugin({
                filename: key + '.html',
                template: './dev/index.html',
                chunks: ['common', key],
                minify: true
            }));
        }
    });
    return htmlArray;
}

function getEntry() {
    let entryMap = {};
    fs.readdirSync(containerDir).forEach((pathname) => {
        if (fielConfig.indexOf(pathname) != '-1' || fielConfig.length == 0) {
            let fullPathName = path.resolve(containerDir, pathname);
            let stat = fs.statSync(fullPathName);
            let fileName = path.resolve(fullPathName, mainFile);
            if (stat.isDirectory() && fs.existsSync(fileName)) {
                entryMap[pathname] = fileName;
            }
        }
    });
    return entryMap;
}

const entryMap = getEntry();
const htmlArray = getHtmlArray(entryMap);

const baseConfig = {
    entry: entryMap,
    resolve: {
        alias: { component: path.resolve(srcRoot, 'component'), '@': path.resolve('src'), },
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            { test: /\.(js|jsx)$/, use: [{ loader: 'babel-loader' }, { loader: 'eslint-loader' }], include: srcRoot },
            {
                test: /\.(scss|css)$/,
                use: [MiniCssExtractPlugin.loader, {
                    loader: 'css-loader', options: {
                        minimize: true, modules: true,
                        localIdentName: '[path][name]__[local]--[hash:base64:5]'
                    }
                }, 'sass-loader'],
                include: srcRoot
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: 'url-loader?limit=8192&name=./images/[name].[hash].[ext]',
                include: srcRoot
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                common: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    name: 'common'
                }
            }
        },
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: true, // Must be set to true if using source-maps in production
                terserOptions: {
                    // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
                    compress: {
                        // 删除所有的console语句    
                        drop_console: true,
                        // 把使用多次的静态值自动定义为变量
                        reduce_vars: true,
                    },
                    output: {
                        // 不保留注释
                        // comment: false,
                        // 使输出的代码尽可能紧凑
                        beautify: false
                    }
                },
            }),
        ],
    },
};

module.exports = {
    htmlArray: htmlArray,
    baseConfig: baseConfig
};

