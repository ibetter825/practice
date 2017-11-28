<template>
    <div :class="[layer.skin.clz.childClass, layer.skin.clz.msgClass, layer.skin.clz.animClass]" :style="options.style">
        <h3 v-if="options.title !== '' && options.skin !== 'msg'" :style="layer.title.style">{{ layer.title.text }}</h3>
        <div class="layui-m-layercont" v-html="options.content"></div>
        <div v-if="options.btn !== '' && options.skin !== 'msg'" class="layui-m-layerbtn">
            <span v-if="layer.btn.length === 1" class="yes" @click.stop="btnClick('yes')">{{ layer.btn[0] }}</span>
            <span v-if="layer.btn.length > 1" v-for="(item, index) in layer.btn" @click.stop="btnClick([index === 0 ? 'no' : 'yes'])" :class="[index === 0 ? 'no' : 'yes']">{{ item }}</span>
        </div>
    </div>
</template>

<script>
    module.exports = {
        computed: {
            state() {
                return this.$store.state.layer
            },
            options() {
                return this.$store.state.layer.options
            },
            layer() {
                let title = {
                    text: '',
                    style: ''
                }
                let btn = []
                let temp = this.options.title
                if (typeof temp === 'string')
                    title.text = temp
                else if (temp instanceof Array) {
                    title.text = temp[0]
                    title.style = temp[1]
                }
                temp = this.options.btn
                if (typeof temp === 'string')
                    btn[0] = temp
                else if (temp instanceof Array)
                    btn = temp

                temp = this.options.skin
                let skin = {
                    clz: {
                        childClass: 'layui-m-layerchild',
                        msgClass: temp === '' ? '' : 'layui-m-layer-' + temp,
                        animClass: 'layui-m-anim-' + this.options.anim
                    }
                }
                return {
                    title: title,
                    btn: btn,
                    skin: skin
                }
            }
        },
        methods: {
            btnClick: function(type) {
                this.$store.dispatch('layer_show', false)
                let fn = this.options[type] //yes or no callback
                if (fn !== null) fn()
            }
        }
    }
</script>