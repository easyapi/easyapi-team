import request from "@/utils/request";

/**
 * 获取验证码
 **
 * @see https://www.easyai.com
 */
export function getCaptcha(username) {
  return request({
    url: `${process.env.VUE_APP_ACCOUNT_API}/api/account/captcha/activation`,
    method: "POST",
    data: {
      username: username
    },
  });
}
