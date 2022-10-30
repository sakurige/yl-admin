import request from "../request";

interface UserInfo {
  username: string;
  password: string;
}

const login = async (userinfo: UserInfo) => {
  return await request.post({
    url: "admin/login",
    data: userinfo,
  });
};
export default login;
