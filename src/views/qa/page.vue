<template>
  <div class="app-container">
  
  <el-row style="margin:10px 0;">
    <el-button type="primary" plain>添加问题</el-button>
  </el-row>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95" prop="id">
     
      </el-table-column>
      <el-table-column label="Question" prop="question"></el-table-column>
      <el-table-column align="center"  label="Actions" width="250">
         <template slot-scope="scope">
    
        <el-button @click="showInfo(scope.row.id)" type="info" size="small">查看</el-button>
        <el-button type="primary" size="small" @click="editInfo(scope.row.id)">编辑</el-button>
        <el-button type="danger" size="small" @click="deleteWarn(scope.row.id)">删除</el-button>
      </template>
      </el-table-column>
    </el-table>
  <el-pagination
  :page-size="pageSize"
  :pager-count="11"
  layout="prev, pager, next"
 @current-change="handleCurrentChange"
  :total="total">
</el-pagination>
  </div>
</template>

<script>
import { getList,deleteQa } from '@/api/qa'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      total:0,
      pageSize:10,
      page :1,
      dialogStatus: "",
      dialogFormVisible: false,
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleCurrentChange(page){  
      this.fetchData(page)
    },
    fetchData(page=1) {
      this.page = page
      this.listLoading = true
      getList({page:page, pageSize:this.pageSize}).then(response => {
        this.list = response.data.Data
        this.listLoading = false
        this.total = response.data.total
      })
    },
    showInfo(id){
       this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    editInfo(id){
        console.log(id);
    },
    deleteWarn(id){
         this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteQa(id).then((resp)=>{
              if(resp.code == 200){
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.fetchData(this.page)
              }else{
                this.$message({
                  type: 'error',
                  message: '删除失败!'+resp.message
                });
              }
          });
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
  }
}
</script>
