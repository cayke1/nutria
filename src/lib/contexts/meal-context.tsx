import { Meal } from "@/@types";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

interface MealContextType {
  meals: Meal[] | null;
  isLoading: boolean;
  handleAddMeal: (newMeal: Omit<Meal, "_id">, token: string) => Promise<void>;
  handleUpdateMeal: (
    mealId: string,
    updatedMeal: Omit<Meal, "_id">,
    token: string
  ) => Promise<void>;
  handleDeleteMeal: (mealId: string, token: string) => Promise<void>;
  handleAddAsFav: (mealId: string, token: string) => Promise<void>;
  handleRemoveAsFav: (mealId: string, token: string) => Promise<void>;
  favorites: Meal[] | null;
}

const MealContext = createContext<MealContextType | undefined>(undefined);

export function MealProvider({ children }: { children: React.ReactNode }) {
  const [meals, setMeals] = useState<Meal[] | null>(null);
  const [favorites, setFavorites] = useState<Meal[] | null>(null);
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
    setFavorites(data.filter((meal: Meal) => meal.isUserFavorite));
    setIsLoading(false);
  };

  const hardFetch = async () => {
    const res = await fetch("/api/meal/getAll");
    const data = await res.json();
    if (res.ok) {
      setMeals(data);
      setFavorites(data.filter((meal: Meal) => meal.isUserFavorite));
    }
  };
  useEffect(() => {
    if (isLoading) fetchMeals();
  }, [meals, isLoading]);

  const handleAddMeal = async (newMeal: Omit<Meal, "_id">, token: string) => {
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
    updatedMeal: Omit<Meal, "_id">,
    token: string
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

  const handleDeleteMeal = async (mealId: string, token: string) => {
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

  const handleAddAsFav = async (mealId: string, token: string) => {
    const meal = meals?.find((meal) => meal._id === mealId);
    const updatedMeal = { ...meal, isUserFavorite: true };
    try {
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
      hardFetch();
      toast.success("Refeição adicionada aos favoritos");
    } catch (error) {
      console.error("Error adding meal to favorites:", error);
      toast.error("Erro ao adicionar refeição aos favoritos", {
        description: "Não foi possível adicionar a refeição aos favoritos.",
      });
    }
  };

  const handleRemoveAsFav = async (mealId: string, token: string) => {
    const meal = meals?.find((meal) => meal._id === mealId);
    const updatedMeal = { ...meal, isUserFavorite: false };
    try {
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
      hardFetch();

      toast.success("Refeição removida dos favoritos");
    } catch (error) {
      console.error("Error adding meal to favorites:", error);
      toast.error("Erro ao adicionar refeição aos favoritos", {
        description: "Não foi possível remover a refeição dos favoritos.",
      });
    }
  };

  return (
    <MealContext.Provider
      value={{
        meals,
        isLoading,
        handleAddMeal,
        handleUpdateMeal,
        handleDeleteMeal,
        handleAddAsFav,
        handleRemoveAsFav,
        favorites,
      }}
    >
      {children}
    </MealContext.Provider>
  );
}

export const useMeal = () => {
  const context = useContext(MealContext);
  if (!context) {
    throw new Error("useMeal must be used within a MealProvider");
  }
  return context;
};
