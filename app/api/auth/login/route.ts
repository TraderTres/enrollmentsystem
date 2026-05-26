import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_key";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new NextResponse("Invalid credentials", { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return new NextResponse("Invalid credentials", { status: 401 });
    }

    // Create JWT
    const token = await new SignJWT({ 
      id: user.id, 
      email: user.email,
      fullName: user.fullName 
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(new TextEncoder().encode(JWT_SECRET));

    // Create response
    const response = NextResponse.json({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
    });

    // Set cookie
    response.cookies.set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("[LOGIN_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
