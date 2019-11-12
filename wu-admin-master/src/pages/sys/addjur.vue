<template>
  <div class="wrapper">
<!-- 增加角色 -->
        <el-form :model="form"  :rules="rules" ref="form" hide-required-asterisk>
        <el-form-item label="权限名称:" prop="title" label-width="80px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限标识:" prop="path" label-width="80px" >
          <el-input v-model="form.path" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="菜单等级:" prop="level" label-width="80px">
            <el-select v-model="form.selectvalue" placeholder="请选择" @change="selectChange">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item v-show="auth_status" label="权限列表:" prop="auth_level" label-width="80px">
            <el-select v-model="form.auth_value" placeholder="请选择">
                <el-option
                v-for="item in auth_list"
                :key="item.id"
                :label="item.title"
                :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeWin()">取 消</el-button>
        <el-button type="primary" @click="addAuth()">确 定</el-button>
      </div>
  </div>
</template>

<script>
export default {
  components:{},
  props:['eldiago'],
  data(){
    return {
        form:{
            title:"",
            path:"",
            selectvalue:"",
            auth_value:""
        },
        rules:{
          title:[
            {require:true,message:'请输入昵称',trigger:'blur'},
          ],
          path:[
            {require:true,message:'请输入登陆账号',trigger:'blur'}
          ],
          selectvalue:[
            {require:true,message:'请输入菜单等级',trigger:'blur'}
          ],
        },
        dialogFormVisible:true,
        options:[
            {
                label:'一级菜单',
                value:'1',
            },
            {
                label:"二级菜单",
                value:"2"
            }
        ],
        auth_status:false,
        auth_list:[],
    }
  },
  watch:{},
  computed:{},
  methods:{
      getAuthList(){
        this.$http.post('add/watch').then(res=>{
            var dt = res.data;
            var newList = []
            dt.map(v=>{
                if (v.level.split('_').length == 1) {
                    newList.push(v)
                }
            })
            this.auth_list = newList
        })
      },
      selectChange(e){
          e == 2 ? this.auth_status = true : this.auth_status = false
      },
      closeWin(){
          this.$emit("listencloseldiago")
      },
      addAuth(){
        var _this  = this
        this.$http.post('/add/auth',this.form).then(res=>{
            _this.closeWin()
        })
      },
      
  },
  created(){},
  mounted(){
      this.getAuthList()
  }
}
</script>
<style lang="scss" scoped>
.wrapper{}
</style>