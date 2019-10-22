<template>
  <div class="payment-success">
    <div class="img">
      <img src="../../assets/images/success.png" alt="" />
      <span>充值成功，谢谢！</span>
    </div>
    <span class="siz"
      >如果有问题，请发送邮箱到leida@easyapi.com处理。谢谢您的支持！</span
    >
  </div>
</template>
<script>
export default {
  mounted: function() {
    document.title = "续费成功 - EasyAPI";
  }
};
</script>
<style>
.payment-success {
  width: 100%;
  height: auto;
}

.img {
  width: 100%;
  height: 500px;
  text-align: center;
  padding-top: 300px;
  border-bottom: 1px solid #eff3f7;
}

.img span {
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  display: block;
  text-align: center;
  color: #333;
  padding-left: 25px;
}

.siz {
  width: 100%;
  height: 50px;
  line-height: 50px;
  display: block;
  text-align: center;
  color: #999;
}
</style>
