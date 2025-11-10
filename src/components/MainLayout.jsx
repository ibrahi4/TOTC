import React from "react";

export default function MainLayout({ children }) {
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
