<template>
  <div class="stat">
    <div class="title">
      <span>接口统计</span>
    </div>
    <div class="Choice">
      <Select v-model="serviceId" placeholder="请选择服务" class="state" @on-change="switchingService()">
        <Option :value="informations.service.serviceId" v-for="informations in teamInformation">
          {{informations.service.name}}
        </Option>
      </Select>
      <Row class="date">
        <Col span="12">
          <DatePicker @on-change="selectionDate('选择天数',timeAndDate)" v-model="timeAndDate" format="yyyy-MM-dd"
                      type="daterange" placement="bottom-end" placeholder="请选择开始时间，结束时间"
                      style="width: 200px"></DatePicker>
        </Col>
      </Row>
      <div class="item">
        <span :class="{selection:Switching==='最近7天'}" @click="stand('最近7天',7)">最近7天</span>
        <span :class="{selection:Switching==='最近30天'}" @click="stand('最近30天',30)">最近30天</span>
      </div>
    </div>
    <div class="statistics_conter">
      <div class="Statistical">
        <h6 class="frequency">请求次数</h6>
        <x-chart id="highcharts" class="high" :option="option"></x-chart>
      </div>
    </div>
  </div>
</template>
<script>
  // 导入chart组件
  var myvue = {};
  import XChart from '../components/chart/highcharts'
  import {interfaceStatistics, getUserService} from "../api/api"
  import Cookies from 'js-cookie'

  export default {
    data() {
      return {
        serviceId: '',
        teamInformation: '',
        Switching: '最近7天',
        timeAndDate: '',
        seriesData: '',
        authenticationToken: '',
        startDay: '',//开始时间
        endDay: '',//截止时间
        dayArr: [],
        statisticsTimes: '',
        item: 7,
        option: {},
        data: [{
          name: '',
          data: [],
        }],
        other: {
          title: {
            //标题
            text: ''
          },
          legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
          },
          xAxis: {
            categories: [],
            crosshair: true,
          },
          yAxis: {
            title: {
              text: '',
            },
          },
          series: '',
          responsive: {
            rules: [{
              condition: {
                maxWidth: 500
              },
              chartOptions: {
                legend: {
                  layout: 'horizontal',
                  align: 'center',
                  verticalAlign: 'bottom'
                }
              }
            }]
          },
          credits: {
            enabled: false // 去掉highcharts商标
          },
        },
      }
    },
    methods: {
      stand(pay, data) {
        this.dayArr = [];
        this.timeAndDate = '';
        this.Switching = pay;
        this.item = data
        this.getItem()
      },
      getItem() {
        for (let i = 0; i < this.item; i++) {
          const ymd = new Date(new Date() - 24 * 60 * 60 * 1000 * i).toLocaleString().split(' ')[0]
          const ymdarr = ymd.split('/')
          if (ymdarr[1] * 1 < 10) {
            ymdarr[1] = '0' + ymdarr[1]
          }
          if (ymdarr[2] * 1 < 10) {
            ymdarr[2] = '0' + ymdarr[2]
          }
          this.dayArr.unshift(ymdarr.join('-'))
        }
        this.startDay = this.dayArr[0]
        let index = this.dayArr.length - 1
        this.endDay = this.dayArr[index]
        this.other.xAxis.categories = this.dayArr
        this.getTimeAndDate()
      },
      //选择时间
      selectionDate(style, par) {
        console.log(style)
        this.Switching = style;
        this.startDay = this.$moment(par[0]).format('YYYY-MM-DD')
        this.endDay = this.$moment(par[1]).format('YYYY-MM-DD')
        this.getBetweenDateStr()
      },
      getBetweenDateStr() {
        this.dayArr = [];
        var beginDay = this.startDay.split("-");
        var endDay = this.endDay.split("-");
        var diffDay = new Date();
        var dateList = new Array;
        var i = 0;
        diffDay.setDate(beginDay[2]);
        diffDay.setMonth(beginDay[1] - 1);
        diffDay.setFullYear(beginDay[0]);
        this.dayArr.push(this.startDay);
        while (i == 0) {
          var countDay = diffDay.getTime() + 24 * 60 * 60 * 1000;
          diffDay.setTime(countDay);
          dateList[2] = diffDay.getDate();
          dateList[1] = diffDay.getMonth() + 1;
          dateList[0] = diffDay.getFullYear();
          if (String(dateList[1]).length == 1) {
            dateList[1] = "0" + dateList[1]
          }
          ;
          if (String(dateList[2]).length == 1) {
            dateList[2] = "0" + dateList[2]
          }
          ;
          this.dayArr.push(dateList[0] + "-" + dateList[1] + "-" + dateList[2]);
          if (dateList[0] == endDay[0] && dateList[1] == endDay[1] && dateList[2] == endDay[2]) {
            i = 1;
          }
        }
        ;
        this.getTimeAndDate()
      },
      //接口统计
      getTimeAndDate() {
        this.$ajax({
          method: 'get',
          url: interfaceStatistics,
          headers: {
            "authorization": this.authenticationToken,
          },
          params: {
            serviceId: this.serviceId,
            startDay: this.startDay + ' 00:00:00',
            endDay: this.endDay + ' 00:00:00',
            size: 500,
          }
        }).then(res => {
          this.data[0].data = [];
          console.log(res)
          this.statisticsTimes = res.data.content;
          if (res.data.code !== 0) {
            for (var i = 0; i < this.statisticsTimes.length; i++) {
              this.$set(this.data[0].data, i, this.statisticsTimes[i].count)
            }
            ;
          }
          ;
          myvue.other.series = myvue.data; //数据
          myvue.option = myvue.other;
        }).catch(error => {
          console.log(error)
        })
      },
      //我的服务
      getUserService() {
        this.$ajax({
          method: 'get',
          url: getUserService,
          headers: {
            "authorization": this.authenticationToken,
            'Content-Type': 'application/json',
          },
          params: {
            serviceCategory: this.category,
            size: 50,
          }
        }).then(res => {
          this.teamInformation = res.data.content;
        }).catch(error => {
          console.log(error)
        })
      },
      //切换服务
      switchingService() {
        this.getTimeAndDate()
      }
    },
    beforeCreate: function () {
      myvue = this;
    },
    mounted: function () {

      this.getItem()
      this.getUserService()
    },
    components: {
      XChart
    },
    created() {
      this.serviceId = this.$route.query.serviceId;
      this.authenticationToken = 'Bearer ' + Cookies.get("authenticationToken")
    },
  }
