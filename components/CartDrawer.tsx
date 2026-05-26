"use client";

import { X, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/lib/CartContext";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { cartItems, total, removeFromCart } = useCart();

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
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-violet-50 rounded-full">
                <ShoppingBag size={20} className="text-violet-600" />
              </div>
              <h2 className="font-extrabold text-xl text-slate-900 tracking-tight">
                Your Cart
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
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-400">
                <ShoppingBag size={48} className="mb-4 opacity-50" />
                <p className="font-semibold text-slate-600">Your cart is empty.</p>
                <p className="text-sm mt-1">Keep shopping to find a course!</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex gap-3 group">
                  <div className="relative aspect-video w-24 h-14 flex-shrink-0 border rounded overflow-hidden">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col flex-grow justify-center">
                    <h3 className="text-sm font-bold text-slate-900 line-clamp-2 leading-tight hover:text-violet-600 transition-all duration-300 ease-in-out cursor-pointer">
                      {item.title}
                    </h3>
                    <p className="text-xs font-bold text-slate-500 mt-1.5">
                      ₱{item.price.toLocaleString()}
                    </p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-slate-400 hover:text-red-500 transition self-start p-1"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer - Checkout Section */}
          <div className="p-6 border-t border-slate-100 bg-slate-50/80 backdrop-blur-md">
            <div className="flex justify-between items-center mb-5">
              <span className="text-slate-500 font-semibold uppercase tracking-wider text-sm">Total:</span>
              <span className="text-2xl font-black text-slate-900 tracking-tight">
                ₱{total.toLocaleString()}
              </span>
            </div>
            <button className="w-full py-4 bg-violet-600 text-white font-bold rounded-xl shadow-[0_4px_14px_0_rgba(124,58,237,0.39)] hover:shadow-[0_6px_20px_rgba(124,58,237,0.23)] hover:bg-violet-700 transition-all duration-300 ease-in-out hover:-translate-y-0.5">
              Checkout Now
            </button>
            <p className="text-xs text-center text-slate-400 mt-4 font-medium">
              *Taxes and discounts calculated at checkout
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
