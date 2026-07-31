// utils/removeVietnameseAccent.ts
export function removeVietnameseAccent(str: string): string {
  if (!str) return '';
  return str
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ');
}

// removeVietnameseAccent("Ngọn Lửa") -> "ngon lua"
