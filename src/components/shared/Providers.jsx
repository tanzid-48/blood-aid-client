"use client";

import { ThemeProvider } from "@/lib/theme";
import { Toaster } from "sonner";

export default function Providers({ children }) {
  return (
    <ThemeProvider defaultTheme="dark">
      {children}
      <Toaster theme="dark" position="top-center" richColors />
    </ThemeProvider>
  );
}
