<template>
  <div class="Insequence">
    <div class="container">
      <div class="service-item" v-for="(service,index) of services" :key="index">
        <img :src="service.service.img" alt class="service-icon" />
        <div class="service-detail">
          <div>
            <div class="service-name">{{service.service.name.replace('（',"(").replace('）',")")}}</div>
            <div class="service-type">
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
          >续费</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getUserService } from '../../api/api'
export default {
  data() {
    return {
      services: []
    }
  },
  methods: {
    getAllServices() {
      this.$ajax(getUserService, { params: { size: 50 } }).then(res => {
        let content = res.data.content.filter(item => {
          return item.service.type != 1 && item.service.type != 4
        })
        this.services.push(...content)
      })
    },
    jumpPay(item) {
      let service = item.service
      console.log(service.name)
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
    this.getAllServices()
  }
}
</script>
<style scoped lang="stylus">
.Insequence {
  padding: 20px 0;
}

.container {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;

  .service-item {
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

      .service-detail {
        .pay-btn {
          opacity: 1;
        }
      }
    }

    &:nth-child(4n) {
      margin-right: 0;
    }

    .service-icon {
      width: 80px;
      height: 80px;
    }

    .service-detail {
      min-height: 80px;
      margin-left: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .service-name {
        font-size: 16px;
        font-weight: bold;
        line-height: 20px;
      }

      .service-type {
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
}
</style>