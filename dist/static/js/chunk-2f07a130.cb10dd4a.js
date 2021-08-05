(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2f07a130"],{2222:function(t,e,i){"use strict";i("ec8e")},a976:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"app-container"},[i("el-row",{staticStyle:{margin:"10px 0"}},[i("el-button",{attrs:{type:"primary",plain:""},on:{click:function(e){return t.add()}}},[t._v("添加问题")]),i("el-button",{attrs:{type:"info",plain:"",loading:t.trainButton.loading},on:{click:function(e){return t.trainModel()}}},[t._v("训练模型")]),i("el-button",{attrs:{type:"info",plain:"",disabled:t.qaModelStatus},on:{click:t.clieckTestDialogue}},[t._v("测试对话")])],1),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],attrs:{data:t.list,"element-loading-text":"Loading",border:"",fit:"","highlight-current-row":""}},[i("el-table-column",{attrs:{align:"center",label:"ID",width:"95",prop:"id"}}),i("el-table-column",{attrs:{label:"Question",prop:"question"}}),i("el-table-column",{attrs:{align:"center",label:"Actions",width:"250"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{type:"info",size:"small"},on:{click:function(i){return t.showInfo(e.row.id)}}},[t._v("查看")]),i("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(i){return t.editInfo(e.row.id)}}},[t._v("编辑")]),i("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(i){return t.deleteWarn(e.row.id)}}},[t._v("删除")])]}}])})],1),i("el-pagination",{attrs:{"page-size":t.pageSize,"pager-count":11,layout:"prev, pager, next",total:t.total},on:{"current-change":t.handleCurrentChange}}),i("el-dialog",{attrs:{title:t.dialogTitle,visible:t.dialogFormVisible,center:"","append-to-body":!0,"lock-scroll":!1,width:"60%"},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[i("QaForm",{attrs:{type:t.dialogType,id:t.selectId},on:{submitSuccess:t.submitRollback}})],1),i("el-dialog",{attrs:{title:t.testDialogue.maskTitle,visible:t.testDialogue.maskShow,center:"","append-to-body":!0,"lock-scroll":!1,width:"60%"},on:{"update:visible":function(e){return t.$set(t.testDialogue,"maskShow",e)}}},[i("Dialogue",{attrs:{contentList:t.testDialogue.contentList},on:{dialogueSend:t.dialogueSendRollback}})],1)],1)},s=[],a=i("ade3"),o=i("b775");function l(t){return Object(o["a"])({url:"question/index",method:"get",params:t})}function r(t){return Object(o["a"])({url:"question/delete",method:"get",params:{id:t}})}function u(t){return Object(o["a"])({url:"question/add",method:"post",data:t})}function c(t){return Object(o["a"])({url:"question/edit",method:"post",data:t})}function d(t){return Object(o["a"])({url:"question/info",method:"get",params:Object(a["a"])({id:t},"id",t)})}function f(){return Object(o["a"])({url:"question/train",method:"get"})}function m(t){return Object(o["a"])({url:"question/match",method:"get",params:Object(a["a"])({question:t},"question",t)})}var h=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"app-container"},[i("el-form",{ref:"form",attrs:{model:t.form,"label-width":"120px"}},[i("el-form-item",{attrs:{label:"标准问题"}},[i("el-input",{attrs:{placeholder:"please input question..."},model:{value:t.form.question,callback:function(e){t.$set(t.form,"question",e)},expression:"form.question"}})],1),i("el-form-item",{attrs:{label:"相似问题"}},["info"!=t.type?i("el-input",{attrs:{placeholder:"please input question..."},on:{change:t.slaveQuestionChange},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.addSlaveQuestion(e)}},model:{value:t.slaveQuestion,callback:function(e){t.slaveQuestion=e},expression:"slaveQuestion"}}):t._e(),i("div",{staticClass:"sims_question"},t._l(t.form.slaveQuestionList,(function(t){return i("el-form-item",{staticStyle:{"margin-top":"10px"}},[i("el-input",{attrs:{value:t.question}})],1)})),1)],1),i("el-form-item",{attrs:{label:"答案"}},[i("el-input",{attrs:{type:"textarea",placeholder:"please input answer...."},model:{value:t.form.answer,callback:function(e){t.$set(t.form,"answer",e)},expression:"form.answer"}})],1),"info"!=t.type?i("el-form-item",[i("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v(t._s(t.submitButtonText))]),i("el-button",{on:{click:t.onCancel}},[t._v("Cancel")])],1):t._e()],1)],1)},g=[],p=(i("a9e3"),i("159b"),i("61f7")),v={name:"QaForm",props:{type:{type:String,required:!0,default:"add"},id:{type:Number,required:!0,default:"0"}},data:function(){return{form:{id:0,question:"",answer:"",slaveQuestionList:[]},slaveQuestion:"",submitButtonText:""}},methods:{onSubmit:function(){var t=this;if(Object(p["b"])(this.form.question))if(Object(p["b"])(this.form.answer)){var e={};e["question"]=this.form.question,e["answer"]=this.form.answer,e["slave_question"]=[],"add"==this.type?(this.form.slaveQuestionList.forEach((function(t){e["slave_question"].push(t.question)})),u(e).then((function(e){200==e["code"]?(t.$message("success!"),t.resetForm(),t.$emit("submitSuccess",!0)):t.$message({message:e.message,type:"error"})}))):(e["id"]=this.form.id,this.form.slaveQuestionList.forEach((function(t){e["slave_question"].push({id:t.id,question:t.question})})),c(e).then((function(e){200==e["code"]?t.$message("success!"):t.$message({message:e.message,type:"error"})})))}else this.$message({message:"请输入答案",type:"error"});else this.$message({message:"请输入标准问题",type:"error"})},onCancel:function(){this.resetForm(),this.$emit("submitSuccess",!0)},slaveQuestionChange:function(t){this.slaveQuestion=t},addSlaveQuestion:function(){if(""==this.slaveQuestion||0==this.slaveQuestion.length||" "==this.slaveQuestion)return this.$message({message:"请填写question...",type:"warning"}),!1;var t={question:this.slaveQuestion,id:0};this.form.slaveQuestionList.unshift(t),this.slaveQuestion=""},resetForm:function(){this.form={id:0,question:"",answer:"",slaveQuestionList:[]},this.type=""}},watch:{type:{immediate:!0,handler:function(t){console.log(t),"edit"==t?this.submitButtonText="Update":"add"==t&&(this.submitButtonText="Create")}},id:{immediate:!0,handler:function(t){var e=this;console.log("id",t),"info"!=this.type&&"edit"!=this.type||t>0&&d(t).then((function(t){if(200!=t["code"])return e.$message({message:t["message"],type:"error"}),!1;e.form={id:t.data.id,question:t.data.question,answer:t.data.answer,slaveQuestionList:[]},null!=t.data.SimilarQuestion&&t.data.SimilarQuestion.length>0&&(e.form.slaveQuestionList=t.data.SimilarQuestion)}))}}}},b=v,y=(i("fb58"),i("2877")),q=Object(y["a"])(b,h,g,!1,null,"c7928a56",null),k=q.exports,w=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"app-container"},[i("div",{staticClass:"dialogue"},t._l(t.dialogue.contentList,(function(e){return i("div",["left"==e.type?i("div",{staticClass:"dialogue-left"},[i("img",{attrs:{src:t.dialogue.imageLeft}}),i("div",{staticClass:"text"},[t._v(" "+t._s(e.content)+" ")])]):t._e(),"right"==e.type?i("div",{staticClass:"dialogue-right"},[i("img",{attrs:{src:t.dialogue.imageRight}}),i("div",{staticClass:"text"},[t._v(" "+t._s(e.content)+" "),e.jsonData.length>0?i("div",{staticClass:"jsonData"},[i("json-viewer",{attrs:{value:e.jsonData,"expand-depth":2,copyable:"",sort:""}})],1):t._e()])]):t._e()])})),0),i("el-form",{ref:"form",attrs:{model:t.form}},[i("el-form-item",[i("el-input",{ref:"inputRef",staticStyle:{width:"80%"},attrs:{placeholder:"please input question..."},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.send(e)}},model:{value:t.form.question,callback:function(e){t.$set(t.form,"question",e)},expression:"form.question"}}),i("el-button",{staticStyle:{"margin-left":"1%"},on:{click:function(e){return e.preventDefault(),t.send(e)}}},[t._v("发送")])],1)],1)],1)},_=[],S=i("349e"),Q=i.n(S),D=i("4360"),L={name:"QaForm",components:{JsonViewer:Q.a},props:{contentList:{type:Array,required:!0,default:function(){return[]}}},data:function(){return{form:{question:""},slaveQuestion:"",submitButtonText:"",dialogue:{imageLeft:D["a"].state.user.avatar,imageRight:"/favicon.ico",contentList:[]}}},methods:{onSubmit:function(){this.$emit("submitSuccess",!0)},resetForm:function(){this.form={id:0,question:"",answer:"",slaveQuestionList:[]}},send:function(){var t=this.form.question;if(!Object(p["b"])(t))return this.$message.error("请输入问题"),!1;this.$emit("dialogueSend",t),this.form.question=""},pushDialogueContent:function(t,e){this.dialogue.contentList.push({type:e,content:t})}},mounted:function(){this.$refs.inputRef.focus()},watch:{contentList:{immediate:!0,handler:function(t){this.dialogue.contentList=t}}}},x=L,$=(i("2222"),Object(y["a"])(x,w,_,!1,null,"66f1cf58",null)),C=$.exports,j=i("c24f"),T=i("5f87"),O={components:{QaForm:k,Dialogue:C},filters:{statusFilter:function(t){var e={published:"success",draft:"gray",deleted:"danger"};return e[t]}},data:function(){return{list:null,listLoading:!0,total:0,pageSize:10,page:1,dialogStatus:"",dialogFormVisible:!1,dialogTitle:"添加",dialogType:"add",selectId:0,qaModelStatus:!0,trainButton:{loading:!1},testDialogue:{maskShow:!1,maskTitle:"",contentList:[]}}},created:function(){this.fetchData(),this.checkIsQaModel()},methods:{handleCurrentChange:function(t){this.fetchData(t)},fetchData:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.page=e,this.listLoading=!0,l({page:e,pageSize:this.pageSize}).then((function(e){t.list=e.data.Data,t.listLoading=!1,t.total=e.data.total}))},showInfo:function(t){this.selectId=t,this.dialogTitle="详情",this.dialogType="info",this.dialogFormVisible=!0},add:function(){this.dialogType="add",this.dialogTitle="添加",this.dialogFormVisible=!0,this.selectId=0},editInfo:function(t){this.selectId=t,this.dialogTitle="编辑",this.dialogType="edit",this.dialogFormVisible=!0},deleteWarn:function(t){var e=this;this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){r(t).then((function(t){200==t.code?(e.$message({type:"success",message:"删除成功!"}),e.fetchData(e.page)):e.$message({type:"error",message:"删除失败!"+t.message})}))})).catch((function(){e.$message({type:"info",message:"已取消删除"})}))},submitRollback:function(t){t&&(this.dialogFormVisible=!1,this.fetchData(1))},checkIsQaModel:function(){var t=this;Object(j["d"])(Object(T["a"])()).then((function(e){1==e.data.qa_model_status&&(t.qaModelStatus=!1)}))},trainModel:function(){var t=this;this.trainButton.loading=!0,f().then((function(e){200==e.code?(t.$message("success!"),t.qaModelStatus=!1):t.$message({message:resp.message,type:"error"}),t.trainButton.loading=!1}))},clieckTestDialogue:function(){this.testDialogue.maskTitle="测试对话",this.testDialogue.maskShow=!0},dialogueSendRollback:function(t){var e=this;this.testDialogue.contentList.push({type:"left",content:t}),m(t).then((function(t){var i="未匹配到问题",n=[];t.data.Data.length>0&&(i=t.data.Data[0].answer,n=t.data.Data),e.testDialogue.contentList.push({type:"right",content:i,jsonData:n})}))}}},F=O,I=Object(y["a"])(F,n,s,!1,null,null,null);e["default"]=I.exports},eae0:function(t,e,i){},ec8e:function(t,e,i){},fb58:function(t,e,i){"use strict";i("eae0")}}]);