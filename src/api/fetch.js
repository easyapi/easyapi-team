import axios from "axios";
import router from "../router";
import Cookies from "js-cookie";

// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    if (config.url.indexOf("/page/team") == -1) {
      if (!Cookies.get("authenticationToken")) {
        location.href = "https://account.easyapi.com/login"; // 如果没有authenticationToken存在
      }
    }
    config.headers.authorization = "Bearer " + Cookies.get("authenticationToken");
    return config;
  },
  function (error) {
    // 对请求错误做些什么

    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    if (response.status === 204) {
      // 处理204返回内容为空
      console.log(204);
    }
    return response;
  },
  function (error) {
    // 对响应错误做点什么
    console.log(error.response);
    if (!error.response || !error.response.data) {
      return Promise.reject(error);
    }
    if (error.response.data.code === -9) {
      // 处理-9用户信息不存在
      window.location.href = "https://account.easyapi.com/login";
    } else if (error.response.data.code === -8) {
      // 处理-8无团队信息
      window.location.href = "https://team.easyapi.com";
    } else if (error.response.data.code === -7) {
      // 处理-7认证失败
      router.push(`/unavailable`);
    } else if (error.response.data.code === -6) {
      // 处理-6服务未订购
      router.push(`/unavailable`);
    } else if (error.response.data.code === -5) {
      // 处理-5服务已过期
      router.push(`/unavailable`);
    } else if (error.response.data.code === -4) {
      // 处理-4服务使用次数不足
      router.push(`/unavailable`);
    } else if (error.response.data.code === -3) {
      // 处理-3团队账户余额不足
      router.push(`/unavailable`);
    } else if (error.response.data.code === -1) {
      // 处理-3非法团队
      // window.location.href = "https://team.easyapi.com";
    } else {
      return Promise.reject(error);
    }
  }
);

export default axios;
