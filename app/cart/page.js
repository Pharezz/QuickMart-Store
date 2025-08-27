"use client";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { items, removeFromCart, clearCart, total, increaseQty, decreaseQty } =
    useCart();

  return (
    <div className="flex flex-col justify-center min-h-screen p-4 sm:p-6">
      <div className="w-full max-w-2xl mx-auto border rounded-xl border-gray-300 p-4 sm:p-5">
        <h1 className="text-xl sm:text-2xl font-bold mb-4">Your Cart</h1>

        {items.length === 0 ? (
          <p className="text-sm sm:text-base">Your cart is empty.</p>
        ) : (
          <div>
            {items.map((item) => (
              <div
                key={item._id}
                className="flex flex-col border-b border-gray-400 pb-6 sm:pb-8 gap-4"
              >
                {/* ✅ Main cart line */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded mx-auto sm:mx-0"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-xs text-gray-500 mx-auto sm:mx-0">
                      No Img
                    </div>
                  )}

                  <div className="flex-1 text-center sm:text-left">
                    <span className="font-medium">{item.title}</span>
                  </div>

                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    {/* If it’s a surprise box, don’t allow qty editing */}
                    {item.surpriseItems ? (
                      <span className="px-2 font-semibold">x1</span>
                    ) : (
                      <>
                        <button
                          onClick={() => decreaseQty(item._id)}
                          className="px-2 py-1 border rounded hover:bg-gray-200 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-2">{item.qty}</span>
                        <button
                          onClick={() => increaseQty(item._id)}
                          className="px-2 py-1 border rounded hover:bg-gray-200 cursor-pointer"
                        >
                          +
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* ✅ Reveal Surprise Box contents */}
                {item.surpriseItems && (
                  <div className="pl-2 sm:pl-6 text-sm text-gray-700">
                    <p className="font-medium mb-2">Includes:</p>
                    <ul className="list-disc pl-4 space-y-2">
                      {item.surpriseItems.map((si) => (
                        <li key={si._id} className="flex items-center gap-2">
                          {si.image ? (
                            <img
                              src={si.image}
                              alt={si.title}
                              className="w-8 h-8 object-cover rounded"
                            />
                          ) : (
                            <div className="w-8 h-8 bg-gray-200"></div>
                          )}
                          {si.title} – ₦{si.price}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3 text-green-600 font-semibold text-center sm:text-left">
                      🎉 5% Discount applied!
                    </p>
                  </div>
                )}
              </div>
            ))}

            {/* ✅ Total */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-2">
              <span className="text-base sm:text-lg font-bold">Total:</span>
              <span className="text-base sm:text-lg font-bold">₦{total}</span>
            </div>

            {/* ✅ Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
              <button
                className="btn bg-gray-600 hover:bg-gray-700 cursor-pointer transition-colors text-white w-full sm:w-1/2 px-4 py-2 rounded-lg"
                onClick={clearCart}
              >
                Clear Cart
              </button>
              <Link href="/checkout" className="w-full sm:w-1/2">
                <button className="btn w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer">
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
