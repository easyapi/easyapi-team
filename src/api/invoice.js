import request from "@/utils/request";


/**
 * 获取发票Token
 *
 * @see https://www.easyai.com
 */
export function getInvoiceToken(username) {
  return request({
    url: `${process.env.VUE_APP_ACCOUNT_API}/invoice/access-token`,
    method: "GET",
    params: {
      username: username
    }
  });
}
