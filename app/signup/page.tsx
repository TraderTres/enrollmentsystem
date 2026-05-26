"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const error = await res.text();
        alert(error);
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      alert(`Account created successfully for ${formData.fullName}!`);
      window.location.href = "/login";
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 py-12">
      {/* Container - Optimized max-w */}
      <div className="w-full max-w-100 space-y-6">
        {/* Header Section */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Learn to build systems
          </h1>
          <p className="text-sm text-slate-600">
            Join Nexus LMS and master systems here.
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name Field */}
          <div className="relative">
            <User
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              required
              type="text"
              placeholder="Full Name"
              className="w-full h-12 pl-12 pr-4 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent font-medium shadow-sm transition-all duration-300 ease-in-out"
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />
          </div>

          {/* Email Field */}
          <div className="relative">
            <Mail
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              required
              type="email"
              placeholder="Email"
              className="w-full h-12 pl-12 pr-4 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent font-medium shadow-sm transition-all duration-300 ease-in-out"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <Lock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              required
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full h-12 pl-12 pr-12 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent font-medium shadow-sm transition-all duration-300 ease-in-out"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-black"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="flex items-start gap-2 py-2">
            <input
              type="checkbox"
              className="mt-1 accent-violet-600 rounded"
              required
            />
            <p className="text-xs text-slate-600 leading-tight">
              I want to get the most out of my experience by receiving emails
              with exclusive deals and personal recommendations.
            </p>
          </div>

          <button
            disabled={isLoading}
            className={`w-full h-12 bg-violet-600 text-white font-bold rounded-xl hover:bg-violet-700 transition-all duration-300 ease-in-out flex items-center justify-center shadow-[0_4px_14px_0_rgba(124,58,237,0.39)] hover:shadow-[0_6px_20px_rgba(124,58,237,0.23)] hover:-translate-y-0.5 ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Creating Account..." : "Sign up"}
          </button>
        </form>

        <div className="text-center">
          <p className="text-xs text-slate-500 px-8">
            By signing up, you agree to our{" "}
            <span className="underline cursor-pointer">Terms of Use</span> and{" "}
            <span className="underline cursor-pointer">Privacy Policy</span>.
          </p>

          <div className="border-t border-slate-200 my-6"></div>

          <p className="text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-violet-600 hover:text-violet-700 hover:underline transition-all duration-300 ease-in-out"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
