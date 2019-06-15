<template>
  <div class="me-setting">
    <div @click="toback()" class="back"><i class="iconfont icon-back"></i><span>返回</span></div>
    <div>
      <me-common-cell left-icon="iconfont icon-icon_coinpurse_line" left-title="支付设置"/>
      <me-common-cell left-icon="iconfont icon-zhanghuanquan" left-title="账户与安全" :clickCell="dealCellClick"/>
      <me-common-cell left-icon="iconfont icon-yinsi" left-title="隐私"/>
    </div>

    <div style="margin-top: 10px;">
      <me-common-cell left-icon="iconfont icon-tongyong" left-title="通用" :clickCell="dealCellClick"/>
      <me-common-cell left-icon="iconfont icon-wentifankui" left-title="问题反馈"/>
    </div>

    <div style="margin-top: 10px;">
      <me-common-cell left-icon="iconfont icon-guanyu" left-title="关于逸凡mall"/>
    </div>

    <div class="logout" @click="dealLogout">退出登录</div>
  </div>
</template>

<script>
  import MeCommonCell from './MeCommonCell';
  import {Toast, MessageBox} from 'mint-ui';
  import {mapActions} from 'vuex'

  export default {
    name: "MeSetting",
    components: {
      MeCommonCell
    },
    methods: {
      ...mapActions(["loginOut"]),
      dealCellClick(props) {
        Toast('点击了' + props);
      },
      dealLogout() {
        // console.error(11);
        MessageBox.confirm('您确定退出登录吗?').then(action => {
           // console.log(action);
           if('confirm' === action){
                // 退出登录
                let result = this.loginOut({});
                console.log(result);
                // 回到主界面
                this.$router.replace('/home');
           }
        });
      },
      toback(){
        this.$router.back();
      }
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
.me-setting
   width 100%
  .back
    // width 100%
    height 46px
    display flex
    justify-content space-between
    align-items center
    background-color #6f8397
    padding 0 15px
    color #fff
    i
      font-size 20px
    span 
      font-size 16px  
  .logout
    width 100%
    height 44px
    margin-top 10px
    background-color #fff
    display flex
    justify-content center
    align-items center
    text-align center

</style>
