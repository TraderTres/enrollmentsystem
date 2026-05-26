import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { CartProvider } from "@/lib/CartContext";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nexus LMS | Elevate Your Learning",
  description: "Premium Advanced LMS built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${outfit.className} bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 antialiased`}>
        <CartProvider>
          <Navbar />
          {/* Main content wrapper */}
          <main className="min-h-screen">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
