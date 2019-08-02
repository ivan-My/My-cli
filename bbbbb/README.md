##### 

*这是一个多页面应用的cli*

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
*启动build之后，项目打包过后的文件会自动打包dist文件下*

# 目录结构<div id="root"></div>
开发和发布版本的配置文件是分开的，多入口页面的目录结构。
```
    |
    |──dist/                                    * 发布版本构建输出路径
    |
    |──dev/                                     * 调试版本构建输出路径
    |
    |──src/                                 
    |     |
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
    |──webpack.base.js                          *webpack公共配置文件
    |──webpack.config.build.js                  * 发布版本使用的webpack配置文件
    |──webpack.config.dev.js                    * 调试版本使用的webpack配置文件
    |__.babelrc                                 * babel配置文件
    |__.eslintrc                                 * eslint
```
* main.js是每个页面的入口文件，必须有,containers中的文件名就是生成的页面名字;

* static文件夹webpack默认不打包;

* dev中index.html是默认html模版文件
