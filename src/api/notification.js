import {baseUrl} from "./api";
import axios from "axios";


/**
 * 获取通知列表
 *
 * @see https://www.easyai.com
 */
export const getNotificationList = (params) => axios.get(`${baseUrl}/notifications`, params);
