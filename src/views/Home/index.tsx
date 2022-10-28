import { decrement, increment, selectCount } from "store/reducer/mainReducer";
import { Button } from "antd";
import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

const HomeWrap = styled.div`
  color: #fff;
  text-align: center;
`;
const Counter = styled.div`
  font-size: 99px;
`;
// const Button = styled.button`
//   width: 100px;
//   height: 42px;
//   background-color: pink;
// `;
const Home = () => {
  const dispatch = useDispatch();
  return (
    <HomeWrap>
      <h1>Home Page</h1>
      <Counter>{useSelector(selectCount)}</Counter>
      <Button onClick={() => dispatch(decrement())}>-</Button>
      <Button onClick={() => dispatch(increment())}>+</Button>
    </HomeWrap>
  );
};
export default Home;
