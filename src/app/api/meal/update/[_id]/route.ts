import { connectDb } from "@/lib/database";
import { Meal } from "@/lib/models/Meal";
import { responseError } from "@/lib/utils/responseError";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ _id: string }> }
) {
  await connectDb();

  const body = await request.json();
  const { name, description, calories, dateTime, type } = body;
  const { _id } = await params;

  try {
    const mealExists = await Meal.findById(_id);
    if (!mealExists) {
      return responseError(404, "Meal not found");
    }
    const meal = await Meal.findByIdAndUpdate(_id, {
      name,
      description,
      calories,
      dateTime,
      type,
    });

    return NextResponse.json(meal, { status: 200 });
  } catch (error) {
    console.log(error);
    return responseError(500, "Error updating meal");
  }
}
