// src/App.tsx

// Hooks do React
import { useEffect, useMemo, useState } from "react";

// Componentes de UI
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import Filters from "./components/Filters";
import Counters from "./components/Counters";


// Tipos
import type { Task, Filter } from "./types";

// ⬇️ confirmações simples (usa window.confirm por baixo)
import { confirmAction, niceAlert } from "./utils/confirmAction";

// Chave do localStorage para persistir as tarefas
const STORAGE_KEY = "todo-list:v1";

export default function App() {
  // Estado principal das tarefas
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const parsed: any[] = saved ? JSON.parse(saved) : [];

      return parsed.map((t) => ({
        id: String(t.id),
        title: String(t.title),
        completed: Boolean(t.completed),
        createdAt: Number(t.createdAt ?? Date.now()),
        completedAt:
          t.completedAt === null || typeof t.completedAt === "number"
            ? t.completedAt
            : t.completed
            ? Date.now()
            : null,
      })) as Task[];
    } catch {
      return [];
    }
  });

  // Filtro de visualização: 'all' | 'pending' | 'done'
  const [filter, setFilter] = useState<Filter>("all");

  // Persistência
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // ======== EDIÇÃO COM ALERTA/CONFIRMAÇÃO ========
  async function updateTaskTitle(id: string, title: string) {
    const next = title.trim();
    if (!next) {
      window.alert("Digite um título antes de salvar a edição.");
      return;
    }
    const current = tasks.find((t) => t.id === id);
    if (!current) return;
    if (current.title === next) return; // nada mudou

    const ok = await confirmAction(
      "Salvar edição?",
      `Deseja alterar o título de:\n\n“${current.title}”\n\npara\n\n“${next}”?`
    );
    if (!ok) return;

    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title: next } : t))
    );
  }
  // ===============================================

  const filteredTasks = useMemo(() => {
    if (filter === "pending") return tasks.filter((t) => !t.completed);
    if (filter === "done") return tasks.filter((t) => t.completed);
    return tasks;
  }, [tasks, filter]);

  // Adiciona uma nova tarefa
const addTask = async (title: string) => {
  const trimmed = title.trim();
  if (!trimmed) {
    await niceAlert("Campo vazio", "Digite uma tarefa antes de adicionar.", {
      variant: "warning",
    });
    return;
  }
  const newTask: Task = {
    id: crypto.randomUUID(),
    title: trimmed,
    completed: false,
    createdAt: Date.now(),
    completedAt: null,
  };
  setTasks((prev) => [newTask, ...prev]);
};
  // Alterna concluída/pendente (com confirmação)
  const toggleTask = async (id: string) => {
    const current = tasks.find((t) => t.id === id);
    if (!current) return;
    const goingToComplete = !current.completed;

    const ok = await confirmAction(
      goingToComplete ? "Finalizar tarefa?" : "Reabrir tarefa?",
      goingToComplete
        ? `Deseja marcar "${current.title}" como concluída?`
        : `Deseja reabrir "${current.title}" para pendente?`
    );
    if (!ok) return;

    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              completed: goingToComplete,
              completedAt: goingToComplete ? Date.now() : null,
            }
          : t
      )
    );
  };

  // Remove uma tarefa (com confirmação)
  const removeTask = async (id: string) => {
    const current = tasks.find((t) => t.id === id);
    const title = current ? current.title : "esta tarefa";

    const ok = await confirmAction(
      "Remover tarefa?",
      `Tem certeza que deseja remover "${title}"? Essa ação não pode ser desfeita.`
    );
    if (!ok) return;

    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // Números para os contadores
  const total = tasks.length;
  const done = tasks.filter((t) => t.completed).length;
  const pending = total - done;

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8 lg:py-10 bg-slate-50 dark:bg-slate-900">
      <div className="mx-auto w-full max-w-3xl">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 shadow-xl sm:p-6">

          {/* ===== Cabeçalho centralizado ===== */}
          <div className="mb-6">
            <div className="mx-auto flex items-center justify-center gap-4 text-center">
              <img
                src="/todo-illustration.jpg"
                alt="Lista de Tarefas"
                className="w-16 md:w-20 rounded-xl shadow-sm ring-1 ring-black/5 object-contain"
              />
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
                  Lista de Tarefas
                </h1>
                <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                  Organize seu dia com foco e simplicidade
                </p>
              </div>
            </div>
          </div>
          {/* =================================== */}

          {/* Campo para adicionar nova tarefa */}
          <TaskInput onAdd={addTask} />

          {/* Filtros + Contadores */}
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Filters value={filter} onChange={setFilter} />
            <Counters total={total} pending={pending} done={done} />
          </div>

          {/* Lista de tarefas */}
          <TaskList
            tasks={filteredTasks}
            onToggle={toggleTask}
            onRemove={removeTask}
            onEdit={updateTaskTitle}
          />
        </div>
      </div>
    </div>
  );
}
