# vue开发指南1.2
> 基于vue + webpack 的移动端web开发框架模版介绍。有什么错误和建议，欢迎纠错补充。

#### 官网传送门
- [node](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [webpack](https://webpack.js.org/guides)
- [vue](http://cn.vuejs.org/v2/guide/)
- [vuex](https://vuex.vuejs.org/zh-cn/)
- [vue-router](https://router.vuejs.org/zh-cn/)
- [vux](https://vux.li/#/zh-CN/README)

## 开发环境搭建
---
### 1. 网络环境
> 为了上git，上google，看文档，看bug

- 简单方法： 改host。打开[老D博客](https://laod.cn/hosts)，按照教程将host文件替换掉。
- 省事方法： 买vpn。推荐[一枝红杏](https://www.yizhihongxing.com/)，稳定。输促销码`laod80`八折。
- chrome商店搜有道辞典插件，启用划词翻译，看文档很有帮助。

### 2. node环境
> 由于珍珠平台的spm工具最高只支持到node 4.x，而vue开发基于node最新稳定版6.x，需要在电脑上安装node的版本切换工具。windows系统下安装[nvm-window](https://github.com/coreybutler/nvm-windows)，osx系统下安装[nvm](https://github.com/creationix/nvm)，安装这两个工具之后，通过简单的命令即可实现node版本的切换。

> 原理：不同版本的node以版本号为根文件夹，安装在nvm的文件夹目录下，然后执行切换命令时将环境变量映射到不同的node程序上。==建议先将原有的node和spm卸载干净。==

- ##### window系统安装[nvm-window](https://github.com/coreybutler/nvm-windows)，按官方说明安装即可，git上说的很详细了。
- 可能遇到的问题：
    1. 安装完会导致原来安装过的node失效，所以建议先卸载旧版本的node。
    2. 输入`nvm`出现命令不存在的提示，检查环境变量是否正确，也可以**重启电脑**试试。
    3. 设置下载镜像加快安装速度:
    
    ```bash
    nvm node_mirror https://npm.taobao.org/mirrors/node/
    nvm npm_mirror https://npm.taobao.org/mirrors/npm/
    ```

- ##### osx系统安装[nvm](https://github.com/creationix/nvm)
- 可能遇到的问题：
    1. 无法写入环境变量，尝试用`sudo`管理员命令安装，或者查看下`~/.bash_profile`文件是否存在，不存在就`touch`一个。主要原因是，nvm依赖以下代码在每次`shell`启动时引入自身，手动解决的方法就是在配置文件`~/.bash_profile`里面直接加上这句，然后重启`shell`

    ```bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
    ```
    
    2. 修改下载镜像
    ```bash
    export NVM_NODEJS_ORG_MIRROR=https://npm.taobao.org/mirrors/node
    ```

- ##### 在两个系统上基本命令是差不多的：

    ```bash
    1. nvm install 6.9.5 #node.js官网上看看最新稳定版本号
    2. nvm install 0.12.0 #安装spm依赖的版本,再装回spm模块
    2. nvm use 6.9.5 #版本切换
    ```

- ##### npm的配置调整

 1. 镜像切换
 ```
 npm config set registry https://registry.npm.taobao.org
 ```
 2. 一般会依赖到node-gyp模块，有依赖disturl的下载地址，修改成镜像的加速，否则容易**报错**
 ```
 npm config set disturl https://npm.taobao.org/dist
 ```
 3. 经常需要切换镜像源的话，建议安装源管理工具[nrm](https://github.com/Pana/nrm)。
 ```
 npm install -g nrm
 nrm use taobao #直接就切换到了https://registry.npm.taobao.org这个源
 ```
 
### 3.知识储备&开发工具
- [vue](http://cn.vuejs.org/v2/guide/)是基于数据驱动的mvvm实现，与jquery时代的开发思路差别很大。好在官方手册很友好，建议开发时反复看文档，建议开发时反复看文档，建议开发时**反复看文档**！！！
- 框架代码用[babel](http://babeljs.cn/)做了针对ECMAScript 6的向下兼容，可以写es6的语法，建议看下 [《ECMAScript 6 入门》](http://es6.ruanyifeng.com/)。
- ui框架的选用。前端造轮子的更新率太高，建议可以多看看各个ui框架的特点和当前项目的适配性。[vue官方插件集](https://github.com/vuejs/awesome-vue)、[相关搜索](https://www.awesomes.cn/search?q=vue)，star高的不会差。
- chrome商店搜“vue”，安装辅助开发工具vue.js devtools。
- 代码高亮辅助: sublime下安装Vue Syntax Highlight，其它ide搜关键字应该也有类似的插件。

## 开发框架模板
- 基于ui组件库[vux](https://vux.li/#/)的官方模板做了一点点调整，使用过程中有什么问题欢迎提issue或者pr，项目地址：https://github.com/lefreet/tpl-vux。
 
### 1. 安装
```bash
#vue的脚手架工具，安装在全局，如果已经安装过了，则不用执行这句
npm install vue-cli -g 
#安装模板,projectPath为项目存放文件夹名称
vue init lefreet/tpl-vux {projectPath}
#打开目录
cd {projectPath}
#安装依赖
npm install
```

- ##### 安装时会如同正常npm包初始化时询问配置
    1. 项目名称
    2. 项目描述
    3. 作者
    4. 是否需要demo


- ##### 基本命令
    ```bash
    npm install #安装
    npm run dev #开启调试
    npm run build #编译发布，发布后的文件会放到/dist 文件夹下
    ```

### 2. 常用配置调整(带*号已在模板内处理)
1. ##### 关闭eslint代码检查
`.eslintignore`中配置不需要代码规范检查的文件夹或者文件名，支持配位符（为方便日后别人也能够维护你的代码，不建议关闭）。

2. ##### 调整编译方式 *
`build/webpack.dev.conf.js-->devtool:'#cheap-module-eval-source-map'`修改为`#cheap-module-source-map'`，修改后能断点调试。

3. ##### ajax *
官方推荐[axios](https://github.com/mzabriskie/axios)。全局接口路径调整（类似珍珠中debug-config的配置），统一放在`/src/main.js`中：

	```js
  if (process.env.NODE_ENV === 'development') {
  		axios.defaults.baseURL = 'http:\/\/localhost:8080/'
  }
  ```
  
很多教程上有如下用法，将方法挂载在vue实例上

  ```js
	Vue.prototype.$http = axios
   this.$http.get('rain/grade', {params: params})
  	.then(calback)
   .catch(calback)
  ```
  
不是很推荐将这种将接口逻辑耦合到视图的做法，随着业务的复杂代码会变得难以维护。请参考模板中demo的方式，将api独立成一个类

4. ##### 路由配置
`src/App/router.js`，并可用webpack实现代码分割：

    ```js
    const routes = [{
      path: '/rain',
      component: resolve => require(['./rain/index.vue'], resolve)
    }, {
      path: '/water',
      component: resolve => require(['./water/index.vue'], resolve)
    }]
    ```  
上面代码中，`/rain`和`/water`两个路由下的页面和依赖的文件就会分别被打包到两个独立的文件中，实现异步加载。

5. ##### 开发端口修改 *
`config/index.js-->dev.port:8080`

6. ##### 开启gizip编译部署 *
`config/index.js-->productionGzip: true`，有效减小文件体积。服务器需开启gzip。

7. ##### 作为二级应用部署后静态文件引用路径错误 *
`config/index.js-->build.assetsPublicPath: '/'`修改为`''`。



 



