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
      ? "bg-amber-400 text-black"
      : tag === "New"
        ? "bg-[#10b981] text-white"
        : tag === "Hot"
          ? "bg-red-600 text-white"
          : "bg-[#a435f0] text-white";

  return (
    <Link
      href={`/courses/${id}`}
      className="group cursor-pointer block h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col gap-2 h-full bg-white transition-all duration-300">
        {/* Thumbnail Section with Video Preview support */}
        <div className="relative aspect-video w-full border border-slate-200 overflow-hidden rounded-sm bg-slate-900">
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
        <div className="flex flex-col gap-1 flex-grow">
          <h3 className="font-bold text-[#2d2f31] line-clamp-2 h-10 leading-tight group-hover:text-[#a435f0] transition-colors">
            {title}
          </h3>
          <p className="text-xs text-[#6a6f73]">{instructor}</p>

          {/* Conditional Rendering: Progress Bar or Price/Ratings */}
          {progress !== null && progress !== undefined ? (
            <div className="flex flex-col gap-1 mt-auto pt-2">
              <div className="w-full bg-[#f7f9fa] border border-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#10b981] h-full transition-all duration-1000 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between items-center">
                <p className="text-[10px] font-bold text-[#10b981]">
                  {Math.round(progress)}% Complete
                </p>
                <p className="text-[10px] text-[#6a6f73] italic">
                  {progress === 100 ? "Finished" : "Keep going!"}
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Ratings Section */}
              <div className="flex items-center gap-1 mt-1">
                <span className="text-[#b4690e] font-bold text-sm">
                  {rating.toFixed(1)}
                </span>
                <div className="flex text-[#b4690e]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      fill={i < Math.floor(rating) ? "#b4690e" : "transparent"}
                      strokeWidth={i < Math.floor(rating) ? 0 : 2}
                    />
                  ))}
                </div>
                <span className="text-xs text-[#6a6f73]">
                  ({reviews.toLocaleString()})
                </span>
              </div>

              {/* Price display */}
              <div className="font-bold text-[#2d2f31] mt-auto pt-1">
                ₱{price.toLocaleString()}
              </div>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};
