import {accountUrl} from "./api";
import request from "@/utils/request";


/**
 * 获取通知列表
 *
 * @see https://www.easyai.com
 */
export function getNotificationList(params) {
  return request({
    url: `${accountUrl}/notifications`,
    method: "GET",
    params: {
      ...params,
    },
  });
}
