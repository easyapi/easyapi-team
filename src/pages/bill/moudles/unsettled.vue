<template>
  <div>
    <Table
      stripe
      :columns="tableHead"
      :data="tableData"
      :loading="dataLoading"
    ></Table>
    <Page
      :total="total"
      :current="Number(page)"
      :page-size="pageSize"
      class="page-nav"
      @on-change="pageChange"
    ></Page>
  </div>
</template>

<script>
import { getBillList } from "../../../api/bill";

export default {
  name: "Unsettled",
  components: {},
  data: function() {
    return {
      tableHead: [
        {
          title: "交易时间",
          key: "addTime"
        },
        {
          title: "订单号",
          key: "no"
        },
        {
          title: "类型",
          key: "type"
        },
        {
          title:"付款方式",
          key: "payment"
        },
        {
          title: "金额",
          key: "price",
          render: (h, params) => {
            if(params.row.type == "消费"){
              return h("p","-"+ "¥" + params.row.outlay);
            }else{
              return h("p","+"+"¥" + params.row.receive);
            }
            
          }
        },
        {
          title: "余额",
          key: "balance",
          render: (h, params) => {
            return h("p", "¥" + params.row.balance);
          }
        },
         {
          title: "备注",
          key: "remark"
        },
        {
          title: "状态",
          key: "state",
          render: (h, params) => {
            return h(
              "p",
              {
                class: {
                  "un-pay": params.row.state == "0"
                }
              },
              this.payState[params.row.state]
            );
          }
        },    
      ],
      tableData: [],
      total: null,
      page: 1,
      dataLoading: false,
      billDetailIndex: 0,
      detailOpen: false,
      payState: {
        "0": "待付款",
        "1": "充值成功",
        "-1": "已取消",
        "9": "充值成功",
        "-9": "充值失败"
      },
      pageSize: 10
    };
  },
  created: function() {
    let curPage = this.$route.query.page;
    if (curPage) {
      this.page = curPage;
    }
    this.getList();
  },
  mounted: function() {
    document.title = "充值记录 - EasyAPI";
  },
  methods: {
    pageChange: function(page) {
      this.page = page;
      location.hash = this.$route.path + "?page=" + page;
      this.getList();
    },
    getList: function(page) {
      this.dataLoading = true;
      let params = {
            page: this.page - 1,
            size: this.pageSize
        }
      getBillList(params).then(res=>{   
          this.dataLoading = false;
          if (res.data == null) {
            this.total = 0
            this.tableData = [];
            this.dataLoading = false;
          } else {
            if (!this.total) this.total = res.data.totalElements
            if (res.data.content.length) this.tableData = res.data.content;
          }     
        }).catch(function(err) {
          this.dataLoading = false;
          console.log(err);
        })
    }
  },
  watch: {
    "$store.state.accountInfo.team": function() {
      this.getList();
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../../../assets/styles/color.styl';
.page-nav
  float: right
  margin: 15px 0 40px
</style>
