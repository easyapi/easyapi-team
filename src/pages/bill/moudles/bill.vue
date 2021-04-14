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
import { getBillList } from "../../../api/bill";

export default {
  name: "BillList",
  components: {},
  data: function () {
    return {
      noData: true,
      tableHead: [
        {
          title: "交易时间",
          key: "addTime",
        },
        {
          title: "订单号",
          key: "no",
        },
        {
          title: "类型",
          key: "type",
        },
        {
          title: "付款方式",
          key: "payment",
        },
        {
          title: "金额",
          key: "price",
          render: (h, params) => {
            if (params.row.type == "消费") {
              return h("p", "-" + "¥" + params.row.outlay);
            } else {
              return h("p", "+" + "¥" + params.row.receive);
            }
          },
        },
        {
          title: "余额",
          key: "balance",
          render: (h, params) => {
            return h("p", "¥" + params.row.balance);
          },
        },
        {
          title: "备注",
          key: "remark",
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
      ],
      tableData: [],
      page: {
        page: 1,
        size: 10,
        total: 0,
      },
      dataLoading: false,
      payState: {
        0: "未完成",
        1: "已完成",
        "-1": "已取消",
      },
    };
  },
  created: function () {
    if (this.$route.query.page) {
      this.page.page = this.$route.query.page;
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
      getBillList({
        page: this.page.page - 1,
        size: this.page.size,
      })
        .then((res) => {
          this.dataLoading = false;
          if (res.data.code === 1) {
            this.page.total = res.data.totalElements;
            this.tableData = res.data.content;
          } else {
            this.page.total = 0;
            this.tableData = [];
            this.dataLoading = false;
            this.noData = false
          }
        })
        .catch(function (error) {
          this.$Message.error(error.response.data.message);
          this.dataLoading = false;
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

<style lang="stylus" scoped>
@import '../../../styles/color.styl';

/deep/ .ivu-table-row:hover {
  cursor pointer
}

.page-nav
  float: right
  margin: 15px 0 40px
</style>
