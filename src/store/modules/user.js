import Cookies from "js-cookie";
import axios from "@/api/fetch";
import { getAccountInfo } from "@/api/api";

const user = {
  state: {
    accountInfo: "",
    userId: "",
    username: "",
    nickname: "",
    photo: "",
    mobile: "",
    email: "",
    team: "",
    teamName: "",
    teamImg: "",
    //用户团队
    userTeam: "",
    token: Cookies.get("authenticationToken")
  },

  mutations: {
    //accountInfo
    SET_ACCOUNTINFO: (state, accountInfo) => {
      state.accountInfo = accountInfo;
    },
    SET_USERID: (state, userId) => {
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
    SET_TEAMNAME: (state, teamName) => {
      state.teamName = teamName;
    },
    SET_TEAMIMG: (state, teamImg) => {
      state.teamImg = teamImg;
    },
    SET_USERTEAM: (state, userTeam) => {
      state.userTeam = userTeam;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
    },
    // 获取用户信息
    GetUserInfo({ commit, state }) {
      axios({
        method: "GET",
        url: getAccountInfo
      })
        .then(res => {
          let userInfoData = res.data;
          commit("SET_ACCOUNTINFO", userInfoData);
          commit("SET_USERID", userInfoData.id);
          commit("SET_USERNAME", userInfoData.username);
          commit("SET_NICKNAME", userInfoData.nickname);
          commit("SET_PHOTO", userInfoData.photo);
          commit("SET_MOBILE", userInfoData.mobile);
          commit("SET_EMAIL", userInfoData.email);
          if (userInfoData.team) {
            //团队信息{}，包括：name，img，id。。
            commit("SET_TEAM", userInfoData.team);
            //团队信息具体信息
            commit("SET_TEAMNAME", userInfoData.team.name);
            commit("SET_TEAMIMG", userInfoData.team.img);
          }

          //用户团队{}
          // console.log(userInfoData.userTeam);
          commit("SET_USERTEAM", userInfoData.userTeam);
          // console.log(state.userTeam);
        })
        .catch(error => {
          // console.log(error.response);
        });
    },
    // 登出
    Logout({ commit, state }) {
      Cookies.remove("authenticationToken");
    }
  }
};

export default user;
