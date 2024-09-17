import { Menubar, MenubarMenu } from "@/components/ui/menubar";
import { Button } from "../ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import RoleBasedOptions from "./RoleBasedOptions";
// import { Link } from "react-router-dom";

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      <div className="container border-b border-gray-200 py-6 flex justify-between items-center navigation__bar">
        <div className="logo">
          <img onClick={() => navigate('/')} className="w-28 object-contain cursor-pointer" src="/logo.png" alt="logo" />
        </div>

        {/* menu items */}
        <Menubar className="justify-end border-0 bg-transparent">
          <MenubarMenu>
            <a className="px-2" href="/">
              Home
            </a>
          </MenubarMenu>
          <MenubarMenu>
            <a className="px-2" href="/bikes">
              Bikes
            </a>
          </MenubarMenu>
          <MenubarMenu>
            <a className="px-2" href="/bike-manage">
              Bike Management
            </a>
          </MenubarMenu>
          <MenubarMenu>
            <a className="px-2" href="/user-manage">
              User Management
            </a>
          </MenubarMenu>
          <MenubarMenu>
            <a className="px-2" href="/coupon-manage">
              Coupons
            </a>
          </MenubarMenu>
          <MenubarMenu>
            <a className="px-2" href="/my-rentals">
              My Rentals
            </a>
          </MenubarMenu>
          <MenubarMenu>
            <a className="px-2" href="/rentals">
              Rentals
            </a>
          </MenubarMenu>
          <MenubarMenu>
            <a className="px-2" href="/">
              About Us
            </a>
          </MenubarMenu>
        </Menubar>

        <div className="authentication flex gap-4 items-center">
          <Button
            className={`hover:text-bgclr ${
              location.pathname === "/signup"
                ? "bg-black text-bgclr"
                : "bg-lightAccent text-txtclr"
            }`}
            variant="default"
            onClick={() => navigate("/signup")}
          >
            Signup
          </Button>
          <Button
            className={`hover:text-bgclr ${
              location.pathname === "/login"
                ? "bg-black text-bgclr"
                : "bg-primary text-txtclr"
            }`}
            variant="default"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <img
                  className="w-12 h-12 rounded-full cursor-pointer"
                  src="/avatar.png"
                  alt="avatar"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <RoleBasedOptions />
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </div>
    </>
  );
};

export default NavigationBar;
