import {baseUrl} from "./api";
import request from "@/utils/request";


/**
 * 获取通知列表
 *
 * @see https://www.easyai.com
 */
export function getNotificationList(params) {
  return request({
    url: `${baseUrl}/notifications`,
    method: "get",
    params: {
      ...params,
    },
  });
}
