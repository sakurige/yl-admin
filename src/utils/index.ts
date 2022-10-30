import { done, start } from "nprogress";
import { message } from "antd";
import { CSSProperties } from "react";
import storage from "./storage";

export const showFullLoading = () => {
  start();
};
export const hideLoading = () => {
  done();
};
/**
 * 用于展示提醒框
 * @param type 提示框类型
 * @param mes  提示框内容
 * @param duration 提示框展示几秒
 * @param style 提示框样式
 * @param top 距离顶部的距离
 */
export const info = (
  type: "success" | "info" | "error" | "warning",
  mes: string,
  duration: number = 1,
  style: CSSProperties = {
    display: "flex",
    justifyContent: "end",
  },
  top: number = 16,
) => {
  message.config({
    top,
    duration,
  });
  message[type]({
    content: mes,
    style,
    onClick: () => {
      message.destroy();
    },
  });
};
/**
 * 对异步函数进行错误处理
 * @param asyncFn
 */
export const awaitWarp = <T, U>(
  asyncFn: Promise<T>,
): Promise<[T | null, null, U]> => {
  return asyncFn.then((res) => res).catch((err) => err);
};

export const saveToken = (token: string) => {
  storage.setItem("token", token);
};
export const getToken = () => {
  return storage.getItem("token");
};
export const removeToken = () => {
  return storage.removeItem("token");
};
