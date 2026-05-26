import { NextResponse } from "next/server";

export async function POST() {
  const response = new NextResponse("Logged out", { status: 200 });

  response.cookies.set({
    name: "auth_token",
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });

  return response;
}
