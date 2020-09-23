<template>
  <div class="teamHomePage">
    <div class="team-hl">
      <div class="team-head">
        <div class="team-head-right">
          <span v-if="team.img">
            <img :src="team.img" alt style="width:24px;height: 24px;border-radius: 20px"/>
          </span>
          <span style="padding-left: 10px;" v-if="team.name">
            {{team.name}}
          </span>
        </div>
        <div class="team-head-left" v-if="authenticationToken">
          <span id="showTeamInfo" style="cursor: pointer">
            <img
              v-if="accountInfo.photo"
              class="team-icon"
              :src="accountInfo.photo"
              alt
              style="width:24px;height: 24px;border-radius: 20px"
            />
          </span>
          <div class="ea-DropdownMenu" :class="{ active: showTeamInfo }">
            <a href="https://account.easyapi.com/notification/">我的通知</a>
            <router-link to="/user/edit">个人设置</router-link>
            <a @click="quitLogin()" href="https://account.easyapi.com/logout">退出</a>
          </div>
        </div>

        <div class="team-head-left" v-if="!authenticationToken">
          <a
            href="https://account.easyapi.com"
            style="color: #fff;font-size: 14px;line-height: 50px;padding-right:20px;"
          >登录</a>
          <a
            href="https://account.easyapi.com/signup"
            style="color: #fff;font-size: 14px;line-height: 50px;"
          >注册</a>
        </div>
      </div>

      <div class="team-content">
        <p class="team-content-la" v-if="team != null && team !== ''">欢迎来到{{ team.name }}开发者主页</p>
        <p class="team-content-la" v-if="team != null && team !== ''">{{ team.description }}</p>
        <p class="team-content-le">提供API文档管理、测试、监控、网关、第三方接口服务</p>
        <p class="team-content-btn">
          <a :href="teamLink || '/new'">{{ teamButton || "创建团队" }}</a>
        </p>
      </div>
    </div>
    <div class="team-business">
      <div class="business-details">
        <a style="display: block" @click="jumpHref('https://doc.easyapi.com')">
          <img src="../../static/images/index/file.png" alt/>
          <span class="details-name">API文档</span>
          <span class="service-introduction" style="margin-top:5px;">API开发文档，立刻着手开发</span>
          <span class="btn" style="margin-top:32px;">文档中心</span>
        </a>
      </div>
      <div class="business-details">
        <a style="display: block" @click="jumpHref('https://monitor.easyapi.com')">
          <img src="../../static/images/index/monitor.png" alt/>
          <span class="details-name">API监控</span>
          <span class="service-introduction" style="margin-top:5px;">3种API监控方式</span>
          <span class="service-introduction">全方面保障您的API接口</span>
          <span class="btn" style="margin-top:5px;">监控中心</span>
        </a>
      </div>
      <div class="business-details">
        <a style="display: block" @click="jumpHref('https://gateway.easyapi.com')">
          <img src="../../static/images/index/gateway.png" alt/>
          <span class="details-name">API网关</span>
          <span class="service-introduction" style="margin-top:5px;">鉴权、限流、接口容器等</span>
          <span class="btn" style="margin-top:32px;">网关中心</span>
        </a>
      </div>
      <div class="business-details">
        <a style="display: block" @click="jumpHref('https://service.easyapi.com')">
          <img src="../../static/images/index/service.png" alt/>
          <span class="details-name">API服务</span>
          <span class="service-introduction" style="margin-top:5px;">第三方API接口服务</span>
          <span class="service-introduction">独立的接口场景化服务</span>
          <span class="btn" style="margin-top:5px;">服务中心</span>
        </a>
      </div>
    </div>
    <div class="team-bottom">EasyAPI提供技术支持</div>
  </div>
