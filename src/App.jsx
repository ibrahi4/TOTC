// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuthInitialized } from "./authSlice";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Reset from "./pages/Reset";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Forbidden from "./pages/Forbidden";
import Favorites from "./pages/Favorites";
import CartPanel from "./pages/cartPanel";
import Checkout from "./pages/Checkout";

// Layout + Components
import Navbar from "./HomeComponents/Navbar";
import Footer from "./HomeComponents/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Admin
import AdminLayout from "./components/adminSidebaer/AdminLayout";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminCourses from "./components/admin/AdminCourses";
import AdminCourseForm from "./components/admin/AdminCourseForm";
import AdminCategories from "./components/admin/AdminCategories";

function MainLayout({ children }) {
  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundColor: "rgba(10, 25, 47, 0.7)",
        backdropFilter: "blur(30px)",
        WebkitBackdropFilter: "blur(30px)",
      }}
    >
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center blur-md brightness-75"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1400&q=80')",
          opacity: 0.5,
        }}
      />
      <main className="relative z-10">{children}</main>
    </div>
  );
}

function AppRoutes() {
  const location = useLocation();
  const isInitialized = useSelector(selectAuthInitialized);

  const hideFooterPaths = ["/login", "/register", "/reset"];
  const shouldHideFooter = hideFooterPaths.includes(location.pathname);

  if (!isInitialized) {
    return (
      <div className="flex h-screen items-center justify-center text-white">
        <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-white" />
        <p className="ml-4">Loading…</p>
      </div>
    );
  }

  return (
    <MainLayout>
      <Navbar />

      <main className="pt-[var(--nav-h)]">
        <div className="min-h-[calc(100vh-var(--nav-h))] bg-transparent">
          <Routes>
            {/* 🌍 Public */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset" element={<Reset />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetails />} />
            <Route path="/cart" element={<CartPanel />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/about" element={<About />} />
            <Route path="/403" element={<Forbidden />} />

            {/* 🔒 Protected */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* 🛠 Admin */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="courses" element={<AdminCourses />} />
              <Route path="about" element={<About />} />
              <Route path="courses/new" element={<AdminCourseForm />} />
              <Route path="courses/:id/edit" element={<AdminCourseForm />} />
              <Route path="categories" element={<AdminCategories />} />
            </Route>

            {/* ❌ 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>

      {!shouldHideFooter && <Footer />}
    </MainLayout>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
