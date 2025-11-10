// src/HomeComponents/Navbar.jsx
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FiMenu, FiX } from "react-icons/fi";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { setCurrentUser, selectCurrentUser } from "../authSlice";
import LanguageSwitcher from "../components/loginComponents/LanguageSwitcher";
import logonave from "../assets/images/logonave.png";

export default function Navbar() {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(setCurrentUser(null));
      navigate("/", { replace: true });
      closeMenu();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleLinkClick = (path) => {
    navigate(path);
    closeMenu();
  };

  const mainLinks = [
    { label: "Home", path: "/" },
    { label: "Courses", path: "/courses" },
    { label: "About-Us", path: "/about" },
    { label: "Favorites", path: "/favorites" },
    { label: "Cart", path: "/cart" },
    ...(user?.isAdmin ? [{ label: "Admin", path: "/admin" }] : []),
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-lg bg-white/30">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:py-3 h-20">
        {/* Logo */}
        <NavLink
          to="/"
          onClick={closeMenu}
          className="flex items-center space-x-2"
        >
          <img src={logonave} alt="Logo" className="h-17 w-28 object-contain" />
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {mainLinks.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `relative text-base font-semibold transition-all duration-300 ${
                  isActive
                    ? "text-gray-900"
                    : "text-gray-700 hover:text-gray-900"
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          <LanguageSwitcher className="rounded-full bg-white/50 p-2 text-gray-800 hover:bg-white/70 transition-all" />

          {!user ? (
            <div className="flex items-center space-x-4">
              <NavLink
                className="rounded-full px-6 py-2 text-sm font-semibold shadow-sm transition bg-white/30 text-gray-800 backdrop-blur-md hover:bg-white/50"
                to="/login"
              >
                Login
              </NavLink>
              <NavLink
                className="rounded-full px-6 py-2 text-sm font-semibold shadow-sm transition bg-white/30 text-gray-800 backdrop-blur-md hover:bg-white/50"
                to="/register"
              >
                Register
              </NavLink>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-white/50 text-sm font-bold text-gray-900">
                {(user.name?.[0] || user.email?.[0] || "U").toUpperCase()}
              </div>
              <span className="hidden text-sm font-medium text-gray-900 lg:inline">
                {user.name || user.email}
              </span>
              <button
                onClick={handleLogout}
                className="rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-3xl text-gray-800"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden absolute inset-x-0 top-20 rounded-b-2xl backdrop-blur-xs bg-gray-400 border-t border-white/50 shadow-lg px-4 py-6 space-y-4">
          {mainLinks.map(({ label, path }) => (
            <button
              key={path}
              onClick={() => handleLinkClick(path)}
              className="block w-full text-left text-lg font-semibold text-gray-800 hover:text-gray-900 transition"
            >
              {label}
            </button>
          ))}

          <LanguageSwitcher className="rounded-full bg-white/50 p-2 text-gray-800 hover:bg-white/70 transition-all" />

          {!user ? (
            <div className="space-y-2">
              <button
                onClick={() => handleLinkClick("/login")}
                className="w-full rounded-full px-6 py-2 text-sm font-semibold shadow-sm transition bg-white text-gray-800 hover:bg-gray-100"
              >
                Login
              </button>
              <button
                onClick={() => handleLinkClick("/register")}
                className="w-full rounded-full px-6 py-2 text-sm font-semibold shadow-sm transition bg-white text-gray-800 hover:bg-gray-100"
              >
                Register
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-red-600"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
}
