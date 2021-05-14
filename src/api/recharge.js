import request from "@/utils/request";

/**
 * 获取团队充值记录列表
 *
 * @see https://www.easyai.com
 */
export function getRechargeList(params) {
  return request({
    url: `${process.env.VUE_APP_ACCOUNT_API}/api/recharges`,
    method: "GET",
    params: {
      ...params,
    },
  });
}


/**
 * 未付款充值记录再次支付
 *
 * @see https://www.easyai.com
 */
export function payRecharge(rechargeId) {
  return request({
    url: `${process.env.VUE_APP_ACCOUNT_API}/recharge/${rechargeId}/pay`,
    method: "GET"
  });
}
