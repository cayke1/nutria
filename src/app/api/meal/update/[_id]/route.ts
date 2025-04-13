import { connectDb } from "@/lib/database";
import { Meal } from "@/lib/models/Meal";
import { checkSessionHelper } from "@/lib/utils/checkSessionHelper";
import { responseError } from "@/lib/utils/responseError";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ _id: string }> }
) {
  await connectDb();

  const body = await request.json();
  const token = request.headers.get("Authorization")?.split(" ")[1];
  const userId = await checkSessionHelper(token);
  if (!token || !userId) {
    return responseError(401, "Token não encontrado");
  }
  if (userId instanceof NextResponse) {
    return userId;
  }
  const { name, description, calories, dateTime, type, isUserFavorite } = body;
  const { _id } = await params;

  try {
    const mealExists = await Meal.findById(_id);
    if (!mealExists) {
      return responseError(404, "Meal not found");
    }
    if (mealExists.userId.toString() !== userId) {
      return responseError(
        401,
        "Usuário não autorizado a atualizar esta refeição"
      );
    }
    const meal = await Meal.findByIdAndUpdate(_id, {
      name,
      description,
      calories,
      dateTime,
      type,
      isUserFavorite,
    });

    return NextResponse.json(meal, { status: 200 });
  } catch (error) {
    console.log(error);
    return responseError(500, "Error updating meal");
  }
}
