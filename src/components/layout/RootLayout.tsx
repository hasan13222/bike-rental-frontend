import Footer from "../common/Footer";
import NavigationBar from "../common/NavigationBar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <NavigationBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
