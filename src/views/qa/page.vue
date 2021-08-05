<template>
  <div class="app-container">
    <el-row style="margin: 10px 0">
      <el-button type="primary" plain @click="add()">添加问题</el-button>
      <el-button type="info" plain @click="trainModel()" :loading="trainButton.loading">训练模型</el-button>
      <el-button type="info" plain @click="clieckTestDialogue" :disabled="qaModelStatus">测试对话</el-button>
    </el-row>
    <!-- table -->
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
      <el-table-column align="center" label="Actions" width="250">
        <template slot-scope="scope">
          <el-button @click="showInfo(scope.row.id)" type="info" size="small">查看</el-button>
          <el-button type="primary" size="small" @click="editInfo(scope.row.id)">编辑</el-button>
          <el-button
            type="danger"
            size="small"
            @click="deleteWarn(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->

    <el-pagination
      :page-size="pageSize"
      :pager-count="11"
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :total="total"
    >
    </el-pagination>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogFormVisible"
      center
      :append-to-body="true"
      :lock-scroll="false"
      width="60%"
    >
      <QaForm
        @submitSuccess="submitRollback"
        :type="dialogType"
        :id="selectId"
      ></QaForm>
    </el-dialog>

    <el-dialog :title="testDialogue.maskTitle" :visible.sync="testDialogue.maskShow" center :append-to-body="true" :lock-scroll="false" width="60%">
        <Dialogue @dialogueSend="dialogueSendRollback" :contentList="testDialogue.contentList"></Dialogue>
    </el-dialog>
  </div>
</template>

<script>
import { getList, deleteQa, train, match } from '@/api/qa'
import QaForm from '@/components/Qa/form.vue'
import Dialogue from '@/components/Dialogue'
import { getInfo } from '@/api/user'
import { getToken } from '@/utils/auth'
export default {
  components: {
    QaForm,
    Dialogue
  },
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
      total: 0,
      pageSize: 10,
      page: 1,
      dialogStatus: '',
      dialogFormVisible: false,
      dialogTitle: '添加',
      dialogType: 'add',
      selectId: 0,
      qaModelStatus: true,
      trainButton: {
        loading: false
      },
      testDialogue: {
        maskShow: false,
        maskTitle: '',
        contentList: []
      }
    }
  },
  created() {
    this.fetchData()
    this.checkIsQaModel()
  },
  methods: {
    handleCurrentChange(page) {
      this.fetchData(page)
    },
    fetchData(page = 1) {
      this.page = page
      this.listLoading = true
      getList({ page: page, pageSize: this.pageSize }).then((response) => {
        this.list = response.data.Data
        this.listLoading = false
        this.total = response.data.total
      })
    },
    showInfo(id) {
      this.selectId = id
      this.dialogTitle = '详情'
      this.dialogType = 'info'
      this.dialogFormVisible = true
    },
    add() {
      this.dialogType = 'add'
      this.dialogTitle = '添加'
      this.dialogFormVisible = true
      this.selectId = 0
    },
    editInfo(id) {
      this.selectId = id
      this.dialogTitle = '编辑'
      this.dialogType = 'edit'
      this.dialogFormVisible = true
    },
    deleteWarn(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          deleteQa(id).then((resp) => {
            if (resp.code == 200) {
              this.$message({
                type: 'success',
                message: '删除成功!',
              })
              this.fetchData(this.page)
            } else {
              this.$message({
                type: 'error',
                message: '删除失败!' + resp.message
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    submitRollback(ok) {
      if (ok) {
        this.dialogFormVisible = false;
        this.fetchData(1);
      }
    },
    checkIsQaModel(){
      getInfo(getToken()).then((res=>{
          if(res.data.qa_model_status == 1){
            this.qaModelStatus = false;
          }
      }));
    },
    trainModel(){
      this.trainButton.loading = true
      train().then((res)=>{
        if(res.code == 200){
           this.$message("success!");
           this.qaModelStatus = false;
        }else{
           this.$message({
              message: resp.message,
              type: "error",
            });
        }
        this.trainButton.loading = false
      })
    },
    clieckTestDialogue(){
      this.testDialogue.maskTitle = "测试对话";
      this.testDialogue.maskShow = true;
    },
    dialogueSendRollback(question){
      
      this.testDialogue.contentList.push({
        "type": 'left',
        "content": question
      })
      match(question).then((res)=>{
        let answer = "未匹配到问题",
          jsonData = []
        if(res.data.Data.length > 0){
          answer = res.data.Data[0].answer
          jsonData = res.data.Data
        }
        this.testDialogue.contentList.push({
            "type": 'right',
            "content": answer,
            "jsonData": jsonData
          })
      })
      
    }
  },
};
</script>
