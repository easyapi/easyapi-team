<template>
  <div class="service-list_item" v-for="(service,index) of services" :key="index">
    <img :src="service.service.img" alt class="service-list_item_icon"/>
    <div class="service-list_item_detail">
      <div>
        <div class="service-list_item_name">{{service.service.name.replace('（',"(").replace('）',")")}}</div>
        <div class="service-list_item_type">
              <span v-if="service.service.type==2">
                剩余
                <span
                  :style="{color:service.teamService.balance<=100?'#f66':'black'}"
                >{{service.teamService.balance}}</span> 次
              </span>
          <span v-if="service.service.type==3">
                剩余
                <span
                  :style="{color:service.teamService.remainDay<=30?'#f66':'black'}"
                >{{service.teamService.remainDay}}</span> 天
              </span>
        </div>
      </div>
      <div
        class="pay-btn"
        :class="(service.service.type==2&&service.teamService.balance<=100)||(service.service.type==3&&service.teamService.remainDay<=30)?'busy':'normal'"
        @click="jumpPay(service)"
      >续费
      </div>
    </div>
  </div>
</template>
<script>
  import {getUserService} from '../../../api/service'

  export default {
    data() {
      return {
        services: []
      }
    },
    methods: {
      getTeamServices() {
        this.$ajax(getUserService, {params: {size: 50}}).then(res => {
          let content = res.data.content.filter(item => {
            return item.service.type != 1 && item.service.type != 4
          })
          this.services.push(...content)
        })
      },
      jumpPay(item) {
        let service = item.service
        let query = {
          type: service.type,
          serviceId: service.serviceId,
          serviceName: service.name
        }
        if (service.type == 2) {
          query.num = item.teamService.balance
        }
        if (service.type == 3) {
          query.num = item.teamService.remainDay
        }
        this.$router.push({
          path: '/services/pay',
          query: query
        })
      }
    },
    created() {
      this.getTeamServices()
    }
  }
</script>
<style scoped lang="stylus">
  .service-list_item {
    width: 285px;
    height: 120px;
    margin: 0 20px 20px 0;
    background-color: #ffffff;
    border: solid 1px #dddddd;
    padding-left: 20px;
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover {
      box-shadow: 0 2px 7px 0 rgba(1, 1, 1, 0.1);

      .service-list_item_detail {
        .pay-btn {
          opacity: 1;
        }
      }
    }

    &:nth-child(4n) {
      margin-right: 0;
    }

    .service-list_item_icon {
      width: 80px;
      height: 80px;
    }

    .service-list_item_detail {
      min-height: 80px;
      margin-left: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .service-list_item_name {
        font-size: 16px;
        font-weight: bold;
        line-height: 20px;
      }

      .service-list_item_type {
        font-size: 12px;
        line-height: 26px;
      }

      .pay-btn {
        width: 50px;
        text-align: center;
        border-radius: 2px;
        color: #fff;
        cursor: pointer;
        opacity: 0;

        &.busy {
          background-color: #ff4a53;
          opacity: 1;
        }

        &.normal {
          background-color: #40b8cc;
        }
      }
    }
  }
</style>
