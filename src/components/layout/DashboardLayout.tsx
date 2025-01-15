import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useCheckLoginQuery } from "@/redux/api/auth/authApi";
import { Button } from "../ui/button";

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
              <li className="bg-white mb-2 rounded-md hover:bg-slate-50">
                <NavLink className="w-full inline-block p-2" to={`dashboard`}>
                  Dashboard
                </NavLink>
              </li>
              {userData?.data?.role === "admin" && (
            <li className="bg-white mb-2 rounded-md hover:bg-slate-50">
              <a className="w-full inline-block p-2" href="/bike-manage">
                Bike Management
              </a>
            </li>
          )}
          {userData?.data?.role === "admin" && (
            <li className="bg-white mb-2 rounded-md hover:bg-slate-50">
              <a className="w-full inline-block p-2" href="/user-manage">
                User Management
              </a>
            </li>
          )}

          {userData?.data?.role === "admin" && (
            <li className="bg-white mb-2 rounded-md hover:bg-slate-50">
              <a className="w-full inline-block p-2" href="/coupon-manage">
                Coupons
              </a>
            </li>
          )}

          {userData?.data?.role === "user" && (
            <li className="bg-white mb-2 rounded-md hover:bg-slate-50">
              <a className="w-full inline-block p-2" href="/my-rentals">
                My Rentals
              </a>
            </li>
          )}

          {userData?.data?.role === "admin" && (
            <li className="bg-white mb-2 rounded-md hover:bg-slate-50">
              <a className="w-full inline-block p-2" href="/rentals">
                Rentals
              </a>
            </li>
          )}
            </ul>
          </DrawerContent>
        </Drawer>
        </div>
        

        <div className="sidebar min-w-[240px] hidden sm:block bg-slate-400 rounded-md p-3">
          <ul className="">
            <li className="bg-white mb-2 rounded-md hover:bg-slate-50">
              <NavLink className="w-full inline-block p-2" to={`/dashboard`}>
                Dashboard
              </NavLink>
            </li>
            {userData?.data?.role === "admin" && (
            <li className="bg-white mb-2 rounded-md hover:bg-slate-50">
              <a className="w-full inline-block p-2" href="/bike-manage">
                Bike Management
              </a>
            </li>
          )}
          {userData?.data?.role === "admin" && (
            <li className="bg-white mb-2 rounded-md hover:bg-slate-50">
              <a className="w-full inline-block p-2" href="/user-manage">
                User Management
              </a>
            </li>
          )}

          {userData?.data?.role === "admin" && (
            <li className="bg-white mb-2 rounded-md hover:bg-slate-50">
              <a className="w-full inline-block p-2" href="/coupon-manage">
                Coupons
              </a>
            </li>
          )}

          {userData?.data?.role === "user" && (
            <li className="bg-white mb-2 rounded-md hover:bg-slate-50">
              <a className="w-full inline-block p-2" href="/my-rentals">
                My Rentals
              </a>
            </li>
          )}

          {userData?.data?.role === "admin" && (
            <li className="bg-white mb-2 rounded-md hover:bg-slate-50">
              <a className="w-full inline-block p-2" href="/rentals">
                Rentals
              </a>
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
