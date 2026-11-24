import {Navigate, Outlet} from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function ProtectedRoutes() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}   

export default ProtectedRoutes;