<template>
  <div class="count">
    <div class="title">
      <span>{{name}}服务续费</span>
    </div>
    <div class="Insequence_conter">
      <div class="Insequence_service">
        <strong class="Insequence_service_title">服务价格：</strong>
        <div class="left">
          <div class="Insequence_Price " :class="{eaActive:selectMoney===price.times}" v-for="(price,i) in frequency"
               @click="selectMoneyFn(price.times,price.servicePriceId,price.discount, price.price,price.times)">
            <strong>{{price.times}}次&nbsp;&nbsp;￥{{ price.price - price.discount}}</strong>
            <p>￥{{onePrice[i]}}/次</p>
          </div>
        </div>
      </div>
      <div class="Insequence_service">
        <strong class="Insequence_service_title">支付方式：</strong>
        <div class="left">
          <div class="payment" :class="{state:payment==='余额支付'}" @click="stand('余额支付')"
               v-if="balance >= price - discount">
            <span><strong>余额支付(￥{{balance}})</strong></span>
          </div>
          <div v-if="balance < price - discount ">
            <div class="payment_p" :class="{state:payment==='余额支付'}" @click="stand('余额支付')">
              <span><strong>余额支付(￥{{balance}})</strong></span>
            </div>
            <span style="display: block;color: #303030;line-height:25px;width:245px">余额不足，建议使用其他支付方式，或者 <a
              href="https://team.easyapi.com/account" style="color: #1cc0d6;">充值</a></span>
          </div>
          <div class="payment" :class="{state:payment==='微信支付'}" @click="stand('微信支付')">
            <span><img src="../../assets/images/wechat.png" alt="" style="padding-top:10px;"></span>
          </div>
          <div class="payment" :class="{state:payment==='支付宝'}" @click="stand('支付宝')">
            <span> <img src="../../assets/images/alipay.png" alt="" style="padding-top:8px;"></span>
          </div>
        </div>
      </div>
      <div class="Insequence_fl">
        <strong class="Insequence_service_title">剩余次数:</strong>
        <div class="frequency">
          <strong style="color: #323232;font-size: 14px;">{{surplus}}次</strong>
        </div>
      </div>
      <div class="Insequence_fl">
        <strong class="Insequence_service_title" style="padding-top:10px">应付金额：</strong>
        <div class="frequency">
          <strong style="color: #fa2222;font-size: 26px;">{{price - discount}}</strong>&nbsp;<span
          style="color: #323232;font-size: 14px;">元</span>
        </div>
      </div>
      <div class="Insequence_fa">
        <Button v-if="balance >= discount || payment !== '余额支付'"
                style="border-radius: 4px;background-color: #1cc0d6;color: #fff;font-size: 14px;" @click="Sure">确定购买
        </Button>
        <Button v-if="balance < discount && payment == '余额支付'"
                style="border-radius: 4px;background-color: #1cc0d6;color: #fff;font-size: 14px;" disabled
                @click="Sure">确定购买
        </Button>
        <span
          style="display: block;padding-top:5px;color: #888888;font-size: 12px;">若在购买过程中遇到任何问题，请致电：13656171020</span>
        <Modal
          v-model="purchase"
          @on-ok="determineThePurchase">
          <p style="text-align: center;font-size: 16px">你确定续费吗？</p>
        </Modal>
      </div>
    </div>
  </div>
