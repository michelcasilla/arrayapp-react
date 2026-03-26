import { createRoot } from "https://esm.sh/react-dom@18.3.1/client?deps=react@18.3.1";
import { html } from "https://esm.sh/htm@3.1.1/react?deps=react@18.3.1";
import { App } from "./App.js";

const el = document.getElementById("root");
if (!el) {
  throw new Error("Missing #root");
}

createRoot(el).render(html`<${App} />`);
