<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
    <div class="card-tab">
      <el-row :gutter="40" class="panel-group">
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="card-panel" @click="handleSetLineChartData('messages')">
            <div class="card-panel-icon-wrapper icon-message">
              <svg-icon icon-class="question" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                Qa问答对
              </div>
              <count-to :start-val="0" :end-val="qa.questionTotal" :duration="3000" class="card-panel-num" />
            </div>
          </div>
        </el-col>
        
        <!-- 请求量 -->
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="card-panel" @click="handleSetLineChartData('messages')">
            <div class="card-panel-icon-wrapper icon-message">
              <svg-icon icon-class="request-num" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                请求量
              </div>
              <count-to :start-val="0" :end-val="qa.questionTotal" :duration="3000" class="card-panel-num" />
            </div>
          </div>
        </el-col>
        <!-- 有效请求量 -->
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="card-panel" @click="handleSetLineChartData('messages')">
            <div class="card-panel-icon-wrapper icon-message">
              <svg-icon icon-class="valid-request-num" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                有效请求量
              </div>
              <count-to :start-val="0" :end-val="qa.questionTotal" :duration="3000" class="card-panel-num" />
            </div>
          </div>
        </el-col>

        <!--  峰值qps -->
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="card-panel" @click="handleSetLineChartData('messages')">
            <div class="card-panel-icon-wrapper icon-message">
              <svg-icon icon-class="qps" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                峰值qps
              </div>
              <count-to :start-val="0" :end-val="qps" :duration="3000" class="card-panel-num" />
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-row class="panel-group card" style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <div id="requestNumCharts"></div>
    </el-row>

    <el-row :gutter="32" class="panel-group card">
       <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
            <div id="qpsCharts">
            </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="requestType">
         <div id="requestTypeCharts"></div>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CountTo from 'vue-count-to'
import {questionTotal} from '@/api/qa'
import * as echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme

export default {
  name: 'Dashboard',
  components: {CountTo },
  computed: {
    ...mapGetters([
      'name'
    ]),
  },
  data(){
    return {
      qa:{
        questionTotal:0
      },
      qps:1,
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    },
    
    // question total
    initQaQuestionTotal(){
      questionTotal().then((res)=>{
        if(res.code == 200){
          this.qa.questionTotal = res.data.Total
        }
      })
    },
    initRequestNumCharts(){
      let requestNumEcharts = echarts.init(document.getElementById('requestNumCharts'));
      let requestNum=[100, 120, 161, 134, 105, 160, 165],
          validRequestNum=[120, 82, 91, 154, 162, 140, 145]

      let dataArr = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      requestNumEcharts.setOption({
        title: {
          text: '最近七天请求量'
        },
        xAxis: {
          data: dataArr,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ['有效请求量', '请求量']
        },
        series: [{
          name: '有效请求量', itemStyle: {
            normal: {
              color: '#FF005A',
              lineStyle: {
                color: '#FF005A',
                width: 2
              }
            }
          },
          smooth: true,
          type: 'line',
          data: validRequestNum,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        },
        {
          name: '请求量',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#3888fa',
              lineStyle: {
                color: '#3888fa',
                width: 2
              },
              areaStyle: {
                color: '#f3f8ff'
              }
            }
          },
          data: requestNum,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }]
      })
    },
    initQpsCharta(){
      function randomData(value) {
          now = new Date(+now + oneDay);
          value = value + Math.random() * 21 - 10;
          return {
              name: now.toString(),
              value: [
                  [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
                  Math.round(value)
              ]
          };
      }

      var data = [];
      var now = +new Date(1997, 9, 3);
      var oneDay = 24 * 3600 * 1000;
      var value = Math.random() * 1000;
      for (var i = 0; i < 1000; i++) {
          data.push(randomData(value));
      }

      let qpsEcharts = echarts.init(document.getElementById('qpsCharts'));
      qpsEcharts.setOption({
          title: {
              text: 'qps'
          },
          tooltip: {
              trigger: 'axis',
              formatter: function (params) {
                  params = params[0];
                  var date = new Date(params.name);
                  return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
              },
              axisPointer: {
                  animation: false
              }
          },
          xAxis: {
              type: 'time',
              splitLine: {
                  show: false
              }
          },
          yAxis: {
              type: 'value',
              boundaryGap: [0, '100%'],
              splitLine: {
                  show: false
              }
          },
          series: [{
              name: '模拟数据',
              type: 'line',
              showSymbol: false,
              hoverAnimation: false,
              data: data
          }]
      })
    },
    initRequestTypeCharts(){
      let requestTypeEcharts = echarts.init(document.getElementById('requestTypeCharts'))
      requestTypeEcharts.setOption({
          title: {
              text: '天气情况统计',
              subtext: '虚构数据',
              left: 'center'
          },
          tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
              bottom: 10,
              left: 'center',
              data: ['西凉', '益州', '兖州', '荆州', '幽州']
          },
          series: [
              {
                  type: 'pie',
                  radius: '65%',
                  center: ['50%', '50%'],
                  selectedMode: 'single',
                  data: [
                      {
                          value: 1548,
                          name: '幽州',

                      },
                      {value: 735, name: '荆州'},
                      {value: 510, name: '兖州'},
                      {value: 434, name: '益州'},
                      {value: 335, name: '西凉'}
                  ],
                  emphasis: {
                      itemStyle: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                  }
              }
          ]
      })
    }
  },
  mounted(){
    this.initQaQuestionTotal()
    this.initRequestNumCharts()
    this.initQpsCharta()
    this.initRequestTypeCharts()
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
#requestNumCharts, #qpsCharts, #requestTypeCharts{
  width: 100%;
  height: 350px;
}

.card{
    background: #fff;
    -webkit-box-shadow: 4px 4px 40px rgb(0 0 0 / 5%);
    box-shadow: 4px 4px 40px rgb(0 0 0 / 5%);
    border-color: rgba(0, 0, 0, 0.05);
}
</style>
