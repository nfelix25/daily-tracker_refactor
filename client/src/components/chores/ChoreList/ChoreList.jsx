import "./ChoreList.css";

import { createTrackableViewModel } from "../../../web-components/viewmodels/trackable.viewmodel";
import { useMemo, useEffect } from "react";

export function ChoreList({ chores, onToggle, onDelete }) {
    if (chores.length === 0) return null;
    return (
        <ul className="chore-list">
            {chores.map((chore) => (
                <ChoreCardElement
                    key={chore.id}
                    chore={chore}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    );
}

function ChoreCardElement({ chore, onDelete, onToggle }) {
    const model = useMemo(() => createTrackableViewModel("chore-card"), []);

    useEffect(() => {
        model.setName(chore.name);
        model.setStreak(chore.streak);
        model.setId(chore.id);
        model.setCompleted(chore.completedToday);
    }, [chore]);

    return (
        <li className="chore-list-item">
            <chore-card
                model={model}
                onChoreToggle={(e) => onToggle(e.detail.id)}
            />
            <button
                className="chore-list-delete"
                onClick={() => onDelete(chore.id)}
                aria-label="Delete"
            >
                ×
            </button>
        </li>
    );
}
