import {accountUrl} from "./api";
import request from "@/utils/request";

/**
 * 获取第三方账号列表
 *
 * @see https://www.easyai.com
 */
export function getUserThirdPartyList() {
  return request({
    url: `${accountUrl}/user/third-parties`,
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
    url: `${accountUrl}/third-party/${id}`,
    method: "DELETE",
  });
}
