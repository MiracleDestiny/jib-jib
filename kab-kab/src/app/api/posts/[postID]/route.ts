import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { BAD_REQUEST } from "@/backend/config/response-code";

export async function GET() {
  try {
    const posts = await prisma.post.findMany({});
    return NextResponse.json({ data: posts });
  } catch (error) {
    console.error(error);
    return NextResponse.json(BAD_REQUEST, { status: BAD_REQUEST.status });
  }
}
