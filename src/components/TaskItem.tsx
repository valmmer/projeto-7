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