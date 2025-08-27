// lib/adminAuth.js
export async function isAdminFromCookies(cookieStore) {
  const adminCookie = cookieStore.get("admin");
  return adminCookie?.value === "true";
}
