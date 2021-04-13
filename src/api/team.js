import {accountUrl} from "./api";
import request from "@/utils/request";

/**
 * 获取团队成员列表
 *
 * @see https://www.easyai.com
 */
export function getTeamUserList(teamId) {
  return request({
    url: `${accountUrl}/api/team/users`,
    method: "GET",
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
    url: `${accountUrl}/api/team/${teamId}/change`,
    method: "PUT",
  });
}


/**
 * 创建团队信息
 *
 * @see https://www.easyai.com
 */
export function createTeam(data) {
  return request({
    url: `${accountUrl}/api/team`,
    method: "POST",
    data: {
      ...data
    }
  });
}

/**
 * 修改团队信息
 *
 * @see https://www.easyai.com
 */
export function updateTeam(id, data) {
  return request({
    url: `${accountUrl}/api/team/${id}`,
    method: "PUT",
    data: {
      ...data
    }
  });
}

/**
 * 修改团队信息
 *
 * @see https://www.easyai.com
 */
export function deleteTeam(id, data) {
  return request({
    url: `${accountUrl}/api/team/${id}`,
    method: "DELETE",
    data: {
      ...data
    }
  });
}

/**
 * 检查团队URL
 *
 * @see https://www.easyai.com
 */
export function checkTeamUrl(url) {
  return request({
    url: `${accountUrl}/api/team/checkUrl`,
    method: "GET",
    params: {
      url: url,
    },
  });
}

/**
 * 退出团队
 *
 * @see https://www.easyai.com
 */
export function quitTeam(id, params) {
  return request({
    url: `${accountUrl}/api/team/${id}/exit`,
    method: "GET",
    params: {
      ...params
    }
  });
}

/**
 * 转让团队
 *
 * @see https://www.easyai.com
 */
export function transferTeam(id, data) {
  return request({
    url: `${accountUrl}/api/team/${id}/transfer`,
    method: "PUT",
    data: {
      ...data
    }
  });
}
