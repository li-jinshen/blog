import axios from "axios";
// import { Message } from "element-ui";
import createMessage from '@/components/message/message.js'

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: "http://localhost:4000",
  timeout: 6000, // 请求超时时间
});

// 异常拦截处理器
const errorHandler = (error) => {
  console.log(error);
  if (error.response) {
    const data = error.response.data;

    if (error.response.status === 403) {
      // Message.error(data.message);
      createMessage({
        type: 'error',
        message: '服务器错误'
      })
    }
    if (error.response.status === 401) {
      createMessage({
        type: 'error',
        message: '登录凭证失效，请重新登录'
      })
      // Message.error("登录凭证失效，请重新登录");
      // localStorage.clear("LOGIN_INFO");
      // store.commit("updateLoginStatus", false);
      location.href = "/";
    }
  }
  return Promise.reject(error);
};

// request interceptor
request.interceptors.request.use((config) => {
  const LOGIN_INFO = localStorage.getItem("LOGIN_INFO")
    ? JSON.parse(localStorage.getItem("LOGIN_INFO"))
    : "";
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (LOGIN_INFO) {
    // config.headers["Authorization"] = LOGIN_INFO.token;
    config.headers["token"] = LOGIN_INFO.token;
  }
  return config;
}, errorHandler);

// response interceptor
request.interceptors.response.use((response) => {
  return response.data;
}, errorHandler);

export default request;
