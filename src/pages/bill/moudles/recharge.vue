<template>
  <div>
    <div v-if="noData">
      <Table
        stripe
        :columns="tableHead"
        :data="tableData"
        :loading="dataLoading"
      ></Table>
      <Page
        :total="page.total"
        :current="page.page"
        :page-size="page.size"
        class="page-nav"
        @on-change="pageChange"
      ></Page>
    </div>
    <p v-else class="noData">
      <img src="../../../assets/images/no-data.png" alt />
    </p>
  </div>
</template>

<script>
import { getRechargeList,payRecharge} from "../../../api/recharge";
import $ from "jquery";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
export default {
  name: "RechargeList",
  components: {},
  data: function () {
    return {
      noData: true,
      tableHead: [
        {
          title: "日期",
          key: "addTime",
        },
        {
          title: "订单号",
          key: "no",
        },
        {
          title: "金额",
          key: "price",
          render: (h, params) => {
            return h("p", "¥" + params.row.price);
          },
        },
        {
          title: "渠道",
          key: "payment",
        },
        {
          title: "状态",
          key: "state",
          render: (h, params) => {
            return h(
              "p",
              {
                class: {
                  "un-pay": params.row.state == "0",
                },
              },
              this.payState[params.row.state]
            );
          },
        },
        {
          title: "备注",
          key: "remark",
        },
        {
          title: "操作",
          key: "opt",
          render: (h, params) => {
            if (params.row.state == "0") {
              return h(
                "a",
                {
                  class: {
                    "bill-opt": true,
                  },
                  on: {
                    click: () => {
                      this.gotoRecharge(params.row);
                    },
                  },
                },
                "去付款"
              );
            }
          },
        },
      ],
      tableData: [],
      page: {
        page: 1,
        size: 10,
        total: 0,
      },
      dataLoading: false,
      payState: {
        0: "待付款",
        1: "充值成功",
        "-1": "已取消",
        9: "充值成功",
        "-9": "充值失败",
      },
    };
  },
  created: function () {
    if (this.$route.query.page) {
      this.page = this.$route.query.page;
    }
    this.getList();
  },
  mounted: function () {
    document.title = "充值记录 - EasyAPI";
  },
  methods: {
    gotoRecharge(row) {
      if (row.payment === "支付宝") {
        this.aliPay(row);
      } else if (row.payment === "微信支付") {
        this.wxpay(row);
      }
    },
    aliPay(row) {
      payRecharge(row.rechargeId)
        .then((res) => {
          if (res.data.code) {
            let html = res.data.alipay;
            let form = $(html);
            form.attr("target", "_blank");
            $("#app").append(form);
            this.$Modal.confirm({
              title: "提示",
              content:
                "<p>请您在新打开的页面上完成充值。<br>充值完成后，根据您的情况点击下面按钮。</p>",
              okText: "充值成功",
              cancelText: "充值失败",
              onOk: () => {
                this.$Modal.remove();
                this.getList();
              },
            });
          }
        })
        .catch((err) => {
          this.$Message.error("接口错误，请稍后再试");
        });
    },
    wxpay(row) {
      let _that = this;
      payRecharge(row.rechargeId)
        .then((res) => {
          if (res.data.code === 1) {
            let url = res.data.codeUrl;
            this.$Modal.confirm({
              title: "微信扫码支付",
              content: `<div class="wx-pay"><p class="wx-pay_amount">支付${row.price}元</p><p><img src="https://api.easyapi.com/api/qr-code?text=${url}&bg=ffffff&appKey=f89UK9X5Q3C2YW2y&appSecret=hr2he5ufz6vw0ikz"></img></p><p>请使用微信扫描二维码以完成支付</p></div>`,
              okText: "",
              cancelText: "",
              onOk: () => {
                _that.$Modal.remove();
                _that.getList();
              },
            });
            let socket = new SockJS(
              "https://account-api.easyapi.com/easyapi-socket"
            );
            let stompClient = Stomp.over(socket);
            stompClient.connect({}, (frame) => {
              stompClient.subscribe(
                "/topic/wxpay/" + _that.$store.state.user.team.id,
                (message) => {
                  var json = JSON.parse(message.body);
                  _that.$Modal.remove();
                  _that.$Message.success("充值成功！");
                }
              );
            });
          }
        })
        .catch((err) => {
          this.$Message.error("接口错误，请稍后再试");
        });
    },
    pageChange: function (page) {
      this.page.page = page;
      location.hash = this.$route.path + "?page=" + page;
      this.getList();
    },
    getList: function () {
      this.dataLoading = true;
      getRechargeList({
        page: this.page.page - 1,
        size: this.page.size,
      })
        .then((res) => {
          this.dataLoading = false;
          if (res.data.code === 1) {
            this.page.total = res.data.totalElements;
            this.tableData = res.data.content;
          } else {
            this.tableData = [];
            this.dataLoading = false;
            this.noData = false;
          }
        })
        .catch(function (error) {
          this.$Message.error(error.response.data.message);
          this.dataLoading = false;
          console.log(err);
        });
    },
  },
  watch: {
    "$store.state.accountInfo.team": function () {
      this.getList();
    },
  },
};
</script>

<style lang="stylus">
@import '../../../styles/color.styl'

/deep/ .ivu-table-row:hover {
  cursor pointer
}
.un-pay {
color: c-red;
}
.noData{
  text-align center
  margin-top 150px;
}
.bill-opt {
  color: c-blue;
  text-decoration: underline;
}
.wx-pay {
    text-align: center;
    margin-left: -48px;

    .wx-pay_amount {
      color: c-red;
      font-size: 1.2em;
    }
  }
.page-nav
  float: right
  margin: 15px 0 40px
</style>
