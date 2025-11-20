import { isClient, isServer } from "@boxfoxs/next";

export const getColor = (
  name,
  dom = isClient() ? document.documentElement : null
) => {
  if (isServer()) {
    return "";
  }
  return window
    .getComputedStyle(dom)
    .getPropertyValue(`--falcon-${name}`)
    .trim();
};

export const getColors = (dom?: HTMLElement) => ({
  primary: getColor("primary", dom),
  secondary: getColor("secondary", dom),
  success: getColor("success", dom),
  info: getColor("info", dom),
  warning: getColor("warning", dom),
  danger: getColor("danger", dom),
  light: getColor("light", dom),
  dark: getColor("dark", dom),
  lfdep: getColor("lfdep", dom),
});

export const getGrays = (dom?: HTMLElement) => ({
  white: getColor("white", dom),
  100: getColor("100", dom),
  200: getColor("200", dom),
  300: getColor("300", dom),
  400: getColor("400", dom),
  500: getColor("500", dom),
  600: getColor("600", dom),
  700: getColor("700", dom),
  800: getColor("800", dom),
  900: getColor("900", dom),
  1000: getColor("1000", dom),
  1100: getColor("1100", dom),
  black: getColor("black", dom),
});

export const hexToRgb = function (hexValue) {
  let hex = hexValue.indexOf("#") === 0 ? hexValue.substring(1) : hexValue;
  let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
    hex.replace(shorthandRegex, function (m, r, g, b) {
      return r + r + g + g + b + b;
    })
  );
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : null;
};

export const rgbaColor = function (...args) {
  const color = args.length > 0 && args[0] !== undefined ? args[0] : "#fff";
  const alpha = args.length > 1 && args[1] !== undefined ? args[1] : 0.5;
  //@ts-ignore
  return "rgba(".concat(hexToRgb(color), ", ").concat(alpha, ")");
};
