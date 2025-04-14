import { format } from "date-fns";
import { Edit2, Trash2, Coffee, Sun, Moon, Utensils, Star } from "lucide-react";
import { Meal, mealTypeLabels } from "@/@types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MealCardProps {
  meal: Meal;
  onEdit: (meal: Meal) => void;
  onDelete: (mealId: string) => void;
  onSetFav: (mealId: string) => void;
  onSetUnFav: (mealId: string) => void;
}

export function MealCard({
  meal,
  onEdit,
  onDelete,
  onSetFav,
  onSetUnFav,
}: MealCardProps) {
  const mealTypeIcons = {
    breakfast: Sun,
    lunch: Utensils,
    snack: Coffee,
    dinner: Moon,
  };
  const isTodayMeal = new Date(meal.dateTime) < new Date(Date.now() + 86400000);
  const Icon = mealTypeIcons[meal.type];

  return (
    <Card className={`w-full ${isTodayMeal ? "opacity-50" : ""}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <div className="bg-nutria-100 p-2 rounded-md mr-3">
              <Icon size={18} className="text-nutria-600" />
            </div>
            <CardTitle className="text-lg">{meal.name}</CardTitle>
          </div>
          <Badge
            variant="outline"
            className="bg-nutria-50 text-nutria-700 border-nutria-200"
          >
            {meal.calories} kcal
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-gray-600 text-sm mb-3">{meal.description}</p>

        <div className="flex justify-between items-center text-sm text-gray-500 mt-4">
          <div>
            <Badge variant="secondary" className="mr-2">
              {mealTypeLabels[meal.type]}
            </Badge>
            <span>{format(new Date(meal.dateTime), "dd/MM/yyyy • HH:mm")}</span>
          </div>

          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(meal)}
              className="h-8 w-8 text-gray-500 hover:text-nutria-600"
            >
              <Edit2 size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(meal._id)}
              className="h-8 w-8 text-gray-500 hover:text-red-600"
            >
              <Trash2 size={16} />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                if (!meal.isUserFavorite) onSetFav(meal._id);
                else onSetUnFav(meal._id);
              }}
              className="group h-8 w-8 text-gray-500 hover:text-yellow-300"
            >
              <Star
                size={16}
                className={`${
                  meal.isUserFavorite
                    ? "fill-current text-yellow-300"
                    : "fill-none group-hover:fill-current"
                }`}
              />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
