import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./index";

//自定义hook，调用该方法返回一个 dispatch，用于派发action
const useAppDispatch = () => useDispatch<AppDispatch>();
// 为rootstate，创建有更好的类型校验的 useSelector，之后用该方法代替 useSelector就好
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export { useAppDispatch, useAppSelector };
