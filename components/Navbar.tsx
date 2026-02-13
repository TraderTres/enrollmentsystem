"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingCart, Globe, Bell, RotateCcw } from "lucide-react";
import { CartDrawer } from "./CartDrawer"; //

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem("isLoggedIn");
      setIsLoggedIn(authStatus === "true");
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  const handleMasterReset = () => {
    const confirmReset = confirm(
      "Willy, are you sure? All progress and settings will be deleted and reset to zero.",
    );
    if (confirmReset) {
      localStorage.clear();
      window.location.href = "/";
    }
  };

  return (
    <nav className="h-18 px-4 md:px-8 flex items-center gap-4 border-b bg-white sticky top-0 z-50">
      {/* Logo Section */}
      <Link href="/">
        <div className="shrink-0 font-bold text-2xl tracking-tighter text-[#a435f0] cursor-pointer">
          Tresify Learning
        </div>
      </Link>

      <button className="text-sm font-medium hover:text-[#a435f0] hidden lg:block px-2">
        Categories
      </button>

      {/* Search Section Simulation */}
      <div className="flex-grow max-w-150 relative hidden md:block">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          size={18}
        />
        <input
          placeholder="Search for anything"
          className="w-full h-12 bg-[#f7f9fa] border border-[#2d2f31] rounded-full pl-12 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
        />
      </div>

      <div className="flex items-center gap-3 ml-auto">
        {isLoggedIn ? (
          /* CONDITION: Authenticated View */
          <div className="flex items-center gap-4">
            <button
              onClick={handleMasterReset}
              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition"
              title="Master Reset (Back to Zero)"
            >
              <RotateCcw size={20} />
            </button>

            <Link href="/instructor">
              <button className="hidden xl:block text-sm font-medium hover:text-[#a435f0] px-2">
                Instructor
              </button>
            </Link>

            <button className="hidden md:block text-sm font-medium hover:text-[#a435f0] px-2">
              My learning
            </button>

            {/* CART ICON - Trigger Drawer (Logged In) */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 hover:bg-slate-100 rounded-full relative"
            >
              <ShoppingCart size={22} />
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#a435f0] text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                2
              </span>
            </button>

            <button className="p-2 hover:bg-slate-100 rounded-full hidden md:block">
              <Bell size={22} />
            </button>

            <div
              onClick={handleLogout}
              className="h-10 w-10 bg-[#2d2f31] text-white rounded-full flex items-center justify-center font-bold text-sm cursor-pointer hover:opacity-80 transition"
              title="Willy L. Jaranilla III"
            >
              WJ
            </div>
          </div>
        ) : (
          /* CONDITION: Guest View */
          <div className="flex items-center gap-3">
            {/* CART ICON - Trigger Drawer (Guest) */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 hover:bg-slate-100 rounded-full relative"
            >
              <ShoppingCart size={22} />
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#a435f0] text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                2
              </span>
            </button>

            <div className="flex items-center gap-2">
              <Link href="/login">
                <button className="h-10 px-4 border border-[#2d2f31] font-bold text-sm hover:bg-slate-50 transition">
                  Log in
                </button>
              </Link>
              <Link href="/signup">
                <button className="h-10 px-4 bg-[#2d2f31] text-white font-bold text-sm hover:bg-[#2d2f31]/90 transition">
                  Sign up
                </button>
              </Link>
              <button className="h-10 px-3 border border-[#2d2f31] hover:bg-slate-50 transition hidden md:block">
                <Globe size={20} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* RENDER THE DRAWER HERE */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </nav>
  );
};