</script>
<style>
  .highcharts-axis {
    display: none;
  }

  .highcharts-legend-item {
    display: none;
  }
</style>
<style scoped>

  .stat {
    width: 100%;
    height: auto;
  }

  .title {
    width: 100%;
    height: 80px;
    background-color: #fafafa;
  }

  .title span {
    width: 1200px;
    height: 80px;
    line-height: 80px;
    margin: 0 auto;
    font-size: 18px;
    display: block;
    color: #000000;

  }

  .Choice {
    width: 1200px;
    height: 106px;
    margin: 0 auto;
    display: flex;
  }

  .state {
    width: 200px;
    padding-top: 38px;
  }

  .date {
    display: flex;
    padding-left: 20px;
    line-height: 106px;
  }

  .statistics_conter {
    width: 100%;
    height: auto;
  }

  .Statistical {
    width: 1200px;
    height: auto;
    margin: 0 auto;
    background-color: #ffffff;
    border: solid 1px #dddddd;
  }

  .frequency {
    display: block;
    margin-top: 20px;
    padding-left: 38px;
    padding-bottom: 10px;
    color: #333333;
    font-size: 14px
  }

  .item {
    display: flex;
  }

  .item span {
    width: 80px;
    height: 27px;
    margin-top: 42px;
    font-size: 14px;
    margin-left: 20px;
    cursor: pointer;
    text-align: center;
  }

  .selection {
    line-height: 27px;
    text-align: center;
    background-color: #1bc1d6;
    border-radius: 14px;
    margin-left: 20px;
    color: #ffffff;
    margin-top: 38px !important;
  }
</style>
