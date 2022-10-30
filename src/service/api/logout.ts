import request from "../request";

const logout = async (token: string) => {
  const res = await request.post({
    url: "/admin/logout",
    headers: {
      token,
    },
  });
  return res.status;
};
export default logout;
