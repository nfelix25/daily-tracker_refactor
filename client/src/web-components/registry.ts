import { Badge } from "./primitives/Badge/Badge.element.js";
import { Button } from "./primitives/Button/Button.element.js";
import { Input } from "./primitives/Input/Input.element.js";

import { ChoreCard } from "./components/ChoreCard/ChoreCard.element.js";
import { HabitCard } from "./components/HabitCard/HabitCard.element.js";

export function registerWebComponents() {
    customElements.define("my-badge", Badge);
    customElements.define("my-button", Button);
    customElements.define("my-input", Input);

    customElements.define("chore-card", ChoreCard);
    customElements.define("habit-card", HabitCard);
}
