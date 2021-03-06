import request from "@/utils/request";


/**
 * 获取监控项目详情信息
 *
 * @see https://www.easyai.com
 */
export function getMonitorProject(id) {
  return request({
    url: `https://monitor-api.easyapi.com/project/${id}`,
    method: "GET",
  });
}


/**
 * 获取监控项目续费价格列表
 *
 * @see https://www.easyai.com
 */
export function getMonitorPriceList() {
  return request({
    url: `${process.env.VUE_APP_ACCOUNT_API}/monitor/price`,
    method: "GET",
  });
}


/**
 * 监控项目续费
 *
 * @see https://www.easyai.com
 */
export function monitorRenew(data) {
  return request({
    url: `${process.env.VUE_APP_ACCOUNT_API}/monitor/renew`,
    method: "POST",
    data: {
      ...data,
    },
  });
}
