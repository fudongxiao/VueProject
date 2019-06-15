<template>
  <!-- <div class="recommend-container">
    <ul class="recommend"  v-if="recommendlist.length > 0">
      <shop-list tag="li"  v-for="(item,index) in recommendlist" :key="index" :item="item" :clickCellBtn="dealWatchCellBtnClick"/>
    </ul>
    <SelectLogin v-else/> this.userInfo.id && 
  </div>-->
  <MescrollVue ref="mescroll" :down="mescrollDown" :up="mescrollUp" class="mescroll">
    <ul class="recommend">
      <shop-list
        tag="li"
        v-for="(item,index) in recommendlist"
        :key="index"
        :item="item"
        :clickCellBtn="dealWatchCellBtnClick"
      />
    </ul>
  </MescrollVue>
</template>

<script>
import { mapState } from "vuex";
import ShopList from "./../../components/ShopList/ShopList";
import SelectLogin from "./../Login/SelectLogin";
import { Indicator, Toast } from "mint-ui";
import { addGoodsToCart } from "./../../api/index.js";
import MescrollVue from "mescroll.js/mescroll.vue";
import top from './../../common/images/top.png'
export default {
  name: "Recommend",
  data() {
    return {
      page: 1,
      count: 10,
      mescroll: null,
      mescrollDown: {}, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
      mescrollUp: {
        // 上拉加载的配置.
        callback: this.upCallback, // 上拉回调,此处可简写; 相当于 callback: function (page, mescroll) { getListData(page); }
        //以下是一些常用的配置,当然不写也可以的.
        page: {
          num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
          size: 10 //每页数据条数,默认10
        },
        offset: 200,
        htmlNodata: '<p class="upwarp-nodata">亲,没有更多数据了~</p>',
        noMoreSize: 5, //如果列表已无数据,可设置列表总数大于5才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
        toTop: {
          //回到顶部按钮
          src: top, //图片路径,默认null,支持网络图
          offset: 1000 //列表滚动1000px才显示回到顶部按钮
        },
        empty: {
          //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
          warpId: "xxid", //父布局的id (1.3.5版本支持传入dom元素)
          icon: "./static/mescroll/mescroll-empty.png", //图标,默认null,支持网络图 
          tip: "暂无相关数据~" //提示
        }
      },
      dataList: [] 
    };
  },
  components: {
    ShopList,
    SelectLogin,
    MescrollVue
  },
  computed: {
    ...mapState(["recommendlist", "userInfo"])
  },
  mounted() {
    // Indicator.open({
    //   text: "加载中...",
    //   spinnerType: "fading-circle"
    // });
  },
  methods: {
    //监听商品点击
    async dealWatchCellBtnClick(goods) {
      //1.发送请求
      let result = await addGoodsToCart(
        this.userInfo.id,
        goods.goods_id,
        goods.goods_name,
        goods.thumb_url,
        goods.price
      );
      console.log(result);
      Toast({
        message: result.message,
        duration: 1000
      });
    },
    upCallback:function(page, mescroll){
      page.num ++;
      console.log(page);
      console.log(page.num);
      this.$store.dispatch('reqRecommendList',{
        "app_name":"rectab_sim_gyl",
        "offset":(page.num-1)*page.size,
        "count":page.size,
        'successCallBack':(result)=>{
          console.log(11111);
        },
        "errorCallBack":(error)=>{
          console.log("0000000000");
        }
        }).then((response) => {
			        // 请求的列表数据
			        let arr = response.data
			        // 如果是第一页需手动制空列表
			        if (page.num === 1) this.dataList = []
			        // 把请求到的数据添加到列表
			        this.dataList = this.dataList.concat(arr)
			        // 数据渲染成功后,隐藏下拉刷新的状态
			        this.$nextTick(() => {
			          mescroll.endSuccess(arr.length)
			        })
			      }).catch((e) => {
			        // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
			        mescroll.endErr()
			      })
    }
  }
};
</script>

<style <style lang="stylus" ref="stylesheet/stylus" scoped>
.mescroll {
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 22px;
  background: #f5f5f5;

  .recommend {
    display: flex;
    flex-direction: row;
    flex-flow: wrap;
    background-color: #f5f5f5;
    // padding-bottom: 50px;
    justify-content: space-between;
    .mescroll-totop{
      bottom 40px !important;
      background-color rgba(0,0,0,.3)!important;
    }
  }
}
</style>

