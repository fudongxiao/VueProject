<template>
  <a class="recommend-item">
    <img v-lazy="item.image_url" alt width="100%" v-if="item.image_url">
    <h4 class="item-title">{{item.goods_name}}</h4>
    <div class="item-bottom">
      <span class="item-price">￥{{item.normal_price / 100}}</span>
      <small class="item-tip">{{item.sales_tip}}</small>
      <button class="item-btn" @click="clickCellBtn(item)">加入购物车</button>
    </div>
  </a>
</template>

<script>
export default {
  name: "ShopList",
  props: {
    item: Object,
    clickCellBtn:{
      type:Function,
      default:()=>{}
    }
  }
};
</script>

<style <style lang="stylus" ref="stylesheet/stylus" scoped>
  .recommend-item
          width 49.5%
          background-color #fff
          margin-bottom 8px
          padding-bottom 10px
          .item-title
            font-size 13px
            font-weight lighter
            line-height 20px
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
            color #808080
            padding 0 5px
          .item-bottom
            display flex
            flex-direction row
            align-items center
            padding 0 6px
            margin-top 5px
            .item-price
              flex 1
              color red
              font-weight bolder
              font-size 12px
            .item-tip
              flex 4
              font-size 10px
              color #ccc
            .item-btn
              flex 4   
              border  1px solid red
              height 24px
              border-radius 5px
              background-color transparent
              color red
              font-size 11px
</style>

