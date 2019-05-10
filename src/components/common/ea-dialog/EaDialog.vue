<template>
  <Modal
    v-model="visible"
    :title="title"
    :width="width"
    :mask-closable="maskClosable"
    class-name="ea-dialog-wrap"
    @on-visible-change="visibleChange">
    <slot></slot>  
    <div slot="footer"></div>
  </Modal>
</template>

<script>
  export default {
    name: 'EaDialog',

    props: {
      open: {
        type: Boolean,
        default: false
      },

      title: {
        type: String,
        default: ''
      },

      maskClosable: {
        type: Boolean,
        default: false
      },

      width: String,

    },

    data() {
      return {
        visible: false
      };
    },

    watch: {
      open(val) {
        this.visible = this.open
      }
    },

    computed: {
    },

    methods: {
      visibleChange(status) {
        this.$emit('visibleChange', status)
      }
    },

    mounted() {

    },

    destroyed() {

    }
  };
</script>

<style lang="stylus">
.ivu-modal-footer
  border-top: none
  padding: 0

.ea-dialog-wrap .ivu-modal
  top: 30%


</style>
