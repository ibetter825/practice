<template>
    <section v-if="show">
        <header><span class="type">{{dto.type}}</span>{{dto.title}}</header>
        <ul v-if="dto.type.match('判断') !== null">
            <li v-on:click="choose('正确', $event);" v-bind:class="[clz['正确']?clz['正确']:'']"><i v-bind:class="['iconfont', clz['正确']?('icon-' + clz['正确']):'icon-default']"></i>正确</li>
            <li v-on:click="choose('错误', $event);" v-bind:class="[clz['错误']?clz['错误']:'']"><i v-bind:class="['iconfont', clz['错误']?('icon-' + clz['错误']):'icon-default']"></i>错误</li>
        </ul>
        <ul v-else>
            <li v-for="(ans, index) in dto.answers" v-on:click="choose( index + 1, $event)" v-bind:class="[clz[index + 1]?clz[index + 1]:'']">
                <i v-bind:class="['iconfont', clz[index + 1]?('icon-' + clz[index + 1]):'icon-default']"></i>{{ans}}</li>
        </ul>
    </section>
</template>

<script>
module.exports = {
  props: ["ptype", "pupdate"],
  data() {
    return {
      dao: this.$indexedDB(global.DB_NAME, global.DB_VERSION), //链接数据库
      type: this.ptype, //当前练习题的位置this,next,prev
      dto: { type: "" }, //练习题实例
      clz: {},
      rcount: 0, //多选题已选择正确答案的数量
      show: true //是否显示出来
    };
  },
  watch: {
    pupdate: function(update) {
      let _this = this;
      let lastKey = global.TB_PRACTICE_LAST_KEY;
      _this.dao.select(lastKey, function(last) {
        let lastNo = Number(last["value"]);
        _this.dao.update(
          lastKey,
          {
            key: lastKey,
            value: lastNo + update.dis
          },
          function() {
            _this.init();
          }
        );
      });
    }
  },
  mounted: function() {
    this.init();
  },
  methods: {
    choose: function(index, event) {
      let _this = this;
      let right = _this.dto.right;
      let type = _this.dto.type;
      //需要判断该选项是否已经选过
      if (_this.clz[index]) return;

      if (type.match("单选") !== null) {
        //单选题
        if ((right + ",").match(index) !== null) {
          _this.clz[index] = "right";
          //选择正确 进入下一题
        } else {
          //选择错误
          //选择错误的话，将答案展示出来
          //单选题
          _this.clz[index] = "wrong";
          _this.clz[right] = "right";
        }
      } else if (type.match("多选") !== null) {
        //多选题
        let rarrs = right.split(",");
        if ((right + ",").match(index) !== null) {
          _this.clz[index] = "right";
          _this.rcount = _this.rcount + 1;
          if (_this.rcount === rarrs.length) {
            alert("选择的正确答案数量与答案的数量一致，跳入下一题");
          }
        } else {
          _this.clz[index] = "wrong";
          //将正确与错误全显示出来
          for (let i = 0; i < rarrs.length; i++) _this.clz[rarrs[i]] = "right";
        }
      } else if (type.match("判断") !== null) {
        //判断其
        if ((right + ",").match(index) !== null) {
          _this.clz[index] = "right";
          //选择正确 进入下一题
        } else {
          _this.clz[index] = "wrong";
          _this.clz[right] = "right";
        }
      }
    },
    init: function() {
      let _this = this;
      _this.dao.open(global.TB_OBJECT_NAME, global.TB_OBJECT_KEY, function(
        result
      ) {
        let key = global.TB_PRACTICE_LIST_KEY;
        let lastKey = global.TB_PRACTICE_LAST_KEY; //上一次阅读的编号
        let lastNo = 0;
        _this.dao.select(key, function(result) {
          if (result) {
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
                if (_this.type === "next") {
                  //下一题
                  lastNo++;
                } else if (_this.type === "prev") {
                  //上一题
                  if (lastNo <= 0) {
                    _this.show = false;
                    return;
                  }
                  lastNo--;
                }
              }
              _this.dto = result["value"][lastNo];
              let ans = _this.dto.answers;
              let type = _this.dto.type;
              if (type.match("判断") !== null) {
                _this.clz = {
                  正确: null,
                  错误: null
                };
              } else {
                let clz = {};
                for (let i = 0; i < ans.length; i++) clz[i + 1] = null;
                _this.clz = clz;
              }
            });
          }
        });
      });
    }
  }
};
</script>