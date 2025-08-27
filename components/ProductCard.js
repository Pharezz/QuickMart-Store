"use client";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";

export default function ProductCard({ product }) {
  return (
    <Link
      href={`/product/${product._id}`}
      className="font-semibold"
    >
      <div className="card cursor-pointer flex flex-col">
        {product.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt={product.title}
            className="h-40 w-full rounded-t-lg object-cover"
          />
        ) : (
          <div className="h-40 cursp w-full bg-gray-100 grid place-items-center rounded-t-lg">
            No Image
          </div>
        )}
        <div className="p-4">
          <div className="flex-1">
            {product.title}
            <div className="text-sm text-gray-500 truncate line-clamp-2">
              {product.description}
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="font-semibold text-green-600">
              ₦{product.price}
            </span>
            <AddToCartButton product={product} />{" "}
            {/* ✅ Replaced inline button */}
          </div>
        </div>
      </div>
    </Link>
  );
}
