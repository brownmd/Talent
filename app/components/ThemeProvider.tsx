"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme | undefined>(undefined);

  // On mount, read persisted preference
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const stored = localStorage.getItem("theme") as Theme | null;
    let resolvedTheme: Theme = "dark";

    if (stored === "light" || stored === "dark") {
      resolvedTheme = stored;
    }

    setTheme(resolvedTheme);
    document.documentElement.classList.toggle("light", resolvedTheme === "light");
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const current = prev ?? "dark";
      const next: Theme = current === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("light", next === "light");
      localStorage.setItem("theme", next);
      return next;
    });
  };

  if (theme === undefined) {
    // Avoid rendering until theme is resolved on the client to prevent hydration mismatches.
    return null;
  }
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
