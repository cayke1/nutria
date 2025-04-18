import { useState } from "react";
import { Meal, MealType, mealTypeLabels } from "@/@types";
import { MealCard } from "@/components/meals/MealCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MealForm } from "@/components/meals/MealForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { FavoriteMeal } from "../meals/FavoriteMeal";

interface MealListProps {
  meals: Meal[];
  favorites: Meal[];
  onAddMeal: (meal: Omit<Meal, "_id">) => void;
  onUpdateMeal: (mealId: string, meal: Omit<Meal, "_id">) => void;
  onDeleteMeal: (mealId: string) => void;
  onSetFavoriteMeal: (mealId: string) => void;
  onSetUnfavoriteMeal: (mealId: string) => void;
}

export function MealList({
  meals,
  onAddMeal,
  onUpdateMeal,
  onDeleteMeal,
  onSetFavoriteMeal,
  onSetUnfavoriteMeal,
  favorites,
}: MealListProps) {
  const [selectedMealType, setSelectedMealType] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

  const filteredMeals =
    selectedMealType === "all"
      ? meals
      : meals.filter((meal) => meal.type === selectedMealType);

  const handleEdit = (meal: Meal) => {
    setSelectedMeal(meal);
    setIsEditDialogOpen(true);
  };

  const handleUpdate = (updatedMeal: Omit<Meal, "_id">) => {
    if (selectedMeal) {
      onUpdateMeal(selectedMeal._id, updatedMeal);
      setIsEditDialogOpen(false);
      setSelectedMeal(null);
    }
  };

  return (
    <>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <h2 className="text-2xl font-bold text-gray-800">Suas refeições</h2>

          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
            <Select
              value={selectedMealType}
              onValueChange={setSelectedMealType}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Tipo de refeição" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as refeições</SelectItem>
                {(Object.keys(mealTypeLabels) as MealType[]).map((type) => (
                  <SelectItem key={type} value={type}>
                    {mealTypeLabels[type]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              onClick={() => setIsAddDialogOpen(true)}
              className="bg-nutria-500 hover:bg-nutria-600"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Nova Refeição
            </Button>
          </div>
        </div>

        {filteredMeals.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
            <p className="text-gray-500">
              {selectedMealType === "all"
                ? "Você ainda não cadastrou nenhuma refeição."
                : `Você ainda não cadastrou refeições do tipo ${
                    mealTypeLabels[selectedMealType as MealType]
                  }.`}
            </p>
            <Button
              variant="link"
              onClick={() => setIsAddDialogOpen(true)}
              className="mt-2 text-nutria-600"
            >
              Adicionar uma nova refeição
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMeals.map((meal) => (
              <MealCard
                key={meal._id}
                meal={meal}
                onEdit={handleEdit}
                onDelete={onDeleteMeal}
                onSetFav={onSetFavoriteMeal}
                onSetUnFav={onSetUnfavoriteMeal}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add Meal Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px] p-8">
          <Tabs defaultValue="add-new" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="add-new">Adicionar Refeição</TabsTrigger>
              <TabsTrigger value="select-fav">
                Selecionar dos Favoritos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="add-new">
              <DialogHeader>
                <DialogTitle className="mt-4">
                  Adicionar Nova Refeição
                </DialogTitle>
              </DialogHeader>
              <MealForm
                onSubmit={(meal) => {
                  onAddMeal(meal);
                  setIsAddDialogOpen(false);
                }}
                onCancel={() => setIsAddDialogOpen(false)}
              />
            </TabsContent>

            <TabsContent value="select-fav">
              <DialogHeader>
                <DialogTitle className="mt-4">
                  Selecionar dos Favoritos
                </DialogTitle>
              </DialogHeader>
              <FavoriteMeal
                favorites={favorites}
                setIsAddDialogOpen={setIsAddDialogOpen}
              />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Edit Meal Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Editar Refeição</DialogTitle>
          </DialogHeader>
          {selectedMeal && (
            <MealForm
              meal={selectedMeal}
              onSubmit={handleUpdate}
              onCancel={() => {
                setIsEditDialogOpen(false);
                setSelectedMeal(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
