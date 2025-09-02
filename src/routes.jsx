import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Import your page components here
import Login from "./components/Layout/login";
import Signup from "./components/Layout/Signup";
import ResetPassword from "./components/Layout/reset_password";

// Import other pages as needed
// import Home from "./components/Pages/Home";
// import Dashboard from "./components/Pages/Dashboard";
// import Profile from "./components/Pages/Profile";
// import NotFound from "./components/Pages/NotFound";

// Auth guard component (optional)
// This component checks if the user is authenticated before allowing access to protected routes
const ProtectedRoute = ({ children }) => {
  // Replace this with your actual authentication logic
  const isAuthenticated = false; // Example: localStorage.getItem("token") !== null;

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected Routes (example) */}
        {/* 
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
        */}

        {/* Redirect root to a specific page */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* 404 Not Found Route */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
