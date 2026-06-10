import { Navigate, Outlet } from "react-router-dom";

type ProtectedRouteProps = {
  isAuthenticated: boolean;
  redirectPath?: string;
};

function ProtectedRoute({
  isAuthenticated,
  redirectPath = "/",
}: ProtectedRouteProps) {
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
