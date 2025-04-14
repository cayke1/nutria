import { format } from "date-fns";
import { Flame, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Meal } from "@/@types";
import { Progress } from "@/components/ui/progress";

interface CaloriesCardProps {
  meals: Meal[];
  userCaloriesTarget?: number;
}

export function CaloriesCard({ meals, userCaloriesTarget }: CaloriesCardProps) {
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

  // Calculate remaining calories if target exists
  const hasCalorieTarget = typeof userCaloriesTarget === "number";
  const remainingCalories = hasCalorieTarget 
    ? userCaloriesTarget - totalCaloriesToday 
    : null;
  
  // Calculate percentage for progress bar
  const caloriePercentage = hasCalorieTarget 
    ? Math.min(Math.round((totalCaloriesToday / userCaloriesTarget!) * 100), 100)
    : 0;

  return (
    <Card className="bg-accent-500 text-white">
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

        {hasCalorieTarget && (
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <Target size={16} className="mr-1" />
                <span>Meta diária:</span>
              </div>
              <span className="font-semibold">{userCaloriesTarget} kcal</span>
            </div>
            
            <Progress 
              value={caloriePercentage} 
              className="h-2 bg-white/20" 
            />
            
            <div className="flex justify-between mt-2">
              <span className="text-xs text-nutria-100">
                {caloriePercentage}% da meta
              </span>
              <span className={`font-medium ${remainingCalories! < 0 ? 'text-red-300' : 'text-nutria-100'}`}>
                {remainingCalories! < 0 
                  ? `${Math.abs(remainingCalories!)} kcal acima` 
                  : `${remainingCalories} kcal restantes`}
              </span>
            </div>
          </div>
        )}

        <div className="mt-4 space-y-2">
          <h3 className="text-sm font-semibold text-nutria-100 mb-2">
            Refeições de hoje
          </h3>
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