<template>
  <div class="shop-container" v-if="shoplist.length > 0">
    <ul class="shop-list">
      <li class="shop-list-item" v-for="(shop,index) in shoplist" :key="index">
        <img v-lazy="shop.image_url" alt="" width="100%">
        <h4 class="list-item-title">{{shop.goods_name}}</h4>
        <div class="list-item-bottom">
            <span class="item-price">￥{{shop.group.price/100}}</span>
            <span class="item-counter">{{shop.sales_tip}}</span>
            <span class="item-user">
                <img v-lazy="user.avatar" alt="" v-for="(user,index1) in shop.bubble" :key="index1">
            </span>
            <span class="item-buy">
                <button>去拼单 ></button>
            </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    name:"HotShopList",
    computed:{
         ...mapState(["shoplist"]),
    }
};
</script>

<style lang="stylus" scoped>
    .shop-container
        width 100%
        background-color #f5f5f5
        .shop-list
            .shop-list-item
                width 100%
                background-color #fff
                margin-bottom 8px
                display flex
                flex-direction column
                .list-item-title
                    line-height 22px
                    font-size 14px
                    padding 0 3%
                    margin-top 5px
                    overflow hidden
                    text-overflow ellipsis
                    display -webkit-box
                    -webkit-line-clamp 2
                    -webkit-box-orient vertical
                    text-align left
                .list-item-bottom
                    margin 10px 0
                    display flex
                    flex-direction row
                    justify-content space-around
                    align-items center
                    padding 0 3% 
                    .item-price
                        font-size 18px
                        text-align center
                        font-weight bold
                        color #ff0000
                        flex 1  
                    .item-counter
                        flex 2
                        font-size 12px
                        color #cccccc
                        text-align left
                        padding-left 5px
                    .item-user
                        display flex
                        justify-content center
                        align-items center
                        flex 1
                        img
                            width 30px  
                            border-radius 100%
                            z-index 10
                        img:nth-child(2)
                            margin-left -6px
                            z-index 8 
                    .item-buy
                        flex 2
                        button 
                            width 80%
                            border none
                            height 34px
                            color #ffffff
                            margin-left 10%
                            border-radius 8px
                            background-color #ff0000 
                            font-size 15px                       
</style>

