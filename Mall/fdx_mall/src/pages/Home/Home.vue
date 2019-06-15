<template>
  <div class="home">
    <ly-tab v-model="selectedId" :items="items" :options="options" @change="handleItemChanged"></ly-tab>
     <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      selectedId: 0,
      items: [
        { label: "热门" },
        { label: "数码" },
        { label: "服装" },
        { label: "鞋包" },
        { label: "百货" },
        { label: "食品" },
        { label: "男装" },
        { label: "书籍" },
        { label: "电器" }
      ],
      options: {
        activeColor: "#e9232c"
      },
      subRouterUrl:[
        '/home/hot',
        '/home/digital',
        '/home/costume',
        '/home/bag',
        '/home/store',
        '/home/food',
        '/home/mens',
        '/home/book',
        '/home/ele'
      ]
    }
  },
  methods:{
    handleItemChanged(item,index){
      this.$router.replace(this.subRouterUrl[index]);
    }
  }
};
</script>

<style <style lang="stylus" ref="stylesheet/stylus" scoped>
.home {
  width: 100%;
  text-align: center;
  background: #f8f8f8;
}
</style>

