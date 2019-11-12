<template>
  <div class="atricle-type">
    <el-button type="primary" plain @click="openClass">增加分类</el-button>
    <div class="tabel">
        <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
            prop="id"
            label="数据库唯一标示"
            width="180">
        </el-table-column>
        <el-table-column
            prop="type_name"
            label="类型名称"
            width="180">
        </el-table-column>
        <el-table-column
            prop="address"
            label="地址">
        </el-table-column>
        </el-table>
    </div>
    <el-dialog
        title="添加类型"
        :visible.sync="dialogVisible"
        width="30%"
        center
        :append-to-body = true>
        <el-input
        placeholder="请输入类型名称"
        v-model="inputVal"
        clearable>
        </el-input>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addType()">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
        tableData: [],
        dialogVisible:false,
        inputVal:""
    }
  },
  watch:{},
  computed:{},
  methods:{
    openClass(){
        this.dialogVisible = true;
    },
    //添加类型
    addType(){
        var _this = this;
        this.$http.post('/addAtricleType',{type_name:_this.inputVal}).then(res => {
            this.dialogVisible = false;
            if(res.status == 200){
                this.$message({
                    message:"添加成功",
                    type:'success',
                })
                this.getType();
            }
        })
    },
    //查看类型
    getType(){
        this.$http.post('/getAtricleList',{}).then(res => {
            this.tableData = res.data;
        })
    },
    //编辑类型
    editType(){

    },
  },
  created(){},
  mounted(){
      this.getType()
  }
}
</script>
<style lang="scss" scoped>
.tabel{
    width:100%;
    height: auto;
    margin-top: 20px;
    background-color: green;
    overflow: hidden;
    border-radius: 10px;
    padding-left: 20px;
    box-sizing: border-box;
    padding-right: 20px;
}
</style>