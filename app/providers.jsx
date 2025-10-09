"use client";

import { ThemeProvider } from "next-themes";
import Provider from "./provider"; // your Supabase/user provider

export default function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Provider>{children}</Provider>
    </ThemeProvider>
  );
}
