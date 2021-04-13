import { accountUrl } from "./api";
import request from "@/utils/request";

/**
 * 获取团队订单列表
 *
 * @see https://www.easyai.com
 */
export function getOrderList(params) {
  return request({
    url: `${accountUrl}/api/orders`,
    method: "GET",
    params: {
      ...params,
    },
  });
}
