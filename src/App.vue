<template>
  <div id="app">
    <Header v-if="showHead"></Header>
    <router-view></router-view>
  </div>
</template>

<script>
  import Header from "./components/header";

  export default {
    name: "app",
    components: {
      Header: Header
    },
    data: function () {
      return {
        showHead: true
      };
    },
    created: function () {
    },

    mounted() {
    },
    watch: {
      $route: function (val) {
        if (val.name === "homePage") {
          this.showHead = false;
        } else {
          this.showHead = true;
        }
      }
    }
  };
</script>

<style lang="stylus" scoped>
  @import 'styles/color.styl'

  .loading-bg
    position: fixed
    top: 50px
    left: 0
    right: 0
    bottom: 0
    background-color: rgba(255, 255, 255, .8)
    transition: all .8s ease
    z-index: 999998
    &.hide
      opacity: 0

    .loader
      position: absolute
      top: 50%
      left: 50%

  .loaders .loader
    position: relative
    box-sizing: border-box
    display: -ms-flexbox
    display: flex
    flex: 0 1 auto
    flex-direction: column
    flex-grow: 1
    flex-shrink: 0
    flex-basis: 25%
    max-width: 25%
    height: 200px
    -ms-flex-align: center
    align-items: center
    -ms-flex-pack: center
    justify-content: center
    z-index: 999999

  @keyframes ball-spin-fade-loader
    50%
      opacity: .3
      -webkit-transform: scale(.4)
      transform: scale(.4)

    100%
      opacity: 1
      -webkit-transform: scale(1)
      transform: scale(1)

  .ball-spin-fade-loader
    position: relative
    top: -10px
    left: -10px

  .ball-spin-fade-loader > div:nth-child(1)
    top: 25px
    left: 0
    animation: ball-spin-fade-loader 1s -.96s infinite linear

  .ball-spin-fade-loader > div:nth-child(2)
    top: 17.05px
    left: 17.05px
    animation: ball-spin-fade-loader 1s -.84s infinite linear

  .ball-spin-fade-loader > div:nth-child(3)
    top: 0
    left: 25px
    animation: ball-spin-fade-loader 1s -.72s infinite linear

  .ball-spin-fade-loader > div:nth-child(4)
    top: -17.05px
    left: 17.05px
    animation: ball-spin-fade-loader 1s -.6s infinite linear

  .ball-spin-fade-loader > div:nth-child(5)
    top: -25px
    left: 0
    animation: ball-spin-fade-loader 1s -.48s infinite linear

  .ball-spin-fade-loader > div:nth-child(6)
    top: -17.05px
    left: -17.05px
    animation: ball-spin-fade-loader 1s -.36s infinite linear

  .ball-spin-fade-loader > div:nth-child(7)
    top: 0
    left: -25px
    animation: ball-spin-fade-loader 1s -.24s infinite linear

  .ball-spin-fade-loader > div:nth-child(8)
    top: 17.05px
    left: -17.05px
    animation: ball-spin-fade-loader 1s -.12s infinite linear

  .ball-spin-fade-loader > div, .ball-spin-loader > div
    -webkit-animation-fill-mode: both
    position: absolute
    width: 15px
    height: 15px
    border-radius: 100%

  .ball-spin-fade-loader > div
    background-color: c-blue
    margin: 2px
    animation-fill-mode: both
</style>
