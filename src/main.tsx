import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

function applySystemTheme() {
  const mql = window.matchMedia("(prefers-color-scheme: dark)");
  const set = () => document.documentElement.classList.toggle("dark", mql.matches);
  set(); // aplica imediatamente

  // observa mudanças do SO e atualiza
  if (mql.addEventListener) mql.addEventListener("change", set);
  else mql.addListener(set); // fallback para navegadores antigos

  // garante que nenhuma preferência antiga force o tema
  try { localStorage.removeItem("theme-preference"); } catch {}
}

// roda antes do React montar (evita “flash”)
applySystemTheme();

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("#root não encontrado");
createRoot(rootEl).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
