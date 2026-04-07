// [first-step: Web Components] HabitList renders <habit-card> custom elements.
// React listens to the custom `habit-toggle` event via ref + addEventListener.
// HabitCard.jsx (React) exists as the original counterpart to this web component.
import { useEffect } from "react";
import "./HabitList.css";
import { useMemo } from "react";
import { createHabitCardModel } from "../../../web-components/components/HabitCard/HabitCard.model";

export function HabitList({ habits, onToggle, onDelete }) {
    if (habits.length === 0) return null;
    return (
        <ul className="habit-list">
            {habits.map((habit) => (
                <HabitCardElement
                    key={habit.id}
                    habit={habit}
                    onDelete={onDelete}
                    onToggle={onToggle}
                />
            ))}
        </ul>
    );
}

function HabitCardElement({ habit, onDelete, onToggle }) {
    const model = useMemo(() => createHabitCardModel(), []);

    useEffect(() => {
        model.setName(habit.name);
        model.setStreak(habit.streak);
        model.setId(habit.id);
        model.setCompleted(habit.completedToday);
    }, [habit]);

    return (
        <li className="habit-list-item">
            <habit-card
                model={model}
                onHabitToggle={(e) => onToggle(e.detail.id)}
            />
            <button
                className="habit-list-delete"
                onClick={() => onDelete(habit.id)}
                aria-label="Delete"
            >
                ×
            </button>
        </li>
    );
}
