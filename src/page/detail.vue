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
        <!-- 当前题 -->
        <practice-content :prop="dto" :style="styler.nextPrac"></practice-content>
        <!-- 下一题 -->
        <practice-content :prop="dto" :style="styler.thisPrac"></practice-content>
        <!-- 上一题 -->
        <practice-content :prop="dto" :style="styler.prevPrac"></practice-content>
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
        thisPrac: {
          left: ''
        },
        nextPrac: {
          left: ''
        },
        prevPrac: {
          left: ''
        }
      }
    };
  },
  computed: {
    styler: function() {
      let _this = this;
      return {
        thisPrac: {
          left: _this.style.thisPrac.left + "px"
        },
        nextPrac: {
          left: ''
        },
        prevPrac: {
          marginLeft: '-100%',
          left: _this.style.prevPrac.left + "px"
        }
      };
    }
  },
  methods: {
    touch: function(e) {
      let _this = this;
      let evObj = e.evObj;
      let cx = evObj.clientX;
      let x = evObj.distanceX;
      let moving = evObj.moving; //是否正在移动
      if (x < 0) {
        //向右划 上一题
        _this.style.prevPrac.left = x * -1;
      } else {
        //向左划下一题
        _this.style.thisPrac.left = x * -1;
      }
      
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
          _this.move(); //回到原点
        }
      }
    },
    move: function() {
      let _this = this;
      let _run = function() {
        let l = _this.style.thisPrac.left;
        if (l < -10) _this.style.thisPrac.left += 5;
        else if (l > 10) _this.style.thisPrac.left -= 5;
        else {
          _this.style.thisPrac.left = 0;
          return;
        }
        requestAnimationFrame(_run);
      };
      _run();
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
  z-index: 1990;
  background: #fff;
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
  box-sizing: border-box;
  position: relative;
}

.content section {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 50px 10px;
  background: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
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
  background: #fff;
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
