import request from "@/utils/request";

/**
 * 获取团队账户明细
 *
 * @see https://www.easyai.com
 */
export function getBillList(params) {
  return request({
    url: `${process.env.VUE_APP_ACCOUNT_API}/api/bills`,
    method: "GET",
    params: {
      ...params,
    },
  });
}
