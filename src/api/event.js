import {baseUrl} from "./api";
import request from "@/utils/request";

/**
 * 获取动态列表
 *
 * @see https://www.easyai.com
 */
export function getEventList(params) {
  return request({
    url: `${baseUrl}/events`,
    method: "GET",
    params: {
      ...params,
    },
  });
}
