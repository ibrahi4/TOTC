import React from "react";
export default function PageHeader({ title, actions }) {
  return (
    <header className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between rounded-xl bg-white/10 backdrop-blur-md p-4 ring-1 ring-white/10">
      <h1 className="text-lg font-semibold text-white">{title}</h1>
      {actions ? (
        <div className="flex items-center gap-2">{actions}</div>
      ) : null}
    </header>
  );
}
