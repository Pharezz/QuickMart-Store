// components/Navbar.js
"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaSearch, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useCart } from "@/context/CartContext";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const { count } = useCart();
  const pathname = usePathname();
  const router = useRouter();

  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // ✅ hamburger toggle state

  // Check admin cookie
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await fetch("/api/admin/check", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setIsAdmin(Boolean(data.isAdmin));
        } else {
          setIsAdmin(false);
        }
      } catch (err) {
        console.error("Admin check failed", err);
        setIsAdmin(false);
      }
    };
    checkAdmin();
  }, [pathname]);

  const linkClasses = (path) =>
    `text-md transition-all duration-300 ease-in-out ${
      pathname === path
        ? "text-indigo-300 font-semibold border-b-2 border-indigo-300"
        : "text-gray-300 hover:text-indigo-300 hover:border-b-2 hover:border-indigo-300"
    }`;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
      setSearchQuery("");
      setMenuOpen(false); // close menu after searching on mobile
    }
  };

  return (
    <header className="shadow bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-5 px-4">
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="font-medium text-2xl text-white">
            QuickMart
          </Link>
        </div>

        {/* Hamburger (mobile only) */}
        <button
          className="md:hidden p-2 text-gray-300 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex flex-1 justify-center">
          {!isAdmin ? (
            <div className="flex items-center space-x-8">
              <Link href="/" className={linkClasses("/")}>
                Home
              </Link>
              <Link href="/products" className={linkClasses("/products")}>
                Shop
              </Link>
              <Link href="/search" className={linkClasses("/search")}>
                Search
              </Link>
              <Link href="/contact" className={linkClasses("/contact")}>
                Contact
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-8">
              <Link
                href="/admin/dashboard"
                className={linkClasses("/admin/dashboard")}
              >
                Dashboard
              </Link>
              <Link
                href="/admin/orders"
                className={linkClasses("/admin/orders")}
              >
                Orders
              </Link>
              <Link href="/" className={linkClasses("/")}>
                Go to Site
              </Link>
            </div>
          )}
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center ml-auto space-x-4">
          {showSearch ? (
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-3 py-2 rounded-lg border outline-0 border-gray-300 bg-white text-gray-800 text-sm"
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white px-3 py-1 rounded-lg"
              >
                Go
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowSearch(false);
                  setSearchQuery("");
                }}
                className="text-sm px-2 py-1 rounded-md text-gray-300 hover:text-white"
              >
                ✕
              </button>
            </form>
          ) : (
            !isAdmin && (
              <button
                onClick={() => setShowSearch(true)}
                className="p-1 rounded hover:bg-gray-800"
                aria-label="Open search"
              >
                <FaSearch className="text-lg cursor-pointer" />
              </button>
            )
          )}

          {!isAdmin && (
            <Link
              href={"/cart"}
              className="relative p-1 rounded hover:bg-gray-800"
              aria-label="Cart"
            >
              <FaShoppingCart className="text-lg cursor-pointer" />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>
          )}

          {!isAdmin ? (
            <Link
              href={"/admin/login"}
              className="px-3 py-1 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-500 transition"
            >
              Admin Login
            </Link>
          ) : (
            <Link
              href={"/admin/logout"}
              className="px-6 py-1 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-500 transition"
            >
              Logout
            </Link>
          )}
        </div>
      </div>

      {/* ✅ Mobile Menu (dropdown under header) */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 px-4 py-4 flex flex-col items-start gap-5">
          {!isAdmin ? (
            <>
              <Link
                href="/"
                className={linkClasses("/")}
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/products"
                className={linkClasses("/products")}
                onClick={() => setMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                href="/search"
                className={linkClasses("/search")}
                onClick={() => setMenuOpen(false)}
              >
                Search
              </Link>
              <Link
                href="/contact"
                className={linkClasses("/contact")}
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/admin/dashboard"
                className={linkClasses("/admin/dashboard")}
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/admin/orders"
                className={linkClasses("/admin/orders")}
                onClick={() => setMenuOpen(false)}
              >
                Orders
              </Link>
              <Link
                href="/"
                className={linkClasses("/")}
                onClick={() => setMenuOpen(false)}
              >
                Go to Site
              </Link>
            </>
          )}

          {/* Mobile Actions */}
          {/* {!isAdmin && (
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="flex items-center space-x-2 text-gray-300 hover:text-indigo-300"
            >
              <FaSearch />
              <span>Search</span>
            </button>
          )} */}

          {!isAdmin && (
            <Link
              href={"/cart"}
              onClick={() => setMenuOpen(false)}
              className="flex items-center space-x-2 text-gray-300 hover:text-indigo-300"
            >
              <FaShoppingCart />
              <span>Cart {count > 0 && `(${count})`}</span>
            </Link>
          )}

          {!isAdmin ? (
            <Link
              href={"/admin/login"}
              onClick={() => setMenuOpen(false)}
              className="block px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-500 transition w-full"
            >
              Admin Login
            </Link>
          ) : (
            <Link
              href={"/admin/logout"}
              onClick={() => setMenuOpen(false)}
              className="block px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-500 transition w-full"
            >
              Logout
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
