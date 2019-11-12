<template>
  <div class="wrapper">
      <div class="title">远程预览{{msg}}</div> 
      <div  class="yincang">
	      <el-upload
	        class="upload-demo"
	        drag
	        action="/api/upload/upfile"
	        :on-success="uploadSuccess"
	        multiple>
	        <i class="el-icon-upload"></i>
	        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
	        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
	      </el-upload>
	
      </div>
      <div class="flex">
      		 <el-input class="html_url"   v-model='html_url' ></el-input>
      		 <el-button type="primary" 
                 v-bind:disabled="html_url == ''" 
                 v-clipboard:copy="html_url" 
                 v-clipboard:success="onCopy"  
                 >复制</el-button> 
      </div>
      <div class="video-box" id="videoBox">
          <el-button type="primary"    @click="captureImage">生成视频封面图</el-button> 
          <video v-show="videoSrc" :src="videoSrc" id="video"></video>
      </div>
      

      
  </div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
        msg:'html',
        html_url:'',
        videoSrc:""
    
    }
  },
  watch:{},
  computed:{},
  methods:{
    uploadSuccess(res,file){//上传成功后执行
      this.html_url=res.data;
    },
    onCopy(){//复制成功的回调
      this.$message({
        message:"复制成功",
        type:'success',
      })
    },
    captureImage(){
      var scale = 0.8;
      var video = document.getElementById('video');
      var imgbox = document.getElementById('videoBox');
      this.videoSrc = this.html_url;
      var canvas = document.createElement("canvas");//创建一个canvas
      canvas.width = video.videoWidth * scale;//设置canvas的宽度为视频的宽度
      canvas.height = video.videoHeight * scale;//设置canvas的高度为视频的高度
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);//绘制图像
      var img = document.createElement("img");//创建img
      img.src = canvas.toDataURL("image/png");//将绘制的图像用img显示出来
      imgbox.appendChild(img);//将img添加到imgbox里
    }
  },
  created(){},
  mounted(){
    
  }
}
</script>
<style lang="scss">
$color:red;
.title{
  color:$color;
}
.flex{
	width: 360px;
	display: flex;
	justify-content:space-between;
	line-height: 30px;
}


.upload-demo{
  margin: 20px auto;
  float: left;
}
.code{
  float: left;
  margin-top: 20px;
  margin-left: 100px;
 	position: relative;
  width: 180px;
  height: 180px;
 img{
  	margin-bottom: 10px;
  	position: absolute;
  	top: 0;
  	opacity: 0;
  }
 img:last-child{
 	opacity: 1;
 }
}
.yincang{
	overflow: hidden;
	
}
.video-box{
  width: 360px;
  height: auto;
  margin-top: 20px;
}
.video-box .el-button{
  width: 100%;
}
</style>