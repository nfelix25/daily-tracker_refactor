import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./App";
import { registerWebComponents } from "./web-components/registry";

import "./styles/global.css";
import "./styles/tailwind.css";

registerWebComponents();

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
