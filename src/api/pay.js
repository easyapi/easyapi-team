import {accountUrl} from "./api";
import request from "@/utils/request";

/**
 * 支付宝支付
 *
 * @see https://www.easyai.com
 */
export function alipay(params) {
  return request({
    url: `${accountUrl}/api/alipay/recharge`,
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
    url: `${accountUrl}/api/wxpay/recharge`,
    method: "GET",
    params: {
      ...params,
    },
  });
}
