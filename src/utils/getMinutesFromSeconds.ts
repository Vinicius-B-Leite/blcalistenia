export function getMinutesFromSeconds(seconds: number) {
  return String(Math.floor(seconds / 60)).padStart(2, '0');
}
