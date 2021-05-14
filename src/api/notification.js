import request from "@/utils/request";


/**
 * 获取通知列表
 *
 * @see https://www.easyai.com
 */
export function getNotificationList(params) {
  return request({
    url: `${process.env.VUE_APP_ACCOUNT_API}/notifications`,
    method: "GET",
    params: {
      ...params,
    },
  });
}
