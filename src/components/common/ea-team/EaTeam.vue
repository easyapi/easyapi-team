<template>
  <div class="current-team-info">
    <div class="current-team-name lrPading-20">
      <a href="https://doc.easyapi.com/" class="ea-link">文档</a>
      <a href="https://monitor.easyapi.com/" class="ea-link">监控</a>
      <a href="https://gateway.easyapi.com/" class="ea-link">网关</a>
      <a href="https://service.easyapi.com/" class="ea-link">服务</a>
    </div>
    <div class="clear current-team-content lrPading-20">
      <img
        class="lf teams-img"
        :src="
          teamImg
            ? teamImg + '?icon.jpg'
            : 'https://qiniu.easyapi.com/team/default.png?icon.jpg'
        "
        alt
      />
      <div class="lf teams-img-r">
        <p>{{ teamName }}</p>
        <div class="team-btn">
          <router-link to="/account" class="ea-btn">账户</router-link>
          <router-link to="/members" class="ea-btn">成员</router-link>
          <router-link to="/orders" class="ea-btn">订单</router-link>
        </div>
      </div>
    </div>
    <div class="change-team-box">
      <h2 class="lrPading-20">
        切换团队：<Button
          type="info"
          class="ea-info-btn"
          to="https://team.easyapi.com/new"
          >创建新团队
        </Button>
      </h2>
      <div class="ea-team-list-box lrPading-20">
        <a
          href="JavaScript:void(0)"
          class="ea-team-item"
          v-for="(item, index) in teamList"
          v-bind:key="index"
          @click="changeTeam(item.team.id)"
        >
          <img
            :src="
              item.team.img
                ? item.team.img + '?icon.jpg'
                : 'https://qiniu.easyapi.com/team/default.png?icon.jpg'
            "
            alt
          />
          <span style="display: block">{{ item.team.name }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Cookies from "js-cookie";
export default {
  name: "EaTeam",
  data() {
    return {
      authenticationToken: Cookies.get("authenticationToken"),
    };
  },
  computed: {
    ...mapGetters(["teamName", "teamList", "teamImg"]),
  },
  methods: {
    changeTeam(teamId) {
      this.$store.dispatch("switchoverTeam", teamId);
    },
  },
  mounted() {
    if (this.authenticationToken) {
      this.$store.dispatch("getTeamList");
    }
  },
};
</script>
<style lang="stylus" scoped>
.current-team-info {
    max-height:700px;
    overflow-y:auto;
    overflow-x:hidden;
    position: absolute;
    padding: 0 20px;
    top: 50px;
    left: 60px;
    background-color: #ffffff;
    box-shadow: 0px 1px 3px #ddd;
    border: 1px solid #eee;
    border-top: none;
    width: 410px;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    display: none;
    z-index: 9999;
    color #000;

    &.active {
      display: block;
    }

    .current-team-name {
      height: 50px;
      line-height: 50px;
      padding:0 20px;
      border-bottom: 1px solid #eaeaea;
      display flex ;
      justify-content space-between
      .ea-link{
        height 50px;
        display inline-block;
        color #333;
      }
    }

    .current-team-content {
      border-bottom: 1px solid #eaeaea;
      height: 110px;
      padding: 10px;
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
        vertical-align: top ;
        padding-left: 20px;

        & > p {
          color: #333;
          height: auto;
          line-height: 16px;
          font-size: 16px;
          padding-top: 10px;
        }

        .team-btn {
          height: 50px;
          line-height: 50px;
          margin-top: 10px;

          .ea-btn {
            padding: 6px 15px;
            border: 1px solid #ddd;
            color: #333;
            border-radius: 5px;
            box-sizing: content-box;
            margin-right: 10px;
            font-weight: normal;
            font-size: 14px;
          }
        }
      }
    }

    .change-team-box {
      // border-bottom: 1px solid #eaeaea;
      // padding-left 20px;

      & > h2 {
        height: 50px;
        line-height: 50px;
        font-weight: bold;
        font-size 16px
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
          font-size: 14px;
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
</style>
