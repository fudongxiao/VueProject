
import Vue from 'vue'
import {
  HOME_CASUAL,
  HOME_NAV,
  SHOP_LIST,
  RECOMMEND_LIST,
  SEARCHSHOP_LIST,
  USER_INFO,
  RESET_USER_INFO,
  CART_GOODS_LIST,
  ADD_GOODS_COUNT,
  REDUCE_GOODS_COUNT,
  SELECTED_ALL_GOODS,
  SELECTED_GOODS,
  DELETE_GOODS
} from './mutation-types'


export default {
  //1.获取首页轮博图
  [HOME_CASUAL](state, {
    homecasual
  }) {
    state.homecasual = homecasual
  },
  //2.获取首页导航
  [HOME_NAV](state, {
    homenav
  }) {
    state.homenav = homenav
  },
  //3.获取首页列表数据
  [SHOP_LIST](state, {
    shoplist
  }) {
    state.shoplist = shoplist
  },
  //4.获取推荐商品列表数据
  [RECOMMEND_LIST](state, {
    recommendlist
  }) {
    state.recommendlist = state.recommendlist.concat(recommendlist)
  },
  //5.获取搜索商品列表数据
  [SEARCHSHOP_LIST](state, {
    searchshoplist
  }) {
    state.searchshoplist = searchshoplist
  },
  //5.获取短信验证码
  [USER_INFO](state, {
    userInfo
  }) {
    state.userInfo = userInfo
  },

  //6.清楚用户信息
  [RESET_USER_INFO](state) {
    state.userInfo = {}
  },
  //7.购物车数据
  [CART_GOODS_LIST](state,{cartgoodslist}) {
    state.cartGoods = cartgoodslist
  },
  //8.增加购物车数据
  [ADD_GOODS_COUNT](state,{goods}) {
    // state.cartGoods = cartgoodslist
    goods.buy_count++
  },
  //9.减少购物车数据
  [REDUCE_GOODS_COUNT](state,{goods}) {
    if(goods.buy_count){
      goods.buy_count--;
      if(goods.buy_count === 0){
        const index = state.cartGoods.indexOf(goods);
        state.cartGoods.splice(index,1);
      }
    }else{
      console.log("该商品不存在!");
    }
  },

    //10.是否选中所有商品
    [SELECTED_ALL_GOODS](state,{flag}) {
      state.cartGoods.forEach((goods,index) => {
        console.log(goods);
        if(goods.checked){
          goods.checked = !flag;
          // console.log(goods.checked);
        }else{
          Vue.set(goods,'checked',!flag);
          // console.log(goods.checked);
        }
      });
    },

    //11.是否选中单个商品
    [SELECTED_GOODS](state,{goods}) {
      if(goods.checked){
        goods.checked = !goods.checked;
        // console.log(goods.checked);
      }else{
        Vue.set(goods,'checked',true);
        // console.log(goods.checked);
      }
    },

    //12.删除单个商品
    [DELETE_GOODS](state,{goods}){
      const index = state.cartGoods.indexOf(goods);
      state.cartGoods.splice(index,1);
    }
}
