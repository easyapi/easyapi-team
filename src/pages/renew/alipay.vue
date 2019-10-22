<template>
  <div v-html="alipay">{{ alipay }}</div>
</template>
<script>
export default {
  data() {
    return {
      alipay: ""
    };
  },
  mounted() {
    let form = this.$route.query.html;
    this.alipay = form;
    this.$nextTick(() => {
      document.forms[0].submit();
    });
  }
};
</script>
