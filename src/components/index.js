export default {
    //layer-mobile組件
    'layer-mobile': function(resolve) {
        require(['./layer/mobile/layer.vue'], resolve)
    },
    'layer-mobile-info': function(resolve) {
        require(['./layer/mobile/info.vue'], resolve)
    },
    'layer-mobile-loading': function(resolve) {
        require(['./layer/mobile/loading.vue'], resolve)
    }
}