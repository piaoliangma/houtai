<template>
  <div class="wrapper">
      <div class="" @click="emitevent">子父组件通信点击发送eventBus一个事件</div>
      <Addmessage msg="父组件" @listenevent="myevent">
        <span>你好</span>
        <!-- <div slot="two">2号插槽</div> -->
        <template slot="two" slot-scope="">
          <h1>Here might be a page title</h1>
        </template>
      </Addmessage>
      ~~~~~~~~~~~~
      <img :src="imgSrc" alt="">
  </div>
</template>

<script>
import Addmessage from '@/pages/table/add'
export default {
  components:{Addmessage,},
  props:{},
  data(){
    return {
       imgSrc:require("@/assets/image/newlogo.png")
      //imgSrc:"../../assets/image/newlogo.png"
    }
  },
  watch:{},
  computed:{},
  methods:{
    myevent(dt){
      console.log(dt)
    },
    emitevent(){
      this.$EventBus.$emit('changeMe',{name:'父组件发送中'})
    }
  },
  created(){},
  mounted(){}
}
</script>
<style scoped>
.wrapper{}
</style>