import {baseUrl} from "./api";
import request from "@/utils/request";

/**
 * 支付宝支付
 *
 * @see https://www.easyai.com
 */
export function alipay(params) {
  return request({
    url: `${baseUrl}/api/alipay/recharge`,
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
    url: `${baseUrl}/api/wxpay/recharge`,
    method: "GET",
    params: {
      ...params,
    },
  });
}
