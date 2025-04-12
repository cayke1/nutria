export interface Meal {
  id: string;
  name: string;
  description: string;
  calories: number;
  datetime: Date;
  type: "breakfast" | "lunch" | "snack" | "dinner";
  createdAt?: Date;
  updatedAt?: Date;
}
