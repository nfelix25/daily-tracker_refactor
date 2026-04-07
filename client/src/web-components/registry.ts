import { HabitCard } from "./components/HabitCard/HabitCard.element.js";
import { Badge } from "./ui/Badge/Badge.element.js";

export function registerWebComponents() {
    customElements.define("habit-card", HabitCard);
    customElements.define("my-badge", Badge);
}
