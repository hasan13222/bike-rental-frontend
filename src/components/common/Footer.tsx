import { FiFacebook } from "react-icons/fi";
import { AiOutlineYoutube } from "react-icons/ai";
import { BsTwitterX } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { Menubar, MenubarMenu } from "@radix-ui/react-menubar";

const Footer = () => {
  return (
    <>
      <div className="container py-5 text-center flex flex-col items-center border-t border-slate-200 gap-3">
        {/* social icons */}
        <div className="social__icons flex gap-4 items-center">
          <FiFacebook size={22} className="text-primary" />
          <AiOutlineYoutube size={22} className="text-primary"/>
          <BsTwitterX size={18} className="text-primary" />
          <FaInstagram size={22} className="text-primary" />
          <FaLinkedin size={22} className="text-primary" />
        </div>

        {/* nav items */}
        <Menubar className="justify-end border-0 bg-transparent">
          <MenubarMenu>
            <a className="px-2" href="/">
              Privacy Policy
            </a>
          </MenubarMenu>
          <MenubarMenu>
            <a className="px-2" href="/">
              Terms of Use
            </a>
          </MenubarMenu>
          <MenubarMenu>
            <a className="px-2" href="/">
              Contact Us
            </a>
          </MenubarMenu>
        </Menubar>
      </div>
      <div className="container text-center border-t border-slate-200 py-3">
        <p>&copy; All rights reserved by Jamil Hasan.</p>
      </div>
    </>
  );
};

export default Footer;
