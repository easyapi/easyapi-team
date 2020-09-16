import {baseUrl} from "./api";
import axios from "axios";


/**
 * 获取发票Token
 *
 * @see https://www.easyai.com
 */
export const getInvoiceToken = (username) => axios.get(`${baseUrl}/invoice/access-token`, {
  params: {
    username: username
  }
});
