import request from "../request";

const login = async () => {
  return await request.post({
    url: "admin/login",
    data: {
      username: "admin",
      password: "admin",
    },
  });
};
export default login;
