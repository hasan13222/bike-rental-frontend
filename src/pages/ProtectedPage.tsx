import { useCheckLoginQuery } from "@/redux/api/auth/authApi";
import { Navigate } from "react-router-dom";

const ProtectedPage = ({ children }: any) => {
  const { isSuccess, isError, isLoading } = useCheckLoginQuery(undefined);

  if (isLoading) {
    return (
      <button type="button" className="bg-primary" disabled>
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
        Loading...
      </button>
    );
  }

  if (isError) {
    return <Navigate to="/login" />;
  }

  if (isSuccess) {
    return <>{children}</>;
  }
};

export default ProtectedPage;
