<template>
  <div class="setting">
    <div class="team-hd">
      <div class="team-icon">
        <img
          :src="team.img ? team.img + '?icon.jpg' : 'https://qiniu.easyapi.com/team/default.png?icon.jpg'"
          :alt="team.name"
        />
      </div>
      <h2 class="name">{{ team.name }}</h2>
      <p class="des">{{ team.description }}</p>
    </div>
    <nav>
      <ul class="m-wrapper menu grid">
        <li :class="{ active: $route.name === 'Account' || $route.name === 'Bills'}">
          <router-link to="/account">账户</router-link>
        </li>
        <li :class="{ active: $route.name === 'Members' }">
          <router-link to="/members">成员</router-link>
        </li>
        <li :class="{ active: $route.name === 'Orders' }">
          <router-link to="/orders">订单</router-link>
        </li>
      </ul>
    </nav>
    <div class="set-wrapper">
      <router-view :members="members"></router-view>
    </div>
  </div>
</template>

<script>
  import {getTeamUserList} from '../api/api'
  import {mapGetters} from 'vuex'

  export default {
    name: 'Wrapper',
    data: function () {
      return {
        module: 'root-set',
        members: [{}]
      }
    },
    computed: {
      ...mapGetters(['team'])
    },
    created: function () {
    },
    mounted: function () {
      this.module = this.$route.name
      if (this.$store.state.user.team.id) {
        this.getTeamUserList()
      }
    },
    watch: {
      $route: function () {
        this.module = this.$route.name
      },
      '$store.state.user.team.id': function (v, oldV) {
        if (v !== oldV) {
          this.getTeamUserList()
        }
      }
    },
    methods: {
      // 获取成员列表
      getTeamUserList: function () {
        this.loadingMemberList = true
        this.$ajax({
          method: 'GET',
          url: getTeamUserList,
          params: {
            teamId: this.$store.state.user.team.id,
            page: 0,
            size: 100
          }
        }).then(res => {
          this.members = res.data.content
          this.loadingMemberList = false
        }).catch(err => {
          this.loadingMemberList = false
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../assets/styles/color.styl';

  .team-hd {
    height: 260px;
    padding-top: 40px;
    padding-bottom: 40px;
    background: c-blue-light url('../../static/images/bg_center.png') no-repeat center;
    background-size: cover;
    text-align: center;

    .team-icon {
      display: inline-block;
      height: 80px;
      width: 80px;

      img {
        display: inline-block;
        height: 100%;
        width: 100%;
        background: c-grey;
        border-radius: 50%;
        border: 4px solid c-white;
      }
    }

    .name {
      margin: 10px 0 15px;
      font-size: 22px;
    }

    .des {
      font-size: 14px;
    }
  }

  nav {
    border-bottom: 1px solid c-border;
  }

  .menu {
    text-align: center;

    li {
      position: relative;
      display: inline-block;
      padding: 20px 0;
      margin: 0 20px;
      font-size: 14px;

      a {
        color: c-black;
      }

      &.active {
        a {
          color: c-blue;
        }

        &:after {
          display: inline-block;
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background-color: c-blue;
        }
      }
    }
  }
</style>