</template>
<script>
  import {ServiceList, balance, paymentMethod, Surplus} from "../../api/api"
  import Cookies from 'js-cookie'

  export default {
    data() {
      return {
        purchase: false,
        frequency: '',
        selectMoney: '',
        servicePriceId: '',
        balance: '',
        payment: '余额支付',
        discount: '',
        howMany: '',
        serviceId: '',
        teamServiceId: '',
        onePrice: [],
        authenticationToken: '',
        formHtml: '',
        price: '',
        name: '',
        times: '',
        surplus: '',
      }
    },
    methods: {
      selectMoneyFn(M, servicePriceId, discount, price, times) {
        this.selectMoney = M;
        this.servicePriceId = servicePriceId;
        this.discount = discount;
        this.price = price;
        this.times = times;
        this.surplus = this.howMany + this.times
      },
      stand(payment) {
        this.payment = payment
      },
      //查询 服务报价列表
      getServiceList() {
        let second = '';
        this.$ajax({
          method: 'get',
          url: ServiceList + this.serviceId,
          headers: {
            "authorization": this.authenticationToken,
            'Content-Type': 'application/json',
          },
        }).then(res => {
          if (res.data.code !== 0) {
            this.frequency = res.data.content
            this.selectMoney = res.data.content[0].times
            this.discount = res.data.content[0].discount
            this.price = res.data.content[0].price
            this.servicePriceId = res.data.content[0].servicePriceId
            for (var i = 0; i < this.frequency.length; i++) {
              second = ((this.frequency[i].price - this.frequency[i].discount) / this.frequency[i].times).toFixed(4)
              this.onePrice.push(second)
            }
          }
        }).catch(error => {
          console.log(error)
        })
      },
      //余额
      choosePaymentMethod() {
        this.$ajax({
          method: 'GET',
          url: paymentMethod,
          headers: {
            "authorization": this.authenticationToken,
          }
        }).then(res => {
          this.balance = res.data.content.balance
        }).catch(error => {
          console.log(error)
        })
      },
      //剩余多少次
      howMuchOfTheRest() {
        this.$ajax({
          method: 'get',
          url: Surplus + "/" + this.teamServiceId,
          headers: {
            "authorization": this.authenticationToken,
          }
        }).then(res => {
          this.howMany = res.data.balance
          this.surplus = this.frequency[0].times + this.howMany
          this.name = res.data.service.name
        }).catch(error => {
          console.log(error)
        })
      },
      //确定购买
      Sure() {
        this.purchase = true
      },
      determineThePurchase() {
        this.$ajax({
          method: 'post',
          url: balance,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            "authorization": this.authenticationToken,
          },
          params: {
            servicePriceId: this.servicePriceId,
            payment: this.payment
          }
        }).then(res => {
          if (this.payment === '支付宝') {
            this.formHtml = res.data.alipay
            let form = $(this.formHtml);
            form.attr('target', '_blank');
            $('#app').append(form);
            // const {href} = this.$router.resolve({path: '/renew/alipay', query: {"html": res.data.alipay}})
            // this.html = res.data.result
            // window.open(href.href, '_ blank')
            // const div = document.createElement('div');
            // div.innerHTML = html;
            // document.body.appendChild(div);
            // document.forms[0].submit();
          } else if (this.payment === '微信支付') {
            let weChatPayment = res.data.codeUrl
            console.log(weChatPayment)
            this.$Modal.confirm({
              title: '微信扫码支付',
              content: `<div class="wx-pay"><p class="wx-pay_amount">支付${this.price - this.discount}元</p><p><img src="http://qr.liantu.com/api.php?text=${weChatPayment}"></img></p><p>请使用微信扫描二维码以完成支付</p></div>`,
              onOk: () => {
                this.getServiceList()
                this.choosePaymentMethod()
                this.howMuchOfTheRest()
              }
            });
          }
          this.$Message.success(res.data.message)
        }).catch(error => {
          if (this.payment == '' || this.payment == null) {
            this.$Message.warning("请选择和支付方式")
          } else {
            this.$Message.error(error.response.data.message)
          }
        })
      },
    },
    created() {
      this.serviceId = this.$route.query.serviceId;
      this.teamServiceId = this.$route.query.teamServiceId;
      this.authenticationToken = 'Bearer ' + Cookies.get("authenticationToken")
    },
    mounted() {
      document.title = '服务续费 - EasyAPI'
      this.getServiceList()
      this.choosePaymentMethod()
      this.howMuchOfTheRest()
    }
  }
</script>
<style scoped>
  .count {
    width: 100%;
    height: auto;
  }

  .count .title {
    width: 100%;
    height: 80px;
    background-color: #ecf1f5;
  }

  .count .title span {
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
    content: " ";
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
    content: " ";
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
