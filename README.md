# my-admin
技术栈为react全家桶，UI组件库使用Ant Design，通过实践后台管理系统，巩固react相关知识，以及学习后台管理系统的开发模式

## 项目初始化

1. 使用`pnpm`创建项目

```shell
pnpm create react-app my-admin --template typescript
```

> 安装完之后，项目使用的还是`npm`，删除`package.lock.json`与`node_modules`，之后使用`pnpm install`进行安装

2. 制定代码规范

   - 因为`create-react-app`创建的项目已经内置了`eslint`所以直接添加或者覆盖规则

   ```js
   // .eslintrc.js  暂且写了这么些
   module.exports = {
     extends: ["react-app"],
     rules: {
       semi: ["error", "always"],
       quotes: ["error", "double"],
       "no-unused-vars": "warn",
     },
   };
   
   ```

   - 添加`prettier`作为代码格式化工具，在`.prettierrc.json`中配置规则

   ```shell
   pnpm add -D prettier
   ```

   ```json
   {
     "semi": true,
     "tabWidth": 2,
     "singleQuote": false,
     "trailingComma": "all"
   }
   ```



3. `git`提交规则

   - 全局安装`commitizen`，用于提供一个`git cz`命令用于代替`git commit`
   - 局部安装`cz-customizable`，用于自定义一些提交规范，在`package.json`中添加以下内容

   ```json
   "config": {
       "commitizen": {
         "path": "node_modules/cz-customizable"
       }
     }
   ```

   在配置文件`.cz-config.js`配置规范

   ```js
   module.exports = {
     //可选类型
     types: [
       { value: "feat", name: "feat:   新功能" },
       { value: "fix", name: "fix:   修复" },
       { value: "docs", name: "docs:   文档变更" },
       { value: "style", name: "style:   代码格式(不影响代码运行的变动)" },
       {
         value: "refactor",
         name: "refactor:重构(既不是增加feature)，也不是修复bug",
       },
       { value: "perf", name: "perf:   性能优化" },
       { value: "test", name: "test:   增加测试" },
       { value: "chore", name: "chore:   构建过程或辅助功能的变动" },
       { value: "revert", name: "revert:   回退" },
       { value: "build", name: "build:   打包" },
       { value: "revert", name: "revert:   回退" },
     ],
     //消息步骤
     messages: {
       type: "请选择提交类型",
       customScope: "请输入修改范围(可选)",
       subject: "请简要描述提交(必填)",
       body: "请输入详细描述(可选)",
       footer: "请输入要关闭的issue(可选)",
       confirmCommit: "确认以上信息提交?(y/n)",
     },
     //跳过问题
     skipQuestion: ["body", "footer"],
     //subject文字长度默认是
     subjectLimit: 72,
   };
   
   ```

​	规范到这儿就配置完了，之后使用`git cz`代替`git commit`即可

4. 安装husky用于在提交的时期，代码与`git`提交信息是否符合规范

   - 安装`husky`

   ```shell
   pnpm add -D husky
   ```

   - 初始化husky

   ```shell
   npx husky install
   ```

   - 提交时进行代码检查，与提交信息检查

   ```shell
   # 由git commit命令触发，在commit-msg之前，检查代码是否符合规范
   npx husky add .husky/pre-commit "npm run lint"
   # git commit和git merge都会触发 检查是否定义的规范
   npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
   
   ```

   

## 其他工具的集成

我们会集成以下内容

- `react-router` `redux`
- `antd`
- `axios`

```shel
pnpm add react-router redux-react @reduxjs/toolkit antd axios
```

#### 配置路由

1. 采用单独配置文件的方式， 在`src`文件夹下创建`router`，并在其中`index.tsx`中配置

```tsx
import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Home from "../views/Home";
import Login from "../views/Login";

const routes: RouteObject[] = [
  {
    path: "/",
    // 访问根路径重定向到home
    element: <Navigate to={"/home"} />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
];
export default routes;

```

2. 在`App.tsx`使用`routes`，使用`useRoutes`将`routes`导入

用法可参考文档：[useRoutes v6.4.1 | React Router](https://reactrouter.com/en/main/hooks/use-routes)

```tsx
import React from "react";
import { useRoutes } from "react-router-dom";
import routes from "./router";
const App = () => {
  return (
    <div className="App">
      <h1>Hello react</h1>
      <div>{useRoutes(routes)}</div>
    </div>
  );
};
```



3. 在`src`下的`index.tsx`中开启路由模式，这里使用的是`BrowserRouter `

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// 或者 HashRouter
import App from "./App";

const root = ReactDOM.createRoot(
  document.querySelector("#root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </React.StrictMode>,
);

```

3. 然后在`App.tsx`添加跳转路由的按钮即可

```tsx
import React from "react";
import { Link, useRoutes } from "react-router-dom";
import routes from "./router";
const App = () => {
  return (
    <div className="App">
      <h1>Hello react</h1>
      <div>{useRoutes(routes)}</div>
      <Link to="/home">Home</Link>
      <Link to="/login">Login</Link>
    </div>
  );
};
```

#### 配置redux

> `Redux Toolkit`是官方推荐的编写 Redux 逻辑的方法

1. 在`store`文件夹下的`index.ts`中创建`store`

```ts
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {},
});
// 获取到根的state类型，方便后面使用
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
```

> 使用`RTK`提供的 `configureStore`方法来创建

2. 在外界使用我们创建的`store`，也就是`App.tsx`中

> RTK 提供`Provider`让我们使用创建的`store`，这样后面就可以使用了

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App";
import store from "./store";

const root = ReactDOM.createRoot(
  document.querySelector("#root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);

```

