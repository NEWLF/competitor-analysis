import { colors } from "@boxfoxs/bds-common";
import { inDesktop } from "@boxfoxs/bds-web";

export const hoverableStyle = {
  background: (background = colors.gray100) => `
    transition: background 250ms;
      &:hover {
        background: ${background};
      }
  `,
  opacity: (opacity = 0.7) => `
    transition: opacity 200ms;
      &:hover {
        opacity: ${opacity};
      }
  `,
  scale: (scale = 0.97) => `
    transition: transform 150ms;
      &:hover {
        transform: scale(${scale});
      }
  `,
};
