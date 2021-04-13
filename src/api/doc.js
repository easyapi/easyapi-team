import {accountUrl} from "./api";
import axios from "axios";


/**
 * 获取文档续费价格列表
 *
 * @see https://www.easyai.com
 */
export const getDocumentPriceList = () => axios.get(`${accountUrl}/team/document/price`);


/**
 * 文档续费
 **
 * @see https://www.easyai.com
 */
export const documentRenew = (data) => axios.post(`${accountUrl}/api/team/document/renew`, {
  data: {
    data
  }
});
