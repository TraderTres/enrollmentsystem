"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingCart, Globe, Bell, RotateCcw, Menu, X } from "lucide-react";
import { CartDrawer } from "./CartDrawer";
import { useCart } from "@/lib/CartContext";

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartItems } = useCart();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Auth check failed", error);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setIsLoggedIn(false);
    setUser(null);
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
    <>
      <nav className="h-18 px-4 md:px-8 flex items-center justify-between gap-4 border-b border-white/30 bg-white/70 backdrop-blur-md sticky top-0 z-50 transition-all duration-300 ease-in-out">
        
        <div className="flex items-center gap-4">
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-slate-700 hover:text-violet-600 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo Section */}
          <Link href="/">
            <div className="shrink-0 font-extrabold text-2xl tracking-tighter bg-gradient-to-r from-violet-600 to-violet-400 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-all duration-300 ease-in-out">
              Nexus LMS
            </div>
          </Link>

          <button className="text-sm font-semibold hover:text-violet-600 hidden lg:block px-2 transition-all duration-300 ease-in-out">
            Categories
          </button>
        </div>

        {/* Search Section Simulation */}
        <div className="flex-grow max-w-150 relative hidden md:block">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            placeholder="Search for anything..."
            className="w-full h-12 bg-slate-50 border border-slate-200 rounded-full pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white transition-all duration-300 ease-in-out shadow-sm"
          />
        </div>

        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            /* CONDITION: Authenticated View */
            <div className="flex items-center gap-2 md:gap-4">
              <button
                onClick={handleMasterReset}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-300 ease-in-out hidden sm:block"
                title="Master Reset (Back to Zero)"
              >
                <RotateCcw size={20} />
              </button>

              <Link href="/instructor" className="hidden xl:block">
                <button className="text-sm font-semibold hover:text-violet-600 px-2 transition-all duration-300 ease-in-out">
                  Instructor
                </button>
              </Link>

              <button className="hidden md:block text-sm font-semibold hover:text-violet-600 px-2 transition-all duration-300 ease-in-out">
                My learning
              </button>

              {/* CART ICON */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2 hover:bg-violet-50 rounded-full relative transition-all duration-300 ease-in-out group"
              >
                <ShoppingCart size={22} className="group-hover:text-violet-600 transition-all duration-300 ease-in-out" />
                {cartItems.length > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-violet-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-md">
                    {cartItems.length}
                  </span>
                )}
              </button>

              <button className="p-2 hover:bg-violet-50 rounded-full hidden md:block transition-all duration-300 ease-in-out group">
                <Bell size={22} className="group-hover:text-violet-600 transition-all duration-300 ease-in-out" />
              </button>

              <div
                onClick={handleLogout}
                className="h-10 w-10 bg-gradient-to-br from-violet-600 to-violet-800 text-white rounded-full flex items-center justify-center font-bold text-sm cursor-pointer hover:shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-0.5"
                title={user?.fullName || "User Account"}
              >
                {user?.fullName ? user.fullName.substring(0, 2).toUpperCase() : "US"}
              </div>
            </div>
          ) : (
            /* CONDITION: Guest View */
            <div className="flex items-center gap-2 md:gap-3">
              {/* CART ICON */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2 hover:bg-violet-50 rounded-full relative transition-all duration-300 ease-in-out group"
              >
                <ShoppingCart size={22} className="group-hover:text-violet-600 transition-all duration-300 ease-in-out" />
                {cartItems.length > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-violet-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-md">
                    {cartItems.length}
                  </span>
                )}
              </button>

              <div className="hidden md:flex items-center gap-3">
                <Link href="/login">
                  <button className="h-10 px-5 font-semibold text-sm hover:text-violet-600 transition-all duration-300 ease-in-out">
                    Log in
                  </button>
                </Link>
                <Link href="/signup">
                  <button className="h-10 px-6 bg-violet-600 text-white font-bold text-sm rounded-full shadow-md hover:bg-violet-700 hover:shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-0.5">
                    Sign up
                  </button>
                </Link>
                <button className="h-10 w-10 flex items-center justify-center rounded-full border border-slate-200 hover:bg-slate-50 transition-all duration-300 ease-in-out">
                  <Globe size={20} className="text-slate-600" />
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-4 absolute w-full z-40 shadow-lg">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              placeholder="Search for anything..."
              className="w-full h-12 bg-slate-50 border border-slate-200 rounded-full pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          
          <div className="flex flex-col space-y-3 font-semibold text-slate-700">
            <button className="text-left py-2 border-b border-slate-100 hover:text-violet-600">Categories</button>
            {isLoggedIn ? (
              <>
                <Link href="/instructor"><button className="text-left py-2 border-b border-slate-100 hover:text-violet-600 w-full">Instructor</button></Link>
                <button className="text-left py-2 border-b border-slate-100 hover:text-violet-600">My learning</button>
                <button onClick={handleMasterReset} className="text-left py-2 border-b border-slate-100 text-red-500 hover:text-red-700">Master Reset</button>
                <button onClick={handleLogout} className="text-left py-2 border-b border-slate-100 hover:text-violet-600">Log out</button>
              </>
            ) : (
              <>
                <Link href="/login"><button className="text-left py-2 border-b border-slate-100 hover:text-violet-600 w-full">Log in</button></Link>
                <Link href="/signup"><button className="text-left py-2 border-b border-slate-100 text-violet-600 w-full">Sign up</button></Link>
              </>
            )}
          </div>
        </div>
      )}

      {/* RENDER THE DRAWER HERE */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};
