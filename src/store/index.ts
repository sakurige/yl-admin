import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./reducer/mainReducer";
import userReducer from "./reducer/mangerReducer";

const store = configureStore({
  // 创建 store
  reducer: {
    main: mainReducer,
    user: userReducer,
  },
});
// 获取到根的state类型，方便后面使用
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
