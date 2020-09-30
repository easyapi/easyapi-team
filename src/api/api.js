export const baseUrl = "https://account-api.easyapi.com";

/* == 账户团队设置 ==*/
// 查询账户信息
export const getAccountMoney = `${baseUrl}/api/money/check`;
// 创建修改删除团队
export const teamUrl = `${baseUrl}/api/team`;
// 退出团队 GET
export const quitTeam = `${baseUrl}/api/team/#id#/exit`;
// 转让团队
export const transferTeam = `${baseUrl}/api/team/#id#/transfer`;
// 充值预警
export const moneyWarn = `${baseUrl}/api/money`;

/* == 成员设置 ==*/

// 获取成员列表
export const getTeamUserList = `${baseUrl}/api/team/users`;
// 设置成员权限
export const setMemberType = `${baseUrl}/api/userTeam`;
// 删除成员
export const delMember = `${baseUrl}/api/userTeam`;
// 增加成员
export const addMember = `${baseUrl}/api/userTeam`;
// 获取成员邀请信息
export const memberInvitedInfo = `${baseUrl}/api/invite`;
// 获取团队充值记录
export const getRechargeList = `${baseUrl}/api/recharges`;
// 获取验证码
export const getCaptcha = `${baseUrl}/api/account/captcha/activation`;
