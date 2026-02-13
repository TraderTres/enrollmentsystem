"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import {
  Plus,
  LayoutDashboard,
  BookOpen,
  Video,
  Save,
  Users,
  BarChart3,
  TrendingUp,
  DollarSign,
} from "lucide-react";

export default function InstructorPage() {
  const [newLesson, setNewLesson] = useState("");
  const [courseId, setCourseId] = useState("1");
  const [customLessons, setCustomLessons] = useState<string[]>([]);

  const stats = [
    {
      label: "Total Students",
      value: "1,250",
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Total Revenue",
      value: "₱245,000",
      icon: DollarSign,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Course Ratings",
      value: "4.8/5",
      icon: TrendingUp,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
  ];

  useEffect(() => {
    const saved = localStorage.getItem(`course_${courseId}_custom_lessons`);
    if (saved) setCustomLessons(JSON.parse(saved));
  }, [courseId]);

  const handleAddLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLesson) return;
    const updatedLessons = [...customLessons, newLesson];
    setCustomLessons(updatedLessons);
    localStorage.setItem(
      `course_${courseId}_custom_lessons`,
      JSON.stringify(updatedLessons),
    );
    window.dispatchEvent(new Event("storage"));
    setNewLesson("");
    alert(`Success! "${newLesson}" added by Instructor Willy.`); //
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <div className="max-w-360 mx-auto p-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#a435f0] rounded-xl shadow-lg shadow-purple-200">
              <LayoutDashboard className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#2d2f31]">
                Instructor Dashboard
              </h1>
              <p className="text-sm text-slate-500 font-medium">
                Welcome back, Willy L. Jaranilla III
              </p>{" "}
              {/* */}
            </div>
          </div>
          <button className="px-6 py-3 bg-[#2d2f31] text-white font-bold rounded-lg hover:opacity-90 transition shadow-md">
            Create New Course
          </button>
        </div>

        {/* Analytics Overview Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center gap-5"
            >
              <div className={`p-4 rounded-lg ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {stat.label}
                </p>
                <p className="text-2xl font-black text-[#2d2f31]">
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content: Chart Simulation & Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Enrollment Growth Chart (Simulated with Tailwind) */}
            <div className="bg-white p-6 border rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-bold text-lg flex items-center gap-2 text-[#2d2f31]">
                  <BarChart3 size={20} className="text-[#a435f0]" /> Enrollment
                  Growth
                </h2>
                <select className="text-xs font-bold border rounded px-2 py-1 outline-none">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                </select>
              </div>

              {/* Simple CSS Bar Chart Simulation */}
              <div className="flex items-end justify-between h-48 gap-2 px-2">
                {[40, 70, 55, 90, 65, 80, 100].map((height, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center flex-1 gap-2 group"
                  >
                    <div
                      className="w-full bg-slate-100 rounded-t-md group-hover:bg-[#a435f0] transition-all relative cursor-pointer"
                      style={{ height: `${height}%` }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#2d2f31] text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition">
                        {height * 12}
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">
                      Day {i + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Existing Preview Section */}
            <div className="bg-white p-6 border rounded-xl shadow-sm">
              <h2 className="font-bold text-lg mb-6 flex items-center gap-2">
                <BookOpen size={20} className="text-purple-500" /> Syllabus
                Content
              </h2>
              <div className="space-y-3">
                {customLessons.length === 0 ? (
                  <div className="text-center py-10 bg-slate-50 border-2 border-dashed rounded-lg text-slate-400 text-sm">
                    No custom lessons added yet for the 4Sisters project.{" "}
                    {/* */}
                  </div>
                ) : (
                  customLessons.map((lesson, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 bg-slate-50 border rounded-lg hover:border-purple-200 transition"
                    >
                      <div className="p-2 bg-purple-100 text-purple-600 rounded">
                        <Video size={18} />
                      </div>
                      <span className="font-medium text-sm text-[#2d2f31]">
                        {lesson}
                      </span>
                      <div className="ml-auto flex gap-2">
                        <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100">
                          ACTIVE
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Sidebar: Add Lesson Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 border rounded-xl shadow-sm sticky top-24">
              <h2 className="font-bold text-lg mb-6 flex items-center gap-2 text-[#2d2f31]">
                <Plus size={20} className="text-purple-500" /> Quick Add Lesson
              </h2>
              <form onSubmit={handleAddLesson} className="space-y-5">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Select Course
                  </label>
                  <select
                    className="w-full mt-1.5 p-3 border border-slate-200 rounded-lg bg-slate-50 text-sm font-medium outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                    onChange={(e) => setCourseId(e.target.value)}
                  >
                    <option value="1">Next.js 15 & Prisma 7 Masterclass</option>
                    <option value="2">
                      4Sisters Sales & Inventory Architecture
                    </option>{" "}
                    {/* */}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Lesson Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. C# SQL Integration"
                    className="w-full mt-1.5 p-3 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                    value={newLesson}
                    onChange={(e) => setNewLesson(e.target.value)}
                  />
                </div>
                <button className="w-full py-4 bg-[#a435f0] text-white font-bold rounded-lg hover:shadow-lg hover:shadow-purple-100 transition flex items-center justify-center gap-2">
                  <Save size={18} /> Update Syllabus
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
