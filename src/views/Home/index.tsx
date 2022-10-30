import React from "react";
import { Button } from "antd";

import styled from "styled-components";
import { useAppSelector } from "../../store/hooks";
import { selectUsername } from "../../store/reducer/mangerReducer";
import { selectToken } from "../../store/reducer/mainReducer";
import { logout } from "service";
import { useNavigate } from "react-router-dom";
import { useTitle } from "hooks";
import { removeToken } from "../../utils";

const HomeWrap = styled.div`
  color: #fff;
  text-align: center;
`;

const Home = () => {
  const username = useAppSelector(selectUsername);
  const navigate = useNavigate();
  useTitle();

  const token = useAppSelector(selectToken); // 拿到redux中的token
  const logoutHandler = () => {
    logout(token).then((res) => {
      //如果成功就删除token并进行路由跳转
      if (res === 200) {
        removeToken();
        // 第二个参数是，state 通过 location可以拿到，用于后面的文档标题切换
        navigate("/login", {
          state: "登录",
        });
      }
    });
  };

  return (
    <HomeWrap>
      <h1> {username ? username : "Hello"}</h1>
      <Button onClick={logoutHandler}>点我退出</Button>
    </HomeWrap>
  );
};
export default Home;
