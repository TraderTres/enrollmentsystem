"use client";

import { useState } from "react";
import Link from "next/link";
import { Github, Mail, Lock, User, Eye, EyeOff } from "lucide-react";

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      alert(`Account created successfully for ${formData.fullName}!`);
      window.location.href = "/login";
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-12">
      {/* Container - Optimized max-w */}
      <div className="w-full max-w-100 space-y-6">
        {/* Header Section */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-[#2d2f31]">
            Learn to build systems
          </h1>
          <p className="text-sm text-slate-600">
            Join Tresify and master systems here.
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
              className="w-full h-12 pl-12 pr-4 border border-[#2d2f31] rounded focus:outline-none focus:ring-1 focus:ring-purple-500 font-medium"
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
              className="w-full h-12 pl-12 pr-4 border border-[#2d2f31] rounded focus:outline-none focus:ring-1 focus:ring-purple-500 font-medium"
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
              className="w-full h-12 pl-12 pr-12 border border-[#2d2f31] rounded focus:outline-none focus:ring-1 focus:ring-purple-500 font-medium"
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
              className="mt-1 accent-purple-600"
              required
            />
            <p className="text-xs text-slate-600 leading-tight">
              I want to get the most out of my experience by receiving emails
              with exclusive deals and personal recommendations.
            </p>
          </div>

          <button
            disabled={isLoading}
            className={`w-full h-12 bg-[#a435f0] text-white font-bold hover:bg-[#8710d8] transition flex items-center justify-center ${
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
              className="font-bold text-[#a435f0] hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
