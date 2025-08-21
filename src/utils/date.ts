// Converte timestamp (ms) em data/hora legível pt-BR.
// Ex.: 19/08/2025 10:42


export function formatDateTime(ms: number): string {
  const d = new Date(ms);
  // fallback simples caso o ambiente não tenha Intl
  try {
    return d.toLocaleString("pt-BR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${pad(d.getDate())}/${pad(
      d.getMonth() + 1
    )}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }
}
