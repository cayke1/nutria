
export type MealType = 'breakfast' | 'lunch' | 'snack' | 'dinner';

export interface Meal {
  id: string;
  name: string;
  description: string;
  calories: number;
  datetime: Date;
  type: MealType;
}

export const mealTypeLabels: Record<MealType, string> = {
  breakfast: 'Café da manhã',
  lunch: 'Almoço',
  snack: 'Lanche da tarde',
  dinner: 'Janta',
};

export const mealTypeIcons: Record<MealType, string> = {
  breakfast: 'sun',
  lunch: 'utensils',
  snack: 'coffee',
  dinner: 'moon',
};
