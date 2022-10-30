import React from "react";
import { useRoutes } from "react-router-dom";
import routes from "./router";
import { useGuardRouter } from "./permission";

const App = () => {
  useGuardRouter(); // 导航守卫
  const route = useRoutes(routes);

  return <div className="App">{route}</div>;
};

export default App;
