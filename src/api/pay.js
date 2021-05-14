import request from "@/utils/request";

/**
 * 支付宝支付
 *
 * @see https://www.easyai.com
 */
export function alipay(params) {
  return request({
    url: `${process.env.VUE_APP_ACCOUNT_API}/api/alipay/recharge`,
    method: "GET",
    params: {
      ...params,
    },
  });
}

/**
 * 微信支付
 *
 * @see https://www.easyai.com
 */
export function wxpay(params) {
  return request({
    url: `${process.env.VUE_APP_ACCOUNT_API}/api/wxpay/recharge`,
    method: "GET",
    params: {
      ...params,
    },
  });
}
