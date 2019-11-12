<template>
  <div class="header">
     <div :class="isCollapse ? 'header-logo' : 'header-logo transition-width-left'">
        <img class="logo-img" src="@/assets/image/fn2-57.png" alt="">
        <img class="logo-font" src="@/assets/image/logo-font.svg" alt="">
     </div>
     <div :class="isCollapse ? 'hd-right' : 'hd-right transition-width-right'">
        <div class="open_slidebar" @click="handerMenu"><i class="fa fa-bars" aria-hidden="true"></i></div>
        <div class="user-name"><i class="fa fa-user"></i>&nbsp;{{getUserInfo.name}} </div>
        <div class="lgout" @click="lgout"><i class="fa fa-power-off" aria-hidden="true"></i>&nbsp;退出</div>
        <div class="sys_message">
            <i class="fa fa-bell"></i><el-badge class="mark" :value="2" />
        </div>
      </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {localStorage} from '@/assets/js/storage/index'
export default {
  components:{},
  props:{},
  data(){
    return {
      isCollapse:true,
    }
  },
  watch:{},
  computed:{
    ...mapGetters([
      'getUserInfo'
    ])
  },
  methods:{
    lgout(){
      localStorage.clear()
      this.$router.push('/login')
    },
    handerMenu(){ //处理菜单折叠
      this.$EventBus.$emit('changeMenu')
      this.$emit('handerleft')
      this.isCollapse = !this.isCollapse
    }
  },
  created(){},
  mounted(){
    
  }
}
</script>
<style lang="scss" scoped>
.header{
    width: 100%;
    height: 60px;
    position: fixed;
    top: 0;
}
.header-logo{
  width: 200px;
  height: 60px;
  overflow: hidden;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: .5s;
}
.transition-width-left{
  width: 66px;
}
.transition-width-left .logo-font{
  display: none;
}
.transition-width-left .logo-img{
  height: 40px;
  
}
.logo-img{
  width: auto;
  height: 45px;
  margin-right: 4px;
}
.logo-font{
  width: auto;
  height: 25px;
  margin-left: 4px;
}
.hd-right{
  width: 100%;
  box-sizing: border-box;
  padding-left: 210px;
  float: right;
  transition: .5s;
}
.transition-width-right{
  padding-left: 66px;
}
.open_slidebar{
  width: 60px;
  height: 60px;
  text-align: center;
  float: left;
  line-height: 60px;
  color: #333;
  font-size: 20px;
  cursor: pointer;
  transition: .5s;
}
.transition-width-right .open_slidebar{
  transform: rotateZ(90deg)
}
.fa{
  font-size: 16px;
}
.user-name{
  float: right;
  cursor: pointer;
  width: 120px;
  height: 60px;
  text-align: center;
  font-size: 14px;
  color: #333;
  line-height: 60px;
}
.sys_message{
  float: right;
  cursor: pointer;
  width: 40px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}
/* .sys_message .fa{
  font-size: 18px;
} */
.lgout{
  float: right;
  cursor: pointer;
  width: 120px;
  padding-left: 40px;
  height: 30px;
  text-align: center;
  font-size: 14px;
  color: #333;
  line-height: 60px;
}
</style>