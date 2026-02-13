"use client";

import { use, useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import {
  PlayCircle,
  Lock,
  CheckCircle,
  GraduationCap,
  Video,
} from "lucide-react";

export default function CoursePlayerPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const resolvedParams = use(params); //
  const courseId = resolvedParams.courseId;

  const [isEnrolled, setIsEnrolled] = useState(false);
  const [customLessons, setCustomLessons] = useState<any[]>([]);

  useEffect(() => {
    const checkStatus = () => {
      // Check enrollment
      const progress = localStorage.getItem(`course_${courseId}_progress`);
      if (progress === "100") setIsEnrolled(true);

      // Check for custom lessons added by the Instructor
      const savedCustom = localStorage.getItem(
        `course_${courseId}_custom_lessons`,
      );
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

  const staticLessons = [
    { id: "1", title: "Course Introduction", isCompleted: true },
    { id: "2", title: "Setting up Next.js 15", isCompleted: isEnrolled },
    { id: "3", title: "Prisma Schema Design", isCompleted: isEnrolled },
    { id: "4", title: "Deployment Guide", isCompleted: isEnrolled },
  ];

  const allLessons = [...staticLessons, ...customLessons];

  return (
    <div className="flex flex-col h-screen bg-[#1c1d1f]">
      <div className="flex flex-col md:flex-row h-full overflow-hidden">
        {/* Main Video Area */}
        <div className="flex-grow bg-black flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-5xl aspect-video bg-[#2d2f31] rounded flex flex-col items-center justify-center border border-white/10 shadow-2xl relative">
            {isEnrolled ? (
              <div className="text-center space-y-4">
                <CheckCircle
                  size={64}
                  className="text-[#10b981] mx-auto animate-bounce"
                />
                <p className="text-white font-bold text-xl">
                  Course Completed!
                </p>
                <p className="text-slate-400">
                  Congrats! You did learned a lot.
                </p>
              </div>
            ) : (
              <div className="text-center space-y-6 p-8 bg-[#1c1d1f] rounded-xl border border-white/5">
                <GraduationCap size={64} className="text-[#a435f0] mx-auto" />
                <div className="space-y-2">
                  <h2 className="text-white text-2xl font-bold">
                    Ready to start learning?
                  </h2>
                  <p className="text-slate-400">
                    Enroll now to access all lessons including instructor
                    updates.
                  </p>
                </div>
                <button
                  onClick={handleEnroll}
                  className="px-12 py-4 bg-[#a435f0] text-white font-bold text-lg rounded hover:bg-[#8710d8] transition-all transform hover:scale-105"
                >
                  Enroll & Complete Now
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Syllabus - */}
        <div className="w-full md:w-80 border-l border-white/10 bg-white overflow-y-auto">
          <div className="p-4 border-b bg-slate-50 sticky top-0 z-10">
            <h2 className="font-bold text-[#2d2f31]">Course Content</h2>
            <div className="w-full bg-slate-200 h-1.5 mt-2 rounded-full overflow-hidden">
              <div
                className={`h-full bg-[#10b981] transition-all ${isEnrolled ? "w-full" : "w-[25%]"}`}
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-1 font-bold">
              {isEnrolled ? "100% COMPLETE" : "25% COMPLETE"}
            </p>
          </div>

          <div className="flex flex-col">
            {allLessons.map((lesson) => (
              <div
                key={lesson.id}
                className={`flex items-center gap-3 p-4 border-b hover:bg-slate-50 cursor-pointer transition ${!isEnrolled && !lesson.isCompleted ? "opacity-50" : ""}`}
              >
                {lesson.isCompleted || (isEnrolled && lesson.isCustom) ? (
                  <CheckCircle size={18} className="text-[#10b981] shrink-0" />
                ) : !isEnrolled && !lesson.isCompleted ? (
                  <Lock size={18} className="text-slate-400 shrink-0" />
                ) : (
                  <PlayCircle size={18} className="text-slate-600 shrink-0" />
                )}
                <div className="flex flex-col">
                  <span
                    className={`text-sm ${!isEnrolled && !lesson.isCompleted ? "text-slate-400" : "font-medium text-[#2d2f31]"}`}
                  >
                    {lesson.title}
                  </span>
                  {lesson.isCustom && (
                    <span className="text-[9px] font-bold text-[#a435f0] uppercase">
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
