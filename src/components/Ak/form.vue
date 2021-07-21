<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="类型">
        <el-select v-model="form.selectValue" placeholder="请选择">
          <el-option
            v-for="item in form.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{
          submitButtonText
        }}</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { akCreate } from "@/api/user";
export default {
  name: "AkForm",
  props: {},
  data() {
    return {
      form: {
        id: 0,
        selectValue: "",
        options: [
          {
            value: "QA",
            label: "QA",
          },
        ],
      },
      slaveQuestion: "",
      submitButtonText: "Create",
    };
  },
  methods: {
    onSubmit() {
      if (this.form.selectValue == "" || this.form.selectValue.length == 0) {
        this.$message({
          message: "请选择类型",
          type: "error",
        });
        return false;
      }
      let data = {};
      data["type"] = this.form.selectValue;
      akCreate(data).then((resp) => {
        if (resp["code"] == 200) {
          this.$message("success!");
          this.resetForm();
          this.$emit("submitSuccess", true);
        } else {
          this.$message({
            message: resp.message,
            type: "error",
          });
        }
      });
    },
    onCancel() {
      this.resetForm();
      this.$emit("submitSuccess", true);
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
          message: "请填写question...",
          type: "warning",
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
    resetForm() {
      this.form.selectValue = "";
    },
  },
};
</script>

<style scoped>
.line {
  text-align: center;
}
.sims_question {
  max-height: 400px;
  overflow-y: scroll;
}
</style>

