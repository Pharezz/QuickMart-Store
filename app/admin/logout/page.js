"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/"); // back to homepage after logout
    };
    logout();
  }, [router]);

  return <p className="p-6 text-center">Logging out...</p>;
}
