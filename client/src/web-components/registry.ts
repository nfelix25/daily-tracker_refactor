import { HabitCard } from "./components/HabitCard/HabitCard.element.js";
import { Badge } from "./ui/Badge/Badge.element.js";
import { Button } from "./ui/Button/Button.element.js";

export function registerWebComponents() {
    customElements.define("habit-card", HabitCard);
    customElements.define("my-badge", Badge);
    customElements.define("my-button", Button);
}
