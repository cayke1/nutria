import { format } from "date-fns";
import { Flame } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Meal } from "@/@types";

interface CaloriesCardProps {
  meals: Meal[];
}

export function CaloriesCard({ meals }: CaloriesCardProps) {
  const today = new Date();
  const todayString = format(today, "yyyy-MM-dd");

  const todayMeals = meals.filter((meal) => {
    const mealDate = new Date(meal.dateTime);
    return format(mealDate, "yyyy-MM-dd") === todayString;
  });

  const totalCaloriesToday = todayMeals.reduce(
    (total, meal) => total + meal.calories,
    0
  );

  return (
    <Card className="bg-nutria-500 text-white">
      <CardHeader>
        <CardTitle className="flex items-center text-white">
          <Flame className="mr-2" />
          Calorias de Hoje
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="text-4xl font-bold mb-2">{totalCaloriesToday}</div>
        <p className="text-nutria-100">
          kcal consumidas em {format(today, "dd/MM/yyyy")}
        </p>
        <div className="mt-4 space-y-2">
          {todayMeals.length > 0 ? (
            todayMeals.map((meal) => (
              <div
                key={meal._id}
                className="flex justify-between items-center bg-white/10 rounded p-2 text-sm"
              >
                <span>{meal.name}</span>
                <span className="font-semibold">{meal.calories} kcal</span>
              </div>
            ))
          ) : (
            <div className="bg-white/10 rounded p-3 text-center text-sm">
              Nenhuma refeição registrada hoje
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
