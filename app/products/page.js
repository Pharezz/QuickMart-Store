"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import SurpriseBoxButton from "@/components/SurpriseBoxButton";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then(setProducts)
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  return (
    <div className="container px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-xl sm:text-2xl text-center font-semibold mb-4">
        Explore Our Products
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-500 text-sm sm:text-base">
          No products available.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 pt-5">
            {products.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>

          {/* 🎁 Surprise Box Section */}
          <section className=" py-12 sm:py-16 px-4 sm:px-6 text-center mt-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-pink-700 mb-3 sm:mb-4">
              🎁 Try Our Surprise Box!
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto mb-5 sm:mb-6 text-sm sm:text-base">
              Get 5 randomly curated items from our store at <b>5% OFF</b> the
              total price. A fun way to shop and save!
            </p>
            <SurpriseBoxButton products={products} />
          </section>

          {/* ✅ Checkout Button */}
          <div className="flex justify-center mt-8 sm:mt-10">
            <Link
              href="/checkout"
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg shadow-md transition-colors duration-300 text-center"
            >
              Go to Checkout  →
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
