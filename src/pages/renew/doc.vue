<template>
  <div class="Insequence">
    <div class="Insequence-title">
      <span>文档续费</span>
    </div>
    <div class="Insequence_conter">
      <div class="Insequence_service">
        <strong class="Insequence_service_title">文档价格：</strong>
        <div class="left">
          <div
            class="Insequence_Price"
            :class="{ eaActive: selectMoney === price.num }"
            v-for="(price, i) in frequency"
            :key="i"
            @click="selectMoneyFn(price.num, price.price)"
          >
            <strong>
              {{ 12 > price.num ? price.num + "月"  : parseInt(price.num / 12) + "年" + (price.num % 12 !== 0 ? (price.num % 12) + "月" : "") }}&nbsp;&nbsp;￥{{
              price.price.toFixed(2)
              }}
            </strong>
            <p>￥{{ price.once }}/月</p>
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
            <span
              style="
                display: block;
                color: #303030;
                line-height: 25px;
                width: 285px;
              "
            >
              余额不足，建议使用其他支付方式，或者
              <a href="https://team.easyapi.com/account" style="color: #1cc0d6"
              >充值</a
              >
            </span>
          </div>
          <div
            class="payment"
            :class="{ state: assignment === '微信支付' }"
            @click="stand('微信支付')"
          >
            <span>
              <img src="../../assets/images/wxpay.png" alt style="padding-top:8px;height: 40px"/>
            </span>
          </div>
          <div
            class="payment"
            :class="{ state: assignment === '支付宝' }"
            @click="stand('支付宝')"
          >
            <span>
              <img
                src="../../assets/images/alipay.png"
                alt
                style="padding-top: 8px; height: 40px"
              />
            </span>
          </div>
        </div>
      </div>
      <div class="Insequence_fl">
        <strong class="Insequence_service_title">团队人数：</strong>
        <div class="frequency">
           <InputNumber v-model="number" controls-outside :min="teamNum"></InputNumber>
        </div>
      </div>
      <p style="margin-top:-10px;margin-bottom:10px;margin-left:100px;color: #888888;font-size: 12px;">提示：团队超出20人，超出部分按每人5元计算</p>
      <div class="Insequence_fl">
        <strong class="Insequence_service_title">到期时间：</strong>
        <div class="frequency">
          <strong style="color: #323232; font-size: 14px">{{dateFormat(date)}}</strong>
        </div>
      </div>
      <div class="Insequence_fl">
        <strong class="Insequence_service_title" style="padding-top: 10px"
        >应付金额：</strong
        >
        <div class="frequency">
          <strong style="color: #fa2222; font-size: 26px">
            {{ totalPrice }} </strong
          >&nbsp;
          <span style="color: #323232; font-size: 14px">元</span>
        </div>
      </div>
      <div class="Insequence_fa">
        <Button
          v-if="balance >= price || assignment !== '余额支付'"
          style="
            border-radius: 4px;
            background-color: #1cc0d6;
            color: #fff;
            font-size: 14px;
          "
          @click="Sure"
        >确定购买
        </Button>
        <Button
          v-if="balance < price && assignment == '余额支付'"
          style="
            border-radius: 4px;
            background-color: #1cc0d6;
            color: #fff;
            font-size: 14px;
          "
          disabled
        >确定购买
        </Button>
        <span
          style="
            display: block;
            padding-top: 5px;
            color: #888888;
            font-size: 12px;
          "
        >若在购买过程中遇到任何问题，请致电：13656171020</span
        >
      </div>
    </div>
    <Modal v-model="purchase" title="确认购买" @on-ok="determineThePurchase">
      <p style="font-size: 16px; text-align: center">你确定续费吗？</p>
    </Modal>
  </div>
