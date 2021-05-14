import request from "@/utils/request";

/**
 * 查询账户信息
 *
 * @see https://www.easyai.com
 */
export function getAccountMoney(params) {
  return request({
    url: `${process.env.VUE_APP_ACCOUNT_API}/api/money/check`,
    method: "GET",
    params: {
      ...params,
    },
  });
}


/**
 * 余额预警
 *
 * @see https://www.easyai.com
 */
export function balanceWarn(id, data) {
  return request({
    url: `${process.env.VUE_APP_ACCOUNT_API}/api/money/${id}`,
    method: "PUT",
    data: {
      ...data,
    },
  });
}
