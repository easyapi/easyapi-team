import {baseUrl} from "./api";

//查询 服务报价列表
export const ServiceList = `https://api2.easyapi.com/console/servicePrice`;

//查询 服务报价列表GET
export const docPrice = `${baseUrl}/api/team/document/price`;

//续购服务POST
export const balance = `${baseUrl}/console/servicePrice/continueBuy`;

//查询团队的财务数据GET
export const paymentMethod = `${baseUrl}/console/money/mine`;

//团队服务详情 GET 获取秘钥信息GET
export const Surplus = `${baseUrl}/console/teamService`;

//文档续费
export const documentRenewUrl = `${baseUrl}/api/team/document/renew`;

//获取用户服务列表
export const getUserService = `https://api2.easyapi.com/console/user/services`;
