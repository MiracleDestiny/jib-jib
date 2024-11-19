import { NextRequest, NextResponse } from "next/server";
import { BAD_REQUEST } from "@/backend/config/response-code";
import { postAuthSignInZodType } from "@/backend/types/auth";
import { authenticateLogin } from "@/utils/auth";
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as postAuthSignInZodType;
    console.log(body);
    const authenticated = await authenticateLogin(body.usernameemail, body.password);
    if (authenticated) {
      const { user, session } = authenticated;
      return NextResponse.json({ data: { user, session } });
    }
    return NextResponse.json(BAD_REQUEST, { status: BAD_REQUEST.status });
  } catch (error) {
    console.error(error);
    return NextResponse.json(BAD_REQUEST, { status: BAD_REQUEST.status });
  }
}
