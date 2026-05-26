import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { fullName, email, password } = await req.json();

    if (!fullName || !email || !password) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return new NextResponse("Email already in use", { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
    });
  } catch (error) {
    console.error("[SIGNUP_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