</template>
<script>
  import {teamPage} from '../api/page'
  import {changeTeam} from '../api/team'
  import Cookies from 'js-cookie'
  import {mapGetters} from 'vuex'

  export default {
    name: 'Index',
    data: function () {
      return {
        showTeamInfo: false,
        domain: '',
        code: '',
        teamLink: '',
        teamButton: '',
        authenticationToken: Cookies.get('authenticationToken')
      }
    },
    computed: {
      ...mapGetters([
        'accountInfo',
        'photo',
        'team',
        'teamName',
        'teamImg',
        'teamList'
      ])
    },
    created: function () {
      let body = document.querySelector('#app')
      body.addEventListener(
        'click',
        e => {
          if (
            e.target.id === 'showTeamInfo' ||
            e.target.className === 'team-icon'
          ) {
            this.isActive = false
            this.showTeamInfo = !this.showTeamInfo
          } else if (e.target.id === 'showPersonage') {
            this.showTeamInfo = false
          } else {
            this.showTeamInfo = false
          }
        },
        false
      )
    },
    methods: {
      jumpHref(url) {
        if (this.authenticationToken) {
          if (this.team) {
            window.open(url)
          } else {
            this.$router.push('/new')
          }
        } else {
          location.href = 'https://account.easyapi.com/login'
        }
      },

      quitLogin() {
        this.$store.dispatch('Logout')
      },
      //团队信息
      getTeamInfo() {
        this.$ajax.get(teamPage + '/' + this.domain, {}).then(res => {
          this.teamLink = res.data.link
          this.teamButton = res.data.button
        }).catch(error => {
          console.log(error)
        })
      }
    },
    watch: {},
    mounted: function () {
      this.domain = window.location.href.split('.')[0].split('//')[1]
      document.title = '团队首页 - EasyAPI'
      if (this.domain && this.domain != '127') {
        this.getTeamInfo()
      }
      if (this.authenticationToken) {
        this.$store.dispatch('GetUserInfo')
      }
    }
  }
</script>
<style scoped>
  .teamHomePage {
    width: 100%;
    height: auto;
  }

  .team-hl {
    width: 100%;
    height: 450px;
    background: url('../../static/images/bg_index.png') no-repeat;
    background-size: 100% 100%;
  }

  .team-head {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
  }

  .team-head-right {
    margin-left: 20px;
    display: flex;
  }

  .team-head-right img {
    margin-top: 12px;
  }

  .team-head-right span {
    color: #ffffff;
    font-size: 14px;
    line-height: 50px;
  }

  .team-head-left {
    margin-right: 20px;
    display: flex;
    position: relative;
  }

  .team-head-left span {
    margin-top: 12px;
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
    font-size: 14px;
    display: none;
  }

  .ea-DropdownMenu.active {
    display: block;
  }

  .ea-DropdownMenu a {
    display: block;
    color: #777;
    line-height: 26px;
    height: inherit;
    padding: 5px 15px;
    font-weight: 400;
  }

  .ea-DropdownMenu a:hover {
    color: #fff;
    background-color: #1ac1d6;
  }

  .team-content {
    width: 100%;
    height: auto;
    margin: 0 auto;
    margin-top: 115px;
    text-align: center;
  }

  .team-content .team-content-la {
    font-size: 28px;
    color: #ffffff;
  }

  .team-content .team-content-le {
    font-size: 18px;
    color: #ffffff;
    opacity: 0.87;
    margin-top: 20px;
  }

  .team-content .team-content-btn {
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }

  .team-content .team-content-btn a {
    width: 160px;
    height: 40px;
    line-height: 40px;
    border-radius: 4px;
    border: solid 1px #ffffff;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
  }

  .team-business {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 123px;
  }

  .business-details {
    width: 285px;
    height: 347px;
    background-color: #ffffff;
    border: solid 1px #dddddd;
    margin-right: 20px;
    text-align: center;
    cursor: pointer;
    position: relative;
  }

  .business-details:hover {
    box-shadow: 0px 3px 15px 0px rgba(0, 0, 0, 0.09);
  }

  .business-details img {
    margin-top: 35px;
    width: 127px;
    height: 130px;
  }

  .details-name {
    display: block;
    text-align: center;
    color: #333333;
    font-size: 18px;
    margin-top: 30px;
  }

  .service-introduction {
    display: block;
    color: #999999;
    font-size: 14px;
    text-align: center;
  }

  .btn {
    display: block;
    width: 110px;
    height: 34px;
    text-align: center;
    line-height: 34px;
    border: solid 1px #17c1d6;
    color: #17c1d6;
    font-size: 14px;
    left: 50%;
    position: absolute;
    bottom: 15px;
    transform: translateX(-50%);
  }

  .team-bottom {
    width: 100%;
    height: 150px;
    line-height: 150px;
    color: #555555;
    font-size: 14px;
    text-align: center;
  }
</style>
