<template>
  <div class="event_card">
    <div class="event_ti">
      <span class="screen">筛选项目：
      </span>
      <Dropdown trigger="click">
        <span class="btn-link">
          所有项目
          <Icon type="md-arrow-dropdown"/>
        </span>
        <DropdownMenu slot="list">
          <DropdownItem>驴打滚</DropdownItem>
          <DropdownItem>炸酱面</DropdownItem>
          <DropdownItem>豆汁儿</DropdownItem>
          <DropdownItem>冰糖葫芦</DropdownItem>
          <DropdownItem>北京烤鸭</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <span class="screen">筛选成员：
      </span>
      <Dropdown trigger="click">
        <span class="btn-link">
          所有成员
          <Icon type="md-arrow-dropdown"/>
        </span>
        <DropdownMenu slot="list">
          <DropdownItem>驴打滚</DropdownItem>
          <DropdownItem>炸酱面</DropdownItem>
          <DropdownItem>豆汁儿</DropdownItem>
          <DropdownItem>冰糖葫芦</DropdownItem>
          <DropdownItem>北京烤鸭</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <div class="eventbox">
      <div>
        <ul>
          <li v-for="item in eventListArray" :key="item">
            <div class="mr">
              <p>07/18</p>
              <p>星期二</p>
            </div>
            <div class="em">简碳</div>
            <Divider dashed="true"/>
            <div class="event_content">
              <span class="addTime">{{item.addTime}}</span>
              <Avatar icon="ios-person" size="50" class="event_avatar" :src="item.user.photo"/>
              <span><strong class="event_info">磊大</strong>修改了:<span class="shd"
                                                                    v-html="item.content">{{item.content}}</span></span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {getEventList} from "../../api/event";

  export default {
    name: "Event",
    data: function () {
      return {
        showPro: false,
        showMem: false,
        eventListArray: []
      };
    },
    created: function () {

    },
    mounted: function () {
      document.title = "团队动态 - EasyAPI";
      this.getEventList();
    },
    methods: {
      getEventList() {
        getEventList().then(res => {
          if (res.data.code == 1) {
            this.eventListArray = res.data.content;
          }
        });
      }
    }
  };
</script>

<style scoped>
  .event_card {
    margin: 30px 40px;
    border: #dcdee2 1px solid;
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
    padding: 40px;
  }

  .mr {
    background: #fff;
    display: inline-block;
    font-size: 12px;
    float: left;
    color: #999;
    width: 54px;
    text-align: center;
    border-radius: 50%;
    height: 54px;
    border: 2px solid #ddd;
  }

  .event_avatar {
    margin: 0 15px
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
</style>
<style lang="scss">

</style>
