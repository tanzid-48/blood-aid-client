"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

export function useRequireRole(allowedRoles = []) {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (isPending) return;

    // Not logged in → login page
    if (!session) {
      router.push("/auth/login?from=" + window.location.pathname);
      return;
    }

    // Wrong role → unauthorized
    const role = session.user?.role;
    if (!allowedRoles.includes(role)) {
      router.push("/unauthorized");
    }
  }, [session, isPending, router, allowedRoles]);

  return {
    user: session?.user,
    isPending,
    isAuthorized:
      !isPending && session && allowedRoles.includes(session.user?.role),
  };
}
