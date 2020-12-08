import {baseUrl} from "./api";
import axios from "axios";


/**
 * 设置成员权限
 *
 * @see https://www.easyai.com
 */
export const setMemberType = (data) => axios.put(`${baseUrl}/api/user-team`, data, {json: true});

/**
 * 获取成员邀请信息
 *
 * @see https://www.easyai.com
 */
export const getMemberInvitedInfo = (params) => axios.get(`${baseUrl}/api/invite`, params)

/**
 * 增加成员
 *
 * @see https://www.easyai.com
 */
export const addMember = (data) => axios.post(`${baseUrl}/api/user-team`, data, {json: true})

/**
 * 删除成员
 *
 * @see https://www.easyai.com
 */
export const delMember = (data, id) => axios.delete(`${baseUrl}/api/user-team/${id}`, data)
