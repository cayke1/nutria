"use client";

import { useAuth } from "@/lib/contexts/auth-context";
import { useEffect } from "react";

export default function Page() {
  const { logout } = useAuth();
  useEffect(() => {
    logout();
  });

  return <></>;
}
