import { usePopup } from "@boxfoxs/bds-web";
import { ProductImgPopup } from "./ProductImagePopup";

export * from "./ProductImagePopup";

export function useProductImagePopup() {
  const { open, close } = usePopup("product-image");
  return (stcl: string) => {
    open({ children: <ProductImgPopup onClose={close} value={stcl} /> });
  };
}
