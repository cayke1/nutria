import { connectDb } from "@/lib/database";
import { User } from "@/lib/models/User";
import { responseError } from "@/lib/utils/responseError";
import { sendEmail } from "@/lib/utils/sendEmail";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectDb();
  const body = await req.json();
  const { email } = body;
  try {
    const userExists = await User.findOne({ email });
    if (!userExists) return responseError(404, "User not found");
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const result = await sendEmail(
      userExists.email,
      code,
      userExists.name
    );
    if (result instanceof Error) {
      throw result;
    }

    const userUpdated = await User.updateOne(
      {
        email,
      },
      {
        code: code,
      }
    );
    console.log(userUpdated);
    return NextResponse.json({ UserCreated: "OK" }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) return responseError(500, error.message);
    return responseError(500, "Error sending code");
  }
}
