"use client";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Meal } from "@/@types";
import { Navbar } from "@/components/layouts/Navbar";
import { Footer } from "@/components/layouts/Footer";
import { MealList } from "@/components/dashboard/MealList";
import { CaloriesCard } from "@/components/dashboard/CaloriesCard";
import { toast } from "sonner";
import { Loader } from "lucide-react";

export default function Dashboard() {
  const [meals, setMeals] = useState<Meal[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchMeals = async () => {
      const res = await fetch("/api/meal/getAll");

      if (!res.ok) {
        console.log(res);
        toast.error("Erro ao buscar refeições", {
          description: "Não foi possível carregar as refeições.",
        });
        return;
      }

      const data = await res.json();
      setMeals(data);
      setIsLoading(false);
    };
    if (isLoading) fetchMeals();
  }, [meals, isLoading]);

  const handleAddMeal = (newMeal: Omit<Meal, "id">) => {
    if (!meals) return;
    const meal = {
      ...newMeal,
      id: uuidv4(),
    };

    setMeals([...meals, meal]);
  };

  const handleUpdateMeal = (mealId: string, updatedMeal: Omit<Meal, "id">) => {
    if (!meals) return;
    setMeals(
      meals.map((meal) =>
        meal._id === mealId ? { ...updatedMeal, id: mealId } : meal
      )
    );
  };

  const handleDeleteMeal = (mealId: string) => {
    if (!meals) return;
    setMeals(meals.filter((meal) => meal._id !== mealId));

    toast("Refeição excluída", {
      description: "A refeição foi excluída com sucesso.",
    });
  };

  return (
    <>
      {isLoading && (
        <div className="flex h-screen w-full items-center justify-center">
          <Loader className="text-green-500 animate-spin" />
        </div>
      )}

      {!isLoading && meals?.length === 0 && (
        <div className="flex h-screen w-full items-center justify-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Nenhuma refeição encontrada
          </h1>
        </div>
      )}

      {!isLoading && meals && meals.length > 0 && (
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                Dashboard
              </h1>

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
      )}
    </>
  );
}
