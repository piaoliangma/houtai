<template>
  <div class="atricle">
    <div class="title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/atricle/list' }">文章列表</el-breadcrumb-item>
        <el-breadcrumb-item>添加文章</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    
    <el-form ref="ruleForm" class="add-main"  :model="form" :rules="rules"  label-width="80px">
  <el-form-item label="文章标题" prop="atricle_name">
    <el-input v-model="form.atricle_name" style="width:400px"></el-input>
  </el-form-item>
  <el-form-item label="文章简介" prop="atricle_jianjie">
    <el-input v-model="form.atricle_title" style="width:400px"></el-input>
  </el-form-item>
  <el-form-item label="发表平台" prop="region">
    <el-select v-model="form.region" placeholder="请选择发表平台">
      <el-option label="个人博客" value="1"></el-option>
      <el-option label="第三方平台" value="2"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="文章时间" prop="date">
    <el-date-picker
      v-model="form.date"
      type="datetime"
      value-format='yyyy-MM-dd HH:mm:ss'
      placeholder="选择日期时间"
      default-time="10:30:00">
    </el-date-picker>
  </el-form-item>
  <el-form-item label="立即显示">
    <el-switch v-model="form.delivery"></el-switch>
  </el-form-item>
  <el-form-item label="上传图片">
    <el-upload
    class="upload-demo"
    action="/api/upload/upfile"
    :on-preview="handlePreview"
    multiple
    :file-list="fileList">
    <el-button size="small" type="primary">点击上传</el-button>
  </el-upload>
  </el-form-item>
  <el-form-item>
    <quillEditor
        class="editer"
        v-model="form.content" 
        ref="myQuillEditor" 
        :options="{}" 
        @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
        @change="onEditorChange($event)">

    </quillEditor>
  </el-form-item>
  <el-form-item class="btn_list">
    <el-button type="primary" @click="onSubmit('ruleForm')">立即发布</el-button>
   <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
  
</el-form>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor';
export default {
  components:{quillEditor,},
  props:{},
  data(){
    return {
        form: {
          atricle_name: '',
          atricle_title:'',
          region: '',
          date: '',
          delivery: false,
          content:'',
        },
        fileList:[],
        rules:{
            atricle_name:[
                {required:true,message:'请输入文章标题',trigger:'blur'}
            ],
            atricle_title:[
              {required:true,message:'请输入文章标题',trigger:'blur'}
            ],
            region:[
                {required:true,message:'请输入文章发布平台',trigger:'change'}
            ],
            date:[
                {required:true,message:'请选择日期', trigger: 'change' }
            ],
            content:[
                {required:true,message:'请输入文章主要内容',trigger: 'blur'}
            ],
        }

    }
  },
  watch:{},
  computed:{
        editor() {
            return this.$refs.myQuillEditor.quill;
        },
  },
  methods:{
    onSubmit(formName) {
       this.$refs[formName].validate((valid) => {
          if (valid) {
            var _this = this;
            this.$http.post('addAtricle',this.form).then(res=>{
              setTimeout(function(){
                  _this.$router.push('/atricle/list')
              },700)
            })
          } else {
            return false;
          }
        });
    },
    resetForm(formName){
       this.$refs[formName].resetFields();
    },
    onEditorReady(editor) { // 准备编辑器

    },
    onEditorBlur(){}, // 失去焦点事件
    onEditorFocus(){}, // 获得焦点事件
    onEditorChange(){}, // 内容改变事件
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    goBack(){

    }
  },
  created(){},
  mounted(){}
}
</script>
<style lang="scss" scoped>
.atricle{
    width: 900px;
    height: auto;
    overflow: hidden;
    .title{
      height: 40px;
    }
    .add-main{
      padding-left: 65px;
    }
}
.editer{
    height: auto;
    overflow-y: scroll;
}
.btn_list{
  width: 100%;
  height: 40px;
  overflow: hidden;
}
</style>