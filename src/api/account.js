import {baseUrl} from "./api";
import request from "@/utils/request";
/**
 * 获取用户信息
 **
 * @see https://www.easyai.com
 */
export function getAccountInfo() {
  return request({
    url: `${baseUrl}/api/account`,
    method: "get",
  });
}


/**
 * 获取用户团队列表
 **
 * @see https://www.easyai.com
 */
export function getUserTeamList() {
  return request({
    url: `${baseUrl}/api/user/teams`,
    method: "get",
  });
}

/**
 * 修改密码
 **
 * @see https://www.easyai.com
 */
export function changePassword(data) {
  return request({
    url: `${baseUrl}/api/account/change-password`,
    method: "post",
    data:{
      ...data
    }
  });
}

/**
 * 更新用户信息
 *
 * @see https://www.easyai.com
 */
export function updateAccountInfo(data) {
  return request({
    url: `${baseUrl}/api/account`,
    method: "put",
    data:{
      ...data
    }
  });
}
