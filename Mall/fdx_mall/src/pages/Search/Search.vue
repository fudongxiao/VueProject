<template>
  <div class="search">
    <!-- 搜索导航 -->
    <serach-nav :showSearchPanel="showSearchPanel"/>
    <!-- 商品 -->
    <div class="shop">
      <!-- 左边 -->
      <div class="menu-wrapper">
        <ul>
          <li class="menu-item" ref = 'menulist' @click="clickLeftItem(index1)" :class="{ actived:index1 ===  activedIndex}" v-for="(item,index1) in searchshoplist" :key="index1">
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>
      <!-- 右边 -->
      <div class="shop-wrapper">
        <ul ref="itemWrap" style="padding-bottom:250px">
          <li class="shops-item"  v-for="(item,index2) in searchshoplist" :key="index2">
            <!-- 商品标题 -->
            <div class="shops-title">
              <h4>{{item.name}}</h4>
              <a href="#">查看更多 ></a>
            </div>
            <ul class="phone-type" v-if="item.tag === 'phone'">
              <li class="phone-item" v-for="(phone,index4) in item.category" :key="index4">
                <img :src="phone.icon" alt="">
              </li>
            </ul>
            <!-- 商品列表 -->
            <ul class="shops-item-list">
              <li v-for="(shop,index3) in item.items" :key="index3">
                <img v-lazy="shop.icon" alt="">
                <span>{{shop.title}}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <!-- 搜索面板 -->
     <search-panel v-if="isShow" :showSearchPanel="showSearchPanel"/>
  </div>
</template>

<script>
import { mapState } from "vuex"
import SerachNav from './children/serachNav'
import SearchPanel from './children/serachPanel'
import BScroll from 'better-scroll'
export default {
  name: "Search",
  data(){
    return{
      scrollY:'',
      rightTitleTop:[],
      isShow:false
    }
  },
  components:{
    SerachNav,
    SearchPanel
  },
  computed:{
    ...mapState(["searchshoplist"]),
    //  1. 用于动态决定左侧哪个选项被选中
    activedIndex(){
      const {scrollY,rightTitleTop} = this;
      return rightTitleTop.findIndex((titleTop,index)=>{
        this._leftScroll(index);
        return scrollY >= titleTop && scrollY < rightTitleTop[index+1];
      })
    }
  },
  mounted() {
    this.$store.dispatch("reqSearchShopList");
  },
  watch:{
    searchshoplist(){
      this.$nextTick(()=>{
        //1.左边  this. _initLeftScroll();
        //2.右边  this._initRightScroll();
        this._initBScroll();
        //1.2
        this._initrightTitleTop();
      })
    }
  },
  methods:{
    // _initLeftScroll(){

    // },
    // _initRightScroll(){

    // }
    //1.初始化
    _initBScroll(){
      //1.1左边
      this.leftScroll = new BScroll('.menu-wrapper',{
        scrollY:true,
        click:true
      });
      //1.2左边
      this.rightScroll = new BScroll('.shop-wrapper',{
        scrollY:true,
        click:true,
        probeType:3
      });
      //1.3
      this.rightScroll.on('scroll',(pos)=>{
        this.scrollY = Math.abs(pos.y);
        // console.log(this.scrollY);
      })
    },

    //2.求出右边所有版块头部位置
    _initrightTitleTop(){
      //2.1临时数组
      const tempArr = [];
      //2.2定义变量高度
      let itemTop = 0;
      tempArr.push(itemTop);
      //2.3遍历每个li ,取出高度
      let allList = this.$refs.itemWrap.getElementsByClassName('shops-item');
      // console.log(allList);
      Array.prototype.slice.call(allList).forEach(li => {
        itemTop += li.clientHeight;
        // console.log(itemTop)
        tempArr.push(itemTop);
      });
      //2.4数据更新
      this.rightTitleTop = tempArr;
      // console.log(this.rightTitleTop)
    },

    //3.点击切换右边同步
    clickLeftItem(index){
      // console.log(index);
      this.scrollY = this.rightTitleTop[index]; 
      this.rightScroll.scrollTo(0, -this.scrollY,300);
    },
    // 4. 左侧联动
    _leftScroll(index){
      let menuList = this.$refs.menulist;
      let el = menuList[index];
      this.leftScroll.scrollToElement(el,300,0,-100);
    },
    //5.设置搜索面板的显示
    showSearchPanel(flag){
          this.isShow = flag;
      }
  }
};
</script>

<style <style lang="stylus" ref="stylesheet/stylus" scoped>
 @import '../../common/stylus/mixins.styl'
  .search
    width 100%
    height 100%
    background #fff 
    .shop
      display flex
      position absolute 
      top 60px
      bottom 50px
      width 100%
      background-color #e3e3e3
      overflow hidden
      .menu-wrapper
        width 80px
        background-color #f1f1f1
        flex 0 0 80px
        .menu-item
          width 100%
          height 40px
          display flex
          justify-content center
          align-items center
          font-size 16px
          color #666
          background-color #fcfcfc
        .actived
          width 100%
          background-color #fff
          color #ff0036  
          position relative
        .actived::before
          content ''
          width 3px
          height 20px
          position absolute
          left 0
          background-color #ff0036
      .shop-wrapper
        flex 1
        background-color #fff
        .shops-title
          display flex
          flex-direction row
          justify-content space-between
          padding 0 10px
          color #999999
          line-height 40px
          a
            color #999999
            text-decoration none 
        .shops-item-list  
          display flex
          flex-flow wrap
          justify-content flex-start
          li
            width 33.333%
            height 90px
            display flex
            flex-direction column
            justify-content center
            align-items center
            // background-color #ff0036
            img 
              width 60%  
            span 
              font-size 14px
              color #999999
              margin-top 5px 
        .phone-type
          display flex
          justify-content flex-start
          flex-flow wrap
          border-bottom-1px(#ccc)
          margin-bottom 10px
          .phone-item
            width 33.33%
            height 40px
            display flex
            justify-content center
            align-items center
            img
              width 70%

</style>

