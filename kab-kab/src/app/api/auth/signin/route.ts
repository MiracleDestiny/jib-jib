import { NextRequest, NextResponse } from "next/server";
import { BAD_REQUEST, SUCCESS_OK } from "@/backend/config/response-code";
import { postAuthSignInZodType } from "@/backend/types/auth";
import { authenticateLogin } from "@/utils/auth";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as postAuthSignInZodType;
    console.log(body);
    const authenticated = await authenticateLogin(body.usernameemail, body.password);
    if (authenticated) {
      const { user, session } = authenticated;
      const cookieOptions = [
        `sessionToken=${session.sessionToken}`,
        "Path=/",
        "HttpOnly", // Prevents access to cookies via JavaScript
        "Secure", // Ensures cookies are sent only over HTTPS
        "SameSite=Strict", // Helps prevent CSRF attacks
        "Max-Age=86400", // Sets cookie expiration time (24 hours here)
      ].join("; ");
      Cookies.set("sessionToken", session.sessionToken);
      return NextResponse.json(
        { data: { user, session } },
        {
          status: SUCCESS_OK.status,
          headers: { "Set-Cookie": cookieOptions },
        }
      );
    }
    return NextResponse.json(BAD_REQUEST, { status: BAD_REQUEST.status });
  } catch (error) {
    console.error(error);
    return NextResponse.json(BAD_REQUEST, { status: BAD_REQUEST.status });
  }
}
