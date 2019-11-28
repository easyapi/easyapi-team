<template>
  <div class="left-nav-main">
    <div class="user-info">
      <img :src="this.$store.getters.photo" alt class="user-head-img" />
      <div class="user-name">{{this.$store.getters.nickname}}</div>
    </div>
    <div class="tabs">
      <router-link v-for="(tab,index) of tabs" :key="index+tab" :to="tab.to">
        <div class="tabs-item" :class="{'is-active':index==tabIndex}">{{tab.name}}</div>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'leftNav',
  data() {
    return {
      tabs: [
        { name: '基本信息', to: '/user/edit' },
        { name: '修改密码', to: '/user/password' }
      ]
    }
  },
  props: ['tabIndex'],
  methods: {
    changeTabIndex(i) {
      this.tabIndex = i
      this.$emit('changeTabIndex', i)
    }
  }
}
</script>
<style lang="stylus" scoped>
.left-nav-main {
  width: 260px;

  .user-info {
    width: 260px;
    height: 100px;
    background-color: #ffffff;
    display: flex;
    align-items: center;

    .user-head-img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;
      background: red;
      margin: 0 20px;
    }

    .user-name {
      font-size: 16px;
      font-weight: bold;
      color: #0b0b0b;
    }
  }

  .tabs {
    width: 260px;
    background-color: #ffffff;
    margin-top: 20px;

    .tabs-item {
      height: 50px;
      line-height: 50px;
      text-indent: 21px;
      color: #999999;
      position: relative;
      cursor: pointer;

      &+.tabs-item {
        border-top: 1px solid #dddddd;
      }

      &:hover {
        color: #0b0b0b;
      }

      &.is-active {
        color: #0b0b0b;

        &:before {
          content: '';
          position: absolute;
          left: 0;
          width: 3px;
          height: 30px;
          background-color: #1ac1d6;
          top: 10px;
        }
      }
    }
  }
}
</style>