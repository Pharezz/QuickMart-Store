"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useState } from "react";

export default function CheckoutPage() {
  const { items, clearCart, total } = useCart();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // customer form state
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);

      const orderItems = [];
      for (const item of items) {
        if (
          item.surpriseItems &&
          Array.isArray(item.surpriseItems) &&
          item.surpriseItems.length > 0
        ) {
          item.surpriseItems.forEach((si) => {
            orderItems.push({
              productId: si._id,
              title: si.title,
              price: Number(si.price) || 0,
              qty: 1,
              fromBundle: true,
            });
          });
        } else {
          orderItems.push({
            productId: item._id,
            title: item.title,
            price: Number(item.price) || 0,
            qty: Number(item.qty) || 1,
          });
        }
      }

      if (!orderItems.length) {
        alert("Your cart is empty.");
        setLoading(false);
        return;
      }
      if (
        !customer.name ||
        !customer.email ||
        !customer.address ||
        !customer.phone
      ) {
        alert("Please fill in your contact and delivery details.");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: orderItems,
          total: Number(total) || 0,
          customer,
        }),
      });

      if (!res.ok) {
        let errText = "Failed to place order";
        try {
          const errJson = await res.json();
          errText = errJson?.error || JSON.stringify(errJson) || errText;
        } catch (e) {
          errText = await res.text().catch(() => errText);
        }
        console.error("Order API error:", res.status, errText);
        alert("Something went wrong placing your order. Please try again.");
        setLoading(false);
        return;
      }

      setSuccess(true);
      clearCart();
    } catch (err) {
      console.error("Place order exception:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto p-4 text-center flex flex-col justify-center min-h-screen items-center">
        <h1 className="text-2xl font-bold mb-4">✅ Order Placed Successfully!</h1>
        <p className="mb-4">Thank you for shopping with us.</p>
        <Link href="/products" className="text-indigo-600 hover:underline">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const totalItems = items.reduce(
    (sum, item) => sum + (Number(item.qty) || 1),
    0
  );

  return (
    <div className="max-w-2xl mx-auto p-4 border rounded-xl border-gray-300 shadow mt-6 sm:mt-10">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">
        Checkout{" "}
        <span className="text-gray-500 text-base sm:text-lg">
          ({totalItems} items)
        </span>
      </h1>

      {items.length === 0 ? (
        <p className="text-sm sm:text-base">
          Your cart is empty.{" "}
          <Link href="/products" className="text-indigo-700 hover:underline">
            Continue shopping
          </Link>
        </p>
      ) : (
        <>
          {/* Customer Info Form */}
          <div className="space-y-3 sm:space-y-4 mb-6">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={customer.name}
              onChange={handleInputChange}
              className="w-full border border-gray-400 outline-0 p-2 rounded text-sm sm:text-base"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={customer.email}
              onChange={handleInputChange}
              className="w-full border border-gray-400 outline-0 p-2 rounded text-sm sm:text-base"
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Delivery Address"
              value={customer.address}
              onChange={handleInputChange}
              className="w-full border border-gray-400 outline-0 p-2 rounded text-sm sm:text-base"
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={customer.phone}
              onChange={handleInputChange}
              className="w-full border border-gray-400 outline-0 p-2 rounded text-sm sm:text-base"
              required
            />
          </div>

          {/* Cart Items */}
          <ul className="divide-y">
            {items.map((item) => (
              <li
                key={item._id}
                className="py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2"
              >
                <div>
                  <div className="font-medium text-sm sm:text-base">{item.title}</div>
                  <div className="text-xs sm:text-sm text-gray-500">
                    ₦{item.price} × {item.qty}
                  </div>
                  {item.surpriseItems && (
                    <div className="text-xs sm:text-sm text-gray-600 mt-2">
                      <div className="font-medium">Surprise items:</div>
                      <ul className="list-disc pl-5">
                        {item.surpriseItems.map((si) => (
                          <li key={si._id}>
                            {si.title} — ₦{si.price}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="font-semibold text-sm sm:text-base">
                  ₦{item.price * item.qty}
                </div>
              </li>
            ))}
          </ul>

          {/* Total */}
          <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center font-semibold text-sm sm:text-base gap-2">
            <span>Total</span>
            <span>₦{total}</span>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="btn w-full mt-6 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 cursor-pointer text-sm sm:text-base"
          >
            {loading ? "Placing order..." : "Place Order"}
          </button>
        </>
      )}
    </div>
  );
}