3. 为了方便一会测试，这里我们创建一个`reducer`用于储存一个计数器的状态，结构目录如下

![image-20221028111920964](E:\code\react\my-admin\README.assets\image-20221028111920964.png)

`mainReducer.ts`内容如下

```ts
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../index";

const initialState = { // 初始状态
  count: 0,
};
// createSlice用于创建切片
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
// 将定义的方法解构导出方便外面使用
export const { increment, decrement } = mainSlice.actions;
// 直接将 coute的值取出，调用该方法直接拿到count的值，rootState是 store的状态类型，在上面定义过
export const selectCount = (state: RootState) => state.main.count;
export default mainSlice.reducer;
```

4. 在 store中使用这个reducer

```ts
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

```

5. 在页面中进行使用
   - 通过调用`selectCount`拿到count
   - 引入count的两个方法`increment` `decrement`

```tsx
import { decrement, increment, selectCount } from "store/reducer/mainReducer";
import { Button } from "antd";
import { useAppDispatch, useAppSelector } from "store/hooks";
import React from "react";

const Home = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="home">
      <h1>Home Page</h1>
      <h3>{useAppSelector(selectCount)}</h3>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(increment())}>+</button>
    </div>
  );
};
export default Home;

```

> 这里用到了 hooks 中的两个方法，是为了增强类型推断，所以就算使用 原来的 `useDispatch`, `useSelector`也没问题，如下
>
> ```tsx
> import React from "react";
> import { useDispatch, useSelector } from "react-redux";
> import { decrement, increment, selectCount } from "store/reducer/mainReducer";
> 
> const Home = () => {
>    // 用于创建一个dispatch函数
>   const dispatch = useDispatch();
>   return (
>     <HomeWrap>
>       <h1>Home Page</h1>
>       <h3>{useSelector(selectCount)}</h3>
>       <button onClick={() => dispatch(decrement())}>-</button>
>       <button onClick={() => dispatch(increment())}>+</button>
>     </HomeWrap>
>   );
> };
> export default Home;
> ```

`hooks.ts`内容如下

```ts
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./index";

//自定义hook，调用该方法返回一个 dispatch，用于派发action
const useAppDispatch = () => useDispatch<AppDispatch>();
// 为rootstate，创建有更好的类型校验的 useSelector，之后用该方法代替 useSelector就好
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export { useAppDispatch, useAppSelector };
```

#### 引入`antd`

antd的引入就相对于简单些，安装完依赖之后在`src`下的`index.tsx`引入`antd/dist/antd.css`即可，而`antd`默认`js`部分就支持按需引入，所以在哪要使用组件直接引入就可以了

```shell
pnpm add antd
```

我们在上面的`Home`中两个按钮使用 `antd`提供的作为测试

```tsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";

import { decrement, increment, selectCount } from "store/reducer/mainReducer";

const Home = () => {
  const dispatch = useDispatch();
  return (
    <HomeWrap>
      <h1>Home Page</h1>
      <Counter>{useSelector(selectCount)}</Counter>
      <Button onClick={() => dispatch(decrement())}>-</Button>
      <Button onClick={() => dispatch(increment())}>+</Button>
    </HomeWrap>
  );
};
export default Home;

```

#### 集成`axios`

1. 安装依赖

```shell
pnpm add axios
# 因为是ts 所以我们还需要安装类型声明
pnpm add -D @types/axios
```

2. 对`axios`进行二次封装，结构目录如下

![image-20221028124536434](E:\code\react\my-admin\README.assets\image-20221028124536434.png)

在`request`中封装一个 `Request`类，用于项目中的网络请求

```ts
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { config } from "./config";

class Request {
  instance: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
      // 重新创建一个 axios实例
    this.instance = axios.create(config);
  }

  async request(config: AxiosRequestConfig) {
    return this.instance.request(config);
  }

  post(config: AxiosRequestConfig) {
    return this.request({ ...config, method: "post" });
  }

  get(config: AxiosRequestConfig) {
    return this.request({
      ...config,
      method: "get",
    });
  }
}

export default new Request(config);
// config.ts 内容
const config = {
    // 这里因为跨域了，所以写/api，关于跨域的解决后面说
  baseURL: "/api",
  timeout: 3000,
};
export { config };
```

> 这里先只是最简单的请求方法，关于拦截器，后面用到了再加上

3. 测试：在`api`下创建`login.ts`模块作为测试，内容如下

```ts
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
```

4. 在App中发送请求

```tsx
import React from "react";
import { Link, useRoutes } from "react-router-dom";
import routes from "./router";
import { login } from "./service";

const fn = () => {
  login().then((res) => {
    console.log(res);
  });
};

const App = () => {
  return (
    <div className="App">
      <Title>Hello react</Title>
      <button onClick={fn}>发送请求</button>
      <Wrap>{useRoutes(routes)}</Wrap>
      <Link to="/home">
        <Button>Home</Button>
      </Link>
      <Link to="/login">
        <Button>Login</Button>
      </Link>
    </div>
  );
};

export default App;
```

4. 

