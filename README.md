
1. 安装依赖：
```
npm install

```

2. dev环境服务启动：
```
npm start

```

3. build环境服务启动：
```
npm run build

```
启动build之后，项目打包过后的文件会自动打包dist文件下

# 目录结构<div id="root"></div>

```
    |
    |──dist/                                    * 发布版本构建输出路径
    |
    |──dev/                                     * 开发版本构建输出路径
    |
    |──src/                                 
    |     |
    |     |—— components/                        * 各页面公用组件
    |     |
    |     |—— containers/                  
    |     |      |—— index/                     * 页面代码
    |     |      |        |—— main.js            * 入口文件
    |     |      |
    |     |      |—— detail/                    * 页面代码
    |     |      |        |—— main.js            * 入口文件
    |     |
    |     |—— static/                           * 静态文件js，css
    |
    |──webpack.base.js                          * webpack公共配置文件
    |──webpack.config.build.js                  * 发布版本使用的webpack配置文件
    |──webpack.config.dev.js                    * 调试版本使用的webpack配置文件
    |__.babelrc                                 * babel配置文件
    |__.eslintrc                                * elint配置文件
```
* main.js是每个页面的入口文件，必须有,containers中的文件名就是生成的页面名字;

* static文件夹webpack默认不打包;

* dev中index.html是默认html模版文件
