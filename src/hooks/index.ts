import { useMangerData } from "./fetchData";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useFullScreen from "./fullScreen";

/**
 * 用于切换文档标题，所以在进行跳转路由navigate时需要传入第二个参数{state：title}
 */
export const useTitle = () => {
  const initTitle = "后台管理系统 - ";
  const [title, setTitle] = useState(initTitle);
  const location = useLocation();
  useEffect(() => {
    setTitle(initTitle + location.state);
  }, [location]);
  document.title = title;
  return setTitle;
};
export { useMangerData, useFullScreen };
