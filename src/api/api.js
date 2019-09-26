export const domainUrl = 'https://api2.easyapi.com';

//获取用户信息
export const getAccountInfo = `https://account.easyapi.com/api/account`;
//获取团队列表
export const getMyTeam = `https://account.easyapi.com/api/userTeam/mine`
//获取用户服务列表
export const getUserService = `${domainUrl}/console/user/services`;
//切换团队
export const tabTeam = `https://account.easyapi.com/api/changeTeam`;
//获取我的白名单
export const whiteList = `${domainUrl}/console/whiteList/check`;
//修改白名单设置
export const modify = `${domainUrl}/console/whiteList`;
//接口统计
export const interfaceStatistics = `${domainUrl}/console/serviceEveryday`;
//查询 服务报价列表GET
export const ServiceList = `${domainUrl}/console/servicePrice?serviceId=`;
//查询团队的财务数据GET
export const paymentMethod = `${domainUrl}/console/money/mine`;
//续购服务POST
export const balance = `${domainUrl}/console/servicePrice/continueBuy`;
//团队服务详情 GET 获取秘钥信息GET
export const Surplus = `${domainUrl}/console/teamService`;
//获取我的余额提醒GET
export const Reminding = `${domainUrl}/console/balanceRemind/team`;
//修改余额提醒设置PUT
export const modifyBalance = `${domainUrl}/console/balanceRemind`;
//获取服务的成员列表GET 未加入服务的成员列表GET
export const memberList = `${domainUrl}/console/service/`;
//添加成员POST
export const addMembers = `${domainUrl}/console/userService`;
