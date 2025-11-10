import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ requiredRole }) => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" replace />;

  if (requiredRole && user.role !== requiredRole)
    return <Navigate to="/no-autorizado" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
