import AddToCartButton from "@/components/AddToCartButton";
import Link from "next/link";
import { headers } from "next/headers";


async function getProduct(id) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === "production"
      ? "https://" + process.env.VERCEL_URL
      : "http://localhost:3000");

  const res = await fetch(`${baseUrl}/api/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch product: ${res.status} ${res.statusText}`);
  }

  return res.json();
}
export default async function ProductPage({ params }) {
  let product;
  try {
    product = await getProduct(params.id);
  } catch (err) {
    console.error("❌ Error fetching product:", err);
    return (
      <div className="p-6 text-center">
        <h1 className="text-xl sm:text-2xl font-bold text-red-600">
          Product not found
        </h1>
        <p className="text-gray-500 text-sm sm:text-base">{err.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center mt-6 sm:mt-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-md sm:max-w-2xl lg:max-w-4xl gap-6 sm:gap-10 bg-white rounded-2xl shadow-lg p-4 sm:p-6 overflow-hidden">
        {/* Product Image */}
        <div className="flex justify-center items-center">
          {product.image ? (
            <img
              src={product.image}
              alt={product.title}
              className="w-full max-w-full h-auto max-h-[300px] sm:max-h-[400px] object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-[300px] sm:h-[400px] bg-gray-100 rounded-lg grid place-items-center text-gray-400 text-sm sm:text-base">
              No Image
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex border border-gray-300 p-4 sm:p-5 rounded-xl flex-col justify-between max-w-full">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-700 mb-3 sm:mb-4 break-words">
              {product.title}
            </h1>
            <p className="text-gray-500 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed border rounded-lg p-3 sm:p-5 border-gray-300 break-words">
              {product.description}
            </p>
          </div>

          <div className="mt-4 sm:mt-6 border p-3 sm:p-5 rounded-xl border-gray-300">
            <span className="text-xl sm:text-2xl font-bold text-green-600">
              ₦{product.price}
            </span>
            <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <AddToCartButton product={product} />

              {/* ✅ Checkout Button */}
              <Link
                href="/checkout"
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg shadow-md transition-colors duration-300 text-center"
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
