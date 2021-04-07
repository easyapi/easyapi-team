import {baseUrl} from "./api";
import request from "@/utils/request";

/**
 * 获取第三方账号列表
 *
 * @see https://www.easyai.com
 */
export function getThirdPartyList(params) {
  return request({
    url: `${baseUrl}/third-parties`,
    method: "GET",
    params: {
      ...params,
    },
  });
}
