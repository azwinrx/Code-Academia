import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./components/Layout/landingPage.jsx";
import Login from "./components/Layout/login.jsx";
import Signup from "./components/Layout/signup.jsx";
import ResetPassword from "./components/Layout/reset_password.jsx";
import ResetPasswordConfirm from "./components/Layout/reset_password_confirm.jsx";
import Success from "./components/Layout/succestest.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import CoursePage from "./pages/CoursePage.jsx";
import RiwayatPage from "./pages/RiwayatPage.jsx";
import BantuanPage from "./pages/ForumPage.jsx";
import ThreadDetailPage from "./pages/ThreadDetailPage.jsx";
import MateriDetailPage from "./pages/MateriDetailPage.jsx";
import QuizPage from "./pages/QuizPage.jsx";
import ProtectedRoute from "./components/Fragments/ProtectedRoute.jsx";
import RedirectIfAuthenticated from "./components/Fragments/RedirectIfAuthenticated.jsx";
import QuizActiveChecker from "./components/Fragments/QuizActiveChecker.jsx";

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  {
    path: "/login",
    element: (
      <RedirectIfAuthenticated>
        <Login />
      </RedirectIfAuthenticated>
    ),
  },
  {
    path: "/signup",
    element: (
      <RedirectIfAuthenticated>
        <Signup />
      </RedirectIfAuthenticated>
    ),
  },
  { path: "/reset-password", element: <ResetPassword /> },
  { path: "/reset-password-confirm", element: <ResetPasswordConfirm /> },
  {
    path: "/success",
    element: (
      <ProtectedRoute>
        <Success />
      </ProtectedRoute>
    ),
  },
  {
    path: "/beranda",
    element: (
      <ProtectedRoute>
        <QuizActiveChecker>
          <DashboardPage />
        </QuizActiveChecker>
      </ProtectedRoute>
    ),
  },
  {
    path: "/materi",
    element: (
      <ProtectedRoute>
        <QuizActiveChecker>
          <CoursePage />
        </QuizActiveChecker>
      </ProtectedRoute>
    ),
  },
  {
    path: "/materi/:slug",
    element: (
      <ProtectedRoute>
        <QuizActiveChecker>
          <MateriDetailPage />
        </QuizActiveChecker>
      </ProtectedRoute>
    ),
  },
  {
    path: "/quiz/:slug",
    element: (
      <ProtectedRoute>
        <QuizPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/riwayat",
    element: (
      <ProtectedRoute>
        <QuizActiveChecker>
          <RiwayatPage />
        </QuizActiveChecker>
      </ProtectedRoute>
    ),
  },
  {
    path: "/forum",
    element: (
      <ProtectedRoute>
        <QuizActiveChecker>
          <BantuanPage />
        </QuizActiveChecker>
      </ProtectedRoute>
    ),
  },
  {
    path: "/threads/:id",
    element: (
      <ProtectedRoute>
        <QuizActiveChecker>
          <ThreadDetailPage />
        </QuizActiveChecker>
      </ProtectedRoute>
    ),
  },
]);

export default router;
