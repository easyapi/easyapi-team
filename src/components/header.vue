<template>
  <div class="header ctx-w">
    <div class="h-left clearfix">
      <a href="https://www.easyapi.com">
        <div class="ea-header-item logo">
          <img src="../assets/images/logo.png" alt="">
        </div>
      </a>
      <router-link class="ea-header-item" to="/">API服务中心</router-link>
    </div>
    <div class="h-right clearfix">
      <div class="fr menu-box">
        <div class="current-team-box">
          <a id="showSerInfo" :class="{active:showSerInfo}" @click="showSerInfoFn">
            <span class="team-icon"></span>
          </a>
          <div :class="{active:showSerInfo}" class="current-team-info">
            <h2 class="current-team-name lrPading-20">当前团队</h2>
            <div class="clear current-team-content lrPading-20">
              <img class="lf teams-img" :src="teamData.photo" alt="">
              <div class="lf teams-img-r">
                <p>{{teamData.name}}</p>
                <div class="team-btn">
                  <a href="https://team.easyapi.com/" class="ea-btn">账户</a>
                  <a href="https://team.easyapi.com/members" class="ea-btn">成员</a>
                  <a href="https://team.easyapi.com/orders" class="ea-btn">订单</a>
                </div>
              </div>
            </div>
            <div class="change-team-box">
              <h2 class="lrPading-20">切换团队：</h2>
              <div class="ea-team-list-box lrPading-20">
                <a class="ea-team-item" v-if="teamListData.length" v-for="(item, index) in teamListData" @click="tabTeamFn(item)" :key="index">
                  <img :src="item.team.img+'!icon.jpg'" alt="">
                  <span>{{item.team.name}}</span>
                </a>
              </div>
            </div>
            <div class="create-team">
              <Button type="info" class="ea-info-btn" to="https://team.easyapi.com/new" target="_blank">创建新团队</Button>
            </div>
          </div>
        </div>
        <div class="user-avatar">
          <a >
            <img id="showPersonage" :src="userInfoData.photo" alt="">
          </a>
          <div :class="{active:isActive}" class="ea-DropdownMenu">
            <a href="https://account.easyapi.com/notification/" target="_blank">我的通知</a>
            <a href="https://account.easyapi.com/setting/data" target="_blank">个人设置</a>
            <a href="https://account.easyapi.com/logout">退出</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getMyTeam, tabTeam} from '../api/api'
  import {ajaxSender} from '../api/fetch'

  export default {
    name: "Header",
    data: function () {
      return {
        selectedIndex: 5,
        isActive: false,
        showSerInfo: false,
        teamData: {
          photo: '--',
          name: '--'
        },
        userInfoData: {
          photo: '--',
          name: '--'
        },
        teamListData: ""
      };
    },

    created: function () {

      let body = document.querySelector('body');
      body.addEventListener('click', (e) => {
        if (e.target.id === 'showSerInfo' || e.target.className === 'team-icon') {
          this.isActive = false;
          this.showSerInfo = !this.showSerInfo
        } else if (e.target.id === 'showPersonage') {
          this.isActive = !this.isActive;
          this.showSerInfo = false;
        } else {
          this.showSerInfo = false;
          this.isActive = false;
        }
      }, false)
    },

    watch: {
      '$store.state.accountInfo': function () {
        this.userInfoData.photo = this.$store.state.accountInfo.photo
        this.userInfoData.name = this.$store.state.accountInfo.nickname
        this.teamData.photo = this.$store.state.accountInfo.team.img
        this.teamData.name = this.$store.state.accountInfo.team.name
        this.getTeamList()
        localStorage.setItem("name", this.teamData.name);
      }
    },

    methods: {
      showSerInfoFn() {
        if (this.showSerInfo === true) {
          this.getTeamList();//获取团队列表
        }
      },

      getTeamList() {
        ajaxSender({
          url: getMyTeam,
          method: 'get',
          data: {
            page: 0,
            size: 500
          },
          successfun: (res) => {
            this.teamListData = res.content;
          }
        })
      },

      jupmPage(url) {
        this.$router.push(url)
      },

      tabTeamFn(item) {
        ajaxSender({
          url: tabTeam + '/' + item.team.id,
          method: 'put',
          successfun: (res) => {
            if (res.code) {
              location.reload()
            }
          }
        })
      }
    }
  };
</script>

