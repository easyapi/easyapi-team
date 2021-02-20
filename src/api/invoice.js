import {baseUrl} from "./api";
import request from "@/utils/request";


/**
 * 获取发票Token
 *
 * @see https://www.easyai.com
 */
export function getInvoiceToken(username) {
  return request({
    url: `${baseUrl}/invoice/access-token`,
    method: "GET",
    params: {
      username: username
    }
  });
}
