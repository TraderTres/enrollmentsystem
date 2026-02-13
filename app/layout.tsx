import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tresify | Learning Enrollment System",
  description: "Advanced LMS built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-[#2d2f31]`}>
        <Navbar />
        {/* Main content wrapper */}
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
