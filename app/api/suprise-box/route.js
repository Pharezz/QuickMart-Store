// app/api/surprise-box/route.js
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product"; // assuming you have this model

export async function GET() {
  await connectDB();

  // ✅ Only grab in-stock products
  const products = await Product.find({ inStock: true });

  if (products.length < 5) {
    return Response.json(
      { error: "Not enough products in stock for a Surprise Box" },
      { status: 400 }
    );
  }

  // ✅ Pick 5 random products
  const shuffled = products.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 5);

  // Calculate pricing
  const originalTotal = selected.reduce((sum, p) => sum + p.price, 0);
  const discountedTotal = (originalTotal * 0.95).toFixed(2); // 5% off

  return Response.json({
    title: "🎁 Surprise Box",
    items: selected.map((p) => ({
      _id: p._id.toString(),
      title: p.title,
      price: p.price,
      image: p.image || null,
    })),
    originalTotal,
    discountedTotal,
  });
}
