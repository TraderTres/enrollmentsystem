import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const resolvedParams = await params;
    const courseId = resolvedParams.courseId;

    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });

    if (!course) {
      return new NextResponse("Not Found", { status: 404 });
    }

    return NextResponse.json(course);
  } catch (error) {
    console.error("[COURSE_ID_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
