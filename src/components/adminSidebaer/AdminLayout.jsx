import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { FiMenu, FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import AdminSidebar from "./AdminSidebar";
import React from "react";

const LS_KEY = "admin.sidebar.collapsed";

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem(LS_KEY) === "1";
    } catch {
      return false;
    }
  });

  const [mobileOpen, setMobileOpen] = useState(false);
  const firstFocusableRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, collapsed ? "1" : "0");
    } catch {}
  }, [collapsed]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setMobileOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [mobileOpen]);

  return (
    <div className="pt-4 h-[calc(100svh-var(--nav-h))] text-white transition-colors duration-300 bg-white/5 backdrop-blur-md">
      <div className="flex h-full min-h-0 isolate">
        {/* Sidebar */}
        <aside
          className={[
            "relative hidden z-20 bg-white/5 backdrop-blur- text-white",
            "ring-1 ring-white/10 shadow-xl",
            "transition-[width] duration-300 ease-in-out",
            "motion-reduce:transition-none motion-reduce:duration-0",
            "lg:block",
            collapsed ? "w-[72px]" : "w-[260px]",
          ].join(" ")}
        >
          <div className="flex h-full min-h-0 flex-col">
            <div className="flex items-center justify-end px-2 py-2">
              <button
                type="button"
                onClick={() => setCollapsed((v) => !v)}
                className="hidden rounded-md border border-white/20 bg-white/10 p-2 text-white hover:bg-white/20 lg:inline-flex transition"
                title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overflow-x-visible">
              <AdminSidebar collapsed={collapsed} onNavigate={() => {}} />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <section className="min-w-0 flex-1 min-h-0 overflow-hidden">
          <div className="sticky top-0 z-10 border-b border-white/10 bg-white/5 backdrop-blur-md text-white shadow-sm">
            <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 sm:px-6 lg:px-8">
              <button
                onClick={() => setMobileOpen(true)}
                className="inline-flex items-center rounded-md border border-white/20 bg-white/10 p-2 text-white shadow-sm transition hover:bg-white/20 lg:hidden"
                aria-label="Open sidebar"
                ref={firstFocusableRef}
              >
                <FiMenu />
              </button>
              <div className="flex-1" />
            </div>
          </div>

          {/* Outlet */}
          <div className="mx-auto h-full max-w-7xl overflow-y-auto px-4 py-8 sm:px-6 lg:px-8 mt-2">
            <Outlet />
          </div>
        </section>
      </div>

      {/* Mobile Drawer */}
      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <AdminSidebar
          collapsed={false}
          onNavigate={() => setMobileOpen(false)}
        />
      </MobileDrawer>
    </div>
  );
}

function MobileDrawer({ open, onClose, children }) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const focusable = panelRef.current?.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusable?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div className="lg:hidden">
      {/* Overlay */}
      <button
        onClick={onClose}
        aria-label="Close sidebar"
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition"
      />

      {/* Drawer Panel */}
      <div
        ref={panelRef}
        className={[
          "fixed inset-y-0 left-0 z-50 w-72 translate-x-0 bg-[#1b1f23]/95 text-white shadow-xl ring-1 ring-white/10",
          "transition-transform duration-300 will-change-transform",
        ].join(" ")}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-3 py-3">
          <span className="text-sm font-semibold">Admin</span>
          <button
            onClick={onClose}
            className="rounded-md p-2 text-white/70 hover:bg-white/10 hover:text-white transition"
          >
            <FiX />
          </button>
        </div>
        <div className="h-[calc(100%-48px)] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
