<template>
  <div class="event_card">
    <div class="event_ti">
      <span class="screen">筛选动态：
      </span>
      <Select placeholder="所有成员" v-model="member" style="width:200px">
        <Option v-for="item in memberList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <span class="screen">筛选项目：
      </span>
      <Select placeholder="所有项目" v-model="project" style="width:200px">
        <Option v-for="item in memberList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </div>
    <div class="eventbox" v-if="!noData">
      <!-- <div> -->
        <ul>
          <li v-for="(item,index) in eventListArray" :key="index">
            <div class="mr">
              <p>{{item.updateTime.slice(5,7)}}/{{item.updateTime.slice(8,10)}}</p>
              <p>{{weekTime(item.updateTime.slice(0,10))}}</p>
            </div>
            <div class="em">{{item.team.name}}</div>
            <Divider :dashed="true"/>
            <div class="event_content">
              <span class="addTime">{{item.addTime}}</span>
              <Avatar icon="ios-person" size="50" class="event_avatar" :src="item.user.photo"/>
              <span><strong class="event_info">{{item.user.nickname}}</strong>{{item.type}}:<span class="shd"
                                                                    v-html="item.content">{{item.content}}</span></span>
            </div>
          </li>
        </ul>
      <!-- </div> -->
    </div>
    <div v-else class="no-data">
      <img src="../../assets/images/no-data.png" alt="">
    </div>
  </div>
</template>

<script>
  import {getEventList} from "../../api/event";

  export default {
    name: "Event",
    data: function () {
      return {
        eventListArray: [],
        member: "",
        project: "",
        noData:false,
        pagination:{
          size: 20,
          page: 0,
          totalPages: 0
        },
        memberList: [
          {
            value: "New York",
            label: "New York"
          },
          {
            value: "London",
            label: "London"
          },
          {
            value: "Sydney",
            label: "Sydney"
          },
          {
            value: "Ottawa",
            label: "Ottawa"
          },
          {
            value: "Paris",
            label: "Paris"
          },
          {
            value: "Canberra",
            label: "Canberra"
          }
        ]
      };
    },
    mounted: function () {
      document.title = "团队动态 - EasyAPI";
      window.addEventListener("scroll", this.lazyLoading); // 滚动到底部，再加载的处理事件
      this.getEventList();
    },
    methods: {
      getPageList(){
         if (this.pagination.page < this.pagination.totalPages - 1) {
          this.pagination.page = this.pagination.page + 1
          this.getEventList()
         }
      },
      getEventList() {
        let params = {
            size:this.pagination.size,
            page:this.pagination.page
        }
        getEventList(params).then(res => {
          if (res.data.code == 1) {
            for (let a of res.data.content) {
              a.addTime = new Date(a.addTime).toLocaleTimeString();
            }
            this.eventListArray = this.eventListArray.concat(res.data.content);
            this.pagination.totalPages = res.data.totalPages;
          }else{
            this.noData = true
          }
        });
      },
      weekTime(time){
        let weekArray = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
        let week = weekArray[new Date(time).getDay()];
        return week;
      },
      lazyLoading() { // 滚动到底部，再加载的处理事件
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        let clientHeight = document.documentElement.clientHeight;
        let scrollHeight = document.documentElement.scrollHeight;
        if (scrollHeight - clientHeight - scrollTop <= 10) { // 滚动到底部，逻辑代码
          //事件处理
          this.getPageList();
        }
      },
    }
  };
</script>

<style scoped>
  .event_card {
    max-width: 1200px;
    overflow: hidden;
    margin:30px auto;
  }

  .event_ti {
    position: relative;
    padding: 20px;
  }

  .screen {
    font-size: 18px;
    margin-left: 20px;
  }

  .btn-link {
    font-weight: 400;
    color: #428bca;
    border-radius: 0;
    cursor: pointer;
  }

  .eventbox {
    padding-top: 40px;
  }

  .mr {
    background: #1ac1d6;
    display: inline-block;
    font-size: 12px;
    color: #ffffff;
    width: 54px;
    text-align: center;
    border-radius: 50%;
    height: 54px;
    border: 2px solid #1ac1d6;
  }

  .event_avatar {
    margin: 0 15px 0 50px
  }

  .event_info {
    margin-right: 3px;
    color: #999999;
  }

  .addTime {
    color: #999999;
  }

  .em {
    font-size: 16px;
    font-style: normal;
    line-height: 50px;
    height: 50px;
    padding: 0 20px;
    background: #fff;
    display: inline-block;
  }

  .ivu-divider-dashed {
    background: 0 0;
    border-top: 1px dashed #555555;
    position: relative;
    top: -48px;
    left: 120px;
  }

  .ivu-divider-horizontal {
    display: block;
    height: 1px;
    width: 92%;
    min-width: 5%;
    margin: 24px 0;
    clear: both;
  }

  .event_content {
    padding: 8px 0 8px 70px;
    line-height: 50px;
    position: relative;
    top: -50px;
  }
  .no-data{
    margin: 200px auto;
    text-align: center;
  }
</style>
<style lang="scss">
</style>
