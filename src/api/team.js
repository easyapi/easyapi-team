import { baseUrl } from "./api";
import request from "@/utils/request";

/**
 * 获取团队成员列表
 *
 * @see https://www.easyai.com
 */
export function getTeamUserList(teamId) {
  return request({
    url: `${baseUrl}/api/team/users`,
    method: "get",
    params: {
      teamId: teamId,
      page: 0,
      size: 100,
    },
  });
}

/**
 * 切换默认团队
 *
 * @see https://www.easyai.com
 */
export function changeTeam(teamId) {
  return request({
    url: `${baseUrl}/api/team/${teamId}/change`,
    method: "put",
  });
}

/**
 * 检查团队URL
 *
 * @see https://www.easyai.com
 */
export function checkTeamUrl(url) {
  return request({
    url: `${baseUrl}/api/team/checkUrl`,
    method: "get",
    params: {
      url: url,
    },
  });
}
