<template>
  <div class="m-wrapper">
    <Tabs active-key="bill" :animated="false">
      <Tab-pane label="账户明细" key="bill">
        <BillList></BillList>
      </Tab-pane>
      <Tab-pane label="充值记录" key="recharge">
        <RechargeList></RechargeList>
      </Tab-pane>
    </Tabs>
  </div>
</template>
<script>
  import RechargeList from './moudles/recharge'
  import BillList from './moudles/bill'

  export default {
    name: "Bills",
    components: {
      RechargeList,
      BillList
    },
    data() {
    }
  }
</script>
<style lang="stylus" scoped>
  @import '../../styles/color.styl';
</style>
