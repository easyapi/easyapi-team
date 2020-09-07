import {baseUrl} from "./api";
import axios from "axios";

/**
 * 获取团队账户明细
 *
 * @see https://www.easyai.com
 */
export const getBillList = (params) => axios.post(`${baseUrl}/api/bills`);