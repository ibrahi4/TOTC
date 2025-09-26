import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  pushFavourites,
  removeFavourite,
  clearFavourites,
} from "../hooks/favourites/favouritesSlice";
import { addToCart } from "../hooks/cartSlice";
import { Link, useNavigate } from "react-router-dom"; // ⬅️ استدعاء useNavigate
import { FiTrash2, FiArrowLeft, FiShoppingCart } from "react-icons/fi";

export default function Favorites() {
  const favorites = useSelector((state) => state.favorites);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ⬅️ هنا

  const handleBuyNow = (item) => {
    const exists = cart.items.find((i) => i.id === item.id);
    if (!exists) dispatch(addToCart(item));
    navigate("/checkout"); // ⬅️ بعد الإضافة يروح صفحة checkout
  };

  return (
    <div className="relative min-h-screen text-white">
      {/* Background Image + Overlay */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1400&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </div>

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold">My Favorites</h1>
          {favorites.length > 0 && (
            <button
              onClick={() => dispatch(clearFavourites())}
              className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold shadow hover:bg-red-600 transition"
            >
              Clear All
            </button>
          )}
        </header>

        {favorites.length === 0 ? (
          <div className="rounded-xl border border-white/20 bg-white/10 p-8 text-center">
            <p className="mb-4 text-white/70">No favorites yet.</p>
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 rounded-xl bg-[#49BBBD] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-[#3a9b9d] transition"
            >
              <FiArrowLeft /> Browse Courses
            </Link>
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map((item) => (
              <li
                key={item.id}
                className="rounded-2xl border border-white/20 bg-white/5 p-4 shadow-xl backdrop-blur-md flex flex-col justify-between"
              >
                {item.thumbnailUrl ? (
                  <img
                    src={item.thumbnailUrl}
                    alt={item.title}
                    className="h-40 w-full rounded-lg object-cover"
                  />
                ) : (
                  <div className="grid h-40 w-full place-items-center bg-white/10 text-white/50">
                    No Image
                  </div>
                )}

                <div className="mt-4 flex flex-col flex-1 justify-between">
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-sm text-white/70">{item.description}</p>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {item.price} {item.currency || "USD"}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => dispatch(removeFavourite(item.id))}
                        className="text-red-400 hover:text-red-600"
                        title="Remove from Favorites"
                      >
                        <FiTrash2 size={18} />
                      </button>

                      <button
                        onClick={() => handleBuyNow(item)}
                        className="flex items-center gap-1 rounded-xl bg-cyan-600 px-3 py-1 text-sm font-semibold text-white hover:bg-cyan-700 transition"
                        title="Buy Now"
                      >
                        <FiShoppingCart size={16} /> Buy
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
