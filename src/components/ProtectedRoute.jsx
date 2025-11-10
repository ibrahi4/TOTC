// src/components/ProtectedRoute.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectCurrentUser, selectAuthInitialized } from "../authSlice";

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const user = useSelector(selectCurrentUser);
  const isInitialized = useSelector(selectAuthInitialized);

  if (!isInitialized) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  if (requireAdmin && !user.isAdmin) return <Navigate to="/403" replace />;

  return children;
}
