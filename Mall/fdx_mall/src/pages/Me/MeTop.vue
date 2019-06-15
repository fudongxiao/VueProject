<template>
  <div class="me-top">
    <router-link tag="div" class="user" to="/detail">
      <img src="./../../common/images/user.jpg" alt="">
      <p>{{userInfo.user_name | phoneFormat()}}</p>
    </router-link>
    <div class="my-older">
      <div class="older-top">
        <h3>我的订单</h3>
        <span>查看全部 > </span>
      </div>
      <div class="older-bottom">
        <div class="bottom-item">
          <i class="iconfont icon-icon_coinpurse_line"></i>
          <span>待付款</span>
        </div>
        <div class="bottom-item">
          <i class="iconfont icon-fenxiang"></i>
          <span>待分享</span>
        </div>
        <div class="bottom-item">
          <i class="iconfont icon-daishouhuo1"></i>
          <span>待收货</span>
        </div>
        <div class="bottom-item">
          <i class="iconfont icon-tuikuanshouhou"></i>
          <span>退换/售后</span>
        </div>
        <div class="bottom-item">
          <i class="iconfont icon-xiaoxi"></i>
          <span>待评价</span>
        </div>
      </div>
    </div>
    <div class="setting">
      <div class="setting-item">
        <i class="iconfont icon-icon22fuzhi"></i>
        <span>购物车</span>
      </div>
      <!-- <div class="setting-item">
        <i class="iconfont icon-saoyisao"></i>
        <span>扫一扫</span>
      </div> -->
      <div class="setting-item">
        <i class="iconfont icon-yinxingqiazhifu"></i>
        <span>卡券</span>
      </div>
      <div class="setting-item">
        <i class="iconfont icon-shoucang"></i>
        <span>收藏</span>
      </div>
      <div class="setting-item">
        <i class="iconfont icon-rili"></i>
        <span>签到</span>
      </div>
      <div class="setting-item">
        <i class="iconfont icon-zuobiaoicon"></i>
        <span>收货地址</span>
      </div>
      <div class="setting-item">
        <i class="iconfont icon-xiaoxitixing"></i>
        <span>我的评价</span>
      </div>
      <div class="setting-item">
        <i class="iconfont icon-kefu"></i>
        <span>官方客服</span>
      </div>
      <router-link tag="div" class="setting-item" to="/setting">
        <i class="iconfont icon-icon_setting"></i>
        <span>设置</span>
      </router-link>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';

  export default {
    name: "MeTop",
    computed: {
      ...mapState(["userInfo"])
    },
    filters:{
      phoneFormat(phone){
        let strArr = [...phone];
        let str = '';
        // console.log(strArr);
        strArr.forEach((item,index)=>{
          if(index === 3 || index === 4 || index === 5 || index === 6){
            str += '*';
          }else{
            str += item;
          }
        })
        return str;
      }
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .me-top
    max-width 750px
    font-size 14px
    .user
      display flex
      flex-direction row
      align-items center
      padding 20px
      background-color #fff
      margin-bottom 10px
      background-color #6f8397
      color #fff
      p
        margin 0 10px
      img
        width 60px
        height 60px
        border-radius 50%
      i
        font-size 25px
    .my-older
      background-color #fff
      .older-top
        display flex
        flex-direction row
        padding 0 10px
        justify-content space-between
        height 44px
        line-height 44px
      .older-bottom
        display flex
        line-height 30px
        .bottom-item
          flex 1
          height 60px
          display flex
          flex-direction column
          justify-content center
          align-items center
          i
            font-size 28px
            color #6f8397
    .setting
      margin-top 10px
      background-color #fff
      display flex
      justify-content space-between
      flex-wrap wrap
      .setting-item
        width 25%
        height 70px
        display flex
        flex-direction column
        justify-content center
        align-items center
        line-height 30px
        i
          font-size 30px
          color #6f8397
</style>
