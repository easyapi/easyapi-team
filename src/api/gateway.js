import {accountUrl} from "./api";
import request from "@/utils/request";


/**
 * 获取网关项目详情信息
 *
 * @see https://www.easyai.com
 */
export function getGatewayProject(id) {
  return request({
    url: `https://gateway-api.easyapi.com/project/${id}`,
    method: "GET",
  });
}


/**
 * 获取网关项目续费价格列表
 *
 * @see https://www.easyai.com
 */
export function getGatewayPriceList() {
  return request({
    url: `${accountUrl}/gateway/price`,
    method: "GET",
  });
}


/**
 * 网关项目续费
 *
 * @see https://www.easyai.com
 */
export function documentRenew(data) {
  return request({
    url: `${accountUrl}/gateway/renew`,
    method: "POST",
    data: {
      ...data,
    },
  });
}
