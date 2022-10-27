import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./reducer/mainReducer";

const store = configureStore({
  // 创建 store
  reducer: {
    main: mainReducer,
  },
});
// 获取到根的state类型，方便后面使用
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
