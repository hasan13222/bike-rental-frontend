import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "@/pages/common/Home";
import Signup from "@/pages/common/Signup";
import Login from "@/pages/common/Login";
import Profile from "@/pages/protected/Profile";
import Bikes from "@/pages/common/Bikes";
import SingleBike from "@/pages/common/SingleBike";
import MyRentals from "@/pages/user/MyRentals";
import BikeManage from "@/pages/admin/BikeManage";
import UserManage from "@/pages/admin/UserManage";
import Rentals from "@/pages/admin/Rentals";
import CouponManage from "@/pages/admin/CouponManage";
import ProtectedPage from "@/pages/ProtectedPage";
import AdminProtected from "@/pages/AdminProtected";
import AboutUs from "@/pages/common/AboutUs";
import NotFound from "@/pages/common/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/my-profile",
        element: (
          <ProtectedPage>
            <Profile />
          </ProtectedPage>
        ),
      },
      {
        path: "/bikes",
        element: <Bikes />,
      },
      {
        path: "/bikes/:bikeId",
        element: <SingleBike />,
      },
      {
        path: "/my-rentals",
        element: (
          <ProtectedPage>
            <MyRentals />
          </ProtectedPage>
        ),
      },
      {
        path: "/rentals",
        element: (
          <AdminProtected>
            <Rentals />
          </AdminProtected>
        ),
      },
      {
        path: "/bike-manage",
        element: (
          <AdminProtected>
            <BikeManage />
          </AdminProtected>
        ),
      },
      {
        path: "/user-manage",
        element: (
          <AdminProtected>
            <UserManage />
          </AdminProtected>
        ),
      },
      {
        path: "/coupon-manage",
        element: (
          <AdminProtected>
            <CouponManage />
          </AdminProtected>
        ),
      },
    ],
  },
]);

export default router;
