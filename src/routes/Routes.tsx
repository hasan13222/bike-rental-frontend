import { createBrowserRouter } from "react-router-dom";
import App from "../App"
import Home from "@/pages/common/Home";
import Signup from "@/pages/common/Signup";
import Login from "@/pages/common/Login";
import Profile from "@/pages/protected/Profile";
import Bikes from "@/pages/common/Bikes";

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
            }
        ]
    }
])

export default router;