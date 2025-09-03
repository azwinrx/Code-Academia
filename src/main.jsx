import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import CoursePage from "./pages/CoursePage.jsx";
import RiwayatPage from "./pages/RiwayatPage.jsx";
import BantuanPage from "./pages/BantuanPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import LandingPage from "./components/Layout/landingPage.jsx";
import Login from "./components/Layout/login.jsx";
import Signup from "./components/Layout/Signup.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/beranda",
    element: <DashboardPage />,
  },
  {
    path: "/course",
    element: <CoursePage />,
  },
  {
    path: "/riwayat",
    element: <RiwayatPage />,
  },
  {
    path: "/bantuan",
    element: <BantuanPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    {/* <App></App> */}
  </StrictMode>
);
