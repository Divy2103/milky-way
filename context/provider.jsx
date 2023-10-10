"use client";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

export default function Provider({ children }) {
  return (
    <SessionProvider>
      <Toaster richColors closeButton />
      {children}
    </SessionProvider>
  );
}
