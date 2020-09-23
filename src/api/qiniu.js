import {baseUrl} from "./api";
import axios from "axios";


/**
 * 获取七牛KEY
 */
export const getQiniuKey = `${baseUrl}/api/qiniu/key`;


/**
 * 获取七牛空间TOKEN
 *
 * @see https://www.easyai.com
 */
export const getQiniuToken = () => axios.get(`${baseUrl}/api/qiniu/upToken`);
