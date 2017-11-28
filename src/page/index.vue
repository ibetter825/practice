<template>
    <div class="logo">
        <button v-on:click="connect">连接数据库</button>
        <button v-on:click="addTable">创建表</button>
        <button v-on:click="add">添加一条数据</button>
         <button v-on:click="get">获取一条数据</button>
    </div>
</template>
<script>
    module.exports = {
        data() {
            return {
                dao: this.$indexedDB('practiceDb', 1)//链接数据库
            }
        },
        methods: {
            connect: function (event) {
                this.dao = this.$indexedDB('practiceDb', 1);
                console.log(this.dao);
            },
            addTable: function(){
                console.log(this.dao);
                this.dao.open('practice', 'no');
            },
            add: function (event){
                console.log(this.dao);
                // this.dao.add({
                //     'no': 1,
                //     'title': '第一题'
                // });
            },
            get: function(){
                this.dao.select(1, function(data){
                    console.log('查询结果');
                    console.log(data);
                });
            }
        }
    }
</script>
<style>
    .logo {
        width: 500px;
        height: 500px;
        background: url(../assets/logo.png);
    }
</style>
