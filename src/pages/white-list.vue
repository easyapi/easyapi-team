<template>
  <div class="white-list">
    <div class="title">
      <span>IP白名单</span>
    </div>
    <div class="center">
      <div class="choice">
        <p class="choice_title">
          <span class="choicen_one">选择服务</span>
          <span class="choicen_two">[
                  <span :value="checkAll" @click="handleCheckAll">全选</span> |
                  <span :value="checkAll" @click="handleCheckAll1">全不选</span>]
             </span>
        </p>
        <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange" class="CheckboxGroup">
          <Checkbox :label="item.service.serviceId" v-for="(item,index) in CheckboxData" class="Checkbox">
            {{item.service.name}}
          </Checkbox>
        </CheckboxGroup>
      </div>
      <div class="inpit_l">
        <Input v-model="IpWhiteListData" type="textarea" placeholder="请输入白名单IP..." class="inpuit"/>
        <ul>
          <li>格式说说明；</li>
          <li>一行写一个IP，如：</li>
          <li>192.168.1.124</li>
          <li>192.168.1.126</li>
          <li>(充值类业务如话费、油卡等，强烈建议绑定服务IP白名单)</li>
        </ul>
      </div>
      <Button class="btn" @click="modifyWhiteList">保存设置</Button>
    </div>
  </div>
</template>
<script>
  import {getUserService, whiteList, modify} from "../api/api"
  import Cookies from 'js-cookie'

  export default {
    data() {
      return {
        serverIds: '',//服务的id逗号隔开字符串
        value: '',
        IpWhiteListData: '',
        indeterminate: false,
        checkAll: false,
        checkAllGroup: [],
        CheckboxData: [],
        authenticationToken: '',
      }
    },
    methods: {
      handleCheckAll() {
        this.checkAll = true;
        this.checkAllGroup = [];
        for (let i = 0; i < this.CheckboxData.length; i++) {
          this.checkAllGroup.push(this.CheckboxData[i].service.serviceId)
        }
      },
      handleCheckAll1() {
        this.checkAllGroup = []
      },
      checkAllGroupChange(data) {
        if (data.length === this.CheckboxData.length) {
          this.indeterminate = false;
          this.checkAll = true;
        } else if (data.length > 0) {
          this.indeterminate = true;
          this.checkAll = false;
        } else {
          this.indeterminate = false;
          this.checkAll = false;
        }
      },
      //获取我的服务
      getMyServe() {
        this.$ajax({
          method: 'get',
          url: getUserService,
          params: {
            size: 100,
          },
          headers: {
            "authorization": this.authenticationToken,
            'Content-Type': 'application/json',
          }
        }).then(res => {
          this.CheckboxData = res.data.content;
        }).catch(error => {
          console.log(error)
          this.$Message.error(error.body.message)
        })
      },
      //获取白名单
      getWhiteList() {
        this.$ajax({
          url: whiteList,
          method: 'get',
          headers: {
            "authorization": this.authenticationToken,
          }
        }).then(res => {
          this.IpWhiteListData = res.data.content.ips;
          this.serverIds = res.data.content.whiteListId
          let serviceIdsData = res.data.content.serviceIds.split(",");
          for (let i = 0; i < serviceIdsData.length; i++) {
            serviceIdsData[i] = Number(serviceIdsData[i])
          }
          this.checkAllGroup = serviceIdsData;
        }).catch(error => {
          console.log(error)
          // this.$Message.error(error.body.message)
        })
      },
      //修改白名单
      modifyWhiteList() {
        let obj = {}
        obj.id = this.serverIds;
        obj.serviceIds = this.checkAllGroup.join(",");
        obj.ips = this.IpWhiteListData;
        this.$ajax({
          url: modify,
          method: 'put',
          headers: {
            "authorization": this.authenticationToken,
          },
          data: obj,
        }).then(res => {
          this.$Message.success(res.data.message)
          this.getMyServe();
          this.getWhiteList();
        }).catch(error => {
          console.log(error)
          this.$Message.error(error.data.message)
        })
      }
    },
    created() {
      this.authenticationToken = 'Bearer ' + Cookies.get("authenticationToken")
      console.log(this.authenticationToken)
    },
    mounted() {
      document.title = 'IP白名单 - EasyAPI'
      //获取我的服务
      this.getMyServe();
      //获取ip白名单
      this.getWhiteList();
    }
  }
</script>
<style>
  .inpuit .ivu-input {
    width: 600px;
    height: 200px;
    background-color: #ffffff;
    border-radius: 2px;
    border: solid 1px #dddddd;
  }

  .Checkbox .ivu-checkbox {
    padding-right: 10px;
  }
</style>

<style scoped>
  .white-list {
    width: 100%;
    height: auto;

  }

  .white-list .title {
    width: 100%;
    height: 80px;
    background-color: #fafafa;
  }

  .white-list .title span {
    width: 1200px;
    height: 80px;
    line-height: 80px;
    margin: 0 auto;
    font-size: 18px;
    display: block;
    color: #000000;
  }

  .center {
    width: 1200px;
    height: auto;
    margin: 0 auto;
  }

  .choice {
    width: 100%;
    height: auto;
    margin-top: 20px;
  }

  .choice .choice_title {
    width: 100%;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
  }

  .choice .choice_title .choicen_one {
    color: #323232;
    font-size: 16px;
  }

  .choice .choice_title .choicen_two {
    margin-left: 10px;
    color: #999999;
    letter-spacing: 1px;
    font-size: 14px;
  }

  .CheckboxGroup {
    width: 100%;
    height: auto;
    margin-top: 20px;
  }

  .Checkbox {
    width: 24%;
    height: 45px;
    color: #323232;
    font-size: 14px;
  }

  .inpit_l {
    width: 100%;
    height: auto;
    display: flex;
  }

  .inpuit {
    width: 600px;
    height: 200px;
    background-color: #ffffff;
    border-radius: 2px;
    border: solid 1px #dddddd;
  }

  .inpit_l ul {
    width: 50%;
    height: auto;
    padding-left: 10px;
  }

  .inpit_l ul li {
    height: 20px;
    color: #999999;
    font-size: 12px;
    list-style: none;
  }

  .btn {
    width: 100px;
    height: 34px;
    background-color: #18c1d6;
    color: #ffffff;
    font-size: 14px;
    margin-top: 20px;
  }
</style>
