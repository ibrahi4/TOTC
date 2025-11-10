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
      className="min-h-screen w-full flex items-center justify-center"
      style={{
        backgroundImage: `url(${imageSrc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full max-w-2xl sm:max-w-lg bg-white/20 dark:bg-gray-100/50 backdrop-blur-lg rounded-3xl  sm:p-8 shadow-2xl mt-10">
        <header className="text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-700 dark:text-gray-700">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 text-white dark:text-gray-700 text-sm sm:text-base">
              {subtitle}
            </p>
          )}
        </header>

        <div>{children}</div>
      </div>
    </div>
  );
}
