<template>
  <div id="app">
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
    <tab-bar v-show="$route.meta.showBottomTabBar"></tab-bar>
  </div>
</template>

<script>
import TabBar from "./components/TabBar/TabBar";
export default {
  name: "App",
  components: {
    TabBar
  },
  data() {
    return {
      publicItem: [
        {
          recommendImgSrc: require("./common/images/recommendImg1.png"),
          recommendTitle: "",
          recommendUrl: ""
        },
        {
          recommendImgSrc: require("./common/images/recommendImg2.png"),
          recommendTitle: "",
          recommendUrl: ""
        },
        {
          recommendImgSrc: require("./common/images/recommendImg3.png"),
          recommendTitle: "",
          recommendUrl: ""
        },
        {
          recommendImgSrc: require("./common/images/recommendImg4.png"),
          recommendTitle: "",
          recommendUrl: ""
        },
        {
          recommendImgSrc: require("./common/images/recommendImg5.png"),
          recommendTitle: "",
          recommendUrl: ""
        },
        {
          recommendImgSrc: require("./common/images/recommendImg6.png"),
          recommendTitle: "",
          recommendUrl: ""
        }
      ]
    };
  },
  mounted(){
    this.$store.dispatch('getUserInfo')
  }
};
</script>

<style <style lang="stylus" ref="stylesheet/stylus">
#app 
  max-width 750px
  width 100%
  height 100%
  margin 0 auto
  background #f5f5f5
  box-sizing border-box

ul li
  list-style none

</style>

