import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/home/Home";
import ProductList from "../Pages/Shop/ProductList";
import SignUp from "../Components/SignUp";
import SignIn from "../Components/SignIn";
import UpdatePofile from "../Pages/dashboard/updateProfile";
import PrivateRouter from "../PrivateRouter/PrivateRouter";
import Cart from "../Components/Cart";

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
    path: "/singup",
    element: <SignUp />,
  },
  {
    path: "/singin",
    element: <SignIn />,
  },
]);

export default router;
