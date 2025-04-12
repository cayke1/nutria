import { connectDb } from "@/lib/database";
import { Meal } from "@/lib/models/Meal";
import { responseError } from "@/lib/utils/responseError";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectDb();
  const body = await req.json();
  const { name, description, calories, createdAt, updatedAt, dateTime, type } = body;

  try {
    const newMeal = await Meal.create({
      name,
      description,
      calories,
      createdAt,
      updatedAt,
      dateTime,
      type
    });
    return NextResponse.json(newMeal, { status: 201 });
  } catch (error) {
    console.log(error)
    return responseError(500, "Error creating meal");
  }
}
