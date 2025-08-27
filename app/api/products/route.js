// app/api/products/route.js
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { cookies } from "next/headers";
import { isAdminFromCookies } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q"); // 👈 query string

    let products;

    if (q) {
      // Case-insensitive search in title or description
      products = await Product.find({
        $or: [
          { title: { $regex: q, $options: "i" } },
          { description: { $regex: q, $options: "i" } },
        ],
      }).sort({ createdAt: -1 });
    } else {
      products = await Product.find().sort({ createdAt: -1 });
    }

    return Response.json(products);
  } catch (error) {
    console.error("GET /api/products error:", error);
    return Response.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const cookieStore = await cookies();
    if (!(await isAdminFromCookies(cookieStore)))
      return new Response("Unauthorized", { status: 401 });

    const body = await req.json();
    const { title, price, description, image } = body;

    if (!title || !price || !description) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400 }
      );
    }

    const created = await Product.create({
      title,
      price,
      description,
      image: image || "",
    });

    return Response.json(created, { status: 201 });
  } catch (error) {
    console.error("POST /api/products error:", error.message, error.stack);
    return Response.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}
