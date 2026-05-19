"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "../../lib/store/authStore";
import { checkSession } from "../../lib/api/clientApi";

const privateRoutes = ["/notes", "/profile"];

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, setUser, clearIsAuthenticated } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const isPrivate = privateRoutes.some((route) => pathname.startsWith(route));

  useEffect(() => {
    const verify = async () => {
      try {
        const user = await checkSession();
        if (user) {
          setUser(user);
        } else {
          clearIsAuthenticated();
          if (isPrivate) {
            router.replace("/sign-in");
          }
        }
      } catch {
        clearIsAuthenticated();
        if (isPrivate) {
          router.replace("/sign-in");
        }
      } finally {
        setIsChecking(false);
      }
    };

    verify();
  }, [pathname]);

  if (isChecking && isPrivate) {
    return <p>Loading...</p>;
  }

  if (isPrivate && !isAuthenticated && !isChecking) {
    return null;
  }

  return <>{children}</>;
}