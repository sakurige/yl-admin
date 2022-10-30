import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "./store/hooks";
import { init } from "./store/reducer/mainReducer";
import { useTitle } from "./hooks";
import { getToken, hideLoading, showFullLoading } from "./utils";
import { fetchMangerInfo } from "./store/reducer/mangerReducer";

const useGuardRouter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = getToken();
  // 切换一下标题
  useTitle();
  useEffect(() => {
    // 头部进度条
    showFullLoading();
    if (token) {
      //有token才执行
      dispatch(init());
      // 初始化 mainSlicer
      dispatch(fetchMangerInfo());
      // 发送请求获取manger数据
      if (location.pathname === "/login") {
        navigate("/", {
          state: "首页",
        });
      }
    } else if (!token && location.pathname !== "/login") {
      navigate("/login", {
        state: "登录",
      });
    }
    hideLoading();
    //  关闭进度条
  }, [token, navigate, location, dispatch]);
};
export { useGuardRouter };
