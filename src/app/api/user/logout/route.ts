import { connectDb } from "@/lib/database";
import { Session } from "@/lib/models/Session";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await connectDb();
  const { cookies } = request;
  const sessionId = cookies.get("sessionId")?.value;

  if (!sessionId) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    await Session.deleteOne({ _id: sessionId });
    cookies.delete("sessionId");
    const response = new NextResponse("Logout successful", { status: 200 });
    response.cookies.delete("access_code");
    response.cookies.delete("user_id");
    response.cookies.delete("session_id");
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
