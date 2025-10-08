// app/api/test-db/route.js
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  try {
    await connectDB();
    return Response.json({ ok: true, message: "DB connected successfully" });
  } catch (e) {
    return Response.json({ ok: false, error: e.message }, { status: 500 });
  }
}
