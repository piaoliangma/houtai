<template>
  <div class="wrapper">
     node实验室
     <div class="up_div">
     	<Cirle></Cirle>
     </div>
     
  </div>
</template>

<script>
import Cirle from '@/pages/laboratory/circle'
export default {
  components:{Cirle},
  props:{},
  data(){
    return {
     
    }
  },
  watch:{},
  computed:{},
  methods:{
    changeinput(num){
       //console.log(num)
       //console.log(this.$refs.psdinput.parentNode.children[num].value)
       if (this.$refs.psdinput.parentNode.children[num].value == "") {
         if(num!=0)this.$refs.psdinput.parentNode.children[num-1].focus()
       } else {
         if(num<2)this.$refs.psdinput.parentNode.children[num+1].focus()
       }
    },
    updatabtn(){
    
    }
  },
  created(){},
  mounted(){
  }
}
</script>
<style >
.wrapper{}
.up_div{
	width: 800px;
	display: flex;
	justify-content:space-between;
	}
	.up_div .el-progress__text{
		/*color: red;*/
	}
.gress{
	margin: 10px auto;
	width: 250px;
}



.upbtn{
	padding: 9px 15px;
	font-size: 12px;
	margin: 10px 0px;
}
.up_div_r{
	
}



</style>