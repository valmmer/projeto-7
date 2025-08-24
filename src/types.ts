// src/types.ts

export type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;       // timestamp (ms)
  completedAt: number | null;
};

export type Filter = "all" | "pending" | "done";

// 👇 novo tipo para o callback de edição
export type EditOpts = {
  confirmed?: boolean; // indica se já foi confirmado no filho
};

export type OnEdit = (id: string, title: string, opts?: EditOpts) => void;
