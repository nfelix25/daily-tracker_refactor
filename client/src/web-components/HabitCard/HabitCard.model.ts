import { createSignal } from "../../lib/signals";

export function createHabitCardModel() {
    const [name, setName] = createSignal("");
    const [streak, setStreak] = createSignal(0);
    const [completed, setCompleted] = createSignal(false);
    const [id, setId] = createSignal<string | null>(null);

    return {
        name,
        setName,
        streak,
        setStreak,
        completed,
        setCompleted,
        id,
        setId,
    };
}

export type HabitCardModel = ReturnType<typeof createHabitCardModel>;
