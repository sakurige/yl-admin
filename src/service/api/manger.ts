import request from "../request";

import type { Manger } from "./types/manger";

const getMangerInfo = async (token: string): Promise<Manger> => {
  const { data } = await request.post({
    url: "admin/getinfo",
    headers: {
      token,
    },
  });
  return data;
};
export default getMangerInfo;
