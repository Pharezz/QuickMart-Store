// components/Footer.js
"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-6">
        
        {/* Brand / About */}
        <div>
          <h2 className="text-lg font-bold text-white">QuickMart</h2>
          <p className="text-sm mt-2">
            Quality products at the best prices. Shop with ease and convenience 🚀
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/products" className="hover:underline">Shop</Link></li>
            <li><Link href="/search" className="hover:underline">Search</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact us</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-2">Contact</h3>
          <p className="text-sm">Email: support@QuickMart.com</p>
          <p className="text-sm">Phone: +234 703 554 5577</p>
          <p className="text-sm">Address: Lagos, Nigeria</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 py-4 text-center text-sm">
        © {new Date().getFullYear()} QuickMart. All rights reserved.
      </div>
    </footer>
  );
}
