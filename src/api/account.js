import {baseUrl} from "./api";
import axios from "axios";

/**
 * 获取用户信息
 **
 * @see https://www.easyai.com
 */
export const getAccountInfo = () => axios.get(`${baseUrl}/api/account`);


/**
 * 获取用户团队列表
 **
 * @see https://www.easyai.com
 */
export const getUserTeamList = () => axios.get(`${baseUrl}/api/user/teams`);


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
export const updateAccountInfo = (data) => axios.put(`${baseUrl}/api/account`, data);
