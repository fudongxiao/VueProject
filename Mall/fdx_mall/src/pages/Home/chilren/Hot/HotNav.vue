<template>
  <div class="hot-nav">
    <!-- 滚动区域 -->
    <div class="hot-nav-content" v-if="homenav.length > 0">
      <div class="hot-nav-inner">
        <a class="inner-item" v-for="(nav,index) in homenav" :key="index">
          <img v-lazy="nav.iconurl" alt>
          <span>{{nav.icontitle}}</span>
        </a>
      </div>
    </div>
    <!-- 滚动条 -->
    <div class="hot-nav-bottom">
      <div class="hot-nav-bottom-inner" :style="innerBarStyle"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "HotNav",
  data() {
    return {
      //1、屏幕宽度
      screenW:
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth,
      //2、滚动内容的宽度
      scrollContentW: 720,
      //3、背景条的长度
      BgbarW: 100,
      //4、滚动条的长度
      scrollBarW: 0,
      //5、起点
      stratX: 0,
      //6、记录结束点
      endFlag: 0,
      //7、移动距离
      barMoveWidth: 0,
      //8.热门导航数据
      hotNav: [
        {
          hotImgUrl: require("../../images/nav/itemIconH1.png"),
          hotNavUrl: "",
          hotNavText: "图书音像"
        },
        {
          hotImgUrl: require("../../images/nav/itemIconH2.png"),
          hotNavUrl: "",
          hotNavText: "玩转3C"
        },
        {
          hotImgUrl: require("../../images/nav/itemIconH3.png"),
          hotNavUrl: "",
          hotNavText: "家装城"
        },
        {
          hotImgUrl: require("../../images/nav/itemIconH4.png"),
          hotNavUrl: "",
          hotNavText: "百科"
        },
        {
          hotImgUrl: require("../../images/nav/itemIconH5.png"),
          hotNavUrl: "",
          hotNavText: "限时秒杀"
        },
        {
          hotImgUrl: require("../../images/nav/itemIconH6.png"),
          hotNavUrl: "",
          hotNavText: "电脑办公"
        },
        {
          hotImgUrl: require("../../images/nav/itemIconH7.png"),
          hotNavUrl: "",
          hotNavText: "个护清洁"
        },
        {
          hotImgUrl: require("../../images/nav/itemIconH8.png"),
          hotNavUrl: "",
          hotNavText: "服装馆"
        },
        {
          hotImgUrl: require("../../images/nav/itemIconH9.png"),
          hotNavUrl: "",
          hotNavText: "女装馆"
        },
        {
          hotImgUrl: require("../../images/nav/itemIconH10.png"),
          hotNavUrl: "",
          hotNavText: "鞋包"
        },
        {
          hotImgUrl: require("../../images/nav/itemIconH11.png"),
          hotNavUrl: "",
          hotNavText: "运动户外"
        },
        {
          hotImgUrl: require("../../images/nav/itemIconH12.png"),
          hotNavUrl: "",
          hotNavText: "男装馆"
        },
        {
          hotImgUrl: require("../../images/nav/itemIconH13.png"),
          hotNavUrl: "",
          hotNavText: "排行榜"
        },
        {
          hotImgUrl: require("../../images/nav/itemIconH14.png"),
          hotNavUrl: "",
          hotNavText: "汽车用品"
        },
        {
          hotImgUrl: require("../../images/nav/itemIconH15.png"),
          hotNavUrl: "",
          hotNavText: "大家电馆"
        },
        {
          hotImgUrl: require("../../images/nav/itemIconH16.png"),
          hotNavUrl: "",
          hotNavText: "大药房"
        }
      ]
    };
  },
  computed: {
    ...mapState(["homenav"]),
    innerBarStyle() {
      return {
        width: this.scrollBarW + "px",
        left: this.barMoveWidth + "px"
      };
    }
  },
  mounted() {
    this.getBottomBarWidth();
    this.bindEvent();
  },
  methods: {
    getBottomBarWidth() {
      this.scrollBarW = this.BgbarW * (this.screenW / this.scrollContentW);
    },
    //移动端事件监听
    bindEvent() {
      this.$el.addEventListener("touchstart", this.handleTouchStart, false);
      this.$el.addEventListener("touchmove", this.handleTouchMove, false);
      this.$el.addEventListener("touchend", this.handleTouchEnd, false);
    },
    //开始触摸
    handleTouchStart(event) {
      // console.log(this.hotNav.length);
      let touch = event.touches[0];
      this.stratX = Number(touch.pageX);
      // console.log(this.stratX);
    },
    //开始移动
    handleTouchMove() {
      //获取第一个触点值
      let touch = event.touches[0];
      //求出移动距离
      let moveW = Number(touch.pageX) - this.stratX;
      //滚动条移动的距离
      this.barMoveWidth = -(
        (this.BgbarW / this.scrollContentW) * moveW -
        this.endFlag
      );
      // console.log(this.barMoveWidth);
      //边界值处理
      if (this.barMoveWidth <= 0) {
        this.barMoveWidth = 0;
      } else if (this.barMoveWidth >= this.BgbarW - this.scrollBarW) {
        this.barMoveWidth = this.BgbarW - this.scrollBarW;
      }
    },
    //结束触摸
    handleTouchEnd() {
      this.endFlag = this.barMoveWidth;
      // console.log(this.endFlag)
    }
  }
};
</script>

<style lang="stylus" scoped>
.hot-nav {
  width: 100%;
  height: 180px;
  text-align: center;
  line-height: 40px;
  position: relative;
  background: #fff;
  padding-bottom: 10px;

  .hot-nav-content {
    width: 100%;
    overflow-x: scroll;

    .hot-nav-inner {
      width: 720px;
      height: 180px;
      display: flex;
      flex-flow: wrap;

      .inner-item {
        width: 90px;
        height: 90px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        color: #666;

        img {
          width: 40%;
          margin-bottom: 3px;
        }
      }
    }
  }

  .hot-nav-content::-webkit-scrollbar {
    display: none;
  }

  .hot-nav-bottom {
    width: 100px;
    height: 2px;
    background-color: #cccccc;
    position: absolute;
    left: 50%;
    margin-left: -50px;
    bottom: 8px;

    .hot-nav-bottom-inner {
      position: absolute;
      left: 0;
      height: 100%;
      background-color: orangered;
      width: 0;
    }
  }
}
</style>

