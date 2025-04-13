"use client";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Meal } from "@/@types";
import { Navbar } from "@/components/dashboard/layout/Navbar";
import { Footer } from "@/components/layouts/Footer";
import { MealList } from "@/components/dashboard/MealList";
import { CaloriesCard } from "@/components/dashboard/CaloriesCard";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { useAuth } from "@/lib/contexts/auth-context";
import { useMeal } from "@/lib/contexts/meal-context";
import { TestPopover } from "@/components/meals/test";

export default function Dashboard() {
  const { user, token } = useAuth();
  const {
    handleAddMeal,
    handleDeleteMeal,
    handleAddAsFav,
    handleRemoveAsFav,
    handleUpdateMeal,
    meals,
    favorites,
    isLoading: isLoadingMeals,
  } = useMeal();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoadingMeals) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [isLoadingMeals]);

  const addMeal = async (meal: Omit<Meal, "_id">) => {
    if (!token) return;
    const newMeal = { ...meal, _id: uuidv4() };
    await handleAddMeal(newMeal, token);
  };

  const updateMeal = async (mealId: string, updatedMeal: Omit<Meal, "_id">) => {
    if (!token) return;
    await handleUpdateMeal(mealId, updatedMeal, token);
  };

  const deleteMeal = async (mealId: string) => {
    if (!token) return;
    await handleDeleteMeal(mealId, token);
  };

  const setFavMeal = async (mealId: string) => {
    if (!token) return;
    await handleAddAsFav(mealId, token);
  };

  const setUnFavMeal = async (mealId: string) => {
    if (!token) return;
    await handleRemoveAsFav(mealId, token);
  };

  return (
    <>
      {isLoading && (
        <div className="flex h-screen w-full items-center justify-center">
          <Loader className="text-green-500 animate-spin" />
        </div>
      )}

      {!isLoading && (
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                Olá {user?.name}, bem-vindo!
              </h1>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3">
                  <MealList
                    favorites={favorites ? favorites : []}
                    meals={meals ? meals : []}
                    onAddMeal={addMeal}
                    onUpdateMeal={updateMeal}
                    onDeleteMeal={deleteMeal}
                    onSetFavoriteMeal={setFavMeal}
                    onSetUnfavoriteMeal={setUnFavMeal}
                  />
                </div>

                <div className="lg:col-span-1">
                  <CaloriesCard meals={meals ? meals : []} />
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      )}

      <TestPopover />
    </>
  );
}
