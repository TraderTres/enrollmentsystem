import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_key";

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get("cookie");
    
    if (!cookieHeader) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const tokenMatch = cookieHeader.match(/auth_token=([^;]+)/);
    const token = tokenMatch ? tokenMatch[1] : null;

    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET)
    );

    return NextResponse.json({
      id: payload.id,
      fullName: payload.fullName,
      email: payload.email,
    });
  } catch (error) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
}
