import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const applyThemeToHtml = (theme: Theme) => {
  const root = document.documentElement;

  // quitamos ambas clases para evitar acumulaciones
  root.classList.remove("light", "dark");
  root.classList.add(theme);
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "light",

      toggleTheme: () => {
        const next = get().theme === "light" ? "dark" : "light";
        applyThemeToHtml(next);
        set({ theme: next });
      },

      setTheme: (theme) => {
        applyThemeToHtml(theme);
        set({ theme });
      },
    }),
    {
      name: "theme-storage",

      // rehidratación: sincroniza el DOM al cargar
      onRehydrateStorage: () => (state) => {
        if (state?.theme) applyThemeToHtml(state.theme);
      },
    }
  )
);