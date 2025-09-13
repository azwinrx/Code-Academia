import { useAuth } from "../../helper/authUtils.js";
import { Navigate } from "react-router-dom";

const RedirectIfAuthenticated = ({ children }) => {
   const { isAuthenticated, loading } = useAuth();
   if (loading) {
      return <div>Loading...</div>;
   }
   if (isAuthenticated) {
      return <Navigate to="/beranda" replace />;
   }
   return children;
};

export default RedirectIfAuthenticated;