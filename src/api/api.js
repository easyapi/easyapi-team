export const domainUrl = 'https://account.easyapi.com'


export const getAccountInfo = `${domainUrl}/api/account`;
//获取团队列表
export const getUserTeamList = `${domainUrl}/api/user/teams`
//切换团队
export const changeTeam = `${domainUrl}/api/changeTeam`

/* == 账户团队设置 ==*/
// 查询账户信息
export const getAccountMoney = `${domainUrl}/api/money/check`
// 创建修改删除团队
export const teamUrl = `${domainUrl}/api/team`
// 退出团队 GET
export const quitTeam = `${domainUrl}/api/team/#id#/exit`
// 转让团队
export const transferTeam = `${domainUrl}/api/team/#id#/transfer`
// 检查团队URL
export const checkTeamUrl = `${domainUrl}/api/team/checkUrl`
// 充值预警
export const moneyWarn = `${domainUrl}/api/money`
// 支付宝支付
export const aliPayApi = `${domainUrl}/api/alipay/recharge`
// 微信支付
export const wxPayApi = `${domainUrl}/api/wxpay/recharge`


/* == 成员设置 ==*/

// 获取成员列表
export const getTeamUserList = `${domainUrl}/api/team/users`
// 设置成员权限
export const setMemberType = `${domainUrl}/api/userTeam`
// 删除成员
export const delMember = `${domainUrl}/api/userTeam`
// 增加成员
export const addMember = `${domainUrl}/api/userTeam`
// 获取成员邀请信息
export const memberInvitedInfo = `${domainUrl}/api/invite`
// 获取团队充值记录
export const getRechargeList = `${domainUrl}/api/recharges`
// 获取验证码
export const getCaptcha = `${domainUrl}/api/account/captcha/activation`


/* == 订单列表 ==*/
//获取订单列表
export const getOrderList = `${domainUrl}/api/order`


/* == 七牛 ==*/
//获取七牛KEY
export const getQiniuKey = `${domainUrl}/api/qiniu/key`
//获取七牛空间TOKEN
export const getQiniuToken = `${domainUrl}/api/qiniu/upToken`


//获取发票Token
export const getInvoiceToken = `${domainUrl}/api/invoice/token`
//切换默认团队
export const changeTeam = `${domainUrl}/api/changeTeam/`
//获取团队信息
export const getTeamInfoUrl = `${domainUrl}/api/team/view`

//团队首页接口
export const getHomepageTeamInfoUrl = `${domainUrl}/page/team`





