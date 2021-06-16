<template>
  <div class="header ctx-w">
    <div class="h-left clearfix">
      <a href="https://www.easyapi.com">
        <div class="ea-header-item logo">
          <img src="https://qiniu.easyapi.com/icon.png" alt />
        </div>
      </a>
      <router-link v-if="team" class="ea-header-item" to="/">{{
        team.name
      }}</router-link>
    </div>
    <div class="h-right clearfix">
      <div class="fr menu-box">
        <div class="current-team-box">
          <a
            id="showCalendar"
            :class="{ active: showCalendar }"
            @click="gotoCalendar"
          >
            <span class="calendar"></span>
          </a>
          <a
            id="showInform"
            :class="{ active: showInform }"
            @click="gotoInform"
          >
            <span class="inform"></span>
          </a>
          <a id="showTeamInfo" :class="{ active: showTeamInfo }">
            <span class="team-icon"></span>
          </a>
          <EaTeam :class="{ active: showTeamInfo }"></EaTeam>
        </div>
        <div class="user-avatar">
          <a>
            <img id="showPersonage" :src="photo" alt />
          </a>
          <div :class="{ active: isActive }" class="ea-DropdownMenu">
            <router-link to="/notification">我的通知</router-link>
            <router-link to="/user/edit">个人设置</router-link>
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
import EaTeam from "./common/ea-team/EaTeam";

export default {
  name: "Header",
  components: {
    EaTeam,
  },
  data: function () {
    return {
      inBack: false,
      userInfo: [],
      isActive: false,
      showTeamInfo: false,
      showInform: false,
      showCalendar: false,
      authenticationToken: Cookies.get("authenticationToken"),
    };
  },
  computed: {
    ...mapGetters(["photo", "team", "teamName", "teamImg"]),
  },
  created: function () {
    if (this.$route.path.indexOf("/back/") < 0) {
      this.inBack = false;
    } else {
      this.inBack = true;
    }
    let body = document.querySelector("body");
    body.addEventListener(
      "click",
      (e) => {
        if (
          e.target.id === "showTeamInfo" ||
          e.target.className === "team-icon"
        ) {
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
      this.$store.dispatch("logout");
      window.location.href =
        "https://account.easyapi.com/login?from=https://team.easyapi.com";
    },
    gotoCalendar() {
      this.$router.push({ path: "/event" });
    },
    gotoInform() {
      this.$router.push({ path: "/notification" });
    },
  },
  watch: {
    $route: function () {
      if (this.$route.path.indexOf("/back/") < 0) {
        this.inBack = false;
      } else {
        this.inBack = true;
      }
    },
  },
  mounted() {
    if (this.authenticationToken) {
      this.$store.dispatch("getUser");
    }
  },
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

      .calendar {
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
        background-size: 89% 89%;
        background-position: -1px 2px;
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
}
</style>
