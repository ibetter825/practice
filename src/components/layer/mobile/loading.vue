<template>
    <div :class="clz">
        <div v-if="prop === undefined" class="layui-m-layercont" :style="options.style">
            <i></i>
            <i class="layui-m-layerload"></i>
            <i></i>
            <p><slot name="content"></slot></p>
        </div>
        <div v-if="prop !== undefined" class="layui-m-layercont">
            <img src="/static/images/loader0.gif" alt="loading"> {{ prop.content }}
        </div>
    </div>
</template>
<script>
    module.exports = {
        props: ['prop'],
        computed: {
            options() {
                return this.$store.state.layer.options
            },
            clz(){
                //type 默认为1,即是layer父组件调用
                //type 为2时，即是其他父组件调用，自定义
                let type = this.prop ? 2 : 1
                return {
                    'layui-m-layerchild': type === 1,
                    'layui-m-loader': type === 2,
                    'layui-m-anim-scale': true
                }
            }
        }
    }
</script>