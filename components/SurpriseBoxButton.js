"use client";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";

export default function SurpriseBoxButton({ products }) {
  const { addToCart } = useCart();

  const handleAddSurpriseBox = () => {
    if (!products || products.length < 5) {
      alert("Not enough products available to create a Surprise Box.");
      return;
    }

    // Shuffle & pick 5 random items
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 5);

    // Calculate discount (5% off total)
    const originalTotal = selected.reduce((sum, p) => sum + p.price, 0);
    const discountedPrice = Math.round(originalTotal * 0.95);

    // ✅ Generate unique id for each surprise box
    const uniqueId = "surprise-box-" + Date.now() + "-" + Math.floor(Math.random() * 1000);

    // Add to cart as a "bundle"
    addToCart({
      _id: uniqueId,
      title: "🎁 Surprise Box (5 Items)",
      qty: 1,
      price: discountedPrice,
      image: "/mystery-box.jpg",
      surpriseItems: selected, // keep track of which products are inside
    });

    toast.success("🎉 Added! Unbox in cart!");
  };

  return (
    <button
      onClick={handleAddSurpriseBox}
      className="bg-pink-600 text-white px-6 py-3 rounded-full font-semibold cursor-pointer shadow-md hover:bg-pink-700 transition"
    >
      🎁 Get a Surprise Box
    </button>
  );
}
