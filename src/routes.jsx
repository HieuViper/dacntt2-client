import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DeafaultLayout from "./layout/DeafaultLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { CartProvider } from "./stores/CartContext";
import { FoodProvider } from "./stores/FoodContext";
import MenuPage from "./pages/MenuPage";
import StorePage from "./pages/StorePage";
import DetailFoodPage from "./pages/DetailFoodPage";
import Auth from "./utils/auth";
import ProfilePage from "./pages/ProfilePage";
import AboutPage from "./pages/AboutPage";
import RecommendPage from "./pages/RecommendPage";
import SuccessPage from "./pages/SuccessPage";
import ErrorPage from "./pages/ErrorPage";

const Router = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <DeafaultLayout />,
      children: [
        {
          element: <Navigate to="/home" />,
          index: true,
        },
        {
          path: "/menu",
          element: <MenuPage />,
        },
        {
          path: "/food/:id",
          element: <DetailFoodPage />,
        },
        {
          path: "/stores",
          element: <StorePage />,
        },
        {
          path: "/profile",
          element: <ProfilePage />,
        },
        {
          path: "/recommend",
          element: <RecommendPage />,
        },
      ],
    },
    {
      path: "/payment-success",
      element: <SuccessPage />,
    },
    {
      path: "/home",
      element: <HomePage />,
    },
    {
      path: "/about",
      element: <AboutPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/404",
      element: <ErrorPage />,
    },
    {
      path: "*",
      element: <Navigate to="/404" />,
    },
  ]);
  return routes;
};

export default Router;
