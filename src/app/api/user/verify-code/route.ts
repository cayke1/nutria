import { connectDb } from "@/lib/database";
import { Session } from "@/lib/models/Session";
import { User } from "@/lib/models/User";
import { responseError } from "@/lib/utils/responseError";
import { generateToken } from "@/lib/utils/token";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectDb();
  const body = await req.json();
  const { email, code } = body;
  try {
    const userExists = await User.findOne({
      email,
    });
    if (!userExists) return responseError(404, "User not found");
    if (userExists.code !== code) return responseError(401, "Invalid code");
    const session = await Session.create({
      userId: userExists._id,
      token: generateToken({ userId: userExists._id as string, code }),
    });

    const response = NextResponse.json(session, { status: 201 });
    response.cookies.set("access_token", session.token, {
      path: "/",
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
      secure: true,
      httpOnly: false,
    });

    response.cookies.set("user_id", userExists._id, {
      path: "/",
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
      secure: true,
      httpOnly: true,
    });

    response.cookies.set("session_id", session._id, {
      path: "/",
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
      secure: true,
      httpOnly: true,
    });

    return response;
  } catch (error) {
    console.log(error);
    return responseError(500, "Error creating session");
  }
}
