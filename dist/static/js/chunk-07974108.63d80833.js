(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-07974108"],{"1e17":function(e,t,a){},ea45:function(e,t,a){"use strict";a("1e17")},f1c6:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("el-row",{staticStyle:{margin:"10px 0"}},[a("el-button",{attrs:{type:"primary",plain:""},on:{click:function(t){return e.add()}}},[e._v("创建Ak")])],1),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],attrs:{data:e.list,"element-loading-text":"Loading",border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{align:"center",label:"ID",width:"95",prop:"id"}}),a("el-table-column",{attrs:{label:"Ak",prop:"app_key"}}),a("el-table-column",{attrs:{label:"As",prop:"app_secret"}}),a("el-table-column",{attrs:{label:"Type",prop:"type"}}),a("el-table-column",{attrs:{label:"use num",prop:"req_num"}}),a("el-table-column",{attrs:{align:"center",label:"Actions",width:"250"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(a){return e.deleteWarn(t.row.id)}}},[e._v("删除")])]}}])})],1),a("el-pagination",{attrs:{"page-size":e.pageSize,"pager-count":11,layout:"prev, pager, next",total:e.total},on:{"current-change":e.handleCurrentChange}}),a("el-dialog",{attrs:{title:e.dialogTitle,visible:e.dialogFormVisible,center:"","append-to-body":!0,"lock-scroll":!1,width:"60%"},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("AkForm",{attrs:{type:e.dialogType,id:e.selectId},on:{submitSuccess:e.submitRollback}})],1)],1)},i=[],l=a("c24f"),n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("el-form",{ref:"form",attrs:{model:e.form,"label-width":"120px"}},[a("el-form-item",{attrs:{label:"类型"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.form.selectValue,callback:function(t){e.$set(e.form,"selectValue",t)},expression:"form.selectValue"}},e._l(e.form.options,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v(e._s(e.submitButtonText))]),a("el-button",{on:{click:e.onCancel}},[e._v("Cancel")])],1)],1)],1)},o=[],r={name:"AkForm",props:{},data:function(){return{form:{id:0,selectValue:"",options:[{value:"QA",label:"QA"}]},slaveQuestion:"",submitButtonText:"Create"}},methods:{onSubmit:function(){var e=this;if(""==this.form.selectValue||0==this.form.selectValue.length)return this.$message({message:"请选择类型",type:"error"}),!1;var t={};t["type"]=this.form.selectValue,Object(l["a"])(t).then((function(t){200==t["code"]?(e.$message("success!"),e.resetForm(),e.$emit("submitSuccess",!0)):e.$message({message:t.message,type:"error"})}))},onCancel:function(){this.resetForm(),this.$emit("submitSuccess",!0)},slaveQuestionChange:function(e){this.slaveQuestion=e},addSlaveQuestion:function(){if(""==this.slaveQuestion||0==this.slaveQuestion.length||" "==this.slaveQuestion)return this.$message({message:"请填写question...",type:"warning"}),!1;var e={question:this.slaveQuestion,id:0};this.form.slaveQuestionList.unshift(e),this.slaveQuestion=""},resetForm:function(){this.form.selectValue=""}}},c=r,u=(a("ea45"),a("2877")),d=Object(u["a"])(c,n,o,!1,null,"495d809e",null),m=d.exports,p={components:{AkForm:m},filters:{statusFilter:function(e){var t={published:"success",draft:"gray",deleted:"danger"};return t[e]}},data:function(){return{list:null,listLoading:!0,total:0,pageSize:10,page:1,dialogStatus:"",dialogFormVisible:!1,dialogTitle:"添加",dialogType:"add",selectId:0}},created:function(){this.fetchData()},methods:{handleCurrentChange:function(e){this.fetchData(e)},fetchData:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.page=t,this.listLoading=!0,Object(l["c"])({page:t,pageSize:this.pageSize}).then((function(t){null!=t.data?(e.list=t.data.Data,e.listLoading=!1,e.total=t.data.total):(e.list=[],e.total=0,e.listLoading=!1)}))},add:function(){this.dialogType="add",this.dialogTitle="添加",this.dialogFormVisible=!0,this.selectId=0},deleteWarn:function(e){var t=this;this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){Object(l["b"])(e).then((function(e){200==e.code?(t.$message({type:"success",message:"删除成功!"}),t.fetchData(t.page)):t.$message({type:"error",message:"删除失败!"+e.message})}))})).catch((function(){t.$message({type:"info",message:"已取消删除"})}))},submitRollback:function(e){e&&(this.dialogFormVisible=!1,this.fetchData(1))}}},f=p,g=Object(u["a"])(f,s,i,!1,null,null,null);t["default"]=g.exports}}]);