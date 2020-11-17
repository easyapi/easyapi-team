<template>
  <div>
    <div class="infotitle">
      <div class="wp">全部通知</div>
    </div>
    <div class="wp mt">
      <div class="notification">
        <div id="appdnot">
          <ul>
            <li class="appdnot_li" v-for="item in notificationListArray" :key="item">
              <Row>
                <Col span="1">
                  <Avatar src="https://qiniu.easyapi.com/2015/1/0/1423382895789!icon.jpg" size="large"/>
                </Col>
                <Col span="23">
                  <h4>接口消息
                    <Tooltip :content="timeStampString(item.addTime)" placement="bottom" class="fr gray">
                      {{formatMsgTime(item.addTime)}}
                    </Tooltip>
                  </h4>
                  <p class="gray">磊大更新了发票管理API文档的接口商户注册&nbsp&nbsp&nbsp
                    <span @click="check" class="check" target="_blank">查看</span></p></Col>
              </Row>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getNotificationList } from "../api/notification";

  export default {
    name: "notification",
    data() {
      return {
        notificationListArray: [],
        k: 0
      };
    },
    mounted() {
      document.title = "消息通知 - EasyAPI";
      window.addEventListener("scroll", this.lazyLoading); // 滚动到底部，再加载的处理事件
      getNotificationList().then((res) => {
        this.notificationListArray = res.data.content;
      });
    },
    methods: {
      formatMsgTime(timespan) {
        let dateTime = new Date(timespan);
        let year = dateTime.getFullYear();
        let month = dateTime.getMonth() + 1;
        let day = dateTime.getDate();
        let hour = dateTime.getHours();
        let minute = dateTime.getMinutes();
        let second = dateTime.getSeconds();
        let millisecond = dateTime.getTime(); // 将当前编辑的时间转换为毫秒
        let now = new Date(); // 获取本机当前的时间
        let nowNew = now.getTime(); // 将本机的时间转换为毫秒
        let milliseconds = 0;
        let timeSpanStr;
        milliseconds = nowNew - millisecond;
        if (milliseconds <= 1000 * 60 * 1) { // 小于一分钟展示为刚刚
          timeSpanStr = "刚刚";
        } else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) { // 大于一分钟小于一小时展示为分钟
          timeSpanStr = Math.round((milliseconds / (1000 * 60))) + "分钟前";
        } else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) { // 大于一小时小于一天展示为小时
          timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + "小时前";
        } else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) { // 大于一天小于十五天展示位天
          timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + "天前";
        } else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year === now.getFullYear()) {
          timeSpanStr = month + "-" + day + " " + hour + ":" + minute;
        } else {
          timeSpanStr = year + "-" + month + "-" + day + " " + hour + ":" + minute;
        }
        return timeSpanStr;
      },
      timeStampString(time) {
        let datetime = new Date();
        datetime.setTime(time);
        let year = datetime.getFullYear();
        let month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
        let date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
        let hour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
        let minute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
        let second = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
        return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
      },
      lazyLoading() { // 滚动到底部，再加载的处理事件
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        let clientHeight = document.documentElement.clientHeight;
        let scrollHeight = document.documentElement.scrollHeight;
        if (scrollTop + clientHeight >= scrollHeight) { // 滚动到底部，逻辑代码
          //事件处理
          getNotificationList().then((res) => {
            if (this.k > res.data.content.length - 1) {
              this.k = this.list.length - 1;
            } else {
              this.notificationListArray.push(res.data.content[this.k]);
            }
            this.k++;
          });
        }
      },
      check() {
        this.$router.push("/api/?documentId=17044&categoryId=50369&apiId=218291");
      }
    }
  };
</script>

<style scoped>
  .infotitle {
    padding: 20px 0;
    background: #ecf1f5;
    font-size: 18px;
    color: #777;
  }

  .wp {
    max-width: 1200px;
    margin: 0 auto;
  }

  .mt {
    padding-top: 40px;
  }

  .notification {
    padding-bottom: 40px;
    min-height: 300px;
  }

  .gray {
    color: #999;
  }

  .fr {
    float: right;
    cursor: pointer;
  }

  .check {
    color: #428bca;
    cursor: pointer;
  }

  .appdnot_li {
    padding: 15px 0;
    border-bottom: 1px solid #ddd;
  }
</style>
