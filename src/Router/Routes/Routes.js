import Checkout from "../../Pages/Checkout/Checkout";
import Login from "../../Pages/Login/Login";
import SignUp from "../../Pages/SignUp/SignUp";
import Home from "../../Pages/Home/Home/Home";
import Main from "../../Layouts/Main/Main";
import { createBrowserRouter } from "react-router-dom";
import Orders from "../../Pages/Orders/Orders";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

// const { createBrowserRouter } = require("react-router-dom");
// const { default: Main } = require("../../Layouts/Main/Main");
// const { default: Home } = require("../../Pages/Home/Home/Home");
// const { default: Login } = require("../../Pages/Login/Login");
// const { default: SignUp } = require("../../Pages/SignUp/SignUp");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/checkout/:id",
        element: (
          <PrivateRoute>
            <Checkout></Checkout>
          </PrivateRoute>
        ),
        loader: ({ params }) => fetch(`https://car-doctor-server-pearl.vercel.app/services/${params.id}`),
      },
      {
        path: "/orders",
        element: (
          <PrivateRoute>
            <Orders></Orders>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
