// 引用主页面模板
let index = function(resolve) {
    require(['../page/index.vue'], resolve)
}
let detail = function(resolve) {
        require(['../page/detail.vue'], resolve)
    }
    // 配置路由
export default [{
    path: '/',
    component: index,
    name: 'index'
}, {
    path: '/detail',
    component: detail,
    name: 'detail'
}]