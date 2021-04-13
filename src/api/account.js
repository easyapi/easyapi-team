import {accountUrl} from "./api";
import request from "@/utils/request";

/**
 * 获取用户信息
 **
 * @see https://www.easyai.com
 */
export function getAccountInfo() {
  return request({
    url: `${accountUrl}/api/account`,
    method: "GET",
  });
}


/**
 * 获取用户团队列表
 **
 * @see https://www.easyai.com
 */
export function getUserTeamList() {
  return request({
    url: `${accountUrl}/api/user/teams`,
    method: "GET",
  });
}

/**
 * 修改密码
 **
 * @see https://www.easyai.com
 */
export function changePassword(data) {
  return request({
    url: `${accountUrl}/api/account/change-password`,
    method: "POST",
    data: {
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
    url: `${accountUrl}/api/account`,
    method: "PUT",
    data: {
      ...data
    }
  });
}
