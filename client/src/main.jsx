import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

// Base styles
import "./styles/global.css";
// [first-step: Tailwind] coexists alongside global.css
import "./styles/tailwind.css";
import { registerWebComponents } from "./web-components/registry";

registerWebComponents();

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
