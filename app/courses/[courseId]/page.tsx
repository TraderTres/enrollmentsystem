"use client";

import { use, useState, useEffect } from "react";
import {
  PlayCircle,
  Lock,
  CheckCircle,
  GraduationCap,
} from "lucide-react";

export default function CoursePlayerPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const resolvedParams = use(params);
  const courseId = resolvedParams.courseId;

  const [course, setCourse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [customLessons, setCustomLessons] = useState<any[]>([]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`/api/courses/${courseId}`);
        if (res.ok) {
          const data = await res.json();
          setCourse(data);
        }
      } catch (error) {
        console.error("Failed to fetch course", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourse();
  }, [courseId]);

  useEffect(() => {
    const checkStatus = () => {
      // Check enrollment
      const progress = localStorage.getItem(`course_${courseId}_progress`);
      if (progress === "100") setIsEnrolled(true);

      // Check for custom lessons added by the Instructor
      const savedCustom = localStorage.getItem(`course_${courseId}_custom_lessons`);
      if (savedCustom) {
        const parsed = JSON.parse(savedCustom);
        const formatted = parsed.map((title: string, index: number) => ({
          id: `custom-${index}`,
          title: title,
          isCompleted: false,
          isCustom: true,
        }));
        setCustomLessons(formatted);
      }
    };

    checkStatus();
    window.addEventListener("storage", checkStatus);
    return () => window.removeEventListener("storage", checkStatus);
  }, [courseId]);

  const handleEnroll = () => {
    localStorage.setItem(`course_${courseId}_progress`, "100");
    setIsEnrolled(true);
    window.dispatchEvent(new Event("storage"));
    alert("Congratulations! You have enrolled and completed this course.");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <div className="flex-grow flex items-center justify-center">
          <p className="text-xl text-slate-500 font-bold">Course not found.</p>
        </div>
      </div>
    );
  }

  const staticLessons = [
    { id: "1", title: "Course Introduction", isCompleted: true },
    { id: "2", title: "Getting Started", isCompleted: isEnrolled },
    { id: "3", title: "Core Concepts", isCompleted: isEnrolled },
    { id: "4", title: "Advanced Techniques", isCompleted: isEnrolled },
  ];

  const allLessons = [...staticLessons, ...customLessons];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      
      {/* Course Header Banner */}
      <div className="bg-slate-900 text-white py-12 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute top-[-50%] right-[-10%] w-[50%] h-[200%] bg-violet-600/20 blur-[100px] rounded-full pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10 flex flex-col gap-4">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">{course.title}</h1>
          <p className="text-slate-300 text-lg">Instructor: {course.instructor}</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col md:flex-row flex-grow max-w-7xl mx-auto w-full gap-8 p-6 md:p-12">
        {/* Main Video Area */}
        <div className="flex-grow flex flex-col gap-6">
          <div className="w-full aspect-video bg-black rounded-2xl flex flex-col items-center justify-center shadow-2xl relative overflow-hidden border border-slate-200">
            {isEnrolled ? (
              <div className="text-center space-y-4 p-8">
                <CheckCircle size={80} className="text-emerald-500 mx-auto animate-bounce" />
                <p className="text-white font-extrabold text-3xl">Course Completed!</p>
                <p className="text-slate-300 text-lg">Congratulations! You learned a lot.</p>
              </div>
            ) : (
              <div className="text-center space-y-6 p-8 relative z-10">
                <GraduationCap size={80} className="text-violet-500 mx-auto" />
                <div className="space-y-2">
                  <h2 className="text-white text-3xl font-bold">Ready to start learning?</h2>
                  <p className="text-slate-300">Enroll now to access all lessons.</p>
                </div>
                <button
                  onClick={handleEnroll}
                  className="px-10 py-4 bg-violet-600 text-white font-bold text-lg rounded-full hover:bg-violet-500 transition-all transform hover:scale-105 shadow-xl hover:shadow-[0_0_20px_rgba(124,58,237,0.5)]"
                >
                  Enroll & Complete Now
                </button>
              </div>
            )}
            
            {/* Background image when not enrolled (dimmed) */}
            {!isEnrolled && course.imageUrl && (
              <div 
                className="absolute inset-0 opacity-20 bg-cover bg-center" 
                style={{ backgroundImage: `url(${course.imageUrl})` }}
              />
            )}
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">About This Course</h2>
            <p className="text-slate-600 leading-relaxed">
              Welcome to <strong>{course.title}</strong>! This course covers everything you need to know about {course.category}.
              Taught by {course.instructor}, you will dive deep into modern techniques and best practices.
            </p>
          </div>
        </div>

        {/* Sidebar Syllabus */}
        <div className="w-full md:w-96 shrink-0 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden h-fit sticky top-24">
          <div className="p-6 border-b border-slate-100 bg-slate-50">
            <h2 className="font-bold text-xl text-slate-800">Course Content</h2>
            <div className="w-full bg-slate-200 h-2 mt-4 rounded-full overflow-hidden shadow-inner">
              <div
                className={`h-full bg-emerald-500 transition-all duration-1000 ${isEnrolled ? "w-full" : "w-[25%]"}`}
              />
            </div>
            <p className="text-xs text-slate-500 mt-2 font-bold tracking-wide">
              {isEnrolled ? "100% COMPLETE" : "25% COMPLETE"}
            </p>
          </div>

          <div className="flex flex-col max-h-[500px] overflow-y-auto">
            {allLessons.map((lesson) => (
              <div
                key={lesson.id}
                className={`flex items-center gap-4 p-5 border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors ${!isEnrolled && !lesson.isCompleted ? "opacity-60" : ""}`}
              >
                {lesson.isCompleted || (isEnrolled && lesson.isCustom) ? (
                  <CheckCircle size={22} className="text-emerald-500 shrink-0" />
                ) : !isEnrolled && !lesson.isCompleted ? (
                  <Lock size={22} className="text-slate-400 shrink-0" />
                ) : (
                  <PlayCircle size={22} className="text-violet-600 shrink-0" />
                )}
                <div className="flex flex-col">
                  <span
                    className={`font-semibold ${!isEnrolled && !lesson.isCompleted ? "text-slate-500" : "text-slate-800"}`}
                  >
                    {lesson.title}
                  </span>
                  {lesson.isCustom && (
                    <span className="text-[10px] font-bold text-violet-600 uppercase tracking-wider mt-1">
                      Added by Instructor
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
