// src/components/Filters.tsx
import type { KeyboardEvent } from "react";
import type { Filter } from "../types";

// rótulo curto (mobile) e longo (>= sm)
const OPTIONS: ReadonlyArray<{
  id: Filter;
  short: string;
  label: string;
  icon: string;
}> = [
  { id: "all", short: "Todas", label: "Todas", icon: "🗂️" },
  { id: "pending", short: "Pend.", label: "Pendentes", icon: "🕓" },
  { id: "done", short: "Concl.", label: "Concluídas", icon: "✅" },
];

type Props = {
  value: Filter;
  onChange: (v: Filter) => void;
  // Tornando counts opcional para evitar erros
  counts?: {
    all: number;
    pending: number;
    done: number;
  };
};

/**
 * Filtros responsivos:
 * - Mobile: inline-flex rolável (overflow-x), rótulos curtos, botões arredondados independentes.
 * - ≥ sm   : "pill group" compacto com uma borda só e rótulos completos.
 * Acessível: setas ←/→ e ↑/↓ também mudam o filtro.
 */
export default function Filters({ value, onChange, counts }: Props) {
  const handleKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = OPTIONS.findIndex((o) => o.id === value);
    if (i < 0) return;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      onChange(OPTIONS[(i + 1) % OPTIONS.length].id);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      onChange(OPTIONS[(i - 1 + OPTIONS.length) % OPTIONS.length].id);
    }
  };

  return (
    <div
      role="tablist"
      aria-label="Filtro de tarefas"
      className="w-full sm:w-auto"
      onKeyDown={handleKey}
    >
      {/* Wrapper com rolagem horizontal no mobile */}
      <div className="overflow-x-auto [-webkit-overflow-scrolling:touch]">
        {/* 
          Mobile: botões soltos com gap (min-w-max garante que não quebrem).
          ≥ sm  : vira um grupo compacto com uma borda só.
        */}
        <div
          className="
          inline-flex min-w-max gap-2
          sm:gap-0 sm:overflow-hidden sm:rounded-xl sm:border sm:border-gray-300 sm:bg-white sm:shadow-sm dark:sm:border-gray-700 dark:sm:bg-neutral-800
        "
        >
          {OPTIONS.map((opt) => {
            const active = value === opt.id;
            // Valor padrão para count caso counts não seja fornecido
            const count = counts ? counts[opt.id] : 0;

            return (
              <button
                key={opt.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onChange(opt.id)}
                className={[
                  // base
                  "shrink-0 whitespace-nowrap text-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                  // tamanhos: menor no mobile, maior no desktop
                  "px-3 py-2 text-xs sm:px-4 sm:text-sm",
                  // MOBILE: cada um é um "pill" com sua própria borda/rounded
                  "rounded-full border border-gray-300 bg-white dark:border-gray-700 dark:bg-neutral-800",
                  // DESKTOP: tira borda/rounded pra formar grupo único
                  "sm:rounded-none sm:border-0 dark:sm:border-0",
                  // estado visual
                  active
                    ? "bg-blue-600 text-white shadow-inner sm:bg-blue-600 dark:sm:bg-blue-600"
                    : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-neutral-700",
                ].join(" ")}
              >
                {/* ícone discreto ajuda na leitura em telas pequenas */}
                <span aria-hidden className="mr-1">
                  {opt.icon}
                </span>
                {/* rótulo curto no mobile */}
                <span className="sm:hidden">{opt.short}</span>
                {/* rótulo completo em ≥ sm */}
                <span className="hidden sm:inline">{opt.label}</span>

                {/* Exibe contador apenas se counts foi fornecido */}
                {counts && (
                  <span
                    className={[
                      "ml-2 rounded-full px-1.5 py-0.5 text-xs font-medium",
                      active
                        ? "bg-white/20"
                        : "bg-gray-100 dark:bg-neutral-700",
                    ].join(" ")}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
