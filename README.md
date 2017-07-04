# 微信开发指南1.1
> 基于vue + webpack 的移动端web开发框架模版介绍。有什么错误和建议，欢迎纠错补充。

#### 官网传送门
- [node](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [webpack](https://webpack.js.org/guides)
- [vue](http://cn.vuejs.org/v2/guide/)
- [vux](https://vux.li/#/zh-CN/README)

## 环境搭建
---
### 1. 网络环境
> 为了看各种歪果人的官方文档，上git，上google，发现404就很尴尬了

- 简单方法： 改host。打开[老D博客](https://laod.cn/hosts)，按照教程将host文件替换掉。
- 省事方法： 挂vpn。推荐[一枝红杏](https://www.yizhihongxing.com/)，稳定。输老D的促销码`laod80`打八折。
- chrome有道辞典插件，启用划词翻译，看文档很有帮助。

### 2. node环境
> 由于珍珠平台的spm工具依赖的node版本较低（经@cxb测试spm最高只支持到4.4），当前用的模板是基于node最新稳定版本6.x.x的，需要先在电脑上安装node的版本切换工具。osx系统下安装[nvm](https://github.com/creationix/nvm)，windows系统下安装[nvm-window](https://github.com/coreybutler/nvm-windows)，安装这两个工具之后，通过简单的命令即可实现node版本的切换。

> 原理：不同版本的node以版本号为根文件夹，安装在nvm的文件夹目录下，然后执行切换命令时将环境变量映射到不同的node程序上。==建议先将原有的node和spm卸载干净。==

- ##### osx系统安装[nvm](https://github.com/creationix/nvm)，按照官方说明安装就好。遇到的坑：
    1. 遇到无法写入环境变量时，尝试用`sudo`管理员命令安装，或者查看下`~/.bash_profile`文件是否存在，不存在就手动`touch`一个。主要原因是，nvm依赖以下代码在每次`shell`启动时引入自身，手动解决的方法就是在配置文件`~/.bash_profile`里面直接加上这句，然后重启`shell`

    ```bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
    ```
    
    2. 为了安装node能快点（虽说一个版本只安装一次），将下载镜像修改为国内的
    ```bash
    export NVM_NODEJS_ORG_MIRROR=https://npm.taobao.org/mirrors/node
    ```

- ##### window系统安装[nvm-window](https://github.com/coreybutler/nvm-windows)，同样安装官方说明安装。可能的坑：
    1. 安装完会导致原来安装过的全局node失效，所以建议先卸载旧版本的node。
    2. 安装完记**重启电脑**！！！！！一般能解决90%的问题。
    3. 设置下载镜像加快安装速度:
    
    ```bash
    nvm node_mirror https://npm.taobao.org/mirrors/node/
    nvm npm_mirror https://npm.taobao.org/mirrors/npm/
    ```

- ##### 在两个系统上基本命令是差不多的：

    ```bash
    1. nvm install 6.9.5 #最新稳定版^6.x.x
    2. nvm install 0.12.0 #安装spm依赖的版本,然后自己再装回spm模块
    2. nvm use 6.9.5 #版本切换
    ```

- ##### npm的配置调整

 1. 镜像切换
 ```
 npm config set registry https://registry.npm.taobao.org
 ```
 2. 一般会依赖到node-gyp模块，有依赖disturl的下载地址，修改成镜像的加速，否则容易报错
 ```
 npm config set disturl https://npm.taobao.org/dist
 ```
 3. 经常需要切换镜像源的话，建议安装源管理工具[nrm](https://github.com/Pana/nrm)。
 ```
 npm install -g nrm
 nrm use taobao #直接就切换到了https://registry.npm.taobao.org这个源
 ```

## 框架模板介绍

 > 模板是直接用了 [vux](https://vux.li/#/zh-CN/README) 的官方模板做了修改，适用于移动端开发。

 > [vue](http://cn.vuejs.org/v2/guide/)是基于数据驱动的mvvm实现，与以往jquery时代的开发思路差别很大。好在官方手册都是中文，而且很友好，建议开发时反复看文档，建议开发时反复看文档，建议开发时**反复看文档，没有把vue的官方文档看完请不要开始开发。**！！！
 
### 1. 基础准备
- 框架代码用[babel](http://babeljs.cn/)做了针对ECMAScript 6的向下兼容，可以写es6的语法，建议看下 [《ECMAScript 6 入门》](http://es6.ruanyifeng.com/)。
- ui框架的选用。目前基于[vux](https://vux.li/#/zh-CN/README)的。但现在前端造轮子的更新率太高，建议可以多看看各个ui框架的特点和当前项目的适配性。[vue官方插件集](https://github.com/vuejs/awesome-vue)、[相关搜索](https://www.awesomes.cn/search?q=vue)，star高的不会差。
- chrome商店搜“vue”，安装辅助开发工具vue.js devtools。
- 代码高亮辅助sublime下安装Vue Syntax Highlight，其它ide搜关键字应该也有类似的插件。
 
### 2. 框架安装
```bash
#vue的脚手架工具，安装在全局，如果已经安装过了，则不用执行这句
npm install vue-cli -g 
#安装模板,projectPath为项目存放文件夹名称
vue init airyland/vux2 {projectPath}
#打开目录
cd {projectPath}
#安装依赖
npm install
```

- ##### 安装时会如同正常npm包初始化时询问配置
    1. Project name --项目名称
    2. Project description --项目描述
    3. Author --作者
    4. Vue build --vue的构建方式，回车选默认。详见[官方说明](http://cn.vuejs.org/v2/guide/installation.html#独立构建-vs-运行时构建)。
    5. Use ESLint to lint your code? --是否使用代码检查
    6. Pick an ESLint preset --代码风格的规范标准，Standard（推荐）/AirBNB
    7. Setup unit tests with Karma + Mocha? --单元测试...这个...no
    8. Setup e2e tests with Nightwatch? --自动化测试...这个...no

- ##### 基本命令
    ```bash
    npm run dev #开启调试
    npm install --save module_name #安装某个模块，会自动写入package.json
    npm run build #编译发布，发布后的文件会放到/dist 文件夹下
    ```

### 3. 常用配置调整(带*号已在模板内处理)
1. ##### 关闭eslint代码检查
`.eslintignore`中配置不需要代码规范检查的文件夹或者文件名，支持配位符。

2. ##### 开发端口修改
`config/index.js-->dev.port:8080`

3. ##### 调整编译方式
`build/webpack.dev.conf.js-->devtool:'#cheap-module-eval-source-map'`修改为`#cheap-module-source-map'`，修改后能断点调试。

4. ##### ajax
官方推荐[axios](https://github.com/mzabriskie/axios)。并且实现开发环境一个接口，部署时一个接口（类似珍珠中debug-config的配置），在`/src/main.js`添加：

    ```js
    /* 直接将组件挂在vue原型上 */
    if (process.env.NODE_ENV === 'development') {
      axios.defaults.baseURL = 'http://192.168.116.199:9135/'
    }
    Vue.prototype.$http = axios
    
    /* 例子 */
    this.$http.get('rain/grade', {params: params})
    .then(calback)
    .catch(calback)
    ```

5. ##### 路由配置
`src/main.js`，可以用webpack的代码分割实现：

    ```js
    const routes = [{
      path: '/rain',
      component: resolve => require(['./rain/index.vue'], resolve)
    }, {
      path: '/water',
      component: resolve => require(['./water/index.vue'], resolve)
    }]
    const router = new VueRouter({
      routes
    })
    ```  
上面代码中，`/rain`和`/water`两个路由下的页面和依赖的文件就会分别被打包到两个独立的文件中，实现异步加载。
> ps: 静态配置暂时还没想到处理办法

6. ##### 开启gizip编译部署
`config/index.js-->productionGzip: true`，有效减小文件体积。服务器需开启gzip。

7. ##### 作为应用程序部署在二级目录时
`config/index.js-->assetsPublicPath: '/'`修改为`''`。改为相对路径，否则文件依赖会错误。


### 4. 目录结构说明...没兴趣的不用看了
> ├── build
│   ├── build.js
│   ├── check-versions.js
│   ├── dev-client.js
│   ├── dev-server.js
│   ├── utils.js
│   ├── vue-loader.conf.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   ├── webpack.prod.conf.js
│   └── webpack.test.conf.js
├── config
│   ├── dev.env.js
│   ├── index.js
│   ├── prod.env.js
│   └── test.env.js
├── index.html
├── package.json
├── src
│   ├── App.vue
│   ├── assets
│   ├── components
│   ├── main.js
│   └── router
├── static
└── test

- ##### 先看package.json，详情见[官方](https://docs.npmjs.com/)。主要注意`scripts`节点，下面配置的节点内容为根据前面初始化配置得到的命令缩写。比如shell输入`npm run dev`，执行的是`dev`节点对应的命令`node build/dev-server.js`，即在node下执行`dev-server.js`脚本。可以根据执行的代码跟进去，看开发、编译、测试环境具体做了什么配置。
- ##### 框架模板的开发编译依赖于打包工具webpack，[官网](https://webpack.js.org/guides)，[git手册](https://webpack.github.io/docs/)。`/build`、`/config`目录下为模块打包和开发辅助插件的配置。建议根据开发命令跟进去大概看下实现内容。
- ##### `/src/assets`目录存放一些需要被打包编译的资源（既视为模块被import的），静态资源放在`/static`目录下，比如图片等。
- ##### 程序的主入口为`/src/main.js`，页面入口为`index.html`。根据vue组件化的思路，有个`/src/components`文件夹用于存放复用组件，实际项目中可根据业务自行调整。
- ##### `/test`目录下为自动化测试和单元测试的相关内容



 

 

