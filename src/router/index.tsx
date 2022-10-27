import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Home from "../views/Home";
import Login from "../views/Login";

const routes: RouteObject[] = [
  {
    path: "/",
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
