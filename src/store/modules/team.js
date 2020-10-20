import {getUserTeamList} from "@/api/account";
import {changeTeam} from "@/api/team";

const team = {
  state: {
    currentTeam: "",
    teamName: "",
    teamAvatar: "",
    teamList: []
  },

  mutations: {
    SET_CURRENT_TEAM: (state, currentTeam) => {
      state.currentTeam = currentTeam;
    },
    SET_TTEAM_NAME: (state, teamName) => {
      state.teamName = teamName;
    },
    SET_TTEAM_AVATAR: (state, teamAvatar) => {
      state.teamAvatar = teamAvatar;
    },
    SET_TEAM_LIST: (state, teamList) => {
      state.teamList = teamList;
    }
  },

  actions: {
    getTeamList({commit, state}) {
      getUserTeamList().then(res => {
        commit("SET_TEAM_LIST", res.data.content);
      })
    },
    //切换团队
    switchoverTeam({dispatch, commit, state}, teamId) {
      changeTeam(teamId).then(res => {
        if (res.data.code === 1) {
          dispatch("GetUserInfo");
          location.hash = "";
          location.reload();
        }
      })
    }
  }
};

export default team;
