export function isLive() {
  return process.env.STAGE === "live";
}

export function isAlpha() {
  return !isLive();
}
