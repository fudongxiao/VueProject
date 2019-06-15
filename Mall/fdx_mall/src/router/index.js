//1、引入模块
import Vue from 'vue'
import Router from 'vue-router'

/* import Home from './../pages/Home/Home.vue'
import Recommend from './../pages/Recommend/Recommend.vue'
import Search from './../pages/Search/Search.vue'
import Chat from './../pages/Chat/Chat.vue'
import Me from './../pages/Me/Me.vue' */
import Login from './../pages/Login/Login'

const Home = ()=> import('./../pages/Home/Home.vue')
const Recommend = ()=> import('./../pages/Recommend/Recommend.vue')
const Search = ()=> import('./../pages/Search/Search.vue')
const Chat = ()=> import('./../pages/Chat/Chat.vue')
const Me = ()=> import('./../pages/Me/Me.vue')

//二级路由引入
import Hot from './../pages/Home/chilren/Hot/Hot.vue'
import Digital from './../pages/Home/chilren/Digital.vue'
import Costume from './../pages/Home/chilren/Costume.vue'
import Bag from './../pages/Home/chilren/Bag.vue'
import Store from './../pages/Home/chilren/Store.vue'
import Food from './../pages/Home/chilren/Food.vue'
import Mens from './../pages/Home/chilren/Mens.vue'
import Book from './../pages/Home/chilren/Book.vue'
import Ele from './../pages/Home/chilren/Ele.vue'
// import SelectLogin from './../pages/Login/SelectLogin'

import MeSetting from './../pages/Me/MeSetting.vue'
import MeDetail from './../pages/Me/MeDetail.vue'


//2、声明使用
Vue.use(Router)
//3、输出路由对象
export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },{
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        {
          path: 'hot',
          name: 'Hot',
          component: Hot,
          meta:{showBottomTabBar:true}
        },{
          path: 'digital',
          name: 'Digital',
          component: Digital,
          meta:{showBottomTabBar:true}
        },{
          path: 'costume',
          name: 'Costume',
          component: Costume,
          meta:{showBottomTabBar:true}
        },{
          path: 'bag',
          name: 'Bag',
          component: Bag,
          meta:{showBottomTabBar:true}
        },{
          path: 'store',
          name: 'Store',
          component: Store,
          meta:{showBottomTabBar:true}
        },{
          path: 'food',
          name: 'Food',
          component: Food,
          meta:{showBottomTabBar:true}
        },{
          path: 'mens',
          name: 'Mens',
          component: Mens,
          meta:{showBottomTabBar:true}
        },{
          path: 'book',
          name: 'Book',
          component: Book,
          meta:{showBottomTabBar:true}
        },{
          path: 'ele',
          name: 'Ele',
          component: Ele,
          meta:{showBottomTabBar:true}
        },{
          path: '/home',
          redirect: '/home/hot'
        }
      ]
    },{
      path: '/recommend',
      name: 'Recommend',
      component: Recommend,
      meta:{showBottomTabBar:true}
    },{
      path: '/search',
      name: 'Search',
      component: Search,
      meta:{showBottomTabBar:true}
    },{
      path: '/chat',
      name: 'Chat',
      component: Chat,
      meta:{showBottomTabBar:true}
    },{
      path: '/me',
      name: 'Me',
      component: Me,
      meta:{showBottomTabBar:true},
      // children: [
      //   {
      //     path: 'selectlogin',
      //     name: 'SelectLogin',
      //     component: SelectLogin
      //   }]
    },{
      path: '/setting',
      name: 'MeSetting',
      component: MeSetting,
    },{
      path: '/detail',
      name: 'MeDetail',
      component: MeDetail,
    },{
      path: '/',
      redirect: '/home'
    }
  ]
})
