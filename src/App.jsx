import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import AppRoutes from "./routes";

function App() {
  return (
    <Router>
      <Toaster />
      <AppRoutes />
    </Router>
  );
}

export default App;
