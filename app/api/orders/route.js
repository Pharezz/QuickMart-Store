// app/api/orders/route.js
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    console.log("📦 Incoming order:", body);

    // validate required fields
    if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
      return Response.json({ error: "No items in order" }, { status: 400 });
    }
    const order = await Order.create({
      items: body.items,
      total: body.total,
    });
    return Response.json(order, { status: 201 });
  } catch (error) {
    console.error("❌ Order creation failed:", err);
    return Response.json(
      { error: "Order creation failed", details: err.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Optional: expose for admin dashboard later
  await connectDB();
  const orders = await Order.find().sort({ createdAt: -1 });
  return Response.json(orders);
}
