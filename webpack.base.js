const path = require('path')
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const srcRoot = path.resolve(__dirname, 'src');
const pageDir = path.resolve(srcRoot, 'containers');
const mainFile = 'main.js';


function getHtmlArray(entryMap) {
    let htmlArray = [];
    Object.keys(entryMap).forEach((key) => {
        let fullPathName = path.resolve(pageDir, key);
        let fileName = path.resolve(fullPathName, key + '.html');
        if (fs.existsSync(fullPathName)) {
            htmlArray.push(new HtmlWebpackPlugin({
                filename: key + '.html',
                template: './dev/index.html',
                chunks: ['common', key],
                minify:true
            }));
        }
    });
    return htmlArray;
}

function getEntry() {
    let entryMap = {};
    fs.readdirSync(pageDir).forEach((pathname) => {
        let fullPathName = path.resolve(pageDir, pathname);
        let stat = fs.statSync(fullPathName);
        let fileName = path.resolve(fullPathName, mainFile);
        if (stat.isDirectory() && fs.existsSync(fileName)) {
            entryMap[pathname] = fileName;
        }
    });
    return entryMap;
}

const entryMap = getEntry();
const htmlArray = getHtmlArray(entryMap);

const baseConfig = {
    entry: entryMap,
    resolve: {
        alias: {component: path.resolve(srcRoot, 'component'), '@': path.resolve('src'),},
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {test: /\.(js|jsx)$/, use: [{loader: 'babel-loader'}], include: srcRoot},
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, {
                    loader: 'css-loader', options: {
                        minimize: true,
                    }
                }, 'css-loader'],
                include: srcRoot
            },
            {
                test: /\.scss$/,
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
        }
    },
};

module.exports = {
    htmlArray: htmlArray,
    baseConfig: baseConfig
};

