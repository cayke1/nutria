"use client";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Meal } from "@/@types";
import { Navbar } from "@/components/layouts/Navbar";
import { Footer } from "@/components/layouts/Footer";
import { MealList } from "@/components/dashboard/MealList";
import { CaloriesCard } from "@/components/dashboard/CaloriesCard";
import { toast } from "sonner";

const initialMeals: Meal[] = [
  {
    id: uuidv4(),
    name: "Café da manhã",
    description: "Pão integral com ovo e suco de laranja",
    calories: 350,
    datetime: new Date(new Date().setHours(7, 30)),
    type: "breakfast",
  },
  {
    id: uuidv4(),
    name: "Almoço",
    description: "Salada com frango grelhado e arroz integral",
    calories: 550,
    datetime: new Date(new Date().setHours(12, 0)),
    type: "lunch",
  },
  {
    id: uuidv4(),
    name: "Lanche da tarde",
    description: "Iogurte com frutas e granola",
    calories: 200,
    datetime: new Date(new Date().setHours(16, 0)),
    type: "snack",
  },
];

export default function Dashboard() {
  const [meals, setMeals] = useState<Meal[]>(initialMeals);

  const handleAddMeal = (newMeal: Omit<Meal, "id">) => {
    const meal = {
      ...newMeal,
      id: uuidv4(),
    };

    setMeals([...meals, meal]);
  };

  const handleUpdateMeal = (mealId: string, updatedMeal: Omit<Meal, "id">) => {
    setMeals(
      meals.map((meal) =>
        meal.id === mealId ? { ...updatedMeal, id: mealId } : meal
      )
    );
  };

  const handleDeleteMeal = (mealId: string) => {
    setMeals(meals.filter((meal) => meal.id !== mealId));

    toast("Refeição excluída", {
      description: "A refeição foi excluída com sucesso.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <MealList
                meals={meals}
                onAddMeal={handleAddMeal}
                onUpdateMeal={handleUpdateMeal}
                onDeleteMeal={handleDeleteMeal}
              />
            </div>

            <div className="lg:col-span-1">
              <CaloriesCard meals={meals} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
