<template>
  <div class="wrapper">
    <el-row class="btn-list">
      <el-button @click="saveAuth()" type="primary">保存</el-button>
      <el-button  type="danger" @click="openeldiago()">增加</el-button>
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
      <div class="right">
        <el-tree
           ref="tree"
          :data="jurList"
          show-checkbox
          node-key="id"
          :current-node-key="currentKey"
          :default-checked-keys="jurId"
          :props="authProps">
        </el-tree>
      </div>
    </div>
    <el-dialog title="增加权限" :visible.sync="dialogFormVisible"  :modal-append-to-body='false'>
          <Addjur @listencloseldiago="closeldiago"></Addjur>
    </el-dialog>
    
  </div>
</template>

<script>
import {renderMenu} from '@/assets/js/prototype.js'
import Addjur from './addjur'
export default {
  components:{Addjur},
  props:{},
  data(){
    return {
      treeList:[],
      treeId:"",
      defaultProps: {
        children: 'children',
        label: 'name',
      },
      jurList:[],
      authProps:{
        children:'children',
        label:'title'
      },
      // 权限树是自己1:父级2
      authStatus:[],
      jurId:[],
      currentKey:'',
      dialogFormVisible:false,
    }
  },
  watch:{
    // authStatus(val){
    //   val == 1 ? this.jurList.map((v)=>{this.jurId.push(v.id)}) : this.jurId = []
    // }
  },
  computed:{},
  methods:{
    handleNodeClick(e,v){
      this.treeId = e.id;
       this.getRoleAuth(e.id,v.data.parent_Id)
     },
    //生成树结构
    renderTree(textArr){
        textArr.map((v,i)=>{
          v.children ? "" : textArr[i].children = []
        });
        for (let i = 0; i < textArr.length; i++) {
            for (let j = 0; j < textArr.length; j++) {
                if (textArr[i].id == textArr[j].parent_Id) {
                    textArr[i].children.push(textArr[j])
                }
            }
            
        };
        textArr.map((v,i)=>{
            if (v.children.length == 0) {
                delete textArr[i]
            }
        });
        textArr = textArr.notempty();
        let linarr = [];
        textArr.forEach(e=>{
            e.parent_Id == null ? linarr.push(e) : ""
        });
        return linarr.length == 1 ? linarr[0] : linarr
     },
     //得到角色表
     getRole(){
        this.$http.post('/getRole').then((res)=>{
          //生成树结构
          this.treeList = [this.renderTree(res.data)]
        })
     },
     //拉取权限数据
     getRoleAuth(id,parent_Id){
        parent_Id = parent_Id || ""
        this.$http.post('/getRoleAuth',{id:id,parent_Id:parent_Id}).then(res=>{
          if (res.data.parent.length == 0) {
            let menuList = renderMenu(res.data.me);
            menuList.map((v)=>{this.jurId.push(v.id)})
            console.log(menuList)
            this.jurList = menuList;
          } else {
            this.jurId = []
            let menuList = renderMenu(res.data.parent);
            if (res.data.me.length >0) {
              res.data.me.map((v)=>{
                if (v.level.split('_')[1] != undefined) {
                  this.jurId.push(v.id)
                }
              })
            } else {
              this.jurId = [];
            }
            this.jurList = menuList;
          }
        })
     },
     //生成权限数据交给node端保存
     saveAuth(){
        let auth_id = this.$refs.tree.getCheckedNodes(false,true);
        auth_id = auth_id.map(v=>v.id) // 权限id集；
        var param = {
          auth_id:auth_id.join(','),
          role_id:this.treeId
        } 
        this.$http.post('/update/auth',param).then(res=>{
          this.$message({
            type:'success',
            message:'添加成功'
          })
        })
     },
     openeldiago(){
       this.dialogFormVisible = true
     },
     closeldiago(){
       this.dialogFormVisible = false
     }
  },
  created(){},
  mounted(){
    this.getRole()
  }
}
</script>
<style lang="scss" scoped>
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
  float: left;
  margin-right: 50px;
}
.main .left .el-tree{
  width: 100%;
  min-height: 400px;
}
.main .right{
  width: 300px;
  height: 200px;
  float: right;
  border-radius: 10px;
  background-color: #f7bc4a;
  position: relative;
  .el-tree{
    width: 100%;
    height: 200px;
  }
}
</style>