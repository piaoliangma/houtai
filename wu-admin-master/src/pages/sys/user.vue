<template>
  <div class="wrapper">
    <el-row class="btn-list">
      <el-button type="primary">增加</el-button>
      <el-button type="danger">删除</el-button>
    </el-row>
    <div class="main">
      <div class="left">
        <el-tree
          :data="treeList"
          :props="defaultProps"
          accordion
          @node-click="handleNodeClick">
        </el-tree>
      </div>
      <transition name="el-fade-in-linear">
        <div class="right transition-box" v-show="roleinfo.name">
            <img :src="'http://wuliang666.com:88'+roleinfo.header_img" alt="">
            <div class="right-list">
              <div class="item">
                <span>昵称:</span>
                <span>{{roleinfo.name}}</span>
              </div>
              <div class="item">
                <span>年龄:</span>
                <span>{{roleinfo.age}}</span>
              </div>
              <div class="item">
                <span>账号:</span>
                <span>{{roleinfo.user_account}}</span>
              </div>
            </div>
            <el-row class="role-btn">
              <el-button type="primary" @click="dialogFormVisible = true">增加下级角色</el-button>
              <el-button v-show="roleinfo.user_account !='admin' && roleinfo.children == 0" type="info" @click="deleteRole(roleinfo.id)">删除</el-button>
              <el-button v-show="roleinfo.user_account !='admin'" type="danger" @click="resetpsd(roleinfo.id)">重置密码</el-button>
              <el-button v-show="roleinfo.user_account !='admin'" type="danger" @click="notAllowLogin(roleinfo.id,roleinfo.is_login)">{{roleinfo.is_login==1?'禁止登录' :'允许登录' }}</el-button>
            </el-row>
        </div>
      </transition>
    </div>
    <!-- 增加角色 -->
    <el-dialog title="增加角色" :visible.sync="dialogFormVisible"  :modal-append-to-body='false'>
        <el-form :model="form"  :rules="rules" ref="form" hide-required-asterisk>
        <el-form-item label="角色昵称:" prop="name" label-width="80px">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色账号:" prop="account" label-width="80px" >
          <el-input v-model="form.account" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRole('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import '@/assets/js/prototype.js'
export default {
  components:{},
  props:{},
  data(){
    var checkAccount = (rule, value, callback) => {
      var reg = /^[0-9a-zA-Z]+$/;
      if (!reg.test(value)) {
        return callback(new Error('请输入数字或字母'));
      }else{
        callback()
      }
    };
    return {
        treeList:[],
        defaultProps: {
          children: 'children',
          label: 'name',
        },
        roleinfo:{},
        form:{
          name:"",
          account:'',
        },
        
        rules:{
          name:[
            {require:true,message:'请输入昵称',trigger:'blur'},
          ],
          account:[
            {require:true,message:'请输入登陆账号',trigger:'blur'},
            {min:4,max:11,message:'长度在4到11个字符',trigger:'blur'},
            { validator: checkAccount, trigger: 'blur' }
          ]
        },
        dialogFormVisible:false
    }
  },
  watch:{},
  computed:{},
  methods:{
     handleNodeClick(e){
       this.roleinfo = e
     },
     //生成树结构
     renderTree(textArr){
        textArr.map((v,i)=>{v.children ? "" : textArr[i].children = []});
        for (let i = 0; i < textArr.length; i++) {
            for (let j = 0; j < textArr.length; j++) {
                if (textArr[i].id == textArr[j].parent_Id) {
                    textArr[i].children.push(textArr[j])
                }
            }
            
        };
        textArr.map((v,i)=>{v.children.length == 0 ? delete textArr[i]:''});
        textArr = textArr.notempty();
        let linarr = [];
        textArr.forEach(e=>e.parent_Id == null ? linarr.push(e) : "");
        return linarr.length == 1 ? linarr[0] : linarr
     },
     //得到角色表
     getRole(){
        this.$http.post('/getRole').then((res)=>{
          //生成树结构
          this.treeList = [this.renderTree(res.data)]
        })
     },
     //增加下级角色
     addRole(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('/checkAccount',{account:this.form.account}).then((res)=>{
                if (res.status == 200) {
                  let currentRole = {
                    user_account:this.form.account,
                    parent_Id :this.roleinfo.id,
                    name:this.form.name
                  }
                  this.$http.post('/addRole',currentRole).then(res=>{
                    if (res.status == 200) {
                      this.getRole()
                      this.dialogFormVisible = false
                      this.$message({
                        type: 'success',
                        message: '添加成功!'
                      });
                    }
                  })
                } else {
                  alert('账号已被注册，请重新输入')
                  this.form.account = ""
                }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
     },
     //删除角色
     deleteRole(id){
       this.$confirm('此操作将永久删除该账号, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('/deleteRole',{id:id}).then(res=>{
            if (res.status == 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getRole()
            } else {
              this.$message({
                type: 'info',
                message: '删除失败'
              }); 
            }
          })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
     },
     //重置密码
     resetpsd(id){
       this.$confirm('此操作将重置密码为123456, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('/resetPsd',{id:id}).then(res=>{
            if (res.status == 200) {
              this.$message({
                type: 'success',
                message: '重置成功!'
              });
              this.getRole()
            } else {
              this.$message({
                type: 'info',
                message: '重置失败'
              }); 
            }
          })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消重置'
          });          
        });
     },
     //禁止登录
     notAllowLogin(id,is_login){
        is_login = (is_login==1 ? '0' : '1')
        this.$http.post('/notAllowLogin',{id:id,is_login:is_login}).then(res=>{
          if (res.status == 200) {
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
            this.roleinfo.is_login = is_login
            this.getRole()
          } else {
            this.$message({
              type: 'info',
              message: '操作失败'
            }); 
          }
        })
     }

  },
  created(){},
  mounted(){
    this.getRole()
  }
}
</script>
<style  scoped>
.wrapper{
  padding: 20px;
}
.box2{
  width: 200px;
  height: 200px;
  background-color: red;
}
.box1{
  width: 400px;
  height: 400px;
  background-color: blue;
}
.main{
  width: 100%;
  display: flex;
  
  justify-content: flex-start;
}
.main .left{
  width: 155px;
  height: auto;
  margin-right: 50px;
}
.main .left .el-tree{
  width: 100%;
  min-height: 400px;
}
.main .right{
  width: 460px;
  height: 200px;
  border-radius: 10px;
  background-color: #f7bc4a;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
}
.main .right img{
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.main .right .right-list{
  width: 200px;
}
.main .right .right-list .item{
  width: 100%;
  display: flex;
  margin-bottom: 20px;
}
.main .right .right-list .item:last-child{
  margin-bottom: 0;
}
.main .right .right-list .item span:first-child{
  display: block;
  width: 60px;
  text-align: left;
  font-size: 14px;
  color: #999;
}
.main .right .right-list .item span:last-child{
  display: block;
  width: 100%;
  font-size: 14px;
  color: #333;
}
.main .right .role-btn{
  display: block;
  width: 100%;
  position: absolute;
  bottom: -50px;
  left: 0;;
}
</style>