import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import FHeader from "./cpns/FHeader";
import FSider from "./cpns/FSider";
import "./Admin.css";
import FTagList from "./cpns/FTagList";

const Admin = () => {
  return (
    <Layout className="container">
      <Header className="l-header">
        <FHeader></FHeader>
      </Header>
      <Layout>
        <Sider className="l-sider">
          <FSider></FSider>
        </Sider>
        <Content>
          <FTagList></FTagList>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Admin;
