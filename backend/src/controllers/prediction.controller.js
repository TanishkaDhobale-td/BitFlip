export function calculateHealth(data) {
  let score = 100;

  if (data.temperature > 75) score -= 15;
  if (data.vibration > 5) score -= 15;
  if (data.spindleSpeed > 4500) score -= 20;

  return Math.max(score, 50);
}