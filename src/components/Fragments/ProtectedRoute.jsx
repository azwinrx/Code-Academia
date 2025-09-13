import { useAuth } from "../../helper/authUtils.js";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
   const authData = useAuth();

   // --- BAGIAN DEBUGGING ---
   console.log("ProtectedRoute State:", authData);
   // -------------------------

   // Gunakan authData.loading dan authData.isAuthenticated untuk keamanan
   if (authData?.loading) {
      console.log("ProtectedRoute Decision: Render Loading...");
      return <div>Loading...</div>;
   }

   if (!authData?.isAuthenticated) {
      console.log("ProtectedRoute Decision: Redirecting to /login");
      return <Navigate to="/login" replace />;
   }

   console.log("ProtectedRoute Decision: Rendering children");
   return children;
};

export default ProtectedRoute;