import { useCheckLoginQuery } from "@/redux/api/auth/authApi";
import { Navigate } from "react-router-dom";

const AdminProtected = ({ children }: any) => {
  const { data, isSuccess, isError, isLoading } = useCheckLoginQuery(undefined);

  if (isLoading) {
    return (
      <button type="button" className="bg-primary" disabled>
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
        Loading...
      </button>
    );
  }

  if (isError || data.data.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  if (isSuccess && data.data.role === 'admin') {
    return <>{children}</>;
  }
};

export default AdminProtected;
