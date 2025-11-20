export function formatDecimals(
  value: number | string,
  decimals = 1,
  round?: boolean
) {
  const multiplier = Math.pow(10, decimals);
  if (round) {
    return Math.round(Number(value) * multiplier) / multiplier;
  }
  return Math.floor(Number(value) * multiplier) / multiplier;
}
