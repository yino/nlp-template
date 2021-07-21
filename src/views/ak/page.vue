<template>
  <div class="app-container">
    <el-row style="margin: 10px 0">
      <el-button type="primary" plain @click="add()">创建Ak</el-button>
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
      <el-table-column label="Ak" prop="app_key"></el-table-column>
      <el-table-column label="As" prop="app_secret"></el-table-column>
      <el-table-column label="Type" prop="type"></el-table-column>
      <el-table-column label="use num" prop="req_num"></el-table-column>
      <el-table-column align="center" label="Actions" width="250">
        <template slot-scope="scope">
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
      <AkForm
        @submitSuccess="submitRollback"
        :type="dialogType"
        :id="selectId"
      ></AkForm>
    </el-dialog>
  </div>
</template>

<script>
import { akPage, akDelete } from "@/api/user";
import AkForm from "@/components/Ak/form.vue";

export default {
  components: {
    AkForm,
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      list: null,
      listLoading: true,
      total: 0,
      pageSize: 10,
      page: 1,
      dialogStatus: "",
      dialogFormVisible: false,
      dialogTitle: "添加",
      dialogType: "add",
      selectId: 0,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    handleCurrentChange(page) {
      this.fetchData(page);
    },
    fetchData(page = 1) {
      this.page = page;
      this.listLoading = true;
      akPage({ page: page, pageSize: this.pageSize }).then((response) => {
        if (response.data != null) {
          this.list = response.data.Data;
          this.listLoading = false;
          this.total = response.data.total;
        } else {
          this.list = [];
          this.total = 0;
          this.listLoading = false;
        }
      });
    },
    add() {
      this.dialogType = "add";
      this.dialogTitle = "添加";
      this.dialogFormVisible = true;
      this.selectId = 0;
    },

    deleteWarn(id) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          akDelete(id).then((resp) => {
            if (resp.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.fetchData(this.page);
            } else {
              this.$message({
                type: "error",
                message: "删除失败!" + resp.message,
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    submitRollback(ok) {
      if (ok) {
        this.dialogFormVisible = false;
        this.fetchData(1);
      }
    },
  },
};
</script>
