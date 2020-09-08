<template>
  <div class="m-wrapper">
    <Tabs active-key="key1" :animated="false">
        <Tab-pane label="账户明细" key="key1">
          <Unsettled></Unsettled>
        </Tab-pane>
        <Tab-pane label="充值记录" key="key2">
          <Recharge></Recharge>
        </Tab-pane>
    </Tabs>
  </div>
</template>
<script>
import Recharge from './moudles/recharge'
import Unsettled from './moudles/unsettled'
export default {
  name: "Bills",
  components: {
    Recharge,
    Unsettled
  },
  data(){}
}
</script>
<style lang="stylus" scoped>
@import '../../assets/styles/color.styl';
  
</style>