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
          element: (
            <FoodProvider>
              <MenuPage />
            </FoodProvider>
          ),
        },
        {
          path: "/food/:id",
          element: <DetailFoodPage />,
        },
        {
          path: "/stores",
          element: <StorePage />,
        },
      ],
    },
    {
      path: "/home",
      element: <HomePage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
  ]);
  return routes;
};

export default Router;
