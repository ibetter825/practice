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
      dao: this.$indexedDB(global.DB_NAME, global.DB_VERSION) //链接数据库
    };
  },
  created: function() {
    //数据库名称
    let _this = this;
    _this.dao.open(global.TB_OBJECT_NAME, global.TB_OBJECT_KEY, function(result) {
      let key = global.TB_PRACTICE_LIST_KEY;
      _this.dao.select(key, function(result){
          if(!result) {//没有list数据 
              _this.$http.get("practice.json")
              .then(function(response) {
                //将所有练习题放在数据库中
                _this.dao.add({
                  'key': key,
                   'value': response.data
                });
              })
              .catch(function(response) {
                console.log(response);
              });
          }
      });
    });
  }
};
</script>

<style>
@import "./assets/css/style.css";
</style>