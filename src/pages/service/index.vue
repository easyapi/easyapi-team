<template>
  <div class="Insequence">
    <div class="Insequence-title">
      <span>{{ name }}服务续费</span>
    </div>
    <div class="Insequence_conter">
      <div class="Insequence_service">
        <strong class="Insequence_service_title">服务价格：</strong>
        <div class="left">
          <div
            class="Insequence_Price"
            :class="{ eaActive: selectMoney === price.month }"
            v-for="(price, i) in frequency"
            :key="i"
            @click="
              selectMoneyFn(price.month, null, null, price.price, price.month)
            "
          >
            <strong v-if="price.month < 12">
              {{ price.month }}月&nbsp;&nbsp;￥{{
              price.price.toFixed(2)
              }}
            </strong>
            <p v-if="price.month < 12">￥{{ onePrice[i] }}/月</p>
            <strong v-if="price.month >= 12">
              {{ price.month / 12 }}年&nbsp;&nbsp;￥{{
              price.price.toFixed(2)
              }}
            </strong>
            <p v-if="price.month >= 12">￥{{ onePrice[i] }}/月</p>
          </div>
        </div>
      </div>
      <div class="Insequence_service">
        <strong class="Insequence_service_title">支付方式：</strong>
        <div class="left">
          <div
            class="payment"
            :class="{ state: assignment === '余额支付' }"
            @click="stand('余额支付')"
            v-if="balance >= price"
          >
            <span>
              <strong>余额支付(￥{{ balance }})</strong>
            </span>
          </div>
          <div
            class="payment_p"
            :class="{ state: assignment === '余额支付' }"
            @click="stand('余额支付')"
            v-if="balance < price"
          >
            <span>
              <strong>余额支付(￥{{ balance }})</strong>
            </span>
            <span style="display: block;color: #303030;line-height:25px;width:285px">
              余额不足，建议使用其他支付方式，或者
              <a
                href="https://team.easyapi.com/account"
                style="color: #1cc0d6;"
              >充值</a>
            </span>
          </div>
          <div class="payment" :class="{ state: assignment === '微信支付' }" @click="stand('微信支付')">
            <span>
              <img src="../../assets/images/wechat.png" alt style="padding-top:10px;" />
            </span>
          </div>
          <div class="payment" :class="{ state: assignment === '支付宝' }" @click="stand('支付宝')">
            <span>
              <img src="../../assets/images/alipay.png" alt style="padding-top:8px;height:40px;" />
            </span>
          </div>
        </div>
      </div>
      <div class="Insequence_fl">
        <strong class="Insequence_service_title">到期时间：</strong>
        <div class="frequency">
          <strong style="color: #323232;font-size: 14px;">{{ dueTime }}</strong>
        </div>
      </div>
      <div class="Insequence_fl">
        <strong class="Insequence_service_title" style="padding-top:10px">应付金额：</strong>
        <div class="frequency">
          <strong style="color: #fa2222;font-size: 26px;">
            {{
            price.toFixed(2)
            }}
          </strong>&nbsp;
          <span style="color: #323232;font-size: 14px;">元</span>
        </div>
      </div>
      <div class="Insequence_fa">
        <Button
          v-if="balance >= price || assignment !== '余额支付'"
          style="border-radius: 4px;background-color: #1cc0d6;color: #fff;font-size: 14px;"
          @click="Sure"
        >确定购买</Button>
        <Button
          v-if="balance < price && assignment == '余额支付'"
          style="border-radius: 4px;background-color: #1cc0d6;color: #fff;font-size: 14px;"
          disabled
          @click="Sure"
        >确定购买</Button>
        <span
          style="display: block;padding-top:5px;color: #888888;font-size: 12px;"
        >若在购买过程中遇到任何问题，请致电：13656171020</span>
      </div>
      <Modal v-model="purchase" @on-ok="determineThePurchase">
        <p style="text-align: center;font-size: 16px">你确定续费吗？</p>
      </Modal>
    </div>
  </div>
</template>
<script>
import {
  ServiceList,
  balance,
  getAccountMoney,
  paymentMethod,
  documentRenewUrl
} from '../../api/api'
import calcudate from 'calcudate'
import accountUser from '../../store/modules/user'
import $ from 'jquery'

