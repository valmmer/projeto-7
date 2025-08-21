// src/App.tsx

// Hooks do React
import { useEffect, useMemo, useState } from "react";

// Componentes de UI
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import Filters from "./components/Filters";
import Counters from "./components/Counters";
import ThemeToggle from "./components/ThemeToggle";

// Tipos
import type { Task, Filter } from "./types";

// Chave do localStorage para persistir as tarefas
const STORAGE_KEY = "todo-list:v1";

export default function App() {
  // Estado principal das tarefas
  // - Carrega do localStorage na primeira montagem
  // - Faz "migração" garantindo os campos createdAt/completedAt
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const parsed: any[] = saved ? JSON.parse(saved) : [];

      return parsed.map((t) => ({
        id: String(t.id),
        title: String(t.title),
        completed: Boolean(t.completed),
        createdAt: Number(t.createdAt ?? Date.now()),
        // Se não houver completedAt:
        //  - se completed === true -> define timestamp atual
        //  - senão -> null
        completedAt:
          t.completedAt === null || typeof t.completedAt === "number"
            ? t.completedAt
            : t.completed
            ? Date.now()
            : null,
      })) as Task[];
    } catch {
      // Se houver erro ao ler/parsear, começa vazio
      return [];
    }
  });

  // Filtro de visualização: 'all' | 'pending' | 'done'
  const [filter, setFilter] = useState<Filter>("all");

  // Persistência: salva sempre que 'tasks' mudar
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // Lista derivada já filtrada (useMemo evita recomputações desnecessárias)
  const filteredTasks = useMemo(() => {
    if (filter === "pending") return tasks.filter((t) => !t.completed);
    if (filter === "done") return tasks.filter((t) => t.completed);
    return tasks;
  }, [tasks, filter]);

  // Adiciona uma nova tarefa
  const addTask = (title: string) => {
    const trimmed = title.trim();
    if (!trimmed) return;

    const newTask: Task = {
      id: crypto.randomUUID(), // id único
      title: trimmed,
      completed: false, // nasce pendente
      createdAt: Date.now(), // data/hora de criação
      completedAt: null, // ainda não concluída
    };

    // Adiciona no topo sem mutar o array anterior
    setTasks((prev) => [newTask, ...prev]);
  };

  // Alterna concluída/pendente
  // - ao concluir agora, preenche completedAt com timestamp atual
  // - ao desmarcar, zera para null
  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              completed: !t.completed,
              completedAt: !t.completed ? Date.now() : null,
            }
          : t
      )
    );
  };

  // Remove uma tarefa pelo id
  const removeTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // Números para os contadores
  const total = tasks.length;
  const done = tasks.filter((t) => t.completed).length;
  const pending = total - done;

  return (
    // Espaçamentos responsivos externos da página
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      {/* Largura máxima do container central */}
      <div className="mx-auto w-full max-w-3xl">
        {/* Card principal do app */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:p-6">
          {/* =======================
              Cabeçalho harmonizado
              - esquerda: logo pequena + título + subtítulo
              - direita: botão de tema
             ======================= */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Imagem menor e fixa no canto esquerdo (ficará como "logo") */}
              {/* OBS: o arquivo deve estar em /public/todo-illustration.jpg */}
              <img
                src="/todo-illustration.jpg"
                alt="Lista de Tarefas"
                className="w-16 md:w-20 rounded-xl shadow-sm ring-1 ring-black/5 object-contain"
              />
              <div>
                {/* Título com hierarquia tipográfica consistente */}
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                  Lista de Tarefas
                </h1>
                {/* Subtítulo discreto para reforçar propósito */}
                <p className="mt-0.5 text-sm text-slate-500">
                  Organize seu dia com foco e simplicidade
                </p>
              </div>
            </div>

            {/* Alternador de tema (claro/escuro) */}
            <ThemeToggle />
          </div>

          {/* Campo para adicionar nova tarefa */}
          <TaskInput onAdd={addTask} />

          {/* Barra com filtros (Todas/Pendentes/Concluídas) + contadores (Total/Pendentes/Concluídas) */}
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Filters value={filter} onChange={setFilter} />
            <Counters total={total} pending={pending} done={done} />
          </div>

          {/* Lista de tarefas (já filtrada) com ações de alternar e remover */}
          <TaskList
            tasks={filteredTasks}
            onToggle={toggleTask}
            onRemove={removeTask}
          />
        </div>
      </div>
    </div>
  );
}
