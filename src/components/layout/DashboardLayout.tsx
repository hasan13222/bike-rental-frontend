import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useCheckLoginQuery } from "@/redux/api/auth/authApi";
import { Button } from "../ui/button";
import '@/styles/dashboard.css'

const DashboardLayout = ({ children }: any) => {
  
    const { data: userData } = useCheckLoginQuery(undefined);
  return (
    <div className="dashboard container py-8 mx-auto">
      <div className="flex gap-5">
        <div className="inline-block sm:hidden">
        <Drawer direction="left">
          <DrawerTrigger>
            <Button><FaBars /></Button>
            
          </DrawerTrigger>
          <DrawerContent>
            <ul className=" ">
              <li className="dark:bg-black bg-white mb-2 rounded-md hover:bg-slate-50">
                <NavLink className="w-full inline-block p-2" to={`dashboard`}>
                  Dashboard
                </NavLink>
              </li>
              {userData?.data?.role === "admin" && (
            <li className="dark:bg-black bg-white mb-2 rounded-md hover:bg-slate-50">
              <NavLink className="w-full inline-block p-2" to="/bike-manage">
                Bike Management
              </NavLink>
            </li>
          )}
          {userData?.data?.role === "admin" && (
            <li className="dark:bg-black bg-white mb-2 rounded-md hover:bg-slate-50">
              <NavLink className="w-full inline-block p-2" to="/user-manage">
                User Management
              </NavLink>
            </li>
          )}

          {userData?.data?.role === "admin" && (
            <li className="dark:bg-black bg-white mb-2 rounded-md hover:bg-slate-50">
              <NavLink className="w-full inline-block p-2" to="/coupon-manage">
                Coupons
              </NavLink>
            </li>
          )}

          {userData?.data?.role === "user" && (
            <li className="dark:bg-black bg-white mb-2 rounded-md hover:bg-slate-50">
              <NavLink className="w-full inline-block p-2" to="/my-rentals">
                My Rentals
              </NavLink>
            </li>
          )}
          
          {userData?.data?.role === "user" && (
            <li className="dark:bg-black bg-white mb-2 rounded-md hover:bg-slate-50">
              <NavLink className="w-full inline-block p-2" to="/my-dues">
                Incomplete Rides
              </NavLink>
            </li>
          )}
          {userData?.data?.role === "user" && (
            <li className="dark:bg-black bg-white mb-2 rounded-md hover:bg-slate-50">
              <NavLink className="w-full inline-block p-2" to="/my-rides">
                My Rides
              </NavLink>
            </li>
          )}

          {userData?.data?.role === "admin" && (
            <li className="dark:bg-black bg-white mb-2 rounded-md hover:bg-slate-50">
              <NavLink className="w-full inline-block p-2" to="/rentals">
                Rentals
              </NavLink>
            </li>
          )}
            </ul>
          </DrawerContent>
        </Drawer>
        </div>
        

        <div className="sidebar min-w-[240px] hidden sm:block bg-dark_primary rounded-md p-3">
          <ul className="">
            <li className="dark:bg-black bg-white mb-2 rounded-md hover:bg-slate-50">
              <NavLink className="w-full inline-block p-2" to={`/dashboard`}>
                Dashboard
              </NavLink>
            </li>
            {userData?.data?.role === "admin" && (
            <li className="dark:bg-black bg-white mb-2 rounded-md hover:bg-slate-50">
              <NavLink className="w-full inline-block p-2" to="/bike-manage">
                Bike Management
              </NavLink>
            </li>
          )}
          {userData?.data?.role === "admin" && (
            <li className="dark:bg-black bg-white mb-2 rounded-md hover:bg-slate-50">
              <NavLink className="w-full inline-block p-2" to="/user-manage">
                User Management
              </NavLink>
            </li>
          )}

          {userData?.data?.role === "admin" && (
            <li className="dark:bg-black bg-white mb-2 rounded-md hover:bg-slate-50">
              <NavLink className="w-full inline-block p-2" to="/coupon-manage">
                Coupons
              </NavLink>
            </li>
          )}

          {userData?.data?.role === "user" && (
            <li className="dark:bg-black bg-white mb-2 rounded-md hover:bg-slate-50">
              <NavLink className="w-full inline-block p-2" to="/my-rentals">
                My Rentals
              </NavLink>
            </li>
          )}
          {userData?.data?.role === "user" && (
            <li className="dark:bg-black bg-white mb-2 rounded-md hover:bg-slate-50">
              <NavLink className="w-full inline-block p-2" to="/my-dues">
                Incomplete Rides
              </NavLink>
            </li>
          )}
          {userData?.data?.role === "user" && (
            <li className="dark:bg-black bg-white mb-2 rounded-md hover:bg-slate-50">
              <NavLink className="w-full inline-block p-2" to="/my-rides">
                My Rides
              </NavLink>
            </li>
          )}

          {userData?.data?.role === "admin" && (
            <li className="dark:bg-black bg-white mb-2 rounded-md hover:bg-slate-50">
              <NavLink className="w-full inline-block p-2" to="/rentals">
                Rentals
              </NavLink>
            </li>
          )}
          </ul>
        </div>
        <div className="flex-grow">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
