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
import { getRechargeList } from "../../../api/recharge";

export default {
  name: "RechargeList",
  components: {},
  data: function () {
    return {
      noData:true,
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
            this.noData = false
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
  .page-nav
    float: right
    margin: 15px 0 40px
</style>
