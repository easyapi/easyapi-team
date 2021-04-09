import request from "@/utils/request";

//查询 服务报价列表
export function getServiceList(params) {
  return request({
    url: `https://api.easyapi.com/console/service-prices`,
    method: "GET",
    params: {
      ...params,
    },
  });
}
//续购服务POST
export function renewBalance(data) {
  return request({
    url: `https://api2.easyapi.com/console/service/buy`,
    method: "POST",
    data: {
      ...data,
    },
  });
}
//获取服务详情信息
export function getTeamServiceInfo(id) {
  return request({
    url: `https://api.easyapi.com/console/team-service/${id}`,
    method: "get",
  });
}
