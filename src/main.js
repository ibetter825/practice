import Vue from 'vue'
// 引用路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import VueResource from 'vue-resource'
Vue.use(VueResource)
    //vuex
import store from './store/'
//入口
import App from './App.vue'
// 引用路由配置文件
import routes from './config/routes'
// 引用扩展
import extend from './local/extend'
// 引用常量
import constant from './local/constant'
// 引用自定义存储方法文件
import storage from './local/storage'
// 将storage方法绑定到全局 使用方法为在vue实例中调用 eg: this.$localStorage()
Object.keys(storage).forEach((key) => {
    Vue.prototype[key] = storage[key]
});
//引入自定义v-touch指令
import vtouch from './local/vtouch'
Object.keys(vtouch).forEach((key) => {
        Vue.directive(`${key}`, vtouch[key])
    })
    //引入公用组件的文件夹，文件夹里面的index.js存有所有组件的引用
import components from './components/'
//遍历公用组件，存入到Vue全局实例中，这样可以不用在每个vue单文件中分别引入，直接使用就可以了
Object.keys(components).forEach((key) => {
    Vue.component(`${key}`, components[key])
})

const router = new VueRouter({
    //mode: 'history', //配置成history可以去掉url地址上的#号
    //base: '/n3',
    //history: false,
    //hashbang: true,
    routes
})
new Vue({
    store,
    router,
    el: '#app',
    render: h => h(App)
})