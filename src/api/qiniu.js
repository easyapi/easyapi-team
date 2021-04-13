import {accountUrl} from "./api";
import axios from "axios";


/**
 * 获取七牛KEY
 */
export const getQiniuKey = `${accountUrl}/api/qiniu/key`;


/**
 * 获取七牛空间TOKEN
 *
 * @see https://www.easyai.com
 */
export const getQiniuToken = () => axios.get(`${accountUrl}/api/qiniu/upToken`);
