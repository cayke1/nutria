import { Schema, model, models } from "mongoose";

const mealSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  calories: { type: Number, required: true },
  dateTime: { type: String, required: true },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isUserFavorite: { type: Boolean, default: false },
  type: {
    type: String,
    enum: ["breakfast", "lunch", "snack", "dinner"],
    required: true,
  },
  createdAt: { type: String, default: Date.now },
  updatedAt: { type: String, default: Date.now },
});

mealSchema.pre("save", function (next) {
  this.updatedAt = new Date().toISOString();
  next();
});

export const Meal = models.Meal || model("Meal", mealSchema);
