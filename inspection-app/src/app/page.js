"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function HomeRedirect() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // router.replace("/dashboard");
      router.replace("/demo");
    } else {
      // router.replace("/landing");
      router.replace("/demo");
    }
  }, [user]);

  return null;
}
