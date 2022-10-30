import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Login from "../views/Login";
import NotFound from "../views/404";
import { lazy } from "react";

const Home = lazy(() => import("views/Home"));

const routes: RouteObject[] = [
  {
    path: "/home",
    element: <Navigate to={"/"} />,
  },
  {
    path: "/",
    element: <Home />,
    handle: "title",
  },
  {
    path: "/login",
    element: <Login />,
    handle: "title",
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
export default routes;
