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
  created: function() {
    //数据库名称
    console.log(this.dao);
    this.dao.open(global.TB_OBJECT_NAME, global.TB_OBJECT_KEY, function(db) {
      let osArr = db.objectStoreNames;
      let flg = false;
      for (let i = 0; i < osArr.length; i++) {
                if (osArr[i] === global.TB_OBJECT_NAME) {
                    flg = true;
                    break;
                }
            }
            if(flg)
            alert('包含');
            else
            alert('不包含');
    });
  }
};
</script>

<style>
@import "./assets/css/style.css";
</style>