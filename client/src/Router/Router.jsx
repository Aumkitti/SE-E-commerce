import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/home/Home";
import ProductList from "../Pages/Shop/ProductList";
import SignUp from "../Components/SignUp";
import SignIn from "../Components/SignIn";
import UpdatePofile from "../Pages/dashboard/updateProfile";
import PrivateRouter from "../PrivateRouter/PrivateRouter";
import Cart from "../Pages/Shop/Cart";
import DashboardLayout from "../Layout/DashboardLayout";
import User from "../Pages/dashboard/admin/User";
import Dashboard from "../Pages/dashboard/admin/Dashboard";
import AddProduct from "../Pages/dashboard/admin/AddProduct";
import Productitems from "../Pages/dashboard/admin/Productitems";
import UpdateProduct from "../Pages/dashboard/admin/UpdateProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shop",
        element: (
          <PrivateRouter>
            <ProductList />
          </PrivateRouter>
        ),
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/update-profile",
        element: <UpdatePofile />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRouter>
        <DashboardLayout />
      </PrivateRouter>
    ),
    children: [
      { path: "users", element: <User /> },
      { path: "addproduct", element: <AddProduct /> },
      { path: "product", element: <Productitems /> },
      { path: "updateproduct/:id", element: <UpdateProduct /> },
      {
        path: "",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/singup",
    element: <SignUp />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
]);

export default router;
