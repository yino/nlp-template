<template>
  <div class="app-container">
  <el-row>
    <el-button type="primary" round>添加问题</el-button>
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
      <el-table-column align="center"  label="operation" width="200">
         <template slot-scope="scope">
        <el-button @click="showInfo(scope.row.id)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small" @click="editInfo(scope.row.id)">编辑</el-button>
        <el-button type="text" size="small" @click="deleteWarn(scope.row.id)">删除</el-button>
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
import { getList } from '@/api/qa'

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
      this.listLoading = true
      getList({page:page, pageSize:this.pageSize}).then(response => {
        this.list = response.data.Data
        this.listLoading = false
        this.total = response.data.total
      })
    },
    showInfo(id){
        console.log(id);
    },
    editInfo(id){
        console.log(id);
    },
    deleteWarn(id){
        console.log(id);
    },
  }
}
</script>
