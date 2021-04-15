import {accountUrl} from "./api";
import request from "@/utils/request";


/**
 * 获取文档续费价格列表
 *
 * @see https://www.easyai.com
 */
export function getDocumentPriceList() {
  return request({
    url: `${accountUrl}/team/document/price`,
    method: "GET",
  });
}
/**
 * 文档续费
 *
 * @see https://www.easyai.com
 */
export function documentRenew(data) {
  return request({
    url: `${accountUrl}/team/document/renew`,
    method: "POST",
    data: {
      ...data,
    },
  });
}
