<template>
   <div class="user-detail">
    <div class="user-detail-top">
        <i class="iconfont icon-back" @click="toback()"></i>
        <span>基本信息</span>
    </div>
    <div class="user-detail-group">
      <div class="user-icon">
        <span>头像</span>
        <img src="./../../common/images/user.jpg" alt="">
      </div>
      <div class="user-item">
        <span>手机</span>
        <span>{{user_phone}}</span>
      </div>
      <div class="user-item">
        <span>昵称</span>
        <span><input type="text" v-model="user_name"></span>
      </div>
      <div class="user-item" @click="sheetVisible = true">
        <span>性别</span>
        <span>{{user_gender}}</span>
      </div>
      <div class="user-item">
        <span>常住地</span>
        <span><input type="text" v-model="user_address"></span>
      </div>
      <div class="user-item" @click="$refs.picker.open()">
        <span>生日</span>
        <span>{{user_brithday}}</span>
      </div>
      <div class="user-item">
        <span>个性签名</span>
        <span><input type="text" v-model="user_sign"></span>
      </div>
      <button @click="saveUserInfo">保存</button>
    </div>
    
    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible">
    </mt-actionsheet>
    
    <mt-datetime-picker
      ref="picker"
      type="date"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      :endDate=endDate
      :startDate=startDate
      @confirm="handleBirthday"
    >
    </mt-datetime-picker>
  </div>
</template>

<script>
  import moment from 'moment';
  import {mapState} from 'vuex';
  import {changeUserInfo} from './../../api/index';
  import {Toast} from 'mint-ui';
export default {
    name:"MeDetail",
   data() {
      return {
        user_sign: '',
        user_address: '',
        user_name: '',
        user_gender: '未选择',
        user_phone: '',
        user_brithday: '',

        // 2. 性别
        sheetVisible: false,
        actions: [
          {name: '男', method: this.selectSex},
          {name: '女', method: this.selectSex},
        ],

        // 3. 出生年月日
        startDate: new Date('1960-01-01'),
        endDate: new Date(),
      }
    },
    computed:{
      ...mapState(['userInfo'])
    },
    mounted(){
        this.user_sign = this.userInfo.user_sign || '';
        this.user_address = this.userInfo.user_address || '';
        this.user_name = this.userInfo.user_name || '';
        this.user_gender = this.userInfo.user_gender || '';
        this.user_phone = this.userInfo.user_phone || '';
        this.user_brithday = this.userInfo.user_brithday || ''
    },
    methods:{
        toback(){
        this.$router.back();
      },
      selectSex(props){
          // console.log(props.name);
          this.user_gender = props.name;
      },
       // 2. 修改日期
      handleBirthday(date){
        // console.log(date);
        // console.log(moment(date).format("YYYY年MM月DD日"));
        this.user_brithday = moment(date).format("YYYY/MM/DD");
      },
      async saveUserInfo(){
        let result = await changeUserInfo(this.userInfo.id,this.user_name, this.user_gender, this.user_address, this.user_brithday, this.user_sign);
        console.log(result); 
        Toast({
          message: result.message,
          duration: 2000
        });
        if(result.success_code === 200){
          //3.4更新本地数据
          this.$store.dispatch('getUserInfo');
          //3.5返回主界面
           setTimeout(()=>{
               this.$router.replace('/me');
            }, 2000)
        }
      }
    }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .user-detail
    width 100%
    height 100%
    .user-detail-top
      width 100%
      height 60px
      display flex
      justify-content flex-start
      align-items center
      line-height 60px
      padding 0 10px
      font-weight bold
      background-color #6f8397
      text-align center
      color #fff
      span{
          margin-left 38%
      }
    .user-detail-group
      .user-icon
        height 60px
        padding 0 10px
        background-color #fff
        border-bottom: 1px solid #e0e0e0
        display flex
        justify-content space-between
        align-items center
        img
          width 50px
          border-radius 50%
      .user-item
        height 40px
        padding 0 10px
        background-color #fff
        border-bottom: 1px solid #e0e0e0
        display flex
        justify-content space-between
        align-items center
        input
          border none
          outline none
          text-align right
      button
        width 90%
        height 40px
        line-height 40px
        background-color #6f8397
        text-align center
        margin 20px 5%
        border none
        font-size 16px
        color #fff
        border-radius 10px
    .right-title-color
      color #999
      font-size 14px
</style>


