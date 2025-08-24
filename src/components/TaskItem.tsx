
import { useState, useRef, KeyboardEvent } from "react";
import type { Task } from "../types";
import { formatDateTime } from "../utils/date";
import { confirmAction, niceAlert } from "../utils/confirmAction";

type Props = {
  task: Task;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onEdit?: (id: string, title: string) => void;
};

export default function TaskItem({ task, onToggle, onRemove, onEdit }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);

  // Evita salvar/confirmar duas vezes por clique rápido ou re-render
  const savingRef = useRef(false);

  const safeOnEdit =
    typeof onEdit === "function" ? onEdit : (_id: string, _title: string) => {};

  const startEdit = async () => {
    if (task.completed) {
      await niceAlert(
        "Tarefa concluída",
        "Reabra a tarefa para poder editar o título.",
        { variant: "warning", okText: "Entendi" }
      );
      return;
    }
    setDraft(task.title);
    setIsEditing(true);
  };

  const save = async () => {
    if (savingRef.current) return; // já está processando um save

    const next = draft.trim();
    if (!next) {
      await niceAlert(
        "Título vazio",
        "Digite um título antes de salvar a edição.",
        { variant: "warning" }
      );
      return;
    }
    if (next === task.title) {
      setIsEditing(false);
      return;
    }

    try {
      savingRef.current = true; // lock
      const ok = await confirmAction(
        "Salvar edição?",
        `Deseja alterar o título de:\n\n“${task.title}”\n\npara\n\n“${next}”?`
      );
      if (!ok) return;

      // Importante: deixe a confirmação apenas aqui (o pai não deve confirmar de novo)
      safeOnEdit(task.id, next);
      setIsEditing(false);
    } finally {
      savingRef.current = false; // libera o lock
    }
  };

  const cancel = () => {
    setIsEditing(false);
    setDraft(task.title);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") void save();
    if (e.key === "Escape") cancel();
  };

  return (
    <li className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 shadow-sm transition-shadow hover:shadow">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Esquerda: checkbox + título/input */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            className="mt-1 h-5 w-5 cursor-pointer rounded-md border-slate-300 text-emerald-600 focus:ring-emerald-500"
            aria-label={
              task.completed ? "Marcar como pendente" : "Marcar como concluída"
            }
          />

          {!isEditing ? (
            <span
              className={`text-sm sm:text-base ${
                task.completed
                  ? "line-through text-gray-400 dark:text-slate-500"
                  : "text-slate-800 dark:text-slate-100"
              }`}
            >
              {task.title}
            </span>
          ) : (
            <input
              className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-1.5 text-sm sm:text-base text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-300 outline-none focus:ring-2 focus:ring-emerald-500"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={onKeyDown}
              autoFocus
            />
          )}
        </div>

        {/* Direita: ações */}
        <div className="flex items-center gap-2 sm:self-start">
          {!isEditing ? (
            <button
              type="button"
              className="rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-1 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition disabled:opacity-50"
              onClick={startEdit}
              disabled={task.completed}
              title={task.completed ? "Reabra para editar" : "Editar título"}
            >
              Editar
            </button>
          ) : (
            <>
              <button
                type="button"
                className="rounded-lg bg-emerald-600 px-3 py-1 text-sm text-white hover:bg-emerald-700 transition disabled:opacity-60"
                onClick={save}
                disabled={!draft.trim() || savingRef.current}
                title={savingRef.current ? "Salvando..." : "Salvar edição"}
              >
                {savingRef.current ? "Salvando..." : "Salvar"}
              </button>
              <button
                type="button"
                className="rounded-lg border border-slate-300 dark:border-slate-600 px-3 py-1 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                onClick={cancel}
                disabled={savingRef.current}
              >
                Cancelar
              </button>
            </>
          )}

          <button
            type="button"
            className="rounded-lg border border-rose-300/40 dark:border-rose-400/30 px-3 py-1 text-sm text-rose-600 dark:text-rose-300 hover:bg-rose-50/50 dark:hover:bg-rose-900/20 transition"
            onClick={() => onRemove(task.id)}
            title="Remover tarefa"
          >
            Remover
          </button>
        </div>
      </div>

      {/* Datas */}
      <div className="mt-2 flex flex-wrap gap-3 pl-8 text-xs text-gray-500 dark:text-slate-400">
        <span title={String(task.createdAt)}>
          🕒 Criada: <strong>{formatDateTime(task.createdAt)}</strong>
        </span>
        {task.completedAt != null && (
          <span title={String(task.completedAt)}>
            ✅ Concluída: <strong>{formatDateTime(task.completedAt)}</strong>
          </span>
        )}
      </div>
    </li>
  );
}
import type { Task } from "../types";
import { formatDateTime } from "../utils/date";

export default function TaskItem ({
    task,
    onToggle,
    onRemove,
}: {
    task: Task;
    onToggle: (id: string) => void;
    onRemove: (id: string) => void;
}) {
    return (
        <li className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition-shadow hover:shadow">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <label className="flex items-center gap-3">
          <input
          type= "checkbox"
          checked = {task.completed}
          onChange= {() => onToggle (task.id)}
          className="h-5 w-5 rounded border-gray-300 accent-blue-600"
          />
        <span
            className = {
                task.completed
                ? "line-through text-gray-400 break-words"
                : "text-gray-800 break-words"
            }
        >
            {task.title}
        </span>
    </label>

    <button
        type = "button"
        onClick = {() => onRemove(task.id)}
        className="w-full rounded-lg border border-red-300 px-3 py-1 text-red-600 transition-colors hover:border-red-400 hover:bg-red-50 sm:w-auto"
        >
        Remover
    </button>
</div>

{/*Aqui mostramos as datas*/}
    <div className = "mt-2 flex flex-wrap gap-3 pl-8 text-xs text-gray-500">
            <span title = {String(task.createdaAt)}>
             🕒 Criada: <strong>{formatDateTime (task.createdAt)}</strong>
             </span>
            {task.completedAt != null && (
                <span title = {String (task.completedAt)}>
                  ✅ Concluída: <strong>{formatDateTime(task.completedAt)}</strong>
                </span>
             )}
        </div>
    </li>
);
}

