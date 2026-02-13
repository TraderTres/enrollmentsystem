"use client";

import { X, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const cartItems = [
    {
      id: "1",
      title: "Full-Stack Web Development: HTML and CSS",
      price: 1999,
      thumbnail: "https://images.unsplash.com/photo-1587620962725-abab7fe55159",
    },
    {
      id: "8",
      title: "Next.js 15: The Complete Guide",
      price: 2800,
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
    },
  ];

  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <>
      {/* Dark Overlay/Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 z-[100] transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={onClose}
      />

      {/* Sliding Drawer Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-[101] shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col h-full">
          {/* Drawer Header */}
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} className="text-[#a435f0]" />
              <h2 className="font-bold text-lg text-[#2d2f31]">
                Shopping Cart
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-full transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-3 group">
                <div className="relative aspect-video w-24 h-14 flex-shrink-0 border rounded overflow-hidden">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col flex-grow">
                  <h3 className="text-xs font-bold text-[#2d2f31] line-clamp-2 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-[10px] text-slate-500 mt-1">
                    ₱{item.price.toLocaleString()}
                  </p>
                </div>
                <button className="text-slate-400 hover:text-red-500 transition self-start p-1">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>

          {/* Drawer Footer - Checkout Section */}
          <div className="p-6 border-t bg-slate-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-600 font-medium">Total:</span>
              <span className="text-xl font-bold text-[#2d2f31]">
                ₱{total.toLocaleString()}
              </span>
            </div>
            <button className="w-full py-3 bg-[#a435f0] text-white font-bold rounded hover:bg-[#8710d8] transition shadow-md">
              Checkout Now
            </button>
            <p className="text-[10px] text-center text-slate-500 mt-3 italic">
              *Taxes and discounts calculated at checkout
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
