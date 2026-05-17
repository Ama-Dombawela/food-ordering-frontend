// Convert order/food status codes to readable labels (e.g., PLACED \u2192 PLACED, PREPARING_FOOD \u2192 PREPARING FOOD).
export function formatStatus(status?: string) {
  if (!status) return "";
  return String(status).replace(/_/g, " ");
}
