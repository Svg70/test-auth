import React from "react";
// import HomePage from "../pages/home-page/HomePage";
// import Cart from "../pages/cart-page/Cart";

const Login = React.lazy(() => import("../pages/login/login"));
const SignUp = React.lazy(() => import("../pages/sign-up/signup"));
const Reset = React.lazy(() => import("../pages/reset/reset"));

const routes = [
  {
    path: "/login",
    component: Login,
    exact: false,
  },
  {
    path: "/sign-up",
    component: SignUp,
    exact: true,
  },
  {
    path: "/reset",
    component: Reset,
    exact: true,
  },
];

export default routes;
