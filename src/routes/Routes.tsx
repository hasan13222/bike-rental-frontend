import { createBrowserRouter } from "react-router-dom";
import App from "../App"
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

const router = createBrowserRouter([
    {
        path: '/', 
        element: <App/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: '/signup',
                element: <Signup/>
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/my-profile',
                element: <Profile/>
            },
            {
                path: '/bikes',
                element: <Bikes/>
            },
            {
                path: '/bikes/1',
                element: <SingleBike/>
            },
            {
                path: '/my-rentals',
                element: <MyRentals/>
            },
            {
                path: '/rentals',
                element: <Rentals/>
            },
            {
                path: '/bike-manage',
                element: <BikeManage/>
            },
            {
                path: '/user-manage',
                element: <UserManage/>
            },
            {
                path: '/coupon-manage',
                element: <CouponManage/>
            },
        ]
    }
])

export default router;