<style lang="stylus">
  .header
    top: 0;
    left: 0;
    right: 0;
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
    padding-right: 20px;
    background-color: #1ac1d6;
    font-weight: bold;
    z-index: 888;

    .h-left
      float: left
      width: 70%
    .ea-header-item
      position: relative
      float: left
      height: 50px
      padding: 0 30px
      color: #fff
      border-right: 1px solid darken(#1ac1d6, 5%)
      font-size: 14px
    .logo
      padding-left: 0
      img
        margin: 10px 0
        height: 30px
        width: 30px

    .h-right {
      float: right;
    }

    .a-item {
      position: relative;
      display: inline-block;
      color: #fff;
      padding: 0 20px;
      line-height: 50px;
      text-decoration: none;

      &.ac {
        background: darken(#1ac1d6, 5%);
      }

      .sub-menu {
        position: absolute;
        display: none;
        top: 50px;
        left: -20px;
        width: 200px;
        background: #fff;
        color: #666;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
        z-index: 999;
      }

      .sub-item {
        padding: 0 20px;

        &:hover {
          background: darken(#fff, 3%);
        }
      }

      &:hover {
        background: darken(#1ac1d6, 5%);

        .sub-menu {
          display: inline-block;
        }
      }
    }

  .easyapi-logo {
    height: 50px;
  }

  .menu-box {
    display: inline-block;
    height: 50px;
    position: relative;

    .user-avatar {
      display: inline-block;
      vertical-align: top;

      & > a {
        padding: 0 20px;
        display: inline-block;
        height: 50px;
        padding-top: 9px;
        cursor: pointer;
        position: relative;

        img {
          width: 35px;
          height: 35px;
          border-radius: 50%;
        }
      }
    }

    .ea-DropdownMenu {
      position: absolute;
      top: 50px;
      right: 0;
      z-index: 100;
      border: 1px solid #eee;
      border-top: none;
      box-shadow: 0px 1px 3px #ddd;
      background-color: #fff;
      border-bottom-right-radius: 5px;
      border-bottom-left-radius: 5px;
      width: 100px;
      display: none;

      &.active {
        display: block;
      }

      a {
        display: block;
        line-height: 26px;
        height: inherit;
        padding-left: 15px;
        color: #777;
        font-weight: normal;

        &:hover {
          background-color: #1ac1d6;
          color: #fff;
        }
      }
    }

    .current-team-box {
      height: 50px;
      display: inline-block;
      position: relative;

      & > a {
        padding: (15px / 2px)  20px;
        height: 50px;
        display: inline-block;

        &.active {
          background-color: #19B7CB;
        }

        &:hover {
          background-color: #19B7CB;
        }

        .team-icon {
          display: inline-block;
          width: 35px;
          height: 35px;
          background: url('../assets/images/team-icon.png') no-repeat;
          background-size: cover;
        }
      }
    }

    .current-team-info {
      position: absolute;
      padding: 0 20px;
      top: 50px;
      right: 0;
      background-color: #ffffff;
      box-shadow: 0px 1px 3px #ddd;
      border: 1px solid #eee;
      border-top: none;
      width: 410px;
      border-bottom-right-radius: 5px;
      border-bottom-left-radius: 5px;
      z-index: 99;
      display: none;

      &.active {
        display: block;
      }

      .current-team-name {
        height: 50px;
        line-height: 50px;
        font-weight: bold;
        border-bottom: 1px solid #eaeaea;
      }

      .current-team-content {
        border-bottom: 1px solid #eaeaea;
        height: 110px;
        padding: 10px 0;

        .teams-img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          margin-top: (10 / 2) px;
        }

        .teams-img-r {
          display: inline-block;
          height: 99px;
          vertical-align: top;
          padding-left: 20px;

          & > p {
            color: #333;
            height: 39px;
            line-height: 39px;
            font-size: 1rem;
          }

          .team-btn {
            height: 50px;
            line-height: 50px;

            .ea-btn {
              padding: 6px 15px;
              border: 1px solid #ddd;
              color: #333;
              border-radius: 5px;
              box-sizing: content-box;
              margin-right: 5px;
              font-weight: normal;
              font-size: 14px;
            }
          }
        }
      }

      .change-team-box {
        border-bottom: 1px solid #eaeaea;

        & > h2 {
          height: 50px;
          line-height: 50px;
          font-weight: bold;
        }

        .ea-team-list-box {
          /* 父元素设置弹性布局 */
          display: flex;
          /* 主轴方向 */
          /* column 列上下 */
          flex-direction: row;
          /* 是否换行 */
          flex-wrap: wrap;
          /* 在主轴对齐方式 */
          justify-content: flex-start;

          .ea-team-item {
            display: inline-block;
            width: 50%;
            color: #333;
            font-size: 1rem;
            font-weight: normal;
            height: 40px;
            line-height: 40px;

            & > img {
              width: 28px;
              height: 28px;
              border-radius: 50%;
              vertical-align: middle;
            }

            & > span {
              vertical-align: middle;
            }
          }
        }
      }

      .create-team {
        text-align: center;

        .ea-info-btn {
          background-color: #5BC0DE;
        }

        .ea-info-btn:hover {
          background-color: #31B0D5;
        }
      }
    }
  }
</style>
