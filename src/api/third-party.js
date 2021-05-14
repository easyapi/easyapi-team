import request from "@/utils/request";

/**
 * 获取第三方账号列表
 *
 * @see https://www.easyai.com
 */
export function getUserThirdPartyList() {
  return request({
    url: `${process.env.VUE_APP_ACCOUNT_API}/user/third-parties`,
    method: "GET",
  });
}

/**
 * 获取第三方账号列表
 *
 * @see https://www.easyai.com
 */
export function unbindThirdParty(id) {
  return request({
    url: `${process.env.VUE_APP_ACCOUNT_API}/third-party/${id}`,
    method: "DELETE",
  });
}
