<template>
  <div class="m-wrapper" v-cloak>
    <h4 class="title">订单记录</h4>
    <div v-if="noData">
      <Table
      class="table"
      v-if="tableData.length"
      stripe
      :columns="tableHead"
      :data="tableData"
      :loading="dataLoading"
    ></Table>
    
    <Page
      :total="total"
      v-if="tableData.length"
      :current="Number(page)"
      :page-size="pageSize"
      class="page-nav"
      @on-change="pageChange"
    ></Page>
    </div>
    <p v-else class="noData">
      <img src="../../assets/images/no-data.png" alt />
    </p>
    <ea-dialog
      title="订单详情"
      :open="detailOpen"
      width="520"
      @visibleChange="detailVisible"
      v-if="tableData.length"
    >
      <Row class="detail-table">
        <Col span="12">
          <Row>
            <Col span="8" class="row detail-key">订单号</Col>
            <Col span="16" class="row">{{ tableData[billDetailIndex].no }}</Col>
          </Row>
        </Col>
        <Col span="12">
          <Row>
            <Col span="8" class="row detail-key">金额</Col>
            <Col
              span="16"
              class="row"
              v-html="renderPrice(null, tableData[billDetailIndex], true)"
            ></Col>
          </Row>
        </Col>
      </Row>
      <Row class="detail-table-top">
        <Col span="12">
          <Row>
            <Col span="8" class="row detail-key">服务名称</Col>
            <Col span="16" class="row">
              {{ tableData[billDetailIndex].name }}
            </Col>
          </Row>
        </Col>
        <Col span="12">
          <Row>
            <Col span="8" class="row detail-key">计量</Col>
            <Col
              span="16"
              class="row"
              v-html="renderQuantity(null, tableData[billDetailIndex], true)"
            ></Col>
          </Row>
        </Col>
      </Row>
      <Row class="detail-table-top">
        <Col span="12">
          <Row>
            <Col span="8" class="row detail-key">状态</Col>
            <Col span="16" class="row">
              {{ payState[tableData[billDetailIndex].state] }}
            </Col>
          </Row>
        </Col>
        <Col span="12">
          <Row>
            <Col span="8" class="row detail-key">时间</Col>
            <Col span="16" class="row">
              {{ tableData[billDetailIndex].addTime}}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row class="detail-table-top">
        <Col span="4" class="row row-remark detail-key">备注</Col>
        <Col span="20" class="row row-remark">
          {{ tableData[billDetailIndex].remark || "无" }}
        </Col>
      </Row>
    </ea-dialog>
  </div>
</template>

<script>
import { getOrderList } from "../../api/order";

export default {
  name: "Bill",
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
          title: "服务名称",
          key: "name",
        },
        {
          title: "金额",
          key: "amount",
          render: (h, params) => {
            return this.renderPrice(h, params.row);
          },
        },
        {
          title: "计量",
          key: "account",
          render: (h, params) => {
            return this.renderQuantity(h, params.row);
          },
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
          title: "操作",
          key: "opt",
          render: (h, params) => {
            return h(
              "a",
              {
                class: {
                  "bill-opt": true,
                },
                on: {
                  click: () => {
                    this.openBillDetail(params.index);
                  },
                },
              },
              "详情"
            );
          },
        },
      ],
      tableData: [],
      total: null,
      page: 1,
      dataLoading: false,
      billDetailIndex: 0,
      detailOpen: false,
      payState: {
        0: "待付款",
        1: "已付款(充值中)",
        "-1": "已取消",
        9: "充值成功",
        "-9": "充值失败",
      },
      pageSize: 10,
    };
  },
  created: function () {
    let curPage = this.$route.query.page;
    if (curPage) {
      this.page = curPage;
    }
    this.getList();
  },
  beforeCreate() {},
  mounted: function () {
    document.title = "团队订单 - EasyAPI";
  },
  methods: {
    pageChange: function (page) {
      this.page = page;
      location.hash = this.$route.path + "?page=" + page;
      this.getList();
    },
    getList: function () {
      this.dataLoading = true;
      getOrderList({
        page: this.page - 1,
        size: this.pageSize,
      })
        .then((res) => {
          if (res.data.code === 1) {
            this.total = res.data.totalElements;
            this.tableData = res.data.content;
          } else {
            this.total = 0;
            this.tableData = [];
            this.dataLoading = false;
            this.noData = false
          }
          this.dataLoading = false;
        })
        .catch(function (error) {
          this.$Message.error(error.response.data.message);
          this.tableData = [];
        })
        .then(function () {});
    },
    openBillDetail: function (index) {
      this.detailOpen = true;
      this.billDetailIndex = index;
    },
    detailVisible: function (o) {
      if (!o) {
        this.detailOpen = false;
        this.billDetailIndex = 0;
      }
    },
    // render table item
    renderPrice: function (h, p, html) {
      let htmlStr = "";
      if (p.discount > 0) {
        if (html) {
          htmlStr = `<p class="bill-reduce">¥${p.amount.toFixed(
            2
          )}<span class="past">¥${(p.amount + p.discount).toFixed(
            2
          )}</span></p>`;
          return htmlStr;
        } else {
          return h(
            "p",
            {
              class: {
                "bill-reduce": true,
              },
            },
            [
              `¥${p.amount.toFixed(2)}`,
              h(
                "span",
                {
                  class: {
                    past: true,
                  },
                },
                `¥${(p.amount + p.discount).toFixed(2)}`
              ),
            ]
          );
        }
      } else {
        if (html) {
          htmlStr = `<p>¥${p.amount.toFixed(2)}</p>`;
          return htmlStr;
        } else {
          return h("p", `¥${p.amount.toFixed(2)}`);
        }
      }
    },
    renderQuantity: function (h, p, html) {
      let str = "";
      str = `${p.quantity} ${p.unit}`
      if(html){
        return str
      }
      return h("p", str);
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '../../styles/color.styl';

/deep/ .ivu-table-row:hover {
  cursor pointer
}

.title {
  margin-top: 20px;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid c-border;
}

.page-nav {
  float: right;
  margin: 15px 0 40px;
}

.row {
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-right: 1px solid c-border;
  border-bottom: 1px solid c-border;

  &.row-remark {
    height: 120px;
    line-height: 120px;
  }
}
.noData{
  text-align center;
  margin-top 150px;
}
.detail-table {
  border-top: 1px solid c-border;
  border-left: 1px solid c-border;
}
.detail-table-top{
   border-left: 1px solid c-border;
}

.detail-key {
  font-weight: bold;
  background-color: c-grey;
}
</style>

<style lang="stylus">
@import '../../styles/color.styl';

[v-cloak] {
  display: none !important;
}

.ivu-table-body:hover {
  cursor pointer
}

.bill-opt {
  color: c-blue;
  text-decoration: underline;
}

.un-pay {
  color: c-red;
}

.bill-reduce {
  color: c-red;

  .past {
    margin-left: 4px;
    font-size: 0.85em;
    color: c-black2;
    text-decoration: line-through;
  }
}
</style>
