export function formatStatus(status?: string) {
  if (!status) return "";
  return String(status).replace(/_/g, " ");
}
