import type { FormEventHandler } from "react";
import { useState } from "react";
import { niceAlert } from "../utils/confirmAction";

type Props = { onAdd: (title: string) => void };

export default function TaskInput({ onAdd }: Props) {
  const [title, setTitle] = useState("");

  const submit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) {
      await niceAlert("Campo vazio", "Digite uma tarefa antes de adicionar.", {
        variant: "warning",
      });
      return;
    }
    onAdd(trimmed);
    setTitle("");
  };

  return (
    <form
      onSubmit={submit}
      className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center"
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Digite uma tarefa..."
        className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-2 text-sm sm:text-base text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-300 outline-none focus:ring-2 focus:ring-emerald-500"
      />
      <button
        type="submit"
        className="w-full sm:w-auto rounded-xl bg-emerald-600 px-4 py-2 text-sm sm:text-base font-semibold text-white shadow hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
      >
        Adicionar
      </button>
    </form>
  );
}
