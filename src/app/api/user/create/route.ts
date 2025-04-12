import { connectDb } from "@/lib/database";
import { User } from "@/lib/models/User";
import { responseError } from "@/lib/utils/responseError";
import { sendEmail } from "@/lib/utils/sendEmail";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectDb();
  const body = await req.json();
  const { name, email } = body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return responseError(409, "User already exists");
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const user = await User.create({
      name,
      email,
      code,
    });

    const result = await sendEmail(user.email, user.code, user.name);
    if (result instanceof Error) {
      await User.deleteOne({ _id: user._id });
      throw result;
    }
    return NextResponse.json({ UserCreated: "OK" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return responseError(500, "Error creating user");
  }
}
