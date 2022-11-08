import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Login from "../views/Login";
import NotFound from "../views/404";
import { lazy } from "react";
import Admin from "layouts/Admin";

const Home = lazy(() => import("views/Home"));

const routes: RouteObject[] = [
  {
    path: "/home",
    element: <Navigate to={"/"} />,
  },
  {
    path: "/",
    element: <Admin />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
export default routes;
