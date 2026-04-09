import { Badge } from "./ui/Badge/Badge.element.js";
import { Button } from "./ui/Button/Button.element.js";
import { HabitCard } from "./components/HabitCard/HabitCard.element.js";
import { Input } from "./ui/Input/Input.element.js";

export function registerWebComponents() {
    customElements.define("my-badge", Badge);
    customElements.define("my-button", Button);
    customElements.define("habit-card", HabitCard);
    customElements.define("my-input", Input);
}
