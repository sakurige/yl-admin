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

export default new Request(config);
