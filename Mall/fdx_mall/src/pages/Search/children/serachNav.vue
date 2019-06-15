<template>
  <div class="search-nav">
      <a href="#" class="serach-nav-iocn" @click.prevent="showSearchPanel(true)">
          <i class="iconfont icon-search"></i>
          <span>手机数码</span>
      </a>
  </div>
</template>

<script>
export default {
  name: "SearchNav",
  props:{
    showSearchPanel:Function
  }
};
</script>

<style <style lang="stylus" ref="stylesheet/stylus" scoped>
@import '../../../common/stylus/mixins.styl'
  .search-nav
    width 100%
    height 60px
    background #fff 
    border-bottom-1px(#ccc)
    position fixed
    left 0
    top 0
    z-index 9998
    display flex
    justify-content center
    align-items center
    .serach-nav-iocn
        width 90%
        height 70%
        background-color #f8f8f8
        border-radius 10px
        display flex
        justify-content center
        align-items center
        color #ccc
        font-size 16px
        span 
            margin-left 5px
</style>

