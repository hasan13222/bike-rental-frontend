import Footer from "../common/Footer";
import NavigationBar from "../common/NavigationBar";
import { Outlet } from "react-router-dom";
import { Toaster } from "../ui/toaster";

const RootLayout = () => {
  return (
    <>
      <NavigationBar />
      <Outlet />
      <Footer />
      
      <Toaster/>
    </>
  );
};

export default RootLayout;
