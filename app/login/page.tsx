"use client";

import { useState } from "react";
import Link from "next/link";
import { Github, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      alert(`Welcome back, Willy L. Jaranilla III!`); //
      window.location.href = "/";
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      {/* Container - max-w-100 (approx 400px) */}
      <div className="w-full max-w-100 space-y-6">
        {/* Header Section */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-[#2d2f31]">
            Log in to your Tresify account
          </h1>
          <p className="text-sm text-slate-600">
            Build systems like 4Sisters Sales and Inventory.
          </p>
        </div>

        {/* Social Logins Simulation */}
        <div className="space-y-3">
          <button className="w-full h-12 flex items-center justify-center gap-3 border border-[#2d2f31] font-bold hover:bg-slate-50 transition">
            <Github size={20} /> Continue with GitHub
          </button>
          <button className="w-full h-12 flex items-center justify-center gap-3 border border-[#2d2f31] font-bold hover:bg-slate-50 transition">
            <div className="w-5 h-5 bg-red-500 rounded-full" /> Continue with
            Google
          </button>
        </div>

        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink-0 mx-4 text-xs font-bold text-slate-400">
            OR
          </span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        {/* Standard Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              required
              type="email"
              placeholder="Email"
              className="w-full h-12 pl-12 pr-4 border border-[#2d2f31] rounded focus:outline-none focus:ring-1 focus:ring-purple-500"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <Lock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              required
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full h-12 pl-12 pr-12 border border-[#2d2f31] rounded focus:outline-none focus:ring-1 focus:ring-purple-500"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-black"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            disabled={isLoading}
            className={`w-full h-12 bg-[#a435f0] text-white font-bold hover:bg-[#8710d8] transition flex items-center justify-center ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <div className="text-center space-y-4">
          <Link
            href="#"
            className="text-sm font-bold text-[#a435f0] hover:text-[#8710d8] block"
          >
            Forgot Password?
          </Link>
          <p className="text-sm text-slate-600">
            Don't have an account?{" "}
            <Link href="#" className="font-bold text-[#a435f0] hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
