"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";

import { ThemeProvider as NextThemesProvider } from "next-themes";

type Theme = "light" | "dark" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  actualTheme: "light" | "dark";
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  actualTheme: "light",
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

// export function ThemeProvider({
//   children,
//   defaultTheme = "system",
//   storageKey = "ai-hub-theme",
// }: ThemeProviderProps) {
//   const [theme, setTheme] = useState<Theme>(() => {
//     // 在服务器端渲染时使用默认主题
//     if (typeof window === "undefined") {
//       return defaultTheme;
//     }

//     // 在客户端初始化时从localStorage获取主题
//     const storedTheme = localStorage.getItem(storageKey) as Theme;
//     return storedTheme || defaultTheme;
//   });

//   const [actualTheme, setActualTheme] = useState<"light" | "dark">(() => {
//     // 初始化时就计算实际主题
//     if (typeof window !== "undefined") {
//       const storedTheme = localStorage.getItem(storageKey) as Theme;
//       const initialTheme = storedTheme || defaultTheme;

//       if (initialTheme === "system") {
//         return window.matchMedia("(prefers-color-scheme: dark)").matches
//           ? "dark"
//           : "light";
//       } else {
//         return initialTheme;
//       }
//     }
//     return "light";
//   });

//   useEffect(() => {
//     const root = window.document.documentElement;
//     root.classList.remove("light", "dark");

//     let resolvedTheme: "light" | "dark";

//     if (theme === "system") {
//       resolvedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
//         ? "dark"
//         : "light";
//     } else {
//       resolvedTheme = theme;
//     }

//     root.classList.add(resolvedTheme);
//     setActualTheme(resolvedTheme);

//     // 添加监听器以响应系统主题变化
//     const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
//     const handleChange = () => {
//       if (theme === "system") {
//         const newTheme = mediaQuery.matches ? "dark" : "light";
//         root.classList.remove("light", "dark");
//         root.classList.add(newTheme);
//         setActualTheme(newTheme);
//       }
//     };

//     mediaQuery.addEventListener("change", handleChange);
//     return () => mediaQuery.removeEventListener("change", handleChange);
//   }, [theme]);

//   const value = {
//     theme,
//     setTheme: (theme: Theme) => {
//       localStorage.setItem(storageKey, theme);
//       setTheme(theme);
//     },
//     actualTheme,
//   };

//   return (
//     <ThemeProviderContext.Provider value={value}>
//       {children}
//     </ThemeProviderContext.Provider>
//   );
// }

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
      {...props}>
      {children}
    </NextThemesProvider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
