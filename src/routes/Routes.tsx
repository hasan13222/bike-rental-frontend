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
import Dashboard from "@/pages/protected/Dashboard";
import DashboardLayout from "@/components/layout/DashboardLayout";

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
            <DashboardLayout>
              <Profile />
            </DashboardLayout>
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
            <DashboardLayout>
              <MyRentals />
            </DashboardLayout>
          </ProtectedPage>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedPage>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </ProtectedPage>
        ),
      },
      {
        path: "/rentals",
        element: (
          <AdminProtected>
            <DashboardLayout>
              <Rentals />
            </DashboardLayout>
          </AdminProtected>
        ),
      },
      {
        path: "/bike-manage",
        element: (
          <AdminProtected>
            <DashboardLayout>
              <BikeManage />
            </DashboardLayout>
          </AdminProtected>
        ),
      },
      {
        path: "/user-manage",
        element: (
          <AdminProtected>
            <DashboardLayout>
              <UserManage />
            </DashboardLayout>
          </AdminProtected>
        ),
      },
      {
        path: "/coupon-manage",
        element: (
          <AdminProtected>
            <DashboardLayout>
              <CouponManage />
            </DashboardLayout>
          </AdminProtected>
        ),
      },
    ],
  },
]);

export default router;
