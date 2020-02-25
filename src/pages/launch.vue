<template>
  <div class="clearfix">
    <Spin fix v-if="dataLoading">
      <Icon type="load-c" size="18" class="spin-icon-load"></Icon>
    </Spin>
    <div class="tips">
      <div class="m-wrapper">
        <p>
          加入其他团队？请让管理员给您发送邀请链接。
          <a href="javascript:;">查看帮助</a>
        </p>
      </div>
    </div>
    <div class="team-list m-wrapper grid">
      <div class="team" v-for="self in teamList" :key="self.team.id">
        <a
          href="javascript:;"
          class="team-body"
          @click="changeTeam(self.team.id)"
        >
          <p>{{ self.team.name }}</p>
        </a>
      </div>
      <div class="team">
        <div class="team-body" @click="newTeam">
          <p class="new-team">新建团队</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import {changeTeam} from "../api/api";

  export default {
    name: "Launch",
    data: function () {
      return {
        teams: [],
        dataLoading: false
      };
    },
    computed: {
      ...mapGetters(["teamList"])
    },
    created: function () {
    },
    methods: {
      newTeam: function () {
        this.$router.push("/new");
      },
      changeTeam(id) {
        this.$ajax({
          url: changeTeam + "/" + id,
          method: "PUT"
        }).then(res => {
          this.$router.push("/");
        });
      }
    },
    mounted() {
      document.title = "选择团队 - EasyAPI";
    }
  };
</script>

<style lang="stylus" scoped>
  @import '../assets/styles/color'

  .tips
    padding: 20px 0
    background-color: c-blue-light

  .team-list
    margin-top: 20px

  .team
    float: left
    padding: 10px
    width: (100 / 4) %
    cursor: pointer
    .team-body
      display: block
      height: 120px
      line-height 120px
      border: 1px solid c-blue
      text-align: center
      &:hover
        background-color: c-background-dark
      a, p
        color: c-blue

    .new-team
      position: relative
      top: 4px
      &:before
        display: inline-block
        content: '\e808'
        position: absolute
        left: 50%
        top: -16px
        margin-left: -7px
        font-family: "fontello"
        font-size: 14px

  .n-row
    margin-bottom: 20px
    .l-k
      max-width: 60px
    .r-v
      width: calc(100% - 60px)

  .spin-icon-load
  .spin-icon-load {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
