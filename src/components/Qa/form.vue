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
        <el-form-item v-for="item in form.slaveQuestionList">
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
      <el-form-item v-if="type != 'info'">
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { add, edit, info } from "@/api/qa";
import { validUsername } from "@/utils/validate";
export default {
  name: "QaForm",
  props: {
    type: {
      type: String,
      required: true,
      default: "add", //这样可以指定默认的值
    },
    id: {
      type: Number,
      required: true,
      default: "0", //这样可以指定默认的值
    },
  },
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
      if (!validUsername(this.form.question)) {
        this.$message({
          message: "请输入标准问题",
          type: "error",
        });
        return;
      }
      if (!validUsername(this.form.answer)) {
        this.$message({
          message: "请输入答案",
          type: "error",
        });
        return;
      }
      let data = {};
      data["question"] = this.form.question;
      data["answer"] = this.form.answer;
      data["slave_question"] = [];
      if (this.type == "add") {
        this.form.slaveQuestionList.forEach(function (item) {
          data["slave_question"].push(item.question);
        });
        add(data).then((resp) => {
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
      } else {
        data["id"] = this.form.id;
        this.form.slaveQuestionList.forEach(function (item) {
          data["slave_question"].push({
            id: item.id,
            question: item.question,
          });
        });
        edit(data).then((resp) => {
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
      }
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
      this.form = {
        id: 0,
        question: "",
        answer: "",
        slaveQuestionList: [], // [{"id":1,"question":""}]
      };
    },
  },

  watch: {
    type: {
      immediate: true,
      handler(val) {},
    },
    id: {
      immediate: true,
      handler(val) {
        console.log(val);
        // 获取详情
        if (this.type != "info" && this.type != "edit") {
          return;
        }
        if (val > 0) {
          info(val).then((resp) => {
            if (resp["code"] != 200) {
              this.$message({
                message: resp["message"],
                type: "error",
              });
              return false;
            }

            this.form = {
              id: resp.data.id,
              question: resp.data.question,
              answer: resp.data.answer,
              slaveQuestionList: [], // [{"id":1,"question":""}]
            };

            if (
              resp.data.SimilarQuestion != null &&
              resp.data.SimilarQuestion.length > 0
            ) {
              this.form.slaveQuestionList = resp.data.SimilarQuestion;
            }
          });
        }
      },
    },
  },
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

