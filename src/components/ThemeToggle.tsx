import { useEffect, useState } from "react";

type Theme = "light" | "dark";
const STORAGE_KEY = "theme-preference";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  // 1) ler preferência (ou sistema) só no cliente
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initial: Theme =
        saved === "dark" || saved === "light"
          ? (saved as Theme)
          : prefersDark
          ? "dark"
          : "light";
      setTheme(initial);
    } catch {
      setTheme("light");
    } finally {
      setMounted(true);
    }
  }, []);

  // 2) aplicar/remover classe e persistir (somente após mounted)
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {}
  }, [theme, mounted]);

  // 3) sincronizar com outras abas
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setTheme(e.newValue === "dark" ? "dark" : "light");
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  if (!mounted) {
    // placeholder estável até terminar a leitura
    return (
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800"
        aria-hidden="true"
        tabIndex={-1}
        disabled
      >
        <span>🌗</span>
        <span>Tema</span>
      </button>
    );
  }

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={theme === "dark"}
      aria-label={theme === "dark" ? "Mudar para tema claro" : "Mudar para tema escuro"}
      title={theme === "dark" ? "Mudar para claro" : "Mudar para escuro"}
      className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
    >
      <span aria-hidden="true">{theme === "dark" ? "☀️" : "🌙"}</span>
      <span>{theme === "dark" ? "Claro" : "Escuro"}</span>
    </button>
  );
}
