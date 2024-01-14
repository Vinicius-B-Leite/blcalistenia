export function getSeconds(totalSeconds: number) {
  return String(Math.floor(totalSeconds % 60)).padStart(2, '0');
}
