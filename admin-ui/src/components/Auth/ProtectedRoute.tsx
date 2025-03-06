"use client";

import { refreshAccessToken, useAuth } from "@/context/auth-context";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { accessToken, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!accessToken && !loading) {
      router.replace("/sign-in");
    }
  }, [accessToken, pathname, router]);

  if (loading) {
    return null // Prevents infinite redirect
  }

  return <>{children}</>;
};

export default ProtectedRoute;
