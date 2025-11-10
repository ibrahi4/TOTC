import React, { useState, useMemo } from "react";
import {
  FiSearch,
  FiArrowUp,
  FiArrowDown,
  FiHeart,
  FiShoppingCart,
} from "react-icons/fi";
import { useCoursesSorted } from "../hooks/useCoursesSorted";
import { usePagination } from "../hooks/usePagination";
import { Link } from "react-router-dom";
import Pager from "../components/loginComponents/Pager";
import { useDispatch, useSelector } from "react-redux";
import {
  pushFavourites,
  removeFavourite,
} from "../hooks/favourites/favouritesSlice";
import { addToCart } from "../hooks/cartSlice";

const SORT_FIELDS = [
  { value: "createdAt", label: "Newest" },
  { value: "price", label: "Price" },
  { value: "title", label: "Alphabetical" },
];

export default function Courses() {
  const [q, setQ] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [dir, setDir] = useState("desc");
  const [pageSize, setPageSize] = useState(6);

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const cart = useSelector((state) => state.cart.items);

  const {
    data: all = [],
    isLoading,
    isError,
    error,
  } = useCoursesSorted({
    sortBy,
    dir,
    qText: q,
    status: "published",
  });

  const list = useMemo(() => all, [all]);

  const {
    paginatedData,
    currentPage,
    totalPages,
    setPage,
    nextPage,
    prevPage,
    rangeStart,
    rangeEnd,
    totalItems,
  } = usePagination(list, pageSize);

  const handleToggleFavorite = (course) => {
    const exists = favorites.find((f) => f.id === course.id);
    if (exists) {
      dispatch(removeFavourite(course.id));
    } else {
      const serializedCourse = {
        ...course,
        createdAt: course.createdAt?.seconds
          ? course.createdAt.seconds * 1000
          : course.createdAt,
      };
      dispatch(pushFavourites(serializedCourse));
    }
  };

  const handleAddToCart = (course) => {
    dispatch(addToCart(course));
  };

  const glassButton =
    "rounded-xl px-3 py-2 backdrop-blur-md border border-white/20 text-white font-semibold shadow transition-all flex items-center justify-center gap-2 flex-1";

  return (
    <div className="relative text-white min-h-screen">
      {/* Background */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1400&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header + Filters */}
        <header className="mb-8 rounded-2xl border border-white/20 bg-white/5 p-6 shadow-xl backdrop-blur-md transition hover:shadow-cyan-500/20">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Courses
            </h1>

            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {/* Search */}
              <div className="relative">
                <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search by title…"
                  className="w-full rounded-xl border border-white/20 bg-white/10 py-2.5 pr-3 pl-9 text-sm text-white placeholder:text-gray-400 focus:border-[#49BBBD] focus:ring-2 focus:ring-[#49BBBD]/20 focus:outline-none transition"
                />
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white shadow-sm focus:border-[#49BBBD] focus:ring-2 focus:ring-[#49BBBD]/20 focus:outline-none transition"
              >
                {SORT_FIELDS.map((s) => (
                  <option key={s.value} value={s.value} className="text-black">
                    Sort: {s.label}
                  </option>
                ))}
              </select>

              {/* Direction */}
              <button
                onClick={() => setDir((d) => (d === "asc" ? "desc" : "asc"))}
                className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white hover:bg-[#49BBBD]/10 transition flex items-center justify-center gap-2"
                title={`Direction: ${dir.toUpperCase()}`}
              >
                {dir === "asc" ? <FiArrowUp /> : <FiArrowDown />}
                <span>{dir === "asc" ? "Ascending" : "Descending"}</span>
              </button>

              {/* Page Size */}
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white shadow-sm focus:border-[#49bd4f] focus:ring-2 focus:ring-[#49BBBD]/20 focus:outline-none transition"
              >
                {[4, 8, 12, 24].map((n) => (
                  <option key={n} value={n} className="text-black">
                    {n} / page
                  </option>
                ))}
              </select>
            </div>
          </div>
        </header>

        {/* Courses Grid */}
        {isLoading && <GridSkeleton count={pageSize} />}
        {isError && (
          <div className="rounded-lg border border-rose-500 bg-rose-900/50 p-4 text-rose-300">
            Failed to load courses. {error?.message}
          </div>
        )}
        {!isLoading && !isError && list.length === 0 && (
          <div className="rounded-lg border border-white/20 bg-white/10 p-8 text-center text-white/70">
            No courses match your filters.
          </div>
        )}

        {!isLoading && !isError && list.length > 0 && (
          <>
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedData.map((c) => {
                const isFavorite = favorites.some((f) => f.id === c.id);
                const inCart = cart.some((i) => i.id === c.id);

                return (
                  <li
                    key={c.id}
                    className="group overflow-hidden rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl transition hover:shadow-cyan-500/20 duration-300"
                  >
                    {c.thumbnailUrl ? (
                      <img
                        src={c.thumbnailUrl}
                        alt={c.title}
                        className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="grid h-48 w-full place-items-center bg-white/10 text-xs text-white/50">
                        No image
                      </div>
                    )}

                    <div className="p-5 flex flex-col justify-between min-h-[200px]">
                      <div>
                        <h3 className="line-clamp-1 text-lg font-semibold text-white">
                          {c.title}
                        </h3>
                        <p className="mt-2 line-clamp-2 text-sm text-white/70">
                          {c.description}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-base font-medium text-white">
                          {Number(c.price || 0).toLocaleString()}{" "}
                          <span className="text-white/50">
                            {c.currency || "USD"}
                          </span>
                        </span>
                      </div>

                      {/* Buttons Horizontal */}
                      <div className="mt-4 flex items-center gap-3">
                        {/* Favorite Button */}
                        <button
                          onClick={() => handleToggleFavorite(c)}
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:text-red-500"
                        >
                          <FiHeart
                            size={20}
                            className={
                              isFavorite ? "text-red-500" : "text-white"
                            }
                          />
                        </button>

                        {/* Add to Cart */}
                        <button
                          onClick={() => handleAddToCart(c)}
                          disabled={inCart}
                          className={`flex-1 h-10 rounded-xl border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-[#49BBBD]/20 ${
                            inCart
                              ? "bg-gray-500 border-gray-500 cursor-not-allowed text-white"
                              : ""
                          }`}
                        >
                          <div className="flex items-center justify-center gap-2">
                            <FiShoppingCart size={18} />
                            {inCart ? "In Cart" : "Add to Cart"}
                          </div>
                        </button>

                        {/* View Link */}
                        <Link
                          to={`/courses/${c.id}`}
                          className="flex-1 h-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/20 flex"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8">
              <Pager
                currentPage={currentPage}
                totalPages={totalPages}
                onPrev={prevPage}
                onNext={nextPage}
                onGo={setPage}
                rangeStart={rangeStart}
                rangeEnd={rangeEnd}
                totalItems={totalItems}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function GridSkeleton({ count = 12 }) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 ">
      {Array.from({ length: count }).map((_, i) => (
        <li
          key={i}
          className="h-64 animate-pulse rounded-xl bg-white/10 backdrop-blur"
        />
      ))}
    </ul>
  );
}
