import React from "react";
import { useSelector } from "react-redux";

export default function Checkout() {
  const { items } = useSelector((state) => state.cart);
  const total = items.reduce((sum, c) => sum + c.price, 0);

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

      <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="bg-white/5 border border-white/20 rounded-2xl shadow-xl backdrop-blur-md p-8">
          <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>

          {items.length === 0 ? (
            <p className="text-gray-400 text-lg text-center">
              No items in your cart.
            </p>
          ) : (
            <div className="space-y-6">
              <ul className="divide-y divide-white/10">
                {items.map((course) => (
                  <li
                    key={course.id}
                    className="py-4 flex justify-between items-center"
                  >
                    <span className="text-white font-medium">
                      {course.title}
                    </span>
                    <span className="text-gray-300">
                      ${Number(course.price || 0).toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex justify-between text-xl font-semibold text-white mt-4">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button
                onClick={() => alert("Payment Success 🎉")}
                className="w-full rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold py-3 transition-all shadow-lg"
              >
                Pay Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
