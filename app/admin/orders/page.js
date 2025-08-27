"use client";

import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch("/api/orders")
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch orders");
        return res.json();
      })
      .then(setOrders)
      .catch(() => setError("Unable to load orders. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-indigo-700">
        Orders
      </h1>

      {loading && <p className="text-gray-500 text-sm sm:text-base">Loading orders...</p>}
      {error && <p className="text-red-600 text-sm sm:text-base">{error}</p>}

      {!loading && !error && orders.length === 0 && (
        <p className="text-gray-600 text-sm sm:text-base">
          No orders have been placed yet.
        </p>
      )}

      {!loading && !error && orders.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 shadow-md rounded-lg text-sm sm:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 sm:py-3 px-3 sm:px-4 text-left">Order ID</th>
                <th className="py-2 sm:py-3 px-3 sm:px-4 text-left">Items</th>
                <th className="py-2 sm:py-3 px-3 sm:px-4 text-left">Total (₦)</th>
                <th className="py-2 sm:py-3 px-3 sm:px-4 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="py-2 sm:py-3 px-3 sm:px-4 font-mono text-xs sm:text-sm">
                    {order._id}
                  </td>
                  <td className="py-2 sm:py-3 px-3 sm:px-4">
                    <ul className="list-disc list-inside text-xs sm:text-sm space-y-1">
                      {order.items.map((item, idx) => (
                        <li key={idx}>
                          {item.title} × {item.quantity} — ₦{item.price}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-2 sm:py-3 px-3 sm:px-4 font-semibold text-green-700 text-sm sm:text-base">
                    ₦{order.total}
                  </td>
                  <td className="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
