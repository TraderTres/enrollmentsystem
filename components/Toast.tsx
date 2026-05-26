"use client";

import { CheckCircle, X } from "lucide-react";
import { useEffect } from "react";

interface ToastProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Toast = ({ message, isOpen, onClose }: ToastProps) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-24 right-6 z-[1000] animate-in fade-in slide-in-from-top-8 duration-300">
      <div className="bg-white/90 backdrop-blur-md border border-slate-200 shadow-lg border-l-4 border-l-violet-500 rounded-xl p-4 flex items-center gap-4 min-w-[320px]">
        <CheckCircle className="text-violet-500" size={24} />
        <div className="flex-grow">
          <p className="text-sm font-bold text-slate-900">{message}</p>
          <p className="text-xs text-slate-500 mt-0.5">
            Added to your learning cart.
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-800 hover:bg-slate-100 p-1 rounded-full transition-smooth"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};
