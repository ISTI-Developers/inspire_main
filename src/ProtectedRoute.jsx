import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const authenticated = localStorage.getItem("isLoggedIn");

  return authenticated ? <Outlet /> : <Navigate to="/" />;
}
export default ProtectedRoute;
