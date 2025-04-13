"use client";
import { AuthProvider } from "@/lib/contexts/auth-context";
import { Toaster } from "sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster />
      <AuthProvider>{children}</AuthProvider>
    </>
  );
}
