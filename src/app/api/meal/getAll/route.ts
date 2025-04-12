import { connectDb } from "@/lib/database";
import { Meal } from "@/lib/models/Meal";
import { responseError } from "@/lib/utils/responseError";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectDb();
  try {
    const meals = await Meal.find({});
    return NextResponse.json(meals);
  } catch (error) {
    console.log(error);
    return responseError(404, "Meals not found");
  }
}
