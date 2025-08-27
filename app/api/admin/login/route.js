// app/api/admin/login/route.js
import { cookies } from "next/headers";


export async function POST(req) {
const { username, password } = await req.json();
const ok = username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD;
if (!ok) return new Response("Invalid credentials", { status: 401 });
cookies().set("admin", "true", { httpOnly: true, path: "/", maxAge: 60 * 60 * 6 }); // 6h session
return Response.json({ success: true });
}