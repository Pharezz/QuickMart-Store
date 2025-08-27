// components/AddToCartButton.js
"use client";

import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";

export default function AddToCartButton({ product }) {
  const { addToCart } = useCart();

  function handleAdd(e) {
    addToCart(product);
    toast.success("Item added to cart successfully!");

    e.preventDefault(); // Optional: stops navigation entirely
  }

  return (
    <button
      className="btn bg-gray-600 text-white hover:bg-gray-700 transition-colors rounded cursor-pointer"
      onClick={handleAdd}
    >
      Add to Cart
    </button>
  );
}
