export function appendCapped<T>(list: T[], item: T, cap: number): T[] {
  return list.length >= cap ? [item, ...list.slice(0, -1)] : [item, ...list];
}