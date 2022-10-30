import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { fetchMangerInfo, selectUsername } from "store/reducer/mangerReducer";

/**
 * 获取manger数据
 * @param token
 */
export function useMangerData(token: string) {
  // 本来是想用这个方法的，后来发现请求可以放在permission中就没有用了
  const dispatch = useAppDispatch();
  const username = useAppSelector(selectUsername);
  useEffect(() => {
    if (token) {
      dispatch(fetchMangerInfo());
    }
  }, [username, dispatch, token]);

  return { username };
}
