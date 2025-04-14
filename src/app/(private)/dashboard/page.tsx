"use client";
import { useEffect, useState } from "react";
import { Meal } from "@/@types";
import { Navbar } from "@/components/dashboard/layout/Navbar";
import { Footer } from "@/components/layouts/Footer";
import { MealList } from "@/components/dashboard/MealList";
import { CaloriesCard } from "@/components/dashboard/CaloriesCard";
import { Loader } from "lucide-react";
import { useAuth } from "@/lib/contexts/auth-context";
import { useMeal } from "@/lib/contexts/meal-context";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { KcalInput } from "@/components/helpers/InputMask";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { user, token, setCalorieTarget } = useAuth();
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
  const [showDialog, setShowDialog] = useState(false);
  const [kcalTarget, setKcalTarget] = useState<string>("");

  useEffect(() => {
    if (isLoadingMeals) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }

    if (user) {
      const neverShowCalorieTarget = localStorage.getItem(
        "neverShowCalorieTarget"
      );
      if (!neverShowCalorieTarget) {
        if (!user.calorieTarget) {
          setShowDialog(true);
        }
      }
    }
  }, [isLoadingMeals, user]);

  const addMeal = async (meal: Omit<Meal, "_id">) => {
    if (!token) return;
    await handleAddMeal(meal, token);
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

  const handleAddCalorieTarget = async () => {
    await setCalorieTarget(Number(kcalTarget.replace(/\D/g, "")));
    setShowDialog(false);
  };

  const handleNeverShowAgain = async () => {
    localStorage.setItem("neverShowCalorieTarget", "true");
    setShowDialog(false);
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
                  <CaloriesCard
                    meals={meals ? meals : []}
                    userCaloriesTarget={user?.calorieTarget}
                  />
                </div>
              </div>
            </div>
          </main>
          <Footer />

          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogContent className="sm:max-w-md px-8">
              <DialogHeader>
                <DialogTitle className="text-center text-xl font-semibold">
                  Deseja adicionar uma meta calórica diária?
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <KcalInput
                  placeholder="Meta calórica"
                  value={kcalTarget}
                  onChange={setKcalTarget}
                />
                <div className="flex flex-col gap-4 justify-center mt-4">
                  <Button
                    onClick={handleAddCalorieTarget}
                    className="w-full bg-green-500 hover:bg-green-600 text-white"
                  >
                    Adicionar Meta
                  </Button>
                  <Button
                    onClick={handleNeverShowAgain}
                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700"
                  >
                    Não exibir novamente
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </>
  );
}
