import {accountUrl} from "./api";
import request from "@/utils/request";

/**
 * 获取团队充值记录列表
 *
 * @see https://www.easyai.com
 */
export function getRechargeList(params) {
  return request({
    url: `${accountUrl}/api/recharges`,
    method: "GET",
    params: {
      ...params,
    },
  });
}
