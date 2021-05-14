import request from "@/utils/request";


/**
 * 获取七牛KEY
 */
export const getQiniuKey = `${process.env.VUE_APP_ACCOUNT_API}/api/qiniu/key`;


/**
 * 获取七牛空间TOKEN
 *
 * @see https://www.easyai.com
 */
export const getQiniuToken = () => request.get(`${process.env.VUE_APP_ACCOUNT_API}/api/qiniu/upToken`);