export default {
  data() {
    return {
      purchase: false,
      frequency: '',
      selectMoney: '',
      servicePriceId: '',
      balance: '',
      assignment: '余额支付',
      discount: '',
      howMany: '',
      serviceId: '',
      teamServiceId: '',
      onePrice: [],
      authenticationToken: '',
      price: 0,
      name: '',
      dateMonth: '',
      dueTime: '',
      clockItem: ''
    }
  },
  methods: {
    selectMoneyFn(M, servicePriceId, discount, price, month) {
      let now = ''
      if (this.howMany) {
        now = new Date(this.howMany)
      } else {
        now = new Date()
      }
      this.selectMoney = M
      // this.servicePriceId = servicePriceId;
      // this.discount = discount;
      this.price = price
      this.dateMonth = Number(month)
      this.dueTime = calcudate
        .add(now)
        .months(this.dateMonth)
        .toLocaleDateString()
      console.log(price)
      console.log(month)
      console.log(this.howMany)
      console.log(now)
      console.log(new Date('2019-08-03'))
    },
    stand(pay) {
      this.assignment = pay
    },
    //查询 服务报价列表
    getServiceList() {
      let second = ''
      this.$ajax({
        method: 'get',
        url: ServiceList,
        headers: {
          authorization: this.authenticationToken
        }
      })
        .then(res => {
          if (res.data.code !== 0) {
            let arr = []
            Object.keys(res.data.content).forEach(function(key) {
              let obj = {}
              obj.month = key
              obj.price = res.data.content[key]
              arr.push(obj)
            })

            this.frequency = arr
            console.log(this.frequency)
            // this.servicePriceId = res.data.content[0].servicePriceId
            for (let v of this.frequency) {
              second = (v.price / v.month).toFixed(2)
              this.onePrice.push(second)
            }
            console.log(this.onePrice)
            this.howMuchOfTheRest()
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    //余额
    choosePaymentMethod() {
      this.$ajax({
        method: 'get',
        url: paymentMethod,
        headers: {
          authorization: this.authenticationToken
        }
      })
        .then(res => {
          this.balance = res.data.content.balance
        })
        .catch(error => {
          console.log(error)
        })
    },
    getTeamInfo() {
      this.$ajax({
        method: 'GET',
        url: getAccountMoney,
        params: {
          teamId: this.$store.state.user.team.id
        }
      }).then(res => {
        console.log(res)
        if (res.data.code == 1) {
          this.balance = res.data.content.balance

          // 设置预警值
          // if (res.data.content.warningBalance > 0) {
          //   this.moneyWarnSize = res.data.content.warningBalance;
          //   this.needMoneyWarn = true;
          // } else {
          //   this.needMoneyWarn = false;
          // }
        }
      })
    },
    //剩余多少日期
    howMuchOfTheRest() {
      let documentEndTime = accountUser.state.accountInfo.team.documentEndTime
      let now = ''
      if (documentEndTime && documentEndTime >= this.clockItem) {
        this.howMany = documentEndTime.split(' ')[0]
        now = new Date(this.howMany)
        this.dueTime = calcudate
          .add(now)
          .months(this.dateMonth)
          .toLocaleDateString()
      } else {
        now = new Date()
        this.dueTime = calcudate
          .add(now)
          .months(this.selectMoney)
          .toLocaleDateString()
      }
      // this.howMany = accountUser.state.accountInfo.team.documentEndTime;
      // this.dueTime = this.howMany?this.howMany:'已到期，请续费^_^';
    },
    //当前时间
    getItem() {
      var currentTime = new Date()
      console.log(currentTime.toLocaleString())
      var year = currentTime.getFullYear() //年
      var month = currentTime.getMonth() + 1 //月
      var day = currentTime.getDate() //日

      var hh = currentTime.getHours() //时
      var mm = currentTime.getMinutes() //分
      var ss = currentTime.getSeconds() //秒
      this.clockItem = year + '-'

      if (month < 10) this.clockItem += '0'

      this.clockItem += month + '-'

      if (day < 10) this.clockItem += '0'

      this.clockItem += day + ' '

      if (hh < 10) this.clockItem += '0'

      this.clockItem += hh + ':'
      if (mm < 10) this.clockItem += '0'
      this.clockItem += mm + ':'

      if (ss < 10) this.clockItem += '0'
      this.clockItem += ss
      console.log(this.clockItem)
    },
    //确定购买
    Sure() {
      if (this.selectMoney === '') {
        this.$Message.warning('请选择服务价格')
        return
      }
      this.purchase = true
    },
    determineThePurchase() {
      // if(){

      // }
      this.$ajax({
        method: 'POST',
        url: documentRenewUrl,
        headers: {
          authorization: this.authenticationToken
        },
        params: {
          month: this.selectMoney,
          price: this.price,
          payment: this.assignment
        }
      })
        .then(res => {
          console.log(res)
          if (this.assignment === '支付宝') {
            this.formHtml = res.data.alipay
            console.log(this.formHtml)
            let form = $(this.formHtml)
            form.attr('target', '_blank')
            $('#app').append(form)
          } else if (this.assignment === '微信支付') {
            let weChatPayment = res.data.codeUrl
            this.$Modal.confirm({
              title: '微信扫码支付',
              content: `<div class="wx-pay"><p class="wx-pay_amount">支付${this
                .price -
                this
                  .discount}元</p><p><img src="http://qr.liantu.com/api.php?text=${weChatPayment}"></img></p><p>请使用微信扫描二维码以完成支付</p></div>`,
              okText: '',
              cancelText: '',
              onOk: () => {
                this.getServiceList()
                // this.choosePaymentMethod()
                this.getTeamInfo()
                this.howMuchOfTheRest()
              }
            })
          }
          this.$Message.success(res.data.message)
        })
        .catch(error => {
          if (this.assignment == '' || this.assignment == null) {
            this.$Message.warning('请选择和支付方式')
          } else {
            this.$Message.error(error.response.data.message)
          }
        })
    },
    getCookie(name) {
      var arr,
        reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
      if ((arr = document.cookie.match(reg))) return arr[2]
      else return null
    }
  },
  created() {
    this.serviceId = this.$route.query.serviceId
    this.teamServiceId = this.$route.query.teamServiceId
    this.getItem()
    this.getTeamInfo()
    this.authenticationToken = 'Bearer ' + this.getCookie('authenticationToken')
  },
  mounted() {
    document.title = '服务续费 - EasyAPI'
    this.getServiceList()
    // this.choosePaymentMethod()
  },
  watch: {}
}
</script>
<style scoped>
.Insequence {
  width: 100%;
  height: auto;
}

.Insequence .Insequence-title {
  width: 100%;
  height: 80px;
  background-color: #ecf1f5;
}

.Insequence .Insequence-title span {
  width: 1200px;
  height: 80px;
  line-height: 80px;
  margin: 0 auto;
  font-size: 18px;
  display: block;
  color: #000000;
}

.Insequence_conter {
  width: 1200px;
  height: auto;
  margin: 0 auto;
}

.Insequence_service {
  width: 100%;
  height: 100px;
  display: flex;
  margin-top: 30px;
}

.Insequence_service_title {
  width: 8%;
  height: 100%;
  display: block;
  color: #323232;
  font-size: 14px;
}

.Insequence_Price {
  width: 216px;
  height: 100px;
  text-align: center;
  background-color: #ffffff;
  border-radius: 4px;
  border: solid 1px #dfdfdf;
  margin-left: 18px;
  cursor: pointer;
}

.Insequence_Price:hover {
  border: solid 1px #1bc0d5;
}

.Insequence_Price:hover strong {
  color: #1cc0d5;
}

.Insequence_Price:first-child {
  margin-left: 0px;
}

.eaActive {
  width: 216px;
  height: 100px;
  background-color: #ffffff;
  border-radius: 4px;
  border: solid 1px #1bc0d5;
  position: relative;
}

.eaActive p:before {
  position: absolute;
  left: 195px;
  top: 79px;
  content: ' ';
  width: 20px;
  height: 20px;
  background-image: url(../../assets/images/checked.png);
  background-size: cover;
}

.eaActive strong {
  color: #1cc0d5 !important;
}

.left {
  width: 92%;
  height: auto;
  display: flex;
}

.Insequence_Price strong {
  font-size: 18px;
  line-height: 30px;
  padding-top: 20px;
  display: block;
  color: #323232;
}

.Insequence_Price p {
  font-size: 14px;
  color: #888888;
}

.payment {
  width: 216px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background-color: #ffffff;
  border: solid 1px #dfdfdf;
  font-size: 14px;
  color: #323232;
  margin-left: 18px;
  cursor: pointer;
}

.payment:first-child {
  margin-left: 0px;
}

.state {
  width: 215px;
  height: 50px;
  background-color: #ffffff;
  border-radius: 4px;
  border: solid 1px #1bc0d5;
  position: relative;
}

.state span:before {
  position: absolute;
  left: 193px;
  top: 28px;
  content: ' ';
  width: 20px;
  height: 20px;
  background-image: url(../../assets/images/checked.png);
  background-size: cover;
}

.Insequence_fl {
  width: 100%;
  height: 55px;
  display: flex;
}

.Insequence_fa {
  width: 100%;
  height: 80px;
  padding-left: 95px;
}

.Insequence_fa button {
  width: 120px;
  height: 40px;
  text-align: center;
}

.payment_p {
  width: 216px;
  height: 50px;
  line-height: 50px;
  background-color: #eeeeee;
  border-radius: 4px;
  border: solid 1px #dfdfdf;
  cursor: pointer;
  font-size: 14px;
  text-align: center;
  color: #676767;
}
</style>
