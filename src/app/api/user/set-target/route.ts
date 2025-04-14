import { connectDb } from "@/lib/database";
import { User } from "@/lib/models/User";
import { checkSessionHelper } from "@/lib/utils/checkSessionHelper";
import { responseError } from "@/lib/utils/responseError";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  await connectDb();
  const { calorieTarget } = await request.json();
  const token = request.headers.get("Authorization")?.split(" ")[1];
  const userId = await checkSessionHelper(token);
  if (!token || !userId) {
    return responseError(401, "Unauthorized");
  }
  if (userId instanceof NextResponse) {
    return userId;
  }

  try {
    const userUpdated = await User.findByIdAndUpdate(userId, {
      calorieTarget: calorieTarget,
    });

    if (!userUpdated) {
      return responseError(404, "User not found");
    }

    return NextResponse.json({
      message: "Calorie target updated successfully",
      user: {
        name: userUpdated.name,
        email: userUpdated.email,
        calorieTarget: userUpdated.calorieTarget,
      },
    });
  } catch (error) {
    return responseError(500, "Internal server error");
  }
}
