<template>
  <div class="hot">
    <!--1、轮播图 -->
    <div class="swiper-container" v-if="homecasual.length > 0">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(casual,index) in homecasual" :key="index">
          <img :src="casual.imgurl" alt>
        </div>
      </div>
      <!-- Add Pagination -->
      <div class="swiper-pagination"></div>
    </div>
    <!--2、中间导航 -->
    <hot-nav/>
    <!-- 3、热门广告位 -->
    <div class="hot-ad">
      <img v-lazy="hotAd" alt width="100%">
    </div>
    <!-- 4、商品列表 -->
    <hot-shop-list/>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import HotNav from "./HotNav.vue";
import HotShopList from "./HotShopList.vue";
import { mapState } from "vuex";
export default {
  name: "Hot",
  data(){
    return{
      hotAd:require('./../../images/hot_ad/hot-ad.png')
    }
  },
  components: {
    HotNav,
    HotShopList
  },
  computed: {
    ...mapState(["homecasual"])
  },
  mounted() {
    //1.请求轮播数据
    this.$store.dispatch("reqHomeCasual");
    //2.请求首页导航数据
    this.$store.dispatch("reqHomeNav");
    //3.请求首页导航数据
    this.$store.dispatch("reqShopList");
  },
  watch: {
    homecasual() {
      this.$nextTick(() => {
        //创建swiper实例
        new Swiper(".swiper-container", {
          loop: true,
          autoplay: true,
          pagination: {
            el: ".swiper-pagination"
          }
        });
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.hot {
  width: 100%;
  height: auto;
  text-align: center;
  background: #f5f5f5;
  padding-bottom: 50px;

  .swiper-container {
    img {
      width: 100%;
    }
  }

  .hot-ad {
    width: 100%;
    background-color: #ffffff;
    margin: 8px 0;
    padding: 5px 0;
  }
}
</style>

