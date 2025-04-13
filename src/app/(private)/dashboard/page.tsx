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

export default function Dashboard() {
  const { user, token } = useAuth();
  const [meals, setMeals] = useState<Meal[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMeals = async () => {
    if (!isLoading) setIsLoading(true);
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
  useEffect(() => {
    if (isLoading) fetchMeals();
  }, [meals, isLoading]);

  const handleAddMeal = async (newMeal: Omit<Meal, "_id">) => {
    try {
      const res = await fetch("/api/meal/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...newMeal,
        }),
      });

      if (!res.ok) throw new Error("Error creating meal");

      fetchMeals();
      toast.success("Refeição criada com sucesso");
    } catch (error) {
      console.error("Error creating meal:", error);
      toast.error("Erro ao criar refeição", {
        description: "Não foi possível criar a refeição.",
      });
    }
  };

  const handleUpdateMeal = async (
    mealId: string,
    updatedMeal: Omit<Meal, "_id">
  ) => {
    const res = await fetch(`/api/meal/update/${mealId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...updatedMeal,
      }),
    });

    if (!res.ok) {
      console.log(res);
      toast.error("Erro ao atualizar refeição", {
        description: "Não foi possível atualizar a refeição.",
      });
      return;
    }
    fetchMeals();
  };

  const handleDeleteMeal = async (mealId: string) => {
    try {
      const res = await fetch(`/api/meal/delete/${mealId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Error deleting meal");

      fetchMeals();
    } catch (error) {
      console.error("Error deleting meal:", error);
      toast.error("Erro ao deletar refeição", {
        description: "Não foi possível deletar a refeição.",
      });
    }
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
                    meals={meals ? meals : []}
                    onAddMeal={handleAddMeal}
                    onUpdateMeal={handleUpdateMeal}
                    onDeleteMeal={handleDeleteMeal}
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
    </>
  );
}
