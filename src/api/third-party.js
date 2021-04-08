import {baseUrl} from "./api";
import request from "@/utils/request";

/**
 * 获取第三方账号列表
 *
 * @see https://www.easyai.com
 */
export function getUserThirdPartyList() {
  return request({
    url: `${baseUrl}/user/third-parties`,
    method: "GET",
  });
}
