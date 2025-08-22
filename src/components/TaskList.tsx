import { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import type { Task } from "../types";

type Props = {
  tasks: Task[];
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  loading?: boolean;
};

export default function TaskList({
  tasks,
  onToggle,
  onRemove,
  loading = false,
}: Props) {
  const [localTasks, setLocalTasks] = useState<Task[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Anima a ordenação das tarefas
  useEffect(() => {
    if (isInitialLoad) {
      setLocalTasks(tasks);
      setIsInitialLoad(false);
      return;
    }

    // Copia o array e ordena (não muta o original)
    const ordered = [...tasks].sort((a, b) => b.createdAt - a.createdAt);
    setLocalTasks(ordered);
  }, [tasks]);

  if (loading) {
    return (
      <div className="mt-6 space-y-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm dark:border-gray-700 dark:bg-neutral-800"
          >
            <div className="flex animate-pulse">
              <div className="h-5 w-5 rounded border-gray-300 bg-gray-200 dark:bg-gray-700"></div>
              <div className="ml-3 flex-1 space-y-2">
                <div className="h-4 rounded bg-gray-200 dark:bg-gray-700"></div>
                <div className="h-3 w-1/2 rounded bg-gray-200 dark:bg-gray-700"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="mt-6 text-center py-8 px-4 rounded-xl border border-dashed border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-neutral-800/50">
        <div className="text-4xl mb-3">📝</div>
        <p className="text-gray-500 dark:text-gray-400 mb-2">
          Nenhuma tarefa por aqui.
        </p>
        <p className="text-sm text-gray-400 dark:text-gray-500">
          Que tal criar a primeira tarefa?
        </p>
      </div>
    );
  }

  return (
    <ul className="mt-6 space -y-3">
      {localTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onRemove={onRemove}
        />
      ))}
    </ul>
  );
}
