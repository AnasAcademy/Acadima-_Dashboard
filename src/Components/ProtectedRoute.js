import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // If no token is found, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // If the token exists, render the requested component
  return children;
};

export default ProtectedRoute;
