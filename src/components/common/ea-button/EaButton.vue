<template>
  <Button class="ea-button" :size="size" :style="getStyles" @click="iClick">{{text}}</Button>
</template>

<script>
export default {
  name: 'EaButton',

  props: {
    text: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'default'
    },
    type: {
      type: String,
      default: 'main'
    },
    // 是否是镂空的按钮样式
    space: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      visible: false
    }
  },

  watch: {
    open() {
      this.visible = this.open
    }
  },

  computed: {
    getStyles: function() {
      let blue = '#1ac1d6'
      let red = '#f55d54'
      let ret = {}
      let color = ''
      if (this.type == 'main') color = blue
      else if (this.type == 'red') color = red
      else return
      if (this.space) {
        ret.backgroundColor = '#fff'
        ret.color = color
        ret.border = `1px solid ${color}`
      } else {
        ret.backgroundColor = color
        ret.color = '#fff'
        ret.border = 'none'
      }
      return ret
    }
  },

  methods: {
    iClick: function() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="stylus">
.ea-button {
  &:hover {
    opacity: 0.8;
  }
}
</style>
