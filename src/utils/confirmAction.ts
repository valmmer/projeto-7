// src/utils/confirmAction.ts
export type DialogVariant = "default" | "danger" | "warning" | "info";

type ConfirmOpts = { confirmText?: string; cancelText?: string; variant?: DialogVariant; };
type AlertOpts   = { okText?: string; variant?: DialogVariant; };

let isOpen = false;
let resolving = false;
let lastOpenAt = 0;
const OPEN_DEBOUNCE_MS = 350;

function btnClasses(kind: "confirm" | "cancel", variant: DialogVariant) {
  if (kind === "cancel") {
    return "rounded-lg border border-slate-300 dark:border-slate-600 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition";
  }
  if (variant === "danger")
    return "rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700 transition";
  if (variant === "warning")
    return "rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700 transition";
  if (variant === "info")
    return "rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 transition";
  return "rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition";
}

function close(el: HTMLElement) { el.remove(); }

function makeBase(title: string, message?: string) {
  const overlay = document.createElement("div");
  overlay.className = "fixed inset-0 z-50 grid place-items-center bg-black/40 p-4";

  const card = document.createElement("div");
  card.className = "w-full max-w-md rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-700";
  overlay.appendChild(card);

  const header = document.createElement("div");
  header.className = "px-5 pt-5";
  const h = document.createElement("h3");
  h.className = "text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100";
  h.textContent = title;
  header.appendChild(h);

  const body = document.createElement("div");
  body.className = "px-5 pt-2 pb-4";
  if (message) {
    const p = document.createElement("p");
    p.className = "text-sm text-slate-600 dark:text-slate-300 whitespace-pre-line";
    p.textContent = message;
    body.appendChild(p);
  }

  const footer = document.createElement("div");
  footer.className = "px-5 pb-5 pt-2 flex items-center justify-end gap-2";

  card.appendChild(header);
  card.appendChild(body);
  card.appendChild(footer);
  document.body.appendChild(overlay);

  return { overlay, footer };
}

function beginOpen(): boolean {
  const now = Date.now();
  if (now - lastOpenAt < OPEN_DEBOUNCE_MS) return false;
  if (isOpen) return false;
  lastOpenAt = now;
  isOpen = true;
  resolving = false;
  return true;
}
function finishClose(overlay: HTMLElement) {
  close(overlay);
  isOpen = false;
  resolving = false;
}

export function confirmAction(title: string, message?: string, opts: ConfirmOpts = {}): Promise<boolean> {
  if (!beginOpen()) return Promise.resolve(false);

  return new Promise((resolve) => {
    const variant = opts.variant ?? "default";
    const { overlay, footer } = makeBase(title, message);

    const cancelBtn = document.createElement("button");
    cancelBtn.type = "button"; // ★
    cancelBtn.className = btnClasses("cancel", variant);
    cancelBtn.textContent = opts.cancelText ?? "Cancelar";

    const okBtn = document.createElement("button");
    okBtn.type = "button"; // ★
    okBtn.className = btnClasses("confirm", variant);
    okBtn.textContent = opts.confirmText ?? "Confirmar";

    footer.appendChild(cancelBtn);
    footer.appendChild(okBtn);

    const resolveOnce = (v: boolean) => {
      if (resolving) return;     // ★ garante 1 resolução
      resolving = true;
      finishClose(overlay);
      resolve(v);
    };

    const onCancel = () => resolveOnce(false);
    const onOk = () => resolveOnce(true);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
      if (e.key === "Enter") onOk();
    };

    // one‑shot handlers para não acumular disparos
    cancelBtn.addEventListener("click", onCancel, { once: true }); // ★
    okBtn.addEventListener("click", onOk, { once: true });         // ★
    window.addEventListener("keydown", onKey, { once: true });     // ★

    okBtn.focus();
  });
}

export function niceAlert(title: string, message?: string, opts: AlertOpts = {}): Promise<void> {
  if (!beginOpen()) return Promise.resolve();

  return new Promise((resolve) => {
    const variant = opts.variant ?? "info";
    const { overlay, footer } = makeBase(title, message);

    const okBtn = document.createElement("button");
    okBtn.type = "button"; // ★
    okBtn.className = btnClasses("confirm", variant);
    okBtn.textContent = opts.okText ?? "Ok";
    footer.appendChild(okBtn);

    const resolveOnce = () => {
      if (resolving) return;  // ★
      resolving = true;
      finishClose(overlay);
      resolve();
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter") resolveOnce();
    };

    okBtn.addEventListener("click", resolveOnce, { once: true }); // ★
    window.addEventListener("keydown", onKey, { once: true });    // ★

    okBtn.focus();
  });
}
