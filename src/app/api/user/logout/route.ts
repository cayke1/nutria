import { connectDb } from "@/lib/database";
import { Session } from "@/lib/models/Session";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  await connectDb();
  const { cookies } = request;
  const sessionId =  "67faccc9c08646c60308512e"//cookies.get("sessionId")?.value;

  if (!sessionId) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    await Session.deleteOne({ _id: sessionId });
    cookies.delete("sessionId");
    return new Response("Logout successful", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
