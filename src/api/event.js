import request from "@/utils/request";

/**
 * 获取动态列表
 *
 * @see https://www.easyai.com
 */
export function getEventList(params) {
  return request({
    url: `${process.env.VUE_APP_ACCOUNT_API}/events`,
    method: "GET",
    params: {
      ...params,
    },
  });
}
