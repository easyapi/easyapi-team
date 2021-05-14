import request from "@/utils/request";

/**
 * 获取用户信息
 **
 * @see https://www.easyai.com
 */
export function getAccountInfo() {
  return request({
    url: `${process.env.VUE_APP_ACCOUNT_API}/api/account`,
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
    url: `${process.env.VUE_APP_ACCOUNT_API}/api/user/teams`,
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
    url: `${process.env.VUE_APP_ACCOUNT_API}/api/account/change-password`,
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
    url: `${process.env.VUE_APP_ACCOUNT_API}/api/account`,
    method: "PUT",
    data: {
      ...data
    }
  });
}
