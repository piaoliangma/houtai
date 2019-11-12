<template>
		<div class="up_div_l">
			<img src="../../assets/image/343.jpg" :class="{img_cir:cir_img,img_cir_pas:is_pas}" alt="" />
			<el-progress :percentage="jind" :text-inside="true" class="gress"  :stroke-width="18"></el-progress>
			<el-button type="primary" v-bind:disabled="jind==100" class="upbtn"  @click="updatabtn">更新</el-button> 
			<el-button type="primary" class="upbtn"  v-bind:disabled="jind==100" @click="uppase">暂停</el-button> 
		</div>
	
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
      jind:0,
      timer:null,
      timer_speed:100,
     cir_img:false,
     is_pas:false
    }
  },
  watch:{},
  computed:{},
  methods:{
    updatabtn(){
    	clearTimeout(this.timer);
    	this.timer=setTimeout(()=>{
    		this.jind++;
    	  this.cir_img=true;
    	  this.is_pas=false;
    		if(this.jind==40){this.timer_speed=300;}
			if(this.jind==60){this.timer_speed=400;}
			if(this.jind==90){this.timer_speed=1000;}
    		if(this.jind==100){clearTimeout(this.timer);this.timer=null; this.cir_img=false;return;}
    		this.updatabtn();
    	},this.timer_speed)
    	this.timer1=setInterval(()=>{
    		this.degrot=this.degrot+360;
    	},1000)
    },
    uppase(){
    	
    	clearTimeout(this.timer);
    	this.is_pas=true;
    }
  },
  created(){},
  mounted(){}
}
	
</script>
<style>
	
.gress{
	margin: 10px auto;
	width: 250px;
}
.up_div_l{
	text-align: center;
	width: 400px;
	display: inline-block;
}
.up_div_l>img{
	border-radius: 50%;
	width: 250px;
	transition-duration:2s;
	transform-origin:50% 50%;
}
.img_cir{
	animation:zhuanquan 2s linear infinite;
}
.img_cir_pas{
animation-play-state:paused;
-webkit-animation-play-state:paused; 
}

@keyframes zhuanquan{
	from{transform: rotate(0deg);}
	to{transform: rotate(360deg);}
}
	
	
</style>