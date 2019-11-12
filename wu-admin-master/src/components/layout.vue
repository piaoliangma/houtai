<template>
  <div class="root">
    <Header @handerleft="contentLeft"></Header>
    <Slidebar></Slidebar>
    <div :class="isCollapse ? 'content' : 'content transition-left'">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from '@/components/header'
import Slidebar from '@/components/slidebar'
import {localStorage} from '@/assets/js/storage/index'
export default {
  components:{
    Header,Slidebar
  },
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Wu-admin',
      isCollapse:true,
    }
  },
  methods:{
      contentLeft(){
         this.isCollapse = !this.isCollapse
      }
  },
  created(){
    //在页面加载时读取localStorage里的状态信息
      localStorage.getItem("userinfo") && this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(localStorage.getItem("userinfo"))));
      this.$store.dispatch('GenerateRoutes',{}).then()
      window.addEventListener("beforeunload",()=>{
          localStorage.setItem("userinfo",JSON.stringify(this.$store.state))  
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content{
  width: calc(100% - 210px);
  height: 100%;
  overflow-y: scroll;
  box-sizing: border-box;
  border-radius:5px;
  position: fixed;
  padding: 20px;
  padding-bottom: 50px;
  left: 210px;
  top: 60px;
  background-color: #E6EEF4;
  -webkit-transition: .5s;
  transition:.5s;
}
.transition-left{
  width: calc(100% - 73px);
  left: 73px;
}
.root{
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-image: linear-gradient(120deg, #a1C4FD 0%, #C2E9FB 100%);
}
</style>
