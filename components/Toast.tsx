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
    <div className="fixed top-20 right-4 z-[1000] animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="bg-white border-l-4 border-[#10b981] shadow-2xl rounded-md p-4 flex items-center gap-3 min-w-[300px]">
        <CheckCircle className="text-[#10b981]" size={20} />
        <div className="flex-grow">
          <p className="text-sm font-bold text-[#2d2f31]">{message}</p>
          <p className="text-[10px] text-slate-500">
            Added to your shopping cart.
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-black transition"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};
