<template>
    <transition name="fade">
      <router-view keep-alive></router-view>
    </transition>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      dao: this.$indexedDB(global.DB_NAME, 1) //链接数据库
    };
  },
  mounted: function() {
    //数据库名称
    console.log(this.dao);
  }
};
</script>

<style>
@import "./assets/css/style.css";
</style>