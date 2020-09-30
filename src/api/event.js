import {baseUrl} from "./api";
import axios from "axios";


/**
 * 获取动态列表
 *
 * @see https://www.easyai.com
 */
export const getEventList = (params) => axios.get(`${baseUrl}/events`, params);
