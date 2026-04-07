import { Checkbox } from "../../ui/Checkbox/Checkbox";
import { Badge } from "../../ui/Badge/Badge";
import "./HabitCard.css";

export function HabitCard({ habit, onToggle, onDelete }) {
    return (
        <div
            className={`habit-card ${habit.completedToday ? "habit-card--completed" : ""}`}
        >
            <Checkbox
                checked={habit.completedToday}
                onChange={() => onToggle(habit.id)}
            />
            <div className="habit-card-content">
                <span className="habit-card-name">{habit.name}</span>
                <div className="habit-card-meta">
                    <Badge variant={habit.frequency}>{habit.frequency}</Badge>
                    <span className="habit-card-streak">🔥 {habit.streak}</span>
                </div>
            </div>
            <button
                className="habit-card-delete"
                onClick={() => onDelete(habit.id)}
                aria-label="Delete"
            >
                ×
            </button>
        </div>
    );
}
