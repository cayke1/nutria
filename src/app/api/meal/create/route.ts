import { connectDb } from "@/lib/database";
import { Meal } from "@/lib/models/Meal";
import { checkSessionHelper } from "@/lib/utils/checkSessionHelper";
import { responseError } from "@/lib/utils/responseError";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectDb();
  const body = await req.json();
  const token = req.headers.get("Authorization")?.split(" ")[1];
  const userId = await checkSessionHelper(token);
  if (!token || !userId) {
    return responseError(401, "Token não encontrado");
  }
  if (userId instanceof NextResponse) {
    return userId;
  }

  const { name, description, calories, createdAt, updatedAt, dateTime, type } =
    body;

  try {
    const newMeal = await Meal.create({
      name,
      description,
      calories,
      createdAt,
      updatedAt,
      dateTime,
      type,
      userId: new Types.ObjectId(userId),
    });
    return NextResponse.json(newMeal, { status: 201 });
  } catch (error) {
    console.log(error);
    return responseError(500, "Error creating meal");
  }
}
