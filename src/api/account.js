import {baseUrl} from "./api";
import axios from "axios";

//获取用户信息
export const getAccountInfo = `${baseUrl}/api/account`;

//获取用户团队列表
export const getUserTeamList = `${baseUrl}/api/user/teams`;

/**
 * 切换团队
 *
 * @see https://www.easyai.com
 */
export const changeTeam = (url) => axios.post(`${baseUrl}/api/changeTeam/${url}`);

/**
 * 修改密码
 **
 * @see https://www.easyai.com
 */
export const changePassword = (data) => axios.post(`${baseUrl}/api/account/change-password`, {
  data: {
    data
  }
});

/**
 * 更新用户信息
 *
 * @see https://www.easyai.com
 */
export const updateAccountInfo = (data) => axios.post(`${baseUrl}/api/account`, {
  data: {
    data
  }
});
