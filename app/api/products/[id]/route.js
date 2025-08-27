// app/api/products/[id]/route.js
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { cookies } from "next/headers";
import { isAdminFromCookies } from "@/lib/adminAuth";
import mongoose from "mongoose";

export const dynamic = "force-dynamic";

export async function GET(_, { params }) {
  await connectDB();

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(params.id)) {
    return new Response("Invalid product ID", { status: 400 });
  }

  const product = await Product.findById(params.id);
  if (!product) return new Response("Not found", { status: 404 });
  return Response.json(product);
}

export async function PUT(req, { params }) {
  await connectDB();

  const cookieStore = await cookies(); // ✅ await cookies
  if (!(await isAdminFromCookies(cookieStore))) // ✅ await the helper
    return new Response("Unauthorized", { status: 401 });

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(params.id)) {
    return new Response("Invalid product ID", { status: 400 });
  }

  const data = await req.json();
  const updated = await Product.findByIdAndUpdate(params.id, data, { new: true });
  return Response.json(updated);
}

export async function DELETE(_, { params }) {
  await connectDB();

  const cookieStore = await cookies(); // ✅ await cookies
  if (!(await isAdminFromCookies(cookieStore))) // ✅ await the helper
    return new Response("Unauthorized", { status: 401 });

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(params.id)) {
    return new Response("Invalid product ID", { status: 400 });
  }

  await Product.findByIdAndDelete(params.id);
  return new Response(null, { status: 204 });
}
