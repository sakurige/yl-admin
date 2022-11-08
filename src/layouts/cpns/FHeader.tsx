import {
  DownOutlined,
  ExpandOutlined,
  FullscreenExitOutlined,
  MenuUnfoldOutlined,
  PicLeftOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { useAppSelector } from "../../store/hooks";
import {
  selectAvatar,
  selectUsername,
} from "../../store/reducer/mangerReducer";
import type { MenuProps } from "antd";
import { Avatar, Dropdown, Space } from "antd";
import { useFullScreen } from "../../hooks";
import { logout } from "../../service";
import { removeToken } from "../../utils";
import { selectToken } from "../../store/reducer/mainReducer";
import { useNavigate } from "react-router-dom";

const Warp = styled.div`
  display: flex;
  justify-content: start;
  width: 100%;
  color: white;
  font-size: 16px;
  font-weight: 300;
`;
const Logo = styled(Warp)`
  font-size: 22px;
  width: 320px;
`;
const User = styled(Warp)`
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: end;
`;
const IconWarp = styled.span`
  padding: 0 8px;
  cursor: pointer;
`;

const items: MenuProps["items"] = [
  {
    key: "1",
    label: "修改密码",
  },
  {
    key: "2",
    label: "退出登录",
  },
];

const FHeader = () => {
  const avatar = useAppSelector(selectAvatar);
  const name = useAppSelector(selectUsername);
  const token = useAppSelector(selectToken);
  const navigate = useNavigate();
  const onClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "1") {
      console.log("修改密码");
    } else {
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
    }
  };
  const reload = () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };
  // 全屏功能
  const [open, close, isFullscreen] = useFullScreen();

  const fullScreen = () => {
    open();
  };
  const exitFullscreen = () => {
    close();
  };
  //
  return (
    <Warp>
      <Logo>
        <IconWarp>
          <PicLeftOutlined />
        </IconWarp>
        <div>后台管理</div>
      </Logo>
      <IconWarp>
        <UndoOutlined onClick={reload} />
      </IconWarp>
      <IconWarp>
        <MenuUnfoldOutlined />
      </IconWarp>
      <User>
        <IconWarp>
          {isFullscreen ? (
            <FullscreenExitOutlined onClick={fullScreen} />
          ) : (
            <ExpandOutlined onClick={exitFullscreen} />
          )}
        </IconWarp>
        <Avatar src={avatar} style={{ margin: "0 10px" }} />
        <Dropdown menu={{ items, onClick }} arrow>
          <Space>
            {name}
            <DownOutlined />
          </Space>
        </Dropdown>
      </User>
    </Warp>
  );
};

export default FHeader;
