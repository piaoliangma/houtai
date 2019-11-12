<template>
  <div :class="isCollapse ? 'slidebar active-slidebar' :'slidebar'">
      <el-menu default-active="0" 
      :unique-opened='true'
      :class="isCollapse ? 'el-menu-vertical-demo active-menu' :'el-menu-vertical-demo' " 
      mode="vertical"
      @open="handleOpen" 
      @close="handleClose" :collapse="isCollapse" :router='true'  background-color='#E6EEF4'>
      <div v-for="(item,index) in sider_menu_data" :key="index">
          <el-submenu  v-if="'children' in item"   :index="item.path" >
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item  v-for="(v,i) in item.children" :index="v.path" :key="i">{{v.title}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-menu-item v-else :index="item.path" >
            <i :class="item.icon"></i>
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
       </div>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  components:{},
  props:{},
  data(){
    return {
      clickIndex:"",
      sider_menu_data: [],
      isCollapse:false
    }
  },
  watch:{},
  computed:{
    ...mapGetters([
      'userRouters','getUserInfo'
    ])
  },
  methods:{
    handleOpen(){

    },
    handleClose(){

    },
    handleRouter(){
       
    }
  },
  created(){},
  mounted(){
    setTimeout(()=>{
       this.sider_menu_data = this.userRouters
    },300)
    this.$EventBus.$on('changeMenu',()=>{
      this.isCollapse = !this.isCollapse
    })
    // setInterval(()=>{
    //   console.log('拉取数据')
    //   console.log(this.userRouters)
    //   this.sider_menu_data = this.userRouters
    // },1000)
  }
}
</script>
<style lang='scss' scope="">
.fa{
  font-size: 14px;
  color: #000;
}
.slidebar{
  width: 200px;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  border-top-right-radius: 5px;
  position: fixed;
  top: 60px;
  left: 0;
  background-color: #E6EEF4;
}
::-webkit-scrollbar {display:none}
.active-slidebar{
  width: 65px;
}
.active-menu span{
  display:none;
}
.active-menu i.el-submenu__icon-arrow{
  display: none;
}
.el-menu,.el-submenu{
  text-align: left;
  background-color: transparent;
}
.active-menu .el-submenu,.active-menu .el-menu-item{
  text-align: center;
}

.el-submenu .el-menu-item{
  min-width: 155px;
}
.menu-one-item{
  font-size: 16px;
  color: #ff929a;
  text-align: center;
}
.menu-two-item{
  text-align: left;
}
</style>