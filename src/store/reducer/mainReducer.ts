import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../index";

const initialState = {
  count: 0,
};
// 创建切片
const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    // 定义reducer
    increment: (state) => {
      state.count++;
    },
    decrement: (state) => {
      state.count--;
    },
  },
});
export const { increment, decrement } = mainSlice.actions;
export const selectCount = (state: RootState) => state.main.count;
export default mainSlice.reducer;
