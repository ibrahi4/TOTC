// src/pages/CourseDetails.jsx
import { useParams, Link } from "react-router-dom";
import { useCourse } from "../hooks/useCourse";
import { useDispatch, useSelector } from "react-redux";
import {
  pushFavourites,
  removeFavourite,
} from "../hooks/favourites/favouritesSlice";
import { addToCart } from "../hooks/cartSlice";
import { FiHeart, FiShoppingCart, FiArrowLeft } from "react-icons/fi";
import React from "react";

export default function CourseDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const cart = useSelector((state) => state.cart.items);

  const { data: course, isLoading, isError, error } = useCourse(id);

  const isFavorite = favorites.some((f) => f.id === id);
  const inCart = cart.some((c) => c.id === id);

  const handleToggleFavorite = () => {
    if (!course) return;
    if (isFavorite) dispatch(removeFavourite(id));
    else dispatch(pushFavourites(course));
  };

  const handleAddToCart = () => {
    if (!course || inCart) return;
    dispatch(addToCart(course));
  };

  if (isLoading) return <LoadingPlaceholder />;
  if (isError) return <ErrorPlaceholder message={error?.message} />;
  if (!course) return <ErrorPlaceholder message="Course not found." />;

  return (
    <div className="relative min-h-screen text-white px-4 py-12 sm:px-6 lg:px-8">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1400&q=80')",
        }}
      ></div>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      {/* Breadcrumb / Back */}
      <div className="mb-6">
        <Link
          to="/courses"
          className="inline-flex items-center gap-1 text-sm text-[#49BBBD] hover:underline"
        >
          <FiArrowLeft /> Back to Courses
        </Link>
      </div>

      <div className="mx-auto max-w-5xl rounded-2xl bg-white/5 backdrop-blur-md border border-white/20 shadow-xl overflow-hidden">
        {/* Thumbnail */}
        <div className="relative ">
          {course.thumbnailUrl ? (
            <img
              src={course.thumbnailUrl}
              alt={course.title}
              className="h-96 w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <div className="grid h-96 w-full place-items-center bg-white/10 text-white/50 text-lg">
              No image available
            </div>
          )}

          {/* Overlay CTA Buttons */}
          <div className="absolute bottom-4 right-4 flex flex-wrap gap-2">
            <button
              onClick={handleToggleFavorite}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold backdrop-blur-md border border-white/20 transition ${
                isFavorite
                  ? "bg-red-500 border-red-500 hover:bg-red-600"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              <FiHeart /> {isFavorite ? "Favorited" : "Add to Fav"}
            </button>

            <button
              onClick={handleAddToCart}
              disabled={inCart}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold backdrop-blur-md border border-white/20 transition ${
                inCart
                  ? "bg-gray-500 border-gray-500 cursor-not-allowed"
                  : "bg-white/10 hover:bg-[#49BBBD]/20"
              }`}
            >
              <FiShoppingCart /> {inCart ? "In Cart" : "Add to Cart"}
            </button>
          </div>
        </div>

        {/* Course Info */}
        <div className="p-8 space-y-6">
          <h1 className="text-3xl font-bold text-white">{course.title}</h1>
          <p className="text-white/80">{course.description}</p>

          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span className="rounded-full bg-[#49BBBD]/20 px-4 py-1 font-medium text-[#49BBBD]">
              Price: {Number(course.price || 0).toLocaleString()}{" "}
              {course.currency || "USD"}
            </span>

            {course.category && (
              <span className="rounded-full bg-white/10 px-4 py-1 text-white/80">
                Category: {course.category}
              </span>
            )}

            {course.createdAt && (
              <span className="text-white/60">
                Created: {new Date(course.createdAt).toLocaleDateString()}
              </span>
            )}
          </div>

          {course.instructor && (
            <div className="mt-4 border-t border-white/20 pt-4 text-sm text-white/80">
              <p>
                <strong>Instructor:</strong> {course.instructor}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Loading Skeleton
function LoadingPlaceholder() {
  return (
    <div className="mx-auto max-w-3xl p-6 text-center text-white/70">
      Loading course...
    </div>
  );
}

// Error Placeholder
function ErrorPlaceholder({ message }) {
  return (
    <div className="mx-auto max-w-3xl p-6 text-center text-red-500">
      {message}
    </div>
  );
}
