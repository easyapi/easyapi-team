import Cookies from "js-cookie";
import {getAccountInfo} from "@/api/account";

const user = {
  state: {
    accountInfo: {},
    userId: "",
    username: "",
    nickname: "",
    photo: "",
    mobile: "",
    email: "",
    team: {},
    teamName: "",
    teamImg: "",
    userTeam: "", //用户团队
    token: Cookies.get("authenticationToken")
  },

  mutations: {
    SET_ACCOUNT_INFO: (state, accountInfo) => {
      state.accountInfo = accountInfo;
    },
    SET_USER_ID: (state, userId) => {
      state.userId = userId;
    },
    SET_USERNAME: (state, username) => {
      state.username = username;
    },
    SET_NICKNAME: (state, nickname) => {
      state.nickname = nickname;
    },
    SET_PHOTO: (state, photo) => {
      state.photo = photo;
    },
    SET_MOBILE: (state, mobile) => {
      state.mobile = mobile;
    },
    SET_EMAIL: (state, email) => {
      state.email = email;
    },
    SET_TEAM: (state, team) => {
      state.team = team;
    },
    SET_TEAM_NAME: (state, teamName) => {
      state.teamName = teamName;
    },
    SET_TEAM_IMG: (state, teamImg) => {
      state.teamImg = teamImg;
    },
    SET_USER_TEAM: (state, userTeam) => {
      state.userTeam = userTeam;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({commit}, userInfo) {
    },
    // 获取用户信息
    GetUserInfo({commit, state}) {
      getAccountInfo().then(res => {
        let userInfoData = res.data;
        commit("SET_ACCOUNT_INFO", userInfoData);
        commit("SET_USER_ID", userInfoData.id);
        commit("SET_USERNAME", userInfoData.username);
        commit("SET_NICKNAME", userInfoData.nickname);
        commit("SET_PHOTO", userInfoData.photo);
        commit("SET_MOBILE", userInfoData.mobile);
        commit("SET_EMAIL", userInfoData.email);
        if (userInfoData.team) {
          //团队信息{}，包括：name，img，id。。
          commit("SET_TEAM", userInfoData.team);
          //团队信息具体信息
          commit("SET_TEAM_NAME", userInfoData.team.name);
          commit("SET_TEAM_IMG", userInfoData.team.img);
        }
        //用户团队{}
        commit("SET_USER_TEAM", userInfoData.userTeam);
      }).catch(error => {
        this.$Message.error(error.response.data.message);
      });
    },
    // 登出
    Logout({commit, state}) {
      Cookies.remove("authenticationToken");
    }
  }
};

export default user;
