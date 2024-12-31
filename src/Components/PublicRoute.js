import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // If the user is logged in, redirect to a default authenticated page
  if (token) {
    return <Navigate to="/" replace />;
  }

  // If the user is not logged in, render the public route
  return children;
};

export default PublicRoute;
