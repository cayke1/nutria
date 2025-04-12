import { connectDb } from "@/lib/database";
import { Meal } from "@/lib/models/Meal";
import { responseError } from "@/lib/utils/responseError";
import { NextRequest, NextResponse } from "next/server";
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ _id: string }> }
) {
  await connectDb();
  const { _id } = await params;
  try {
    const mealExists = await Meal.findById(_id);
    if (!mealExists) {
      return responseError(404, "Meal not found");
    }

    await Meal.deleteOne({ _id });

    return NextResponse.json({ Deleted: true }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) return responseError(500, error.message);
    return responseError(500, "Error deleting meal");
  }
}
