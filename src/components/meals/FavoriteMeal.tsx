import { Meal } from "@/@types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { useState } from "react";
import { MealForm } from "./MealForm";
import { useMeal } from "@/lib/contexts/meal-context";

interface FavoriteMealProps {
  favorites: Meal[];
  setIsAddDialogOpen: (isOpen: boolean) => void;
}

export function FavoriteMeal({
  favorites,
  setIsAddDialogOpen,
}: FavoriteMealProps) {
  const { handleAddMeal } = useMeal();
  const [step, setStep] = useState(0);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

  const handleSelectChange = (mealId: string) => {
    const meal = favorites.find((m) => m._id === mealId);
    if (meal) setSelectedMeal(meal);
  };

  const handleRecreateMeal = (meal: Omit<Meal, "_id">) => {
    console.log("Reacreate meal", meal);
    handleAddMeal(meal, localStorage.getItem("access_token") || "");
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (step === 0) {
  //     setStep(1);
  //   } else if (step === 1 && selectedMeal) {
  //     setIsAddDialogOpen(false);
  //   }
  // };

  return (
    <>
      {step === 0 && favorites && favorites.length > 0 && (
        <Select onValueChange={handleSelectChange}>
          <SelectTrigger className="w-full sm:w-[180px] mt-4">
            <SelectValue placeholder="Refeição" />
          </SelectTrigger>
          <SelectContent className="max-h-60 overflow-y-auto">
            {favorites.map((meal) => (
              <SelectItem value={meal._id} key={meal._id}>
                {meal.name} - {meal.description} - {meal.calories} kcal
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {step === 0 && (!favorites || favorites.length === 0) && (
        <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
          <p className="text-gray-500">
            Você ainda não tem refeições favoritas.
          </p>
        </div>
      )}

      {step === 1 && selectedMeal && (
        <MealForm
          meal={selectedMeal}
          onCancel={() => {
            setIsAddDialogOpen(false);
          }}
          onSubmit={(meal) => {
            handleRecreateMeal(meal);
          }}
          repeat
        />
      )}

      {step === 0 && (
        <div className="flex justify-end space-x-2 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsAddDialogOpen(false)}
          >
            Cancelar
          </Button>
          <Button
            className="bg-nutria-500 hover:bg-nutria-600"
            onClick={() => {
              setStep(step + 1);
            }}
          >
            Próximo
          </Button>
        </div>
      )}
    </>
  );
}
