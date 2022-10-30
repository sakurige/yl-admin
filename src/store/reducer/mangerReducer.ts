import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import storage from "utils/storage";
import { getMangerInfo } from "service/index";
import { MenuType } from "service/api/types/manger";
import { RootState } from "../index";

const initialState = {
  username: "",
  avatar: "",
  menus: [] as MenuType[],
  roleNames: [] as string[],
};
// 创建一个异步trunk
const fetchMangerInfo = createAsyncThunk("user/fetchMangerInfo", async () => {
  let token = storage.getItem("token");
  return await getMangerInfo(token);
});
const mangerSlice = createSlice({
  name: "userinfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //添加处理
    builder.addCase(fetchMangerInfo.fulfilled, (state, action) => {
      state.username = action.payload.username;
      state.menus = action.payload.menus;
      state.roleNames = action.payload.ruleNames;
      state.avatar = action.payload.avatar;
    });
  },
});
export default mangerSlice.reducer;
export const selectUsername = (state: RootState) => state.user.username;
export const selectMenus = (state: RootState) => state.user.menus;
export const selectAvatar = (state: RootState) => state.user.avatar;
export const selectRoleNames = (state: RootState) => state.user.roleNames;
export { fetchMangerInfo };
