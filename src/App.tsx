import React from "react";
import { Link, useRoutes } from "react-router-dom";
import routes from "./router";
import styled from "styled-components";
import { login } from "./service";

const Title = styled.h1`
  background-color: #ccc;
  text-align: center;
`;
const Wrap = styled.div`
  height: 400px;
  background-color: #269;
`;
const Button = styled.span`
  display: inline-block;
  margin-left: 10px;
  background-color: #079;
  color: antiquewhite;
  font-size: 22px;
  width: 85px;
  text-align: center;
  line-height: 40px;
  height: 40px;
`;
const fn = () => {
  login().then((res) => {
    console.log(res);
  });
};

const App = () => {
  return (
    <div className="App">
      <Title>Hello react</Title>
      <button onClick={fn}>发送请求</button>
      <Wrap>{useRoutes(routes)}</Wrap>
      <Link to="/home">
        <Button>Home</Button>
      </Link>
      <Link to="/login">
        <Button>Login</Button>
      </Link>
    </div>
  );
};

export default App;
