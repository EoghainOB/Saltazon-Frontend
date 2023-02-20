import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/authProvider";
import { all } from "axios";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useContext(AuthContext);
  const location = useLocation();

  console.log("ROLES", auth.role);
  console.log("LOCATION", location);
  console.log("USER", auth.username);
  console.log("ALLOWED", allowedRoles);

  return allowedRoles.includes(auth.role) ? (
    <Outlet />
  ) : auth.username ? (
    <Navigate to="/unauthorised" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
