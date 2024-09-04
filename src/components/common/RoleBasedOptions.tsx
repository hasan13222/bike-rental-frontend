import { LogOut, User } from "lucide-react";
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

const RoleBasedOptions = () => {
  const navigate = useNavigate();
  return (
    <>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator/>
      <DropdownMenuItem onClick={() => navigate('/my-profile')}>
        <User className="mr-2 h-4 w-4" />
        <span>Profile</span>
        
      </DropdownMenuItem>
      <DropdownMenuItem>
        <LogOut className="mr-2 h-4 w-4" />
        <span>Log out</span>
      </DropdownMenuItem>
    </>
  );
};

export default RoleBasedOptions;
