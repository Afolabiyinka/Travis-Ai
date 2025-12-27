import { lazy } from "react";

//Auth
const Login = lazy(() => import("@/modules/auth/pages/Login"));
const SignUp = lazy(() => import("@/modules/auth/pages/Signup"));

//Landing page
const FAQs = lazy(() => import("@/modules/landing/pages/FAQs"));
const Home = lazy(() => import("@/modules/landing/pages/Home"));
const Reviews = lazy(() => import("@/modules/landing/pages/Reviews"));
const AiHome = lazy(() => import("@/modules/main/pages/chat/AiHome"));
const Chat = lazy(() => import("@/modules/main/pages/chat/Chat"));

//Others

import NotFound from "@/modules/NotFound";
import type { RouteObject } from "react-router-dom";

//Layouts
const AuthLayout = lazy(() => import("@/modules/auth/AuthLayout"));
const AppLayout = lazy(() => import("@/modules/main/AppLayout"));
const MainLayout = lazy(() => import("@/modules/landing/MainLayout"));

//Proctected route

const ProctectedRoute = lazy(() => import("@/routes/ProctectedRoute"));

export const routes: RouteObject[] = [
  {
    path: "/ai",
    element: <ProctectedRoute children={<AppLayout />} />,
    children: [
      {
        path: "home",
        index: true,
        Component: AiHome,
      },
      {
        path: "chat",
        children: [
          {
            path: ":id",
            Component: Chat,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "FAQs",
        Component: FAQs,
      },
      {
        path: "reviews",
        Component: Reviews,
      },
    ],
  },
  {
    path: "auth",
    Component: AuthLayout,
    children: [
      {
        index: true,
        path: "login",
        Component: Login,
      },
      {
        path: "signup",
        Component: SignUp,
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
];
