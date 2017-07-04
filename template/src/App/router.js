import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 用这种方式能在编译时根据路由实现代码分割
const routes = [{
  path: '/',
  component: resolve => require(['./menu.vue'], resolve)
}{{#if_eq demo "Yes"}}, {
  path: '/demo',
  component: resolve => require(['../demo/index.vue'], resolve)
}{{/if_eq}}]

export default new Router({
  routes
})

// 静态配置
// https://webpack.github.io/docs/context.html
// 这种方式只支持指定静态目录，打包该目录下所有文件
// 考虑到实际情况，路由在开发阶段就已经设计好了，暂时不开放成静态配置
// const json = [{
//   path: '/rain',
//   component: 'rain/index.vue'
// }, {
//   path: '/water',
//   component: 'water/index.vue'
// }]
// const routes = json.map(o => ({
//   path: o.path,
//   component: resolve => require(['./' + o.component], resolve)
// }))
// const router = new VueRouter({
//   routes
// })
