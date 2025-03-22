import { LogOut, User } from "lucide-react";
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { CustomError } from "@/types/errorType";
import { useLazyLogoutQuery } from "@/redux/api/auth/authApi";

const RoleBasedOptions = () => {
  const navigate = useNavigate();

  const [logout, { isError, error, isLoading }] = useLazyLogoutQuery(undefined);

  const handleLogout = async() => {
    const loggedOut = await logout(undefined);
    if (loggedOut.data.success){
      toast({description: loggedOut.data.message});
      navigate('/login');
    }
  }
  return (
    <>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/my-profile")}>
        <User className="mr-2 h-4 w-4" />
        <span>Profile</span>
      </DropdownMenuItem>
      <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/dashboard")}>
        <User className="mr-2 h-4 w-4" />
        <span>Dashboard</span>
      </DropdownMenuItem>
      <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
        <LogOut className="mr-2 h-4 w-4" />
        <span>Log out</span>
      </DropdownMenuItem>
      {isLoading && (
        <button type="button" className="bg-primary" disabled>
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
          Loading...
        </button>
      )}
      {isError && (
        <p className="text-red-500">{(error as CustomError)?.data?.message}</p>
      )}
    </>
  );
};

export default RoleBasedOptions;
