"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";

// import { Button } from ; // Assuming you have a Button component

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = React.useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center justify-center rounded-md border border-input bg-background text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 w-10"
        aria-haspopup="true"
        aria-expanded={open}
      >
        {theme === "dark" ? (
          <Moon className="h-[1.2rem] w-[1.2rem]" />
        ) : theme === "light" ? (
          <Sun className="h-[1.2rem] w-[1.2rem]" />
        ) : (
          <Monitor className="h-[1.2rem] w-[1.2rem]" />
        )}
        <span className="sr-only">Toggle theme</span>
      </button>
      {open && (
        <div className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <button
              onClick={() => { setTheme("light"); setOpen(false); }}
              className={`w-full text-left px-4 py-2 text-sm ${theme === "light" ? "font-bold" : ""}`}
            >
              <span className="inline-flex items-center gap-2"><Sun className="h-4 w-4" /> Light</span>
            </button>
            <button
              onClick={() => { setTheme("dark"); setOpen(false); }}
              className={`w-full text-left px-4 py-2 text-sm ${theme === "dark" ? "font-bold" : ""}`}
            >
              <span className="inline-flex items-center gap-2"><Moon className="h-4 w-4" /> Dark</span>
            </button>
            <button
              onClick={() => { setTheme("system"); setOpen(false); }}
              className={`w-full text-left px-4 py-2 text-sm ${theme === "system" ? "font-bold" : ""}`}
            >
              <span className="inline-flex items-center gap-2"><Monitor className="h-4 w-4" /> System</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}