import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { config } from "./config";

class Request {
  instance: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);
  }

  async request(config: AxiosRequestConfig) {
    return await this.instance.request(config);
  }

  post(config: AxiosRequestConfig) {
    return this.request({ ...config, method: "post" });
  }

  get(config: AxiosRequestConfig) {
    return this.request({
      ...config,
      method: "get",
    });
  }
}

const request = new Request(config);
// 添加拦截器
request.instance.interceptors.response.use(
  (res) => {
    return { ...res, data: res.data.data };
  },
  (error) => {
    // 这里是为了处理 Login中submit 展示info时出现的一些错误
    error.data = {
      code: 402,
    };
    return error;
  },
);
export default request;
