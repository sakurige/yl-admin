import { createSlice } from "@reduxjs/toolkit";
import storage from "../../utils/storage";
import { RootState } from "../index";

const initialState = {
  token: "",
};
// 创建切片
const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    // 定义reducer
    init: (state) => {
      state.token = storage.getItem("token") ? storage.getItem("token") : "";
    },
  },
});

export const { init } = mainSlice.actions;
export const selectToken = (state: RootState) => state.main.token;
export default mainSlice.reducer;
