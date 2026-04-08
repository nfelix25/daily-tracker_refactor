import tailwindCSS from "../styles/tailwind.css?inline";

export const tailwindSheet = new CSSStyleSheet();
tailwindSheet.replaceSync(tailwindCSS);
