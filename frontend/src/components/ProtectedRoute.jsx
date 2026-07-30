import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user } = useSelector((store) => store.user);
  if (!user) {
    return <Navigate to="/login" />;
  }
  if (adminOnly && user?.role?.trim()?.toLowerCase() !== "admin") {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
