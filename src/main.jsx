import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./index.css";

import { AuthProvider } from "./helper/AuthContext.jsx";

// ... (sisa import komponen halaman lainnya tetap sama)
import LandingPage from "./components/Layout/landingPage.jsx";
import Login from "./components/Layout/login.jsx";
import Signup from "./components/Layout/Signup.jsx";
import ResetPassword from "./components/Layout/reset_password.jsx";
import ResetPasswordConfirm from "./components/Layout/reset_password_confirm.jsx";
import Success from "./components/Layout/succestest.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import CoursePage from "./pages/CoursePage.jsx";
import RiwayatPage from "./pages/RiwayatPage.jsx";
import BantuanPage from "./pages/BantuanPage.jsx";
import MateriDetailPage from "./pages/MateriDetailPage.jsx";
import ProtectedRoute from "./components/Fragments/ProtectedRoute.jsx";
import RedirectIfAuthenticated from "./components/Fragments/RedirectIfAuthenticated.jsx";


const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/login", element: <RedirectIfAuthenticated><Login /></RedirectIfAuthenticated> },
  { path: "/signup", element: <RedirectIfAuthenticated><Signup /></RedirectIfAuthenticated> },
  { path: "/reset-password", element: <ResetPassword /> },
  { path: "/reset-password-confirm", element: <ResetPasswordConfirm /> },
  { path: "/success", element: <ProtectedRoute><Success /></ProtectedRoute> },
  { path: "/beranda", element: <ProtectedRoute><DashboardPage /></ProtectedRoute> },
  { path: "/materi", element: <ProtectedRoute><CoursePage /></ProtectedRoute> },
  { path: "/materi/:slug", element: <ProtectedRoute><MateriDetailPage /></ProtectedRoute> },
  { path: "/riwayat", element: <ProtectedRoute><RiwayatPage /></ProtectedRoute> },
  { path: "/bantuan", element: <ProtectedRoute><BantuanPage /></ProtectedRoute> },
]);

// Render Aplikasi (tidak perlu diubah)
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);