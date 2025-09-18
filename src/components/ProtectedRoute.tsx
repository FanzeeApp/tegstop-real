import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  // Agar token yo'q bo'lsa -> login sahifasiga yuboramiz
  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  // Aks holda sahifani ko'rsatamiz
  return <Outlet />;
};

export default ProtectedRoute;
