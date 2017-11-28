<template>
    <div v-if="state.show" id="" :class="'layui-m-layer layui-m-layer' + options.type">
        <div v-if="options.shade !== false" @click.stop="shadeClick" class="layui-m-layershade" :style="shade.style"></div>
        <div class="layui-m-layermain">
            <div class="layui-m-layersection">
                <layer-mobile-info v-if="options.type === 0"></layer-mobile-info>
                <layer-mobile-loading v-if="options.type === 2">
                    <span slot="content">{{ options.content }}</span>
                </layer-mobile-loading>
            </div>
        </div>
    </div>
</template>
<script>
    module.exports = {
        data() {
            return {
                timer: false
            }
        },
        computed: {
            state() {
                return this.$store.state.layer
            },
            options() {
                return this.$store.state.layer.options
            },
            shade() {
                let shade = this.options.shade
                let style = ''
                if (typeof shade === 'string')
                    style = shade
                return {
                    style: style
                }
            }
        },
        watch: {
            'state.show': function(n, o) {
                //当值显示状态变成true时，启动定时器
                if (n) this.autoClose() //自动关闭
            }
        },
        methods: {
            autoClose: function() {
                let _this = this
                let time = this.options.time
                if (time !== 0) { //存在定时关闭
                    if (_this.timer !== false) clearTimeout(_this.timer)
                    _this.timer = setTimeout(function() {
                        _this.$store.dispatch('layer_show', false)
                    }, time)
                }
            },
            shadeClick: function() {
                let shadeClose = this.options.shadeClose
                if (shadeClose) this.$store.dispatch('layer_show', false)
            }
        },
        created: function() {
            this.autoClose()
        }
    }
</script>