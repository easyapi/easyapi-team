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
                <Col span="23"><h4>接口消息<span class="fr gray">{{item.addTime}}</span></h4>
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
  import {getNotificationList} from "../api/notification";

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
      // this.getNotificationList();
      window.addEventListener("scroll", this.lazyLoading); // 滚动到底部，再加载的处理事件
      getNotificationList().then((res) => {
        this.notificationListArray = res.data.content;
      });
    },
    methods: {
      lazyLoading() { // 滚动到底部，再加载的处理事件
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        let clientHeight = document.documentElement.clientHeight;
        let scrollHeight = document.documentElement.scrollHeight;
        if (scrollTop + clientHeight >= scrollHeight) { // 滚动到底部，逻辑代码
          //事件处理
          getNotificationList().then((res) => {
            if (this.k > res.data.content.length - 1) {
              console.log(this.notificationListArray);
              console.log("数据加载完毕");
              this.k = this.list.length - 1;
            } else {
              this.notificationListArray.push(res.data.content[this.k]);
            }
            this.k++;
            console.log(this.k);
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
