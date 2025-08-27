// app/api/admin/check/route.js
import { cookies } from "next/headers";

export async function GET() {
  const admin = cookies().get("admin")?.value === "true";
  return Response.json({ isAdmin: admin });
}