</template>
<script>
  import {getDocumentPriceList,documentRenew} from "../../api/doc.js";
  import {getTeamUserList} from "../../api/team"
  import {getAccountMoney} from "../../api/money";
  import $ from "jquery";

  export default {
    data() {
      return {
        date: "",
        dateAgain: "",
        clockItem: "",//当前时间
        purchase: false,
        frequency: "",
        selectMoney: "",
        balance: "",
        price: 0,
        assignment: "余额支付",
        serviceId: "",
        teamNum:0,//团队人数
        number:0,//可改变团队人数
      };
    },
    computed:{
      totalPrice(){
        return this.number > 20 && this.selectMoney != "" ? (this.price + (this.number-20) * 5).toFixed(2) : this.price.toFixed(2)
      }
    },
    created() {
      this.getTeamInfo();
      this.getDocumentPriceList();
      this.getTeamUserList();
    },
    mounted() {
      document.title = "文档续费 - EasyAPI";
    },
    methods: {
      getTeamUserList(){
        getTeamUserList().then(res=>{
          if(res.data.code === 1){
            this.teamNum = res.data.content.length
            this.number = res.data.content.length
          }
        })
      },
      //当前时间
      getItem() {
        var currentTime = new Date();
        var year = currentTime.getFullYear(); //年
        var month = currentTime.getMonth() + 1; //月
        var day = currentTime.getDate(); //日
        var hh = currentTime.getHours(); //时
        var mm = currentTime.getMinutes(); //分
        var ss = currentTime.getSeconds(); //秒
        this.clockItem = year + "-";
        if (month < 10) this.clockItem += "0";
        this.clockItem += month + "-";
        if (day < 10) this.clockItem += "0";
        this.clockItem += day + " ";
        if (hh < 10) this.clockItem += "0";
        this.clockItem += hh + ":";
        if (mm < 10) this.clockItem += "0";
        this.clockItem += mm + ":";
        if (ss < 10) this.clockItem += "0";
        this.clockItem += ss;
      },
      //查询文档报价列表
      getDocumentPriceList(){
        getDocumentPriceList().then(res=>{
          if (res.data.code !== 0) {
            let arr = [];
            res.data.content.forEach((item) => {
              let obj = {};
              obj.num = item.month;
              obj.price = item.price;
              obj.once = (obj.price / obj.num).toFixed(4);
              arr.push(obj);
            });
            this.frequency = arr;
          }
        }).catch((error) => {
          this.$Message.error(error.response.data.message)
        });
      },
      //选择文档价格
      selectMoneyFn(num, price) {
        this.selectMoney = num;
        this.price = price;
        this.date = this.addMonth(this.dateAgain, num);
      },
      // 根据选择文档添加
      addMonth(date, month) {
        let y = new Date(date).getFullYear();
        let m = new Date(date).getMonth();
        let d = new Date(date).getDate();
        let newDate = new Date(`${y}/${m}/${d}`);
        if (m + month > 11) {
          newDate = new Date(newDate.setFullYear(y + parseInt((m + month) / 12)));
          newDate = new Date(newDate.setMonth((m + month) % 12));
        } else {
          newDate = new Date(newDate.setMonth(m + month));
        }
        return newDate;
      },
      //支付方式
      stand(pay) {
        this.assignment = pay;
      },
      //时间戳转时间
      dateFormat(date) {
        let y = new Date(date).getFullYear();
        let m = new Date(date).getMonth();
        let d = new Date(date).getDate();
        return `${y}/${m + 1}/${d}`;
      },
      //获取团队账户
      getTeamInfo() {
        let params = {
          teamId: this.$store.state.user.team.id,
        }
        getAccountMoney(params).then((res) => {
          if (res.data.code === 1) {
            let obj = res.data.content
            this.balance = obj.balance;
            this.getItem();
            if(new Date(obj.team.documentEndTime).getTime() < new Date(this.clockItem).getTime()){
              this.date = new Date(obj.team.documentEndTime).getTime()
              this.dateAgain = new Date(this.clockItem).getTime()
            }else{
              this.dateAgain = new Date(obj.team.documentEndTime).getTime()
              this.date = new Date(obj.team.documentEndTime).getTime()
            }
          }
        });
      },
      //确定购买
      Sure() {
        if (this.selectMoney === "") {
          this.$Message.warning("请选择文档价格");
          return;
        }
        this.purchase = true;
      },
      determineThePurchase() {
        let data = {
          price:Number(this.totalPrice),
          payment: this.assignment,
          month:this.selectMoney,
          addUserSize:this.number
        }
        documentRenew(data).then(res=>{
          if (this.assignment === "支付宝") {
            this.formHtml = res.data.alipay;
            let form = $(this.formHtml);
            form.attr("target", "_blank");
            $("#app").append(form);
          } else if (this.assignment === "微信支付") {
            let weChatPayment = res.data.codeUrl;
            this.$Modal.confirm({
              title: "微信扫码支付",
              content: `<div class="wx-pay"><p class="wx-pay_amount">支付${
              Number(this.totalPrice)
                }元</p><p><img src="http://qr.liantu.com/api.php?text=${weChatPayment}"></img></p><p>请使用微信扫描二维码以完成支付</p></div>`,
              okText: "",
              cancelText: "",
              onOk: () => {
                 this.getTeamInfo();
                 this.selectMoney = ""
              },
            });
          }
          this.getTeamInfo();
          this.selectMoney = ""
          this.$Message.success(res.data.message);
        }).catch((error) => {
          if (this.assignment == "" || this.assignment == null) {
            this.$Message.warning("请选择支付方式");
          } else {
            this.$Message.error(error.response.data.message);
          }
        });
      },
    },
  };
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
