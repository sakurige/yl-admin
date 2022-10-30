import styled from "styled-components";
import { Button, Divider, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { login } from "../../service";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { info, saveToken } from "../../utils";

interface UserInfo {
  username: string;
  password: string;
}

const LoginWarp = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
`;
const Title = styled.h3`
  font-size: 1.5rem;
  text-align: center;
`;
const Left = styled.div`
  height: 100vh;
  width: 65%;
  min-width: 25rem;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #74759b;
`;
const Right = styled.div`
  display: flex;
  height: 100vh;
  width: 35%;
  min-width: 20rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background-color: #2b73af80;
`;
const Warp = styled.div`
  width: 55%;
  height: 50%;
`;

const Login = () => {
  const navigate = useNavigate();
  const [userinfo, setUserinfo] = useState<UserInfo>({
    username: "",
    password: "",
  });
  const getUserinfo = (e: ChangeEvent<HTMLInputElement>) => {
    const { type, value } = e.target;
    if (type === "text") {
      setUserinfo({
        ...userinfo,
        username: value,
      });
    } else {
      setUserinfo({
        ...userinfo,
        password: value,
      });
    }
  };
  /**
   * 提交登录信息，并存入localstorage
   * */
  const submit = async () => {
    const res = await login(userinfo);
    const { token } = res.data;
    if (token) {
      info("success", "登录成功");
      saveToken(token);
      navigate("/", {
        state: "首页",
      });
    } else {
      info("error", "登录失败");
    }
  };
  return (
    <LoginWarp>
      <Left>
        <Title style={{ color: "#fff", fontSize: "2rem" }}>
          这是一个后台管理系统
        </Title>
      </Left>
      <Right>
        <Warp>
          <Title>Welcome Back</Title>
          <Divider style={{ color: "rgb(209,213,220)" }}>账号密码登录</Divider>
          <Form
            name="basic"
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            style={{ height: "50%" }}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: "用户名不能为空" }]}
            >
              <Input
                placeholder="请输入用户名"
                onChange={(e) => getUserinfo(e)}
                prefix={<UserOutlined style={{ color: "rgb(209,213,220)" }} />}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "密码不能为空" }]}
            >
              <Input.Password
                placeholder="请输入密码"
                onChange={(e) => getUserinfo(e)}
                prefix={<LockOutlined style={{ color: "rgb(209,213,220)" }} />}
              />
            </Form.Item>

            <Form.Item wrapperCol={{ span: 24 }}>
              <Button
                type="primary"
                htmlType="submit"
                shape="round"
                onClick={submit}
                style={{ width: "100%", backgroundColor: "#74759b70" }}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </Warp>
      </Right>
    </LoginWarp>
  );
};
export default Login;
