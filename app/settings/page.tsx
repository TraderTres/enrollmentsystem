"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import {
  User,
  Mail,
  MapPin,
  Briefcase,
  Camera,
  Github,
  Twitter,
  Globe,
  Save,
  CheckCircle,
} from "lucide-react";

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const [profile, setProfile] = useState({
    fullName: "Willy L. Jaranilla III",
    role: "Full-Stack Developer",
    location: "Caloocan, Philippines",
    bio: "Passionate developer specializing in C#, .NET, and Next.js. I built the 4Sisters Sales and Inventory System.",
    github: "github.com/trader-tres",
  });

  useEffect(() => {
    const savedProfile = localStorage.getItem("user_profile");
    if (savedProfile) setProfile(JSON.parse(savedProfile));
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      localStorage.setItem("user_profile", JSON.stringify(profile));
      setIsSaving(false);
      setShowToast(true);

      window.dispatchEvent(new Event("storage"));

      setTimeout(() => setShowToast(false), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <div className="max-w-4xl mx-auto p-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-[#2d2f31]">Public Profile</h1>
          <p className="text-slate-500">
            Add information about yourself, Willy L. Jaranilla III.
          </p>
        </div>

        <form
          onSubmit={handleSave}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Left Side: Avatar Upload Simulation */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white p-6 border rounded-xl shadow-sm text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <div className="w-full h-full bg-[#2d2f31] text-white text-4xl font-bold flex items-center justify-center rounded-full border-4 border-slate-100">
                  WJ
                </div>
                <button
                  type="button"
                  className="absolute bottom-0 right-0 p-2 bg-white border shadow-md rounded-full hover:bg-slate-50 transition"
                >
                  <Camera size={18} className="text-[#a435f0]" />
                </button>
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase">
                Profile Picture
              </p>
            </div>
          </div>

          {/* Right Side: Form Fields */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-8 border rounded-xl shadow-sm space-y-6">
              {/* Personal Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <User size={14} /> Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border rounded-lg bg-slate-50 text-sm focus:ring-2 focus:ring-purple-500/20 outline-none"
                    value={profile.fullName}
                    onChange={(e) =>
                      setProfile({ ...profile, fullName: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Briefcase size={14} /> Role
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border rounded-lg bg-slate-50 text-sm focus:ring-2 focus:ring-purple-500/20 outline-none"
                    value={profile.role}
                    onChange={(e) =>
                      setProfile({ ...profile, role: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Bio Section */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                  Professional Bio
                </label>
                <textarea
                  rows={4}
                  className="w-full p-3 border rounded-lg bg-slate-50 text-sm focus:ring-2 focus:ring-purple-500/20 outline-none"
                  value={profile.bio}
                  onChange={(e) =>
                    setProfile({ ...profile, bio: e.target.value })
                  }
                />
                <p className="text-[10px] text-slate-400 italic">
                  Mention your 4Sisters project experience here.
                </p>
              </div>

              {/* Location & Social */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <MapPin size={14} /> Location
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border rounded-lg bg-slate-50 text-sm focus:ring-2 focus:ring-purple-500/20 outline-none"
                    value={profile.location}
                    onChange={(e) =>
                      setProfile({ ...profile, location: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Github size={14} /> GitHub Profile
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border rounded-lg bg-slate-50 text-sm focus:ring-2 focus:ring-purple-500/20 outline-none"
                    value={profile.github}
                    onChange={(e) =>
                      setProfile({ ...profile, github: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  disabled={isSaving}
                  className="px-8 py-3 bg-[#2d2f31] text-white font-bold rounded hover:opacity-90 transition flex items-center gap-2"
                >
                  <Save size={18} /> {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Success Toast */}
      {showToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#10b981] text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-bounce">
          <CheckCircle size={20} />
          <span className="font-bold">Profile updated successfully!</span>
        </div>
      )}
    </div>
  );
}
