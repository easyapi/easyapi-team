<template>
  <div class="header ctx-w">
    <div class="h-left clearfix">
      <a href="https://www.easyapi.com">
        <div class="ea-header-item logo">
          <img src="https://qiniu.easyapi.com/icon.png" alt/>
        </div>
      </a>
      <router-link v-if="team" class="ea-header-item" to="/">{{team.name }}</router-link>
    </div>
    <div class="h-right clearfix">
      <div class="fr menu-box">
        <div class="current-team-box">
          <a id="showCalendar" :class="{ active: showCalendar }" @click="gotoCalendar">
            <span class="calendar"></span>
          </a>
          <a id="showInform" :class="{ active: showInform }" @click="gotoInform">
            <span class="inform"></span>
          </a>
          <a id="showTeamInfo" :class="{ active: showTeamInfo }">
            <span class="team-icon"></span>
          </a>
          <div :class="{ active: showTeamInfo }" class="current-team-info">
            <h2 class="current-team-name lrPading-20">当前团队</h2>
            <div class="clear current-team-content lrPading-20">
              <img class="lf teams-img" :src="teamImg + '!icon.jpg'" alt/>
              <div class="lf teams-img-r">
                <p>{{ teamName }}</p>
                <div class="team-btn">
                  <router-link class="ea-btn" to="/account">账户</router-link>
                  <router-link class="ea-btn" to="/members">成员</router-link>
                  <router-link class="ea-btn" to="/orders">订单</router-link>
                </div>
              </div>
            </div>
            <div class="change-team-box">
              <h2 class="lrPading-20">切换团队：</h2>
              <div class="ea-team-list-box lrPading-20">
                <a
                  href="JavaScript:void(0)"
                  class="ea-team-item"
                  v-for="(item, index) in teamList"
                  v-bind:key="index"
                  @click="changeTeam(item.team.id)"
                >
                  <img :src="item.team.img + '!icon.jpg'" alt/>
                  <span style="display: block">{{ item.team.name }}</span>
                </a>
              </div>
            </div>
            <div class="create-team">
              <Button
                type="info"
                class="ea-info-btn"
                to="https://team.easyapi.com/new"
                target="_blank"
              >创建新团队
              </Button>
            </div>
          </div>
        </div>
        <div class="user-avatar">
          <a>
            <img id="showPersonage" :src="photo" alt/>
          </a>
          <div :class="{ active: isActive }" class="ea-DropdownMenu">
            <a href="https://account.easyapi.com/notification/" target="_blank">我的通知</a>
            <a href="https://team.easyapi.com/user/edit" target="_blank">个人设置</a>
            <a href="https://account.easyapi.com/logout">退出</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import Cookies from "js-cookie";

  export default {
    name: "Header",
    data: function() {
      return {
        inBack: false,
        userInfo: [],
        isActive: false,
        showTeamInfo: false,
        showInform:false,
        showCalendar:false,
        authenticationToken: Cookies.get("authenticationToken")
      };
    },
    computed: {
      ...mapGetters(["photo", "team", "teamName", "teamImg", "teamList"])
    },
    created: function() {
      if (this.$route.path.indexOf("/back/") < 0) {
        this.inBack = false;
      } else {
        this.inBack = true;
      }
      let body = document.querySelector("body");
      body.addEventListener(
        "click",
        e => {
          if (e.target.id === "showTeamInfo" || e.target.className === "team-icon") {
            this.isActive = false;
            this.showTeamInfo = !this.showTeamInfo;
          } else if (e.target.id === "showPersonage") {
            this.isActive = !this.isActive;
            this.showTeamInfo = false;
          } else {
            this.showTeamInfo = false;
            this.isActive = false;
          }
        },
        false
      );
    },

    methods: {
      quitLogin() {
        this.$store.dispatch("Logout");
        window.location.href = "https://account.easyapi.com/login";
      },
      changeTeam(teamId) {
        this.$store.dispatch("switchoverTeam", teamId);
      },
      gotoCalendar(){
        this.$router.push({path:"/event"})
      },
      gotoInform(){
        this.$router.push({path:"/notification"})
      }
    },
    watch: {
      $route: function() {
        if (this.$route.path.indexOf("/back/") < 0) {
          this.inBack = false;
        } else {
          this.inBack = true;
        }
      }
    },
    mounted() {
      if (this.authenticationToken) {
        this.$store.dispatch("GetUserInfo");
        this.$store.dispatch("getTeamList");
      }
    }
  };
</script>

<style lang="stylus">
  .header {
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

    .h-left {
      float: left;
      width: 70%;
    }

    .ea-header-item {
      position: relative;
      float: left;
      height: 50px;
      padding: 0 30px;
      color: #fff;
      border-right: 1px solid darken(#1ac1d6, 5%);
      font-size: 14px;
    }

    .logo {
      padding-left: 0;

      img {
        margin: 10px 0;
        height: 30px;
        width: 30px;
      }
    }

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
      font-size: 14px;

      &.active {
        display: block;
      }

      a {
        display: block;
        line-height: 26px;
        height: inherit;
        padding: 5px 15px;
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
        padding: (15px / 2px) 20px;
        height: 50px;
        display: inline-block;

        &.active {
          background-color: #19B7CB;
        }

        &:hover {
          background-color: #19B7CB;
        }

        .calendar{
          display: inline-block;
          width: 35px;
          height: 35px;
          background: url('../assets/images/calendar.png') no-repeat;
          background-size: cover;
        }

        .inform {
          display: inline-block;
          width: 35px;
          height: 35px;
          background: url('../assets/images/inform.png') no-repeat;
          background-size: cover;
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
      display: none;
      z-index: 9999;

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
        display: flex;

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
            height: auto;
            line-height: 16px;
            font-size: 1rem;
            padding-top: 10px;
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
            width: 50%;
            color: #333;
            font-size: 1rem;
            font-weight: normal;
            height: auto;
            display: flex;
            flex-direction: row;
            align-items: center;

            & > img {
              width: 28px;
              height: 28px;
              border-radius: 50%;
              vertical-align: middle;
            }

            & > span {
              display: inline-block;
              width: calc(100% - 28px);
              padding: 0 10px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              box-sizing: border-box;
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
