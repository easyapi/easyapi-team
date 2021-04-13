import request from "@/utils/request";

/**
 * 获取服务报价列表
 */
export function getServiceList(params) {
  return request({
    url: `https://api.easyapi.com/console/service-prices`,
    method: "GET",
    params: {
      ...params,
    },
  });
}

/**
 * 续购服务
 */
export function renewBalance(data) {
  return request({
    url: `https://api.easyapi.com/console/service/buy`,
    method: "POST",
    data: {
      ...data,
    },
  });
}

/**
 * 获取服务详情信息
 * @param id
 */
export function getTeamServiceInfo(id) {
  return request({
    url: `https://api.easyapi.com/console/team-service/${id}`,
    method: "get",
  });
}
