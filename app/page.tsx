"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { CourseCard } from "@/components/CourseCard";
import { Toast } from "@/components/Toast";

const webDevVideo =
  "https://assets.mixkit.co/videos/preview/mixkit-hands-typing-on-a-laptop-keyboard-in-close-up-shot-1588-large.mp4";
const designVideo =
  "https://assets.mixkit.co/videos/preview/mixkit-designer-drawing-on-a-tablet-with-a-stylus-333-large.mp4";
const cyberVideo =
  "https://assets.mixkit.co/videos/preview/mixkit-hacker-typing-on-a-keyboard-with-green-code-on-screen-4878-large.mp4";

export default function Home() {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleAddToCart = (courseTitle: string) => {
    setToastMessage(courseTitle);
    setShowToast(true);
  };

  const categories = [
    "All",
    "Web Development",
    "Software Systems",
    "Design",
    "Business",
    "Data Science",
    "Cybersecurity",
    "Mobile Development",
  ];

  const staticCourses = [
    {
      id: "1",
      title: "Full-Stack Web Development: HTML and CSS",
      instructor: { name: "Willy Jaranilla III" },
      imageUrl: "https://images.unsplash.com/photo-1587620962725-abab7fe55159",
      previewVideoUrl: webDevVideo,
      price: 1999,
      category: "Web Development",
      progress: 45,
      tag: "Bestseller",
      isPublished: true,
    },
    {
      id: "2",
      title: "Advanced Inventory System Architecture",
      instructor: { name: "John Doe" },
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      price: 2499,
      category: "Software Systems",
      tag: "Trending",
      isPublished: true,
    },
    {
      id: "3",
      title: "UI/UX Foundations for Developers",
      instructor: { name: "Alex Rivera" },
      imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5",
      previewVideoUrl: designVideo,
      price: 1999,
      category: "Design",
      progress: 100,
      tag: "Hot",
      isPublished: true,
    },
    {
      id: "6",
      title: "Ethical Hacking: Cybersecurity Essentials",
      instructor: { name: "Mark Anthony" },
      imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
      previewVideoUrl: cyberVideo,
      price: 3500,
      category: "Cybersecurity",
      progress: null,
      isPublished: true,
    },
    {
      id: "8",
      title: "Next.js 15: The Complete Guide",
      instructor: { name: "Willy Jaranilla III" },
      imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
      price: 2800,
      category: "Web Development",
      tag: "New",
      isPublished: true,
    },
  ];

  useEffect(() => {
    const checkAuthAndProgress = () => {
      const authStatus = localStorage.getItem("isLoggedIn");
      setIsLoggedIn(authStatus === "true");
    };
    checkAuthAndProgress();
    window.addEventListener("storage", checkAuthAndProgress);
    return () => window.removeEventListener("storage", checkAuthAndProgress);
  }, []);

  const toggleDemoAuth = () => {
    const newStatus = !isLoggedIn;
    setIsLoggedIn(newStatus);
    localStorage.setItem("isLoggedIn", newStatus.toString());
    window.dispatchEvent(new Event("storage"));
  };

  const filteredCourses = staticCourses.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || course.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* RENDER TOAST NOTIFICATION */}
      <Toast
        isOpen={showToast}
        message={toastMessage}
        onClose={() => setShowToast(false)}
      />

      {/* Hero Header Section */}
      <div className="bg-[#2d2f31] text-white py-16 px-8 mb-8">
        <div className="max-w-360 mx-auto">
          <h1 className="text-5xl font-bold mb-4 tracking-tight">
            Learn to build systems.
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mb-8">
            Join Tresify and master systems here.
          </p>
          {isLoggedIn ? (
            <div className="flex gap-4">
              <Link href="/instructor">
                <button className="px-6 py-3 bg-[#a435f0] font-bold rounded hover:bg-[#8710d8] transition shadow-md">
                  Instructor Dashboard
                </button>
              </Link>
              <button className="px-6 py-3 border border-white font-bold rounded hover:bg-white/10 transition">
                My Learning
              </button>
            </div>
          ) : (
            <Link href="/signup">
              <button className="px-10 py-4 bg-white text-[#2d2f31] font-bold rounded shadow-xl hover:bg-slate-100 transition transform hover:scale-105 text-lg">
                Join Now
              </button>
            </Link>
          )}
        </div>
      </div>

      <div className="max-w-360 mx-auto px-8 pb-12">
        {/* Search Bar Simulation */}
        <div className="mb-8 max-w-150">
          <label className="block text-sm font-bold mb-2 text-slate-700">
            Search Courses
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by title (e.g. Next.js, Web...)"
              className="w-full h-12 px-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-3 text-slate-400 hover:text-black"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Categories Badges */}
        <div className="mb-10">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
            Categories
          </h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full border text-sm font-bold transition-all ${activeCategory === cat ? "bg-[#2d2f31] text-white border-[#2d2f31]" : "bg-white text-[#2d2f31] border-slate-300 hover:border-[#2d2f31]"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-[#2d2f31]">
          {activeCategory === "All"
            ? "Explore our Courses"
            : `${activeCategory} Courses`}
        </h2>

        {/* Course Grid with Quick Add Support */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCourses.map((course: any) => {
            const savedProgress =
              typeof window !== "undefined"
                ? localStorage.getItem(`course_${course.id}_progress`)
                : null;

            return (
              <div key={course.id} className="relative group">
                <CourseCard
                  {...course}
                  instructor={
                    course.instructor?.name || "Willy L. Jaranilla III"
                  }
                  thumbnail={course.imageUrl}
                  progress={
                    isLoggedIn
                      ? savedProgress
                        ? parseInt(savedProgress)
                        : course.progress
                      : null
                  }
                  rating={4.8}
                  reviews={1250}
                />

                {/* QUICK ADD BUTTON OVERLAY */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddToCart(course.title);
                  }}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-30 border border-slate-200 hover:bg-[#a435f0] hover:text-white"
                  title="Add to Cart"
                >
                  <ShoppingCart size={16} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Demo Auth Toggle */}
      <div className="fixed bottom-4 right-4 bg-white shadow-xl border p-2 rounded-lg flex items-center gap-2 z-[9999]">
        <span className="text-[10px] font-bold text-slate-400">DEMO AUTH:</span>
        <button
          onClick={toggleDemoAuth}
          className={`text-xs font-bold px-3 py-1 rounded ${isLoggedIn ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}
        >
          {isLoggedIn ? "LOGOUT" : "LOGIN"}
        </button>
      </div>
    </div>
  );
}
