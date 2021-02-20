import {baseUrl} from "./api";
import request from "@/utils/request";


/**
 * 设置成员权限
 *
 * @see https://www.easyai.com
 */
export function setMemberType(data) {
  return request({
    url: `${baseUrl}/api/user-team`,
    method: "PUT",
    data: {
      ...data
    }
  });
}

/**
 * 获取成员邀请信息
 *
 * @see https://www.easyai.com
 */
export function getMemberInvitedInfo(params) {
  return request({
    url: `${baseUrl}/api/invite`,
    method: "GET",
    params: {
      ...params
    }
  });
}

/**
 * 增加成员
 *
 * @see https://www.easyai.com
 */
export function addMember(data) {
  return request({
    url: `${baseUrl}/api/user-team`,
    method: "POST",
    data: {
      ...data
    }
  });
}

/**
 * 删除成员
 *
 * @see https://www.easyai.com
 */
export function delMember(data, id) {
  return request({
    url: `${baseUrl}/api/user-team/${id}`,
    method: "DELETE",
    data: {
      ...data
    }
  });
}
