import React from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiBookOpen, FiPlusCircle, FiTag } from "react-icons/fi";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/** Hover/focus tooltip rendered to document.body, positioned via getBoundingClientRect */
function PortalTooltip({ open, label, x, y, onClose }) {
  // close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return createPortal(
    <div
      role="tooltip"
      // fixed so it ignores parent overflow/stacking; super-high z to be safe
      className={[
        "pointer-events-none fixed z-[9999] select-none",
        "rounded-md bg-gray-900 px-2 py-1 text-xs font-medium text-[#f0cc17] shadow-lg",
        "opacity-100 transition motion-reduce:transition-none",
      ].join(" ")}
      style={{
        left: x,
        top: y,
        transform: "translate(8px, -50%)", // +8px gap, center vertically
      }}
    >
      {label}
    </div>,
    document.body
  );
}

/* Hover color refinement (brand tint) */
const linkBase =
  "relative group flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d2b005]/40";
const linkActive = "bg-[#d2b005]/10 text-white ring-1 ring-[#49BBBD]/30";
const linkIdle = "text-white hover:bg-[#49BBBD]/5";

export default function AdminSidebar({ onNavigate, collapsed = false }) {
  // Single tooltip state for the whole sidebar
  const [tip, setTip] = useState({ open: false, label: "", x: 0, y: 0 });

  const showTip = useCallback((label, rect) => {
    // position to the right edge of the trigger
    setTip({
      open: true,
      label,
      x: rect.right,
      y: rect.top + rect.height / 2,
    });
  }, []);

  const hideTip = useCallback(() => setTip((t) => ({ ...t, open: false })), []);

  // Close tooltip on scroll; this keeps it from “hanging” in wrong place
  useEffect(() => {
    const onScroll = () => hideTip();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hideTip]);

  const links = useMemo(
    () => [
      { to: "/admin", end: true, label: "Dashboard", icon: <FiHome /> },
      { to: "/admin/courses", label: "Courses", icon: <FiBookOpen /> },
      { to: "/admin/courses/new", label: "New Course", icon: <FiPlusCircle /> },
      { to: "/admin/categories", label: "Categories", icon: <FiTag /> },
    ],
    []
  );

  return (
    <div className="flex h-full flex-col bg-white/10 backdrop-blur-lg ring-1 ring-white/10">
      {/* Brand / Title */}
      <div className="flex items-center gap-2 px-3 py-3">
        <div className="grid h-8 w-8 place-items-center rounded-md bg-[#f0cc17] font-extrabold text-white">
          T
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-[#f0cc17]">
              Admin
            </div>
            <div className="truncate text-[11px] text-[#f0cc17]">
              TOTC eLearning
            </div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="mt-1 flex flex-col gap-1 px-2">
        {links.map((l) => (
          <SideLink
            key={l.to}
            {...l}
            collapsed={collapsed}
            onNavigate={onNavigate}
            onShowTip={showTip}
            onHideTip={hideTip}
          />
        ))}
      </nav>

      {/* Tooltip */}
      <PortalTooltip
        open={tip.open && collapsed}
        label={tip.label}
        x={tip.x}
        y={tip.y}
        onClose={() => setTip({ ...tip, open: false })}
      />
    </div>
  );
}

/** Active indicator strip + portal tooltip triggers when collapsed */
function SideLink({
  to,
  end,
  onNavigate,
  collapsed,
  label,
  icon,
  onShowTip,
  onHideTip,
}) {
  const ref = useRef(null);

  const handleEnter = () => {
    if (!collapsed || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    onShowTip(label, rect);
  };

  const handleLeave = () => {
    if (!collapsed) return;
    onHideTip();
  };

  return (
    <NavLink
      to={to}
      end={end}
      onClick={(e) => {
        onNavigate?.(e);
        onHideTip?.();
      }}
      ref={ref}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
      className={({ isActive }) =>
        [
          linkBase,
          isActive
            ? // Active: left strip + brand ring
              "pl-3 before:absolute before:left-0 before:top-1/2 before:h-5 before:w-0.5 before:-translate-y-1/2 before:rounded-full before:bg-[#bd4992] " +
              linkActive
            : linkIdle,
          collapsed ? "justify-center pl-0" : "",
        ].join(" ")
      }
      aria-label={collapsed ? label : undefined}
    >
      {/* Icon */}
      <span className="text-[18px]">{icon}</span>

      {/* Label (hidden in rail) */}
      {!collapsed && <span className="truncate">{label}</span>}
    </NavLink>
  );
}
