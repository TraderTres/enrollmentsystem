"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Play } from "lucide-react";
import Link from "next/link";

interface CourseCardProps {
  id: string;
  title: string;
  instructor: string;
  thumbnail: string;
  rating: number;
  reviews: number;
  price: number;
  progress?: number | null;
  tag?: string;
  previewVideoUrl?: string;
}

export const CourseCard = ({
  id,
  title,
  instructor,
  thumbnail,
  rating,
  reviews,
  price,
  progress,
  tag,
  previewVideoUrl,
}: CourseCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const tagColor =
    tag === "Bestseller"
      ? "bg-amber-400 text-slate-900"
      : tag === "New"
        ? "bg-emerald-500 text-white"
        : tag === "Hot"
          ? "bg-rose-500 text-white"
          : "bg-violet-600 text-white";

  return (
    <Link
      href={`/courses/${id}`}
      className="group cursor-pointer block h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col gap-3 h-full bg-white/90 backdrop-blur-md border border-slate-200 shadow-sm rounded-2xl p-3 transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:-translate-y-1">
        {/* Thumbnail Section with Video Preview support */}
        <div className="relative aspect-video w-full border border-slate-100/50 overflow-hidden rounded-xl bg-slate-900 shadow-sm">
          {/* Base Image Thumbnail */}
          <Image
            src={thumbnail}
            alt={title}
            fill
            className={`object-cover transition-opacity duration-500 ${
              isHovered && previewVideoUrl ? "opacity-0" : "opacity-100"
            } group-hover:scale-105 transition-transform duration-500`}
          />

          {/* VIDEO PREVIEW - Lilitaw kapag naka-hover */}
          {isHovered && previewVideoUrl && (
            <video
              src={previewVideoUrl}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover animate-in fade-in duration-500"
            />
          )}

          {/* FEATURED TAG BADGE */}
          {tag && (
            <div
              className={`absolute top-2 left-2 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded shadow-md ${tagColor} z-10`}
            >
              {tag}
            </div>
          )}

          {/* Play Icon Overlay kapag walang video preview habang naka-hover */}
          {!previewVideoUrl && isHovered && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-10">
              <Play className="text-white fill-white opacity-70" size={40} />
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex flex-col gap-1 flex-grow px-1 pb-1">
          <h3 className="font-bold text-slate-900 line-clamp-2 h-10 leading-tight group-hover:text-violet-600 transition-all duration-300 ease-in-out">
            {title}
          </h3>
          <p className="text-xs text-slate-500 font-medium">{instructor}</p>

          {/* Conditional Rendering: Progress Bar or Price/Ratings */}
          {progress !== null && progress !== undefined ? (
            <div className="flex flex-col gap-1.5 mt-auto pt-3 border-t border-slate-100/50">
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden shadow-inner">
                <div
                  className="bg-violet-500 h-full transition-all duration-1000 ease-out rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between items-center">
                <p className="text-[10px] font-bold text-violet-600">
                  {Math.round(progress)}% Complete
                </p>
                <p className="text-[10px] text-slate-400 italic">
                  {progress === 100 ? "Finished" : "Keep going!"}
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Ratings Section */}
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-amber-500 font-bold text-sm">
                  {rating.toFixed(1)}
                </span>
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      fill={i < Math.floor(rating) ? "currentColor" : "transparent"}
                      strokeWidth={i < Math.floor(rating) ? 0 : 2}
                    />
                  ))}
                </div>
                <span className="text-xs text-slate-400 font-medium">
                  ({reviews.toLocaleString()})
                </span>
              </div>

              {/* Price display */}
              <div className="font-extrabold text-slate-900 mt-auto pt-2 text-lg">
                ₱{price.toLocaleString()}
              </div>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};
