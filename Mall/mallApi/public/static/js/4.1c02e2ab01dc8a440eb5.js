webpackJsonp([4],{"n/G1":function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"home"},[o("ly-tab",{attrs:{items:e.items,options:e.options},on:{change:e.handleItemChanged},model:{value:e.selectedId,callback:function(t){e.selectedId=t},expression:"selectedId"}}),e._v(" "),o("router-view")],1)},staticRenderFns:[]};var a=o("VU/8")({name:"Home",data:function(){return{selectedId:0,items:[{label:"热门"},{label:"数码"},{label:"服装"},{label:"鞋包"},{label:"百货"},{label:"食品"},{label:"男装"},{label:"书籍"},{label:"电器"}],options:{activeColor:"#e9232c"},subRouterUrl:["/home/hot","/home/digital","/home/costume","/home/bag","/home/store","/home/food","/home/mens","/home/book","/home/ele"]}},methods:{handleItemChanged:function(e,t){this.$router.replace(this.subRouterUrl[t])}}},l,!1,function(e){o("tm9b")},"data-v-4a3f1dbd",null);t.default=a.exports},tm9b:function(e,t){}});
//# sourceMappingURL=4.1c02e2ab01dc8a440eb5.js.map