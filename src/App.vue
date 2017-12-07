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
    _this.dao.open(global.TB_OBJECT_NAME, global.TB_OBJECT_KEY, function(
      result
    ) {
      let key = global.TB_PRACTICE_LIST_KEY;
      _this.dao.select(key, function(result) {
        if (!result) {
          //没有list数据
          _this.$http
            .get("practice.json")
            .then(function(response) {
              //将所有练习题放在数据库中
              _this.dao.add({
                key: key,
                value: response.data
              });
            })
            .catch(function(response) {
              console.log(response);
            });
        }
      });
      let lastNo = 0;
      let lastKey = global.TB_PRACTICE_LAST_KEY; //上一次阅读的编号
      _this.dao.select(lastKey, function(last) {
        if (last === undefined) {
          _this.dao.add({
            key: lastKey,
            value: lastNo
          });
        } else {
          lastNo = Number(last["value"]);
          if (lastNo < 0 || isNaN(lastNo)) {
            lastNo = 0;
            _this.dao.update(lastKey, {
              key: lastKey,
              value: 0
            });
          }
        }
        _this.$store.dispatch("prac_last_no", lastNo);
      });
    });
  }
};
</script>

<style>
@import "./assets/css/style.css";
</style>