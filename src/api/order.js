import { baseUrl } from "./api";
import request from "@/utils/request";

/**
 * 获取团队充值记录列表
 *
 * @see https://www.easyai.com
 */
export function getOrderList(params) {
  return request({
    url: `${baseUrl}/api/order`,
    method: "GET",
    params: {
      ...params,
    },
  });
}
