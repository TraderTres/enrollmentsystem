"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const error = await res.text();
        alert(error);
        setIsLoading(false);
        return;
      }

      const data = await res.json();
      setIsLoading(false);
      alert(`Welcome back, ${data.fullName}!`);
      window.location.href = "/";
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4">
      {/* Container - max-w-100 (approx 400px) */}
      <div className="w-full max-w-100 space-y-6">
        {/* Header Section */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Log in to Nexus LMS
          </h1>
          <p className="text-sm text-slate-600">
            Welcome back to your learning journey.
          </p>
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
              className="w-full h-12 pl-12 pr-4 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent shadow-sm transition-all duration-300 ease-in-out font-medium"
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
              className="w-full h-12 pl-12 pr-12 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent shadow-sm transition-all duration-300 ease-in-out font-medium"
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
            className={`w-full h-12 bg-violet-600 text-white font-bold rounded-xl hover:bg-violet-700 transition-all duration-300 ease-in-out flex items-center justify-center shadow-[0_4px_14px_0_rgba(124,58,237,0.39)] hover:shadow-[0_6px_20px_rgba(124,58,237,0.23)] hover:-translate-y-0.5 ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <div className="text-center space-y-4">
          <Link
            href="#"
            className="text-sm font-bold text-violet-600 hover:text-violet-700 block transition-all duration-300 ease-in-out"
          >
            Forgot Password?
          </Link>
          <p className="text-sm text-slate-600">
            Don't have an account?{" "}
            <Link href="/signup" className="font-bold text-violet-600 hover:text-violet-700 hover:underline transition-all duration-300 ease-in-out">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
