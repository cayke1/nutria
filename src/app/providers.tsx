"use client";
import { AuthProvider } from "@/lib/contexts/auth-context";
import { MealProvider } from "@/lib/contexts/meal-context";
import { Toaster } from "sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster />
      <AuthProvider>
        <MealProvider>{children}</MealProvider>
      </AuthProvider>
    </>
  );
}
