<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="标准问题">
        <el-input
          v-model="form.question"
          placeholder="please input question..."
        />
      </el-form-item>
      <el-form-item label="相似问题">
        <el-input
          v-model="slaveQuestion"
          @change="slaveQuestionChange"
          @keyup.enter.native="addSlaveQuestion"
          placeholder="please input question..."
        />
      </el-form-item>
      <div style="max-height: 400px; overflow-y: scroll">
        <el-form-item v-for="item in form.slaveQuestionList" :key="key">
          <el-input :value="item.question" />
        </el-form-item>
      </div>
      <!-- answer -->
      <el-form-item label="答案">
        <el-input
          v-model="form.answer"
          type="textarea"
          placeholder="please input answer...."
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "QaForm",
  data() {
    return {
      form: {
        id: 0,
        question: "",
        answer: "",
        slaveQuestionList: [], // [{"id":1,"question":""}]
      },
      slaveQuestion: "",
    };
  },
  methods: {
    onSubmit() {
      this.$message("submit!");
    },
    onCancel() {
      this.$message({
        message: "cancel!",
        type: "warning",
      });
    },
    slaveQuestionChange(question) {
      this.slaveQuestion = question;
    },
    addSlaveQuestion() {
      if (
        this.slaveQuestion == "" ||
        this.slaveQuestion.length == 0 ||
        this.slaveQuestion == " "
      ) {
          this.$message({
          message: '请填写question...',
          type: 'warning'
        });
        return false;
      }
      let salveQuestion = {
        question: this.slaveQuestion,
        id: 0,
      };
      this.form.slaveQuestionList.unshift(salveQuestion);
      this.slaveQuestion = "";
    },
  },
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

