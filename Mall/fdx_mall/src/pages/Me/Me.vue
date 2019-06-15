<template>
  <div class="me">
    <div v-if="this.userInfo.id">
      <MeTop/>
    </div>
    <SelectLogin v-else/>
  </div>
</template>

<script>
import SelectLogin from './../Login/SelectLogin'
import {mapState} from 'vuex'
import MeTop from './MeTop'
export default {
  name: "Me",
  components:{
    SelectLogin,
    MeTop
  },
  computed:{
    ...mapState(['userInfo'])
  }
};
</script>

<style <style lang="stylus" ref="stylesheet/stylus" scoped>
  .me
    width 100%
    height 100%
    text-align center
    background #f7f7f7
</style>

