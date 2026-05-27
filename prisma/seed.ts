import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from '@prisma/adapter-libsql';

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL || "file:./dev.db",
  authToken: process.env.TURSO_AUTH_TOKEN,
});
const prisma = new PrismaClient({ adapter });

const webDevVideo =
  "https://assets.mixkit.co/videos/preview/mixkit-hands-typing-on-a-laptop-keyboard-in-close-up-shot-1588-large.mp4";
const designVideo =
  "https://assets.mixkit.co/videos/preview/mixkit-designer-drawing-on-a-tablet-with-a-stylus-333-large.mp4";
const cyberVideo =
  "https://assets.mixkit.co/videos/preview/mixkit-hacker-typing-on-a-keyboard-with-green-code-on-screen-4878-large.mp4";

const seedCourses = [
  {
    id: "1",
    title: "Full-Stack Web Development: HTML and CSS",
    instructor: "Willy Jaranilla III",
    imageUrl: "https://images.unsplash.com/photo-1587620962725-abab7fe55159",
    previewVideoUrl: webDevVideo,
    price: 1999,
    category: "Web Development",
    progress: 45,
    tag: "Bestseller",
    isPublished: true,
  },
  {
    id: "2",
    title: "Advanced Inventory System Architecture",
    instructor: "John Doe",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    previewVideoUrl: null,
    price: 2499,
    category: "Software Systems",
    progress: null,
    tag: "Trending",
    isPublished: true,
  },
  {
    id: "3",
    title: "UI/UX Foundations for Developers",
    instructor: "Alex Rivera",
    imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5",
    previewVideoUrl: designVideo,
    price: 1999,
    category: "Design",
    progress: 100,
    tag: "Hot",
    isPublished: true,
  },
  {
    id: "6",
    title: "Ethical Hacking: Cybersecurity Essentials",
    instructor: "Mark Anthony",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
    previewVideoUrl: cyberVideo,
    price: 3500,
    category: "Cybersecurity",
    progress: null,
    tag: null,
    isPublished: true,
  },
  {
    id: "8",
    title: "Next.js 15: The Complete Guide",
    instructor: "Willy Jaranilla III",
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
    previewVideoUrl: null,
    price: 2800,
    category: "Web Development",
    progress: null,
    tag: "New",
    isPublished: true,
  },
];

async function main() {
  console.log("Seeding database...");

  // Clear existing courses to avoid duplicates on re-seed
  await prisma.course.deleteMany({});

  for (const course of seedCourses) {
    await prisma.course.create({
      data: {
        id: course.id,
        title: course.title,
        instructor: course.instructor,
        imageUrl: course.imageUrl,
        previewVideoUrl: course.previewVideoUrl,
        price: course.price,
        category: course.category,
        progress: course.progress,
        tag: course.tag,
        isPublished: course.isPublished,
      },
    });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
