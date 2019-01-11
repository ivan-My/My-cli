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
    |     |—— component/                        * 各页面公用组件
    |     |
    |     |—— containers/                  
    |     |      |—— index/                     * 页面代码
    |     |      |        |—— main.js            * 入口文件
    |     |      |
    |     |      |—— detail/                    * 页面代码
    |     |      |        |—— main.js            * 入口文件
    |     |
    |     |—— static/                           * 静态文件js，css
    |     |—— utils/
    |     |        |——utils.js                  * 工具集合
    |
    |──webpack.base.js                          *webpack公共配置文件
    |──webpack.config.build.js                  * 发布版本使用的webpack配置文件
    |──webpack.config.dev.js                    * 调试版本使用的webpack配置文件
    |__.babelrc                                 * babel配置文件
```
*main.js是每个页面的入口文件，必须有*
