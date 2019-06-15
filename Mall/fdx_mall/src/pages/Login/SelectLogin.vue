<template>
  <div class="select-login">
    <div class="bottom">
      <img src="./images/logos.png" alt="" width="70%">
    </div>
    <h4>选择登录方式</h4>
    <router-link tag="button" to="/login">手机登录</router-link>
  </div>
</template>

<script>
    export default {
        name: "SelectLogin"
    }
</script>
<style scoped lang="stylus" ref="stylesheet/stylus">
  .select-login
    background-color #fff
    width 100%
    height 100%
    position fixed
    left 0
    top 0
    z-index 10000
    display flex
    flex-direction column
    justify-content center
    align-items center
    button
      width 70%
      height 38px
      background-color #6f8397
      border none
      border-radius 5px
      font-size 20px
      color #fff
      margin-top 30px
    .bottom
      width 100%
      position fixed
      top 130px
      left 0
      text-align center
</style>
