import { connectDb } from "@/lib/database";
import { Session } from "@/lib/models/Session";
import { responseError } from "@/lib/utils/responseError";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await connectDb();
  const { cookies } = request;
  const sessionId = cookies.get("session_id")?.value;

  if (!sessionId) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    await Session.deleteOne({ _id: sessionId });
    cookies.delete("sessionId");
    const response = new NextResponse("Logout successful", { status: 200 });
    response.cookies.delete("access_token");
    response.cookies.delete("user_id");
    response.cookies.delete("session_id");
    return response;
  } catch (error) {
    console.error(error);
    return responseError(500, "Error logging out");
  }
}
