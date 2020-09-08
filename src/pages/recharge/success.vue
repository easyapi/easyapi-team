<template>
  <div class="recharge-success">
    <main>
      <span class="recharge-success_icon icon3-ok-circle"></span>
      <h2>充值成功，谢谢！</h2>
    </main>
    <footer>
      <p class="tips grey">
        如果有任何问题，请发送邮件到leida@easyapi.com处理，谢谢您的支持
      </p>
    </footer>
  </div>
</template>

<script>
  export default {
    name: "RechargeSuccess",
    mounted: function () {
      document.title = "充值成功 - EasyAPI";
    }
  };
</script>

<style lang="stylus" scoped>
  @import '../../assets/styles/color.styl'

  .recharge-success
    width: 860px
    margin: 0 auto
    margin-top: 10%
    text-align: center
    .recharge-success_icon
      font-size: 120px
      color: c-green
    footer
      margin-top: 80px
      padding-top: 30px
      border-top: 1px solid c-border
</style>
