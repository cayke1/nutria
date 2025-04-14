import { connectDb } from "@/lib/database";
import { Meal } from "@/lib/models/Meal";
import { responseError } from "@/lib/utils/responseError";
import { NextRequest, NextResponse } from "next/server";
import { checkSessionHelper } from "@/lib/utils/checkSessionHelper";

export async function GET(req: NextRequest) {
  await connectDb();
  const token = req.cookies.get("access_token")?.value;
  const userId = await checkSessionHelper(token);
  if (!token || !userId) {
    return responseError(401, "Token não encontrado");
  }
  if (userId instanceof NextResponse) {
    return userId;
  }

  try {
    const meals = await Meal.find({
      userId: userId,
    });
    return NextResponse.json(meals);
  } catch (error) {
    console.log(error);
    return responseError(404, "Meals not found");
  }
}
