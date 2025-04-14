import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  code: { type: String, required: false },
  createdAt: { type: String, default: Date.now },
  updatedAt: { type: String, default: Date.now },
  calorieTarget: { type: Number, required: false },
});

userSchema.pre("save", function (next) {
  this.updatedAt = new Date().toISOString();
  next();
});

export const User = models.User || model("User", userSchema);
