import React from "react";

// صور احترافية لكل صفحة auth
const illustrations = {
  login:
    "https://images.unsplash.com/photo-1591696331113-8a55ed74aa45?auto=format&fit=crop&w=1600&q=80",
  register:
    "https://images.unsplash.com/photo-1605902711622-cfb43c4431c8?auto=format&fit=crop&w=1600&q=80",
  reset:
    "https://images.unsplash.com/photo-1581090700227-4ec34b7a4d6f?auto=format&fit=crop&w=1600&q=80",
};

export default function AuthLayout({
  title,
  subtitle,
  children,
  page = "register",
}) {
  const imageSrc = illustrations[page] || illustrations.register;

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url(${imageSrc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="
          w-full
          max-w-md
          sm:max-w-lg
          md:max-w-xl
          lg:max-w-2xl
          bg-white/20 dark:bg-gray-100/50
          backdrop-blur-lg
          rounded-3xl
          p-6 sm:p-10
          shadow-2xl
          mt-10
          mx-auto
        "
      >
        <header className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-700 dark:text-gray-700">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
              {subtitle}
            </p>
          )}
        </header>

        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
}
