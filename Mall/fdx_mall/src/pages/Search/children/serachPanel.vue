<template>
  <div class="search-panel">
    <div class="search-nav">
       <div class="search-input">
          <i class="iconfont icon-search"></i>
          <input ref="mySearch" type="text" placeholder="手机数码">
      </div>
      <button @click="showSearchPanel(false)">取消</button>
    </div>
    <div class="search-content">
      <div class="title">
        <img src="../../../common/images/hot.png" width="25" alt="">
        <span>热门搜索</span>
      </div>
      <ul class="hotworld-list">
        <li v-for="(item,index) in hotWorld" :key="index"><span>{{item.worlds}}</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchPanel",
  data(){
    return{
      hotWorld:[
        {worlds:"手机"},
        {worlds:"笔记本电脑"},
        {worlds:"车厘子"},
        {worlds:"连衣裙"},
        {worlds:"男鞋"},
        {worlds:"华为"},
        {worlds:"智能手表"},
        {worlds:"蓝牙耳机"},
        {worlds:"手机套"}
      ]
    }
  },
  props:{
    showSearchPanel:Function
  },
  mounted(){
    this.$refs.mySearch.focus();
  }
};
</script>

<style <style lang="stylus" ref="stylesheet/stylus" scoped>
@import '../../../common/stylus/mixins.styl'
  .search-panel
    width 100%
    height 100%
    background #fff 
    position fixed
    left 0
    top 0
    z-index 999999
    .search-nav
      padding 10px 15px
      border-bottom-1px(#ccc)
      display flex
      justify-content space-between
      align-items center
      .search-input
        width 88%
        height 38px
        background-color #f8f8f8
        border-radius 8px
        display flex
        justify-content space-between
        align-items center
        color #ccc
        font-size 16px
        padding-left 15px
        padding-right 10px
        input 
          width 90%
          height 96%
          border-radius 0 8px 8px 0
          background-color transparent
          padding-left 5px
          font-size 14px
          outline none 
      button
        background-color transparent
        font-size 14px
        border none 
        outline none 
        color #999   
    .search-content
      margin-top 20px
      padding 0 15px  
      .title
        display flex
        flex-direction row
        justify-content flex-start
        align-items center
        span 
          font-size 16px
          color #666
          margin-left 5px  
      .hotworld-list
        display flex
        flex-flow wrap
        justify-content flex-start
        li
          background-color #ededed
          padding 5px 10px
          margin 15px 5px 0
          border-radius 4px  
          color #999  
</style>

