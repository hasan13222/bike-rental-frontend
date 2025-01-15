import { Menubar, MenubarMenu } from "@/components/ui/menubar";
import { Button } from "../ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import RoleBasedOptions from "./RoleBasedOptions";
import { useCheckLoginQuery } from "@/redux/api/auth/authApi";
import { useState } from "react";
// import { Link } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const NavigationBar = () => {
  const [darkmode, setDarkMode] = useState(false);
  const { data: userData } = useCheckLoginQuery(undefined);
  const navigate = useNavigate();
  const location = useLocation();

  const handleDark = () => {
    setDarkMode(!darkmode);
    document.querySelector("html")?.classList.toggle("dark");
    if (!darkmode) {
      document.querySelector("body")!.style.backgroundColor = "#0c1e08";
      document.querySelector("body")!.style.color = "#ffffff";
    } else {
      document.querySelector("body")!.style.backgroundColor = "#f6fcf5";
      document.querySelector("body")!.style.color = "#0c1e08";
    }
  };

  const JBikeMenu = () => {
    console.log(userData)
    return (
      <>
        <Menubar className="justify-end border-0 bg-transparent dark:text-white lg:block flex flex-col h-auto overflow-auto items-start lg:items-center">
          <MenubarMenu>
            <a className="px-2 lg:mb-0 mb-2" href="/">
              Home
            </a>
          </MenubarMenu>
          <MenubarMenu>
            <a className="px-2 lg:mb-0 mb-2" href="/bikes">
              Bikes
            </a>
          </MenubarMenu>
          

          <MenubarMenu>
            <a className="px-2" href="/about-us">
              About Us
            </a>
          </MenubarMenu>
        </Menubar>
      </>
    );
  };
  return (
    <>
      <div className="container border-b border-gray-200 py-6 flex justify-between items-center navigation__bar">
        <div className="logo">
          <img
            onClick={() => navigate("/")}
            className="w-28 object-contain cursor-pointer"
            src="/logo.png"
            alt="logo"
          />
        </div>

        <div className="lg:hidden block ml-auto mr-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Menu</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <JBikeMenu />
            </PopoverContent>
          </Popover>
        </div>

        {/* menu items */}
        <div className="hidden lg:block">
          <JBikeMenu />
        </div>

        <div className="authentication flex gap-4 items-center">
          <Button
            onClick={handleDark}
            className={darkmode ? "bg-dark_bgclr text-white" : ""}
            variant="outline"
          >
            {!darkmode ? "Dark" : "Light"}
          </Button>

          {!userData?.success && (
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
          )}

          {!userData?.success && (
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
          )}

          {userData?.success && (
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
          )}
        </div>
      </div>
    </>
  );
};

export default NavigationBar;
