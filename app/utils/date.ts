export function isFebruary2025(date: string): boolean {
  const d = new Date(date);
  return d.getFullYear() === 2025 && d.getMonth() === 1; // 1 represents February
}

