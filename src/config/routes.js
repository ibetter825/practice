// 引用主页面模板
let index = function(resolve) {
    require(['../page/index.vue'], resolve)
}

// 配置路由
export default [{
    path: '/',
    component: index,
    name: 'index'
}]