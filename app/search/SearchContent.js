"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";

export default function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    if (query) {
      setLoading(true);
      setError("");
      fetch(`/api/products?q=${encodeURIComponent(query)}`)
        .then(async (res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch products");
          }
          return res.json();
        })
        .then((data) => {
          if (data.length === 0) {
            setError("No products found matching your search.");
          }
          setResults(data);
        })
        .catch(() => {
          setError("Something went wrong. Please try again.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [query]);

  return (
    <div className="container px-4 sm:px-6 lg:px-8 py-8 mx-auto">
      <h1 className="text-lg sm:text-2xl font-bold mb-6 text-center sm:text-left">
        Search Results for:{" "}
        <span className="text-indigo-600 break-words">{query}</span>
      </h1>

      {loading && (
        <p className="text-gray-500 text-center sm:text-left">Loading...</p>
      )}
      {error && (
        <p className="text-red-600 font-medium text-center sm:text-left">
          {error}
        </p>
      )}

      {!loading && !error && results.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {results.map((p) => (
            <div
              key={p._id}
              className="border rounded-lg p-4 shadow-md hover:shadow-lg transition flex flex-col"
            >
              {p.image && (
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-40 w-full object-cover rounded mb-3"
                />
              )}
              <h3 className="font-semibold text-base sm:text-lg break-words">
                {p.title}
              </h3>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2 break-words">
                {p.description}
              </p>
              <p className="text-green-700 font-bold mb-3">₦{p.price}</p>
              <button
                onClick={() => {
                  addToCart(p);
                  toast.success("item added to cart successfully!");
                }}
                className="mt-auto bg-indigo-600 text-white px-3 sm:px-4 py-2 rounded-lg cursor-pointer hover:bg-indigo-700 transition-colors text-sm sm:text-base"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
