const path = require('path');
const fs = require('fs');
const process = require('process');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const srcRoot = path.resolve(__dirname, 'src');
const containerDir = path.resolve(srcRoot, 'containers');
const type = process.argv[3];
const devPath = path.resolve(__dirname, 'dev'); //开发目录
const distPath = path.resolve(__dirname, './dist'); //打包目录
const mainFile = 'main.js';
const fielConfig = ['index', 'detail']; //打包规则
const isDev = type === 'webpack.config.dev.js' ? true : false; //判断环境

function getHtmlArray(entryMap) {
  const htmlArray = [];
  Object.keys(entryMap).forEach(key => {
    let fullPathName = path.resolve(containerDir, key);
    if (fs.existsSync(fullPathName)) {
      htmlArray.push(
        new HtmlWebpackPlugin({
          filename: key + '.html',
          template: './dev/index.html',
          chunks: ['common', key],
          minify: true
        })
      );
    }
  });
  return htmlArray;
}

function getEntry() {
  const entryMap = {};
  fs.readdirSync(containerDir).forEach(pathname => {
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

function getOutput() {
  const output = {};
  if (isDev) {
    output['path'] = devPath;
    output['filename'] = '[name].min.js';
  } else {
    output['path'] = distPath;
    output['filename'] = './js/[name].[hash].min.js';
  }
  return output;
}

const entryMap = getEntry();
const htmlArray = getHtmlArray(entryMap);
const output = getOutput();

const baseConfig = {
  mode: isDev ? 'development' : 'production',
  entry: entryMap,
  output: output,
  resolve: {
    alias: {
      component: path.resolve(srcRoot, 'component'),
      '@': path.resolve('src')
    },
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [{ loader: 'babel-loader' }, { loader: 'eslint-loader' }],
        include: srcRoot
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              minimize: true,
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            }
          },
          'sass-loader'
        ],
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
        sourceMap: true,
        terserOptions: {
          compress: {
            // 删除所有的console语句
            drop_console: true,
            // 把使用多次的静态值自动定义为变量
            reduce_vars: true
          },
          output: {
            // 不保留注释
            // comment: false,
            // 使输出的代码尽可能紧凑
            beautify: false
          }
        }
      })
    ]
  }
};

module.exports = {
  htmlArray,
  baseConfig
};
