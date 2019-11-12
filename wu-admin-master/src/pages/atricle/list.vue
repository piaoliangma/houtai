<template>
  <div class="atricle_list">
    <div class="title-main">
      <el-button type="primary" icon="el-icon-plus" @click="addAtrcle">添加文章</el-button>
    </div>
    <div class="table-main">
      <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="time"
      label="发布日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="atr_name"
      label="文章标题">
    </el-table-column>
    <el-table-column
      prop="atr_title"
      label="副标题">
    </el-table-column>
    <el-table-column
      label="操作"
      width="200">
      <template slot-scope="scope">
        <el-button @click="handleEdit(scope.row)" type="success" size="small">编辑</el-button>
        <el-button @click="handleDelete(scope.$index, scope.row)" type="danger" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
 
    </div>
     <el-pagination
     class="pagination"
    background
    layout="prev, pager, next"
    @current-change="changepage"
    :total="count">
  </el-pagination>
     
  </div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
      tableData:[],
      search: '',
      count:0,
    }
  },
  watch:{},
  computed:{},
  methods:{
    addAtrcle(){
      this.$router.push('/atricle/add')
    },
    getArticleList(page){
      this.$http.post('/getAtricle',{page:page || 1}).then((res)=>{
         this.tableData = res.data;
         this.count     = res.count;
      })
    },
    handleEdit(row) {
      console.log(row.id)
      var id = row.id
      this.$router.push({path:'/atricle/edit',query:{id}})
    },
    handleDelete(index, row) {
      this.$confirm('此操作将永久文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post('/deleteAricle',{id:row.id}).then((res)=>{
          this.getArticleList()
          this.$message({
            type: 'success',
            message: '删除成功'
          });          
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    changepage(page){
      console.log(page)
      this.getArticleList(page)
    }
  },
  created(){},
  mounted(){
    this.getArticleList()
  }
}
</script>
<style lang="scss" scoped>
.title-main{
  margin-bottom: 20px;
}
.table-main{
  background-color: white;
  padding:  20px;
}
.pagination{
  float: right;
  margin-top: 20px;
  margin-bottom: 40px;
}
</style>