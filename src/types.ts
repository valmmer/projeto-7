export type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number; // timestamp (ms)
  completedAt: number | null;
};

export type Filter = "all" | "pending" | "done";
