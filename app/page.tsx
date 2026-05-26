"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { CourseCard } from "@/components/CourseCard";
import { Toast } from "@/components/Toast";
import { useCart } from "@/lib/CartContext";

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
  const { addToCart } = useCart();

  const handleAddToCart = (course: any) => {
    addToCart({
      id: course.id,
      title: course.title,
      price: course.price,
      thumbnail: course.imageUrl,
    });
    setToastMessage(course.title);
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

  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("/api/courses");
        if (!res.ok) throw new Error("Failed to fetch courses");
        const data = await res.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const checkAuthAndProgress = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    };
    checkAuthAndProgress();
  }, []);

  const filteredCourses = courses.filter((course) => {
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
      <div className="relative overflow-hidden bg-slate-950 text-white py-16 md:py-24 px-6 md:px-8 mb-8 md:mb-12 rounded-b-[2rem] md:rounded-b-[3rem] shadow-2xl mx-0 sm:mx-2 md:mx-4 mt-2">
        {/* Glow Effects */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[150%] bg-violet-600/30 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[150%] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-360 mx-auto relative z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            Elevate Your <br className="hidden md:block" />
            Learning Journey.
          </h1>
          <p className="text-lg md:text-2xl text-slate-300 max-w-2xl mb-10 leading-relaxed font-light">
            Join Nexus LMS and master modern systems, design, and engineering with industry-leading experts.
          </p>
          {isLoggedIn ? (
            <div className="flex flex-wrap gap-4">
              <Link href="/instructor">
                <button className="px-8 py-4 bg-violet-600 text-white font-bold rounded-full hover:bg-violet-500 transition-all duration-300 ease-in-out shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] hover:-translate-y-1">
                  Instructor Dashboard
                </button>
              </Link>
              <button className="px-8 py-4 bg-white/5 border border-white/10 font-bold rounded-full hover:bg-white/10 transition-all duration-300 ease-in-out backdrop-blur-sm">
                My Learning
              </button>
            </div>
          ) : (
            <Link href="/signup">
              <button className="px-10 py-4 bg-white text-slate-900 font-bold rounded-full shadow-xl hover:bg-slate-100 transition-all duration-300 ease-in-out transform hover:scale-105 text-lg flex items-center gap-2 group">
                Start Learning Now
                <span className="group-hover:translate-x-1 transition-all duration-300 ease-in-out">→</span>
              </button>
            </Link>
          )}
        </div>
      </div>

      <div className="max-w-360 mx-auto px-4 sm:px-8 pb-12">
        {/* Search Bar Simulation */}
        <div className="mb-10 max-w-150">
          <label className="block text-sm font-bold mb-3 text-slate-700">
            Search Courses
          </label>
          <div className="relative group">
            <input
              type="text"
              placeholder="Search by title (e.g. Next.js, Web...)"
              className="w-full h-14 px-6 bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all duration-300 ease-in-out shadow-sm group-hover:shadow-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-4 w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-300 hover:text-slate-800 transition-all duration-300 ease-in-out"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Categories Badges */}
        <div className="mb-12">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
            Categories
          </h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full border text-sm font-semibold transition-all duration-300 ease-in-out ${activeCategory === cat ? "bg-slate-900 text-white border-slate-900 shadow-md scale-105" : "bg-white text-slate-600 border-slate-200 hover:border-violet-300 hover:text-violet-600"}`}
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
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
          </div>
        ) : (
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
                    instructor={course.instructor || "Willy L. Jaranilla III"}
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
                      handleAddToCart(course);
                    }}
                    className="absolute top-3 right-3 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out z-30 border border-slate-100 hover:bg-violet-600 hover:text-white hover:scale-110 md:opacity-0 opacity-100"
                    title="Add to Cart"
                  >
                    <ShoppingCart size={18} />
                  </button>
                </div>
              );
            })}
            
            {!isLoading && filteredCourses.length === 0 && (
              <div className="col-span-full py-12 text-center text-slate-500 font-medium">
                No courses found for the selected category or search.
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
