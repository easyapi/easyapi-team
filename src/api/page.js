import request from "@/utils/request";

/**
 * 团队首页接口
 *
 * @see https://www.easyai.com
 */
export function teamPage(domain) {
  return request({
    url: `${process.env.VUE_APP_ACCOUNT_API}/page/team/${domain}`,
    method: "GET"
  });
}
