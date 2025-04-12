import { Schema, model, models } from "mongoose";

const mealSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  calories: { type: Number, required: true },
  datetime: { type: Date, required: true },
  type: {
    type: String,
    enum: ["breakfast", "lunch", "snack", "dinner"],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

mealSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export const Meal = models.Meal || model("Meal", mealSchema);
