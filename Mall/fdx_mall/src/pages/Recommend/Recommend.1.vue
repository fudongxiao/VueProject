<template>
  <div class="recommend-container">
     <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
			  <ul class="recommend"  v-if="recommendlist.length > 0">
            <shop-list tag="li"  v-for="(item,index) in recommendlist" :key="index" :item="item" :clickCellBtn="dealWatchCellBtnClick"/>
        </ul>
			</mescroll-vue>
    <!-- <SelectLogin v-else="this.userInfo.id && "/> -->
  </div>
</template>

<script>
import { mapState } from "vuex"
import ShopList from "./../../components/ShopList/ShopList"
import SelectLogin from './../Login/SelectLogin'
import MescrollVue from 'mescroll.js/mescroll.vue'
import { Indicator,Toast, InfiniteScroll} from 'mint-ui'
import {addGoodsToCart} from "./../../api/index.js"
// Vue.use(InfiniteScroll)
export default {
  name: "Recommend",
  data(){
    return{
      page:1,
      count:20
    }
  },
  components:{
    ShopList,
    SelectLogin,
     
  },
  computed:{
    ...mapState(["recommendlist",'userInfo'])
  },
  mounted() {
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    });
    this.$store.dispatch("reqRecommendList",{page:this.page,count:this.count,callback:()=>{
      Indicator.close();
    }});
  },
  watch:{
    recommendlist(){
      this.$nextTick(()=>{
        //当前页码加一
        this.page += 1;
        //初始化
        this._initBScroll();
      })
    }
  },
  methods:{
    _initBScroll(){
      //1.1初始化
      this.listScroll = new BScroll('.recommend-container',{
        scrollY:true,
        probeType:3
      })
      //1.2监听列表滚动
      this.listScroll.on('touchEnd',(pos)=>{
        //1.2.1监听下拉
        if(pos.y >= 50){
          console.log("下拉刷新")
        }
        //1.2.2监听上拉
        if(this.listScroll.maxScrollY > pos.y+50){
          // console.log("上拉加载");
          console.log(this.page);
          Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          });
          this.$store.dispatch("reqRecommendList",{page:this.page,count:this.count,callback: ()=>{
            Indicator.close();
          }})}
      })
      //1.3列表滚动结束refresh
      this.listScroll.on('scrollEnd',()=>{
          this.listScroll.refresh();
      })
    },
    //监听商品点击
    async dealWatchCellBtnClick(goods){
      //1.发送请求
      let result = await addGoodsToCart(this.userInfo.id,goods.goods_id,goods.goods_name,goods.thumb_url,goods.price);
      console.log(result);
      Toast({
        message:result.message,
        duration: 1000
      })
    }
  }
};
</script>

<style <style lang="stylus" ref="stylesheet/stylus" scoped>
  .recommend-container 
      width: 100%;
      height: 100%;
      text-align: center;
      line-height: 22px;
      background: #f5f5f5;
      .recommend
        display  flex
        flex-direction row
        flex-flow wrap
        background-color #f5f5f5
        padding-bottom 50px
        justify-content space-between
</style>