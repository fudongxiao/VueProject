import Vue from 'vue'
import App from './App'
import router from './router'

import store from './store'

import { Actionsheet } from 'mint-ui';
import VueLazyload from 'vue-lazyload'

Vue.component(Actionsheet.name, Actionsheet);

import { DatetimePicker } from 'mint-ui';
Vue.component(DatetimePicker.name, DatetimePicker);
import 'mint-ui/lib/style.css'
import loading from './common/images/20150210104951657.gif';


//1、引入
import LyTab from 'ly-tab'
// Vue.config.productionTip = false
Vue.use(LyTab);
// Vue.use(VueLazyload);
Vue.use(VueLazyload, {
  loading
})
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
