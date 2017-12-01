<template>
    <div class="main index">
        <section class="banner"></section>
        <section class="enter"><router-link :to="{path: '/detail'}">立即进入</router-link></section>
    </div>
</template>
<script>
    module.exports = {
        data() {
            return {
                dao: this.$indexedDB('practiceDb', 1)//链接数据库
            }
        }
    }
</script>
<style>
    .banner {
        width: 100%;
        height: 100%;
        background: url(../assets/images/bg_banner_01.png) center no-repeat;
        background-size: 100%;
    }
    
    .enter {
        position: fixed;
        bottom: 50px;
        left: 50%;
        margin-left: -100px;
        border-radius: 5px;
        text-align: center;
        letter-spacing: 0.4rem;
        height: 50px;
        width: 200px;
        line-height: 50px;
        color: #fff;
        font-size: 1.6rem;
        background-color: rgba(255, 50, 50, 0.8);
    }
</style>
