<template>
  <div class="service-list">
    <div class="service-list_block">
      <ServiceItem></ServiceItem>
    </div>
  </div>
</template>
<script>
  import ServiceItem from './moudles/item'

  export default {
    name: "Service",
    components: {
      ServiceItem
    },
    data() {
    }
  }
</script>
<style scoped lang="stylus">
  .service-list {
    padding: 20px 0;
  }

  .service-list_block {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
  }
</style>
