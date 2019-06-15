import {
  getHomeCasual,
  getHomeNav,
  getShopList,
  getRecommendList,
  getSearchShopList,
  getUserInfo,
  getLoginOut,
  getCartGoods
} from '../api'

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
  async reqHomeCasual({
    commit
  }, callback) {
    const result = await getHomeCasual();
    commit(HOME_CASUAL, {
      homecasual: result.message
    })
    callback && callback()
  },
  //2.获取首页导航
  async reqHomeNav({
    commit
  }) {
    const result = await getHomeNav();
    commit(HOME_NAV, {
      homenav: result.message.data
    })
  },

  //3.首页商品列表数据
  async reqShopList({
    commit
  }) {
    const result = await getShopList();
    commit(SHOP_LIST, {
      shoplist: result.message.goods_list
    })
  },

  //4.推荐商品列表数据
  async reqRecommendList({
    commit
  }, params) {
    const result = await getRecommendList(params);
    commit(RECOMMEND_LIST, {
      recommendlist: result.message
    });
    params.callback && params.callback();
  },

  //5.搜索商品列表数据
  async reqSearchShopList({
    commit
  }) {
    const result = await getSearchShopList();
    commit(SEARCHSHOP_LIST, {
      searchshoplist: result.message.data
    })
  },

  //6.同步用户的信息
  syncUserInfo({
    commit
  }, userInfo) {
    commit(USER_INFO, {
      userInfo
    })
  },
  //7.异步获取用户的信息
  async getUserInfo({
    commit
  }) {
    const result = await getUserInfo();
    console.log(result);
    // commit(USER_INFO, {
    //   userInfo
    // })
    if(result.success_code === 200){
      commit(USER_INFO,{userInfo:result.message});
    }
  },

  //8.退出登录
  async loginOut({
    commit
  }) {
    const result = await getLoginOut();
    console.log(result);
    // commit(USER_INFO, {
    //   userInfo
    // })
    if(result.success_code === 200){
      commit(RESET_USER_INFO);
    }
  },
  //9.请求购物车数据
  async reqCartGoodsList({
    commit
  }) {
    const result = await getCartGoods();
    if(result.success_code === 200){
      commit(CART_GOODS_LIST, {
        cartgoodslist: result.message
      })
    }
  },

  //10.单个商品的增加和减少
  updataGoodsCount({commit},{goods,isAdd}){
    if(isAdd){//增加
      commit(ADD_GOODS_COUNT,{goods})
    }else{//减少
      commit(REDUCE_GOODS_COUNT,{goods})
    }
  },

  //11.是否选中全部商品
  selectedAll({commit},{flag}){
    commit(SELECTED_ALL_GOODS,{flag});
    // console.log(flag);
  },

    //12.是否选中单个商品
    selectedGoods({commit},{goods}){
      commit(SELECTED_GOODS,{goods});
    },

    //13.单个商品删除
    deleteGoods({commit},{goods}){
      commit(DELETE_GOODS,{goods});
    },
}
