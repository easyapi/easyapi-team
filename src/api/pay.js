import {baseUrl} from "./api";


/**
 * 支付宝支付
 *
 * @see https://www.easyai.com
 */
export const alipay = (price) => axios.get(`${baseUrl}/api/alipay/recharge`, {price: price});

/**
 * 微信支付
 *
 * @see https://www.easyai.com
 */
export const wxpay = (price) => axios.get(`${baseUrl}/api/wxpay/recharge`, {price: price});
