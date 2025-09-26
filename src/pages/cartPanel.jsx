import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, clearCart } from "../hooks/cartSlice";
import { Link } from "react-router-dom";

export default function CartPanel() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const glassButton =
    "rounded-xl px-4 py-2 backdrop-blur-md border border-white/20 text-white font-semibold shadow hover:brightness-110 transition-all";

  const glassButtonBuy =
    "flex items-center gap-2 rounded-xl px-4 py-2 backdrop-blur-md bg-cyan-600/70 border border-white/20 text-white font-semibold shadow hover:bg-cyan-600/50 transition-all";

  // حساب السعر الكلي
  const totalPrice = items.reduce((sum, item) => sum + (item.price || 0), 0);

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

      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="bg-white/5 border border-white/20 rounded-2xl shadow-xl backdrop-blur-md p-8">
          <h1 className="text-3xl font-bold text-white mb-6">Cart</h1>

          {items.length === 0 ? (
            <p className="text-gray-400 text-lg text-center">
              Your cart is empty.
            </p>
          ) : (
            <>
              <ul className="divide-y divide-white/10">
                {items.map((course) => (
                  <li
                    key={course.id}
                    className="py-4 flex flex-col md:flex-row items-center gap-4"
                  >
                    <img
                      src={
                        course.thumbnailUrl || "https://via.placeholder.com/150"
                      }
                      alt={course.title}
                      className="w-40 h-40 rounded-lg object-cover"
                    />
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-lg font-semibold text-white">
                        {course.title}
                      </h3>
                      <p className="text-gray-300 text-sm">
                        ${Number(course.price || 0).toLocaleString()} USD
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemove(course.id)}
                      className={`${glassButton} bg-red-600 hover:bg-red-500`}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>

              {/* Total + Actions */}
              <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-white font-semibold text-lg">
                  Total: ${totalPrice.toLocaleString()} USD
                </div>

                <div className="flex gap-4 flex-wrap">
                  <button
                    onClick={() => dispatch(clearCart())}
                    className={`${glassButton} bg-red-600 hover:bg-red-500`}
                  >
                    Clear Cart
                  </button>
                  <Link to="/checkout" className={glassButtonBuy}>
                    Checkout
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
