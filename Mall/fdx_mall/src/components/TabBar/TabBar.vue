<template>
    <div class="bottom-tab">
        <span class="tab-item" @click="switchTo('/home')" :class="{on:$route.path.includes('/home')}">
            <i class="iconfont icon-home"></i>
            <label>首页</label>
        </span>
        <span class="tab-item" @click="switchTo('/recommend')" :class="{on:$route.path.includes('/recommend')}">
            <i class="iconfont icon-recommend"></i>
            <label>推荐</label>
        </span>
        <span class="tab-item" @click="switchTo('/search')" :class="{on:$route.path.includes('/search')}">
            <i class="iconfont icon-search"></i>
            <label>搜索</label>
        </span>
        <span class="tab-item" @click="switchTo('/chat')" :class="{on:$route.path.includes('/chat')}">
            <i class="iconfont icon-gouwu" style="font-weight:600"></i>
            <label>购物车</label>
        </span>
        <span class="tab-item" @click="switchTo('/me')" :class="{on:$route.path.includes('/me')}">
            <i class="iconfont icon-me" style="font-weight:600"></i>
            <label>个人</label>
        </span>
    </div>
</template>

<script>
export default {
    name:"TabBar",
    methods:{
        switchTo(path){
            // console.log(this.$router);
            this.$router.replace(path);
        }
    }
}
</script>

<style lang="stylus" ref="stylesheet/stylus">
    .bottom-tab
        max-width 750px
        width 100%
        height 50px 
        display flex
        background-color #ffffff
        position fixed
        left 0
        right 0
        bottom 0
        margin 0 auto
        z-index 9999
        border-top 1px solid #f5f5f5
        .tab-item
            display flex
            flex 1
            flex-direction column
            align-items center
            justify-content center
            i 
                font-size 24px
                color #999
            label
                font-size 12px
                margin-top 3px
                color #666
        .on
            i
                color #e9232c!important
            label
                color #e9232c!important
</style>


