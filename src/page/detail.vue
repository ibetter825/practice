<template>
    <div class="main detail">
        <header class="header">
        <ul>
            <li><router-link :to="{path: '/'}"><i class="iconfont icon-arrow-left"></i></router-link></li>
            <li></li>
            <li></li>
        </ul>
    </header>
    <section class="content" v-move.self="{methods: touch}">
        <section v-bind:style="styler">
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
    </section>
    <footer class="footer">
        <ul>
            <li class="collect"><i class="iconfont icon-collect"></i>&nbsp;收藏</li>
            <li class="pager"><i class="iconfont icon-shuru"></i><span>2/2038</span></li>
            <li class="count">
                <span><i class="iconfont icon-right"></i><i>1</i></span>
                <span><i class="iconfont icon-wrong"></i><i>1</i></span>
            </li>
        </ul>
    </footer>
    </div>
</template>
<script>
module.exports = {
  data() {
    return {
      dao: this.$indexedDB(global.DB_NAME, global.DB_VERSION), //链接数据库
      dto: { type: "" }, //练习题实例
      clz: {},
      rcount: 0, //多选题已选择正确答案的数量
      style: {
        marginLeft: ""
      }
    };
  },
  computed: {
    styler: function() {
      let _this = this;
      return {
        marginLeft: _this.style.marginLeft + "px"
      };
    }
  },
  mounted: function() {
    //数据库名称
    let _this = this;
    _this.dao.open(global.TB_OBJECT_NAME, global.TB_OBJECT_KEY, function(
      result
    ) {
      let key = global.TB_PRACTICE_LIST_KEY;
      _this.dao.select(key, function(result) {
        if (result) {
          _this.dto = result[key][0];
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
        }
      });
    });
  },
  methods: {
    touch: function(e) {
      let _this = this;
      let evObj = e.evObj;
      let cx = evObj.clientX;
      let x = evObj.distanceX;
      let moving = evObj.moving; //是否正在移动
      _this.style.marginLeft = x * -1;
      if (!moving) {
        if (Math.abs(x) > 100) {
          if (x < 0) {
            //向左划 下一题
            alert("下一题");
          } else {
            //向右划下一题
            alert("上一题");
          }
        } else {
          _this.move();//回到原点
        }
      }
    },
    move: function() {
      let _this = this;
      let _run = function() {
         let l = _this.style.marginLeft;
        if (l < -10)
          _this.style.marginLeft += 5;
        else if (l > 10)
          _this.style.marginLeft -= 5;
        else {
          _this.style.marginLeft = 0;
          return;
        }
        requestAnimationFrame(_run);
      };
      _run();
    },
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
    }
  }
};
</script>
<style>
.header {
  width: 100%;
  height: 50px;
  text-align: center;
  position: fixed;
  top: 0;
  border-bottom: 1px solid #f6f6f6;
}

.header ul,
.footer ul {
  height: 100%;
}

.header .iconfont,
.footer .iconfont {
  line-height: 50px;
  font-size: 1.8rem;
}

.header li,
.footer li {
  height: 100%;
}

.header li:first-child {
  width: 50px;
  float: left;
}

.header li:last-child {
  margin: 0 50px;
}

.header li:nth-child(2) {
  width: 50px;
  float: right;
}

.content {
  width: 100%;
  height: 100%;
  padding: 50px 10px;
  box-sizing: border-box;
}

.content header {
  margin-top: 15px;
  font-size: 1.6rem;
  line-height: 2.2rem;
}

.content .type {
  font-size: 1rem;
  color: #fff;
  border-radius: 5px;
  background: #01b4ee;
  letter-spacing: 0.1rem;
  margin-right: 8px;
  padding: 2px 6px;
  position: relative;
  top: -1px;
}

.content i {
  color: #666;
  font-size: 1.8rem;
  position: relative;
  top: 3px;
  margin-right: 6px;
}

.content ul {
  padding-top: 10px;
  font-size: 1.2rem;
}

.content li {
  line-height: 2.2rem;
  padding: 5px 0;
}

.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  border-top: 1px solid #f6f6f6;
}

.footer li {
  line-height: 50px;
  color: #666;
}

.footer li:first-child {
  width: 75px;
  padding-left: 15px;
  float: left;
}

.footer li:last-child {
  margin: 0 150px 0 90px;
  text-align: right;
}

.footer li:nth-child(2) {
  width: 135px;
  float: right;
  text-align: right;
  padding-right: 15px;
}

.collect,
.count {
  font-size: 1.2rem;
}

.collect .iconfont {
  position: relative;
  top: 2px;
}

.pager .iconfont {
  font-size: 1.6rem;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

.pager span {
  font-size: 1.2rem;
}

.count span:first-child {
  margin-right: 20px;
}

.count i {
  font-style: normal;
}

.count .iconfont {
  position: relative;
  top: 3px;
  margin-right: 6px;
}

.right {
  color: #16c2c2;
}

.wrong {
  color: #ff0000;
}

.right i {
  color: #16c2c2;
}

.wrong i {
  color: #ff0000;
}
</style>
