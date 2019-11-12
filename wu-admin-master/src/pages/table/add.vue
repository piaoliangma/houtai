<template>
  <div class="wrapper">
      <div class="" @click="handerclick()">{{ msg }}</div>
      <slot></slot>
      <slot name="two"></slot>
  </div>
</template>

<script>
export default {
  components:{},
  props:{
      msg:String
  },
  data(){
    return {
  
    }
  },
  watch:{},
  computed:{},
  methods:{
    handerclick(){
        this.$emit('listenevent',{a:1})
    }
  },
  created(){
      this.$EventBus.$on('changeMe',(a)=>{
          console.log(a)
      })
    //   组件通信总结1:通过vuex 全局仓库进行通信
    //             2:通过组件传值，限父子组件，props传值
    //             3:通过事件线程 首先：在全局建立vue事件总线程，
    //                               发射事件eventbus.$emit('事件名',{发送的数据}) 
    //                               接受事件eventbus.$on('事件名',callback回掉函数)  
    //                               移除事件监听EventBus.$off('事件名') 如果不传值则移除所有
  },
  mounted(){}
}
</script>
<style lang="scss" scoped>
.wrapper{}
</style>