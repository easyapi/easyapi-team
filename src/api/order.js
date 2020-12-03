import {baseUrl} from "./api";
import axios from "axios";

/**
 * 获取团队充值记录列表
 *
 * @see https://www.easyai.com
 */
export const getOrderList = (params) => axios.get(`${baseUrl}/api/order`, params);
