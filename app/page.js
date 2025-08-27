// app/page.js
import Link from "next/link";
import Image from "next/image";
import SurpriseBoxButton from "@/components/SurpriseBoxButton";

export default async function HomePage() {
  const baseUrl =
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/products`, {
    cache: "no-store",
  });
  const products = await res.json();

  const featured = Array.isArray(products) ? products.slice(0, 4) : [];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section>
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px]">
          <Image
            src="/heroimg.jpg"
            fill
            alt="Hero image"
            className="object-cover"
            priority
          />

          <div className="absolute inset-0 bg-black/60 z-5" />

          <div className="absolute inset-0 z-10 flex items-center justify-center flex-col px-4 text-center">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-gray-500 drop-shadow-[0_0_1px_black] mb-3 sm:mb-4 leading-tight">
              Shop Smarter, Live Better
            </h1>
            <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6 text-gray-500 drop-shadow-[0_0_1px_black] font-semibold max-w-xl">
              Your one-stop store for fashion, gadgets and essentials, all delivered
              to your doorstep.
            </p>
            <Link
              href="/products"
              className="bg-transparent font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-full border border-gray-500 text-gray-500 shadow-lg hover:scale-105 transition text-sm sm:text-base"
            >
              Shop Now →
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">
            Featured Products
          </h2>

          {featured.length === 0 ? (
            <p className="text-center text-gray-500 text-sm sm:text-base ">
              No products available
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {featured.map((p) => (
                <div
                  key={p._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg hover:-translate-y-1 transition "
                >
                  <div className="bg-gray-100 h-40 sm:h-48">
                    <img
                      src={p.image || "/placeholder.png"}
                      alt={p.title}
                      className="object-cover h-full w-full"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-base sm:text-lg truncate">
                      {p.title}
                    </h3>
                    <p className="text-gray-600 mb-2 text-sm sm:text-base">
                      ₦{p.price}
                    </p>
                    <Link
                      href={`/product/${p._id}`}
                      className="inline-block text-indigo-600 font-medium hover:underline text-sm sm:text-base"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-8 sm:mt-10">
            <Link
              href="/products"
              className="bg-gray-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold shadow-md hover:bg-gray-700 transition text-sm sm:text-base"
            >
              View All Products →
            </Link>
          </div>
        </div>
      </section>

      {/* 🎁 Surprise Box Section */}
      <section className="bg-pink-50 py-12 sm:py-16 px-4 sm:px-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-pink-700 mb-3 sm:mb-4">
          🎁 Try Our Surprise Box!
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto mb-5 sm:mb-6 text-sm sm:text-base">
          Get 5 randomly curated items from our store at <b>5% OFF</b> the total
          price. A fun way to shop and save!
        </p>
        <SurpriseBoxButton products={products} />
      </section>

      {/* Testimonials */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                name: "Amaka",
                text: "Amazing store! Got my order delivered fast and the quality is top-notch.",
              },
              {
                name: "Femi",
                text: "The gadgets are fire 🔥. Prices are affordable too!",
              },
              {
                name: "Chinedu",
                text: "Love shopping here... easy checkout and reliable service.",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-2xl shadow-md p-4 sm:p-6 hover:shadow-lg transition"
              >
                <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">
                  “{t.text}”
                </p>
                <h4 className="font-semibold text-indigo-700 text-sm sm:text-base">
                  — {t.name}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-gradient-from text-white py-12 sm:py-16 px-4 sm:px-6 text-center">
        <h2 className="text-2xl sm:text-3xl text-gray-800 font-bold mb-3 sm:mb-4">
          Stay Updated 📩
        </h2>
        <p className="mb-5 sm:mb-6 text-gray-800 text-sm sm:text-base">
          Subscribe to get the latest deals and product launches.
        </p>
        <form className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-lg mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:flex-1 border border-gray-400 px-3 sm:px-4 py-2.5 sm:py-3 outline-0 rounded-full text-black text-sm sm:text-base"
          />
          <button
            type="submit"
            className="bg-white text-indigo-700 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold border border-gray-300 hover:scale-105 transition text-sm sm:text-base"
          >
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
}
