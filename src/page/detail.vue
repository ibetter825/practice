<template>
    <div class="main detail">
        <header class="header">
        <ul>
            <li><router-link :to="{path: '/'}"><i class="iconfont icon-arrow-left"></i></router-link></li>
            <li></li>
            <li></li>
        </ul>
    </header>
    <section class="content">
        <section>
            <header><span class="type">{{dto.type}}</span>{{dto.title}}</header>
            <ul>
                <li v-for="ans in dto.answers"><i class="iconfont icon-default"></i>{{ans}}</li>

                <!-- <li><i class="iconfont icon-default"></i>你在他乡还好吗，我在他乡很好很不好，我在他乡很好很不好,非常的不好</li>
                <li><i class="iconfont icon-right"></i></li>
                <li><i class="iconfont icon-wrong"></i></li> -->
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
                dao: this.$indexedDB(global.DB_NAME, global.DB_VERSION),//链接数据库
                dto: {}//练习题实例
            }
        },
        created: function() {
    //数据库名称
    let _this = this;
    _this.dao.open(global.TB_OBJECT_NAME, global.TB_OBJECT_KEY, function(result) {
      let key = global.TB_PRACTICE_LIST_KEY;
      _this.dao.select(key, function(result){
          if(result){
              _this.dto = result[key][0];
          }
      });
    });
  }
    }
</script>
<style>
.header {
        width: 100%;
        height: 50px;
        text-align: center;
        position: fixed;
        top: 0;
        border-bottom: 1px solid #F6F6F6;
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
        font-size: 1.0rem;
        color: #FFF;
        border-radius: 5px;
        background: #01B4EE;
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
        border-top: 1px solid #F6F6F6;
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
</style>
