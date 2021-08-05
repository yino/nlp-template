<template>
  <div class="app-container">
    <div class="dialogue">
        <div v-for="item in dialogue.contentList">
            <div class="dialogue-left"  v-if="item.type == 'left'">
                <img :src="dialogue.imageLeft" />
                <div class="text">
                {{item.content}}
                </div>
            </div>

            <div class="dialogue-right"  v-if="item.type == 'right'">
                <img :src="dialogue.imageRight" />
                <div class="text">
                {{item.content}}
                <div class="jsonData" v-if="item.jsonData.length >0">
                    <json-viewer :value="item.jsonData" :expand-depth="2" copyable sort></json-viewer>
                </div>
                </div>
            </div>
        </div>
    </div>

    <el-form ref="form" :model="form">
     <el-form-item>
        <el-input v-model="form.question"  ref="inputRef" placeholder="please input question..." style="width:80%;" @keyup.enter.native="send"></el-input>
        <el-button @click.prevent="send" style="margin-left:1%;">发送</el-button>

      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { add, edit, info } from "@/api/qa"
import { validUsername } from "@/utils/validate"
import JsonViewer from "vue-json-viewer"
import store from "@/store";
export default {
  name: "QaForm",
  components: {
    JsonViewer,
  },
  props:{
    contentList: {
      type: Array,
      required: true,
      default:function(){
			return [];
		}, //这样可以指定默认的值
    },
  },
  data() {
    return {
      form: {
        question: "",
      },
      slaveQuestion: "",
      submitButtonText: "",
      dialogue:{
          imageLeft:store.state.user.avatar,
          imageRight:"/favicon.ico",
          contentList:[],//    [{type:"left", content:"13123",type:"test", content:"test"}]
      },
    };
  },
  methods: {
    onSubmit() {
       this.$emit("submitSuccess", true);
    },
    resetForm() {
      this.form = {
        id: 0,
        question: "",
        answer: "",
        slaveQuestionList: [], // [{"id":1,"question":""}]
      };
    },
    // 发送消息
    send(){
        let question = this.form.question
        if (!validUsername(question)){
            this.$message.error('请输入问题');
            return false;
        }
        this.$emit("dialogueSend", question);
        this.form.question=''
    },

    // 推送dialogue content
    pushDialogueContent(content, type){
        this.dialogue.contentList.push({
            "type": type,
            "content":content
        });
    }
  },
    mounted:function(){
        // console.log(store.state.user.avatar)
         this.$refs.inputRef.focus()
    },
    watch:{
        contentList: {
            immediate: true,
            handler(val) {
                this.dialogue.contentList = val
            },
        },
    }
}
</script>

<style scoped>
    .line {
        text-align: center;
    }

    .dialogue{
        height:400px;
        overflow-y: scroll;
    }
    .dialogue .text{
        border: 1px solid;
        min-height: 40px;
        width:91%;
        padding: 1%;
    }
    .dialogue>div{
        overflow: hidden;
        margin-bottom: 5px;
    }
    .dialogue .dialogue-left .text,.dialogue .dialogue-left img{
        float:left;
        margin-right: 5px;
    }
    .dialogue .dialogue-right .text,.dialogue .dialogue-right img{
        float:right;
        margin-left: 5px;
    }

    .dialogue .dialogue-left img,.dialogue .dialogue-right img{
        width: 4%;
        height: 35px;
        border-radius:100%;
    }
</style>

