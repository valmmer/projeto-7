import { useEffect, useState } from "react";

type Theme = "light" | "dark";
const STORAGE_KEY = "theme-preference";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  // Determina o tema inicial apenas no cliente
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setTheme(saved ?? (systemDark ? "dark" : "light"));
    setMounted(true);
  }, []);

  // Aplica a classe .dark no <html> e salva preferência
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    // Adiciona transição suave
    root.classList.add("theme-transition");
    root.style.setProperty("color-scheme", theme);

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem(STORAGE_KEY, theme);

    // Remove a classe de transição após a animação
    const timeoutId = setTimeout(() => {
      root.classList.remove("theme-transition");
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [theme, mounted]);

  // Evita renderização até determinar o tema (previne flicker)
  if (!mounted) {
    return (
      <div className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-medium shadow-sm dark:border-gray-700 dark:bg-neutral-800">
        <span className="opacity-0">🌙</span>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      aria-pressed={theme === "dark"}
      className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-neutral-800 dark:text-gray-100 dark:hover:bg-neutral-700"
      aria-label={
        theme === "dark" ? "Mudar para tema claro" : "Mudar para tema escuro"
      }
      title={theme === "dark" ? "Mudar para claro" : "Mudar para escuro"}
    >
      <span aria-hidden="true">{theme === "dark" ? "☀️" : "🌙"}</span>
      <span>{theme === "dark" ? "Claro" : "Escuro"}</span>
    </button>
  );
}
