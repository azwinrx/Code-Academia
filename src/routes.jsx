import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./helper/AuthContext.jsx";
import { useAuth } from "./helper/authUtils";

// Import your page components here
import Login from "./components/Layout/login";
import Signup from "./components/Layout/Signup";
import ResetPassword from "./components/Layout/reset_password";
import ResetPasswordConfirm from "./components/Layout/reset_password_confirm";
import Success from "./components/Layout/succestest";

// Import other pages as needed
// import Home from "./components/Pages/Home";
// import Dashboard from "./components/Pages/Dashboard";
// import Profile from "./components/Pages/Profile";
// import NotFound from "./components/Pages/NotFound";

// Auth guard component (optional)
// This component checks if the user is authenticated before allowing access to protected routes
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    // You could return a loading spinner here
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  return children;
};

// This component redirects authenticated users away from auth pages
const RedirectIfAuthenticated = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    // You could return a loading spinner here
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    // Redirect to success/dashboard if already authenticated
    return <Navigate to="/success" replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={
              <RedirectIfAuthenticated>
                <Login />
              </RedirectIfAuthenticated>
            }
          />
          <Route
            path="/signup"
            element={
              <RedirectIfAuthenticated>
                <Signup />
              </RedirectIfAuthenticated>
            }
          />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/reset-password-confirm"
            element={<ResetPasswordConfirm />}
          />

          {/* Protected Routes */}
          <Route
            path="/success"
            element={
              <ProtectedRoute>
                <Success />
              </ProtectedRoute>
            }
          />

          {/* Redirect root to login or dashboard based on auth state */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Add a 404 route if needed */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
