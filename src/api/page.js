import {accountUrl} from "./api";
import request from "@/utils/request";

/**
 * 团队首页接口
 *
 * @see https://www.easyai.com
 */
export function teamPage(domain) {
  return request({
    url: `${accountUrl}/page/team/${domain}`,
    method: "GET"
  });
}
