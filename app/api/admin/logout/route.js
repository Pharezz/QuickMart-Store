// app/api/admin/logout/route.js
import { cookies } from "next/headers";


export async function POST() {
cookies().set("admin", "", { httpOnly: true, path: "/", maxAge: 0 });
return Response.json({ success: true });
}