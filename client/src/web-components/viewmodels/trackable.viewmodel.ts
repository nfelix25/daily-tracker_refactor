import { createSignal } from "../../lib/signals";

export function createTrackableViewModel<T>(type: T) {
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

        type,
    };
}

export type HabitCardModel = ReturnType<
    typeof createTrackableViewModel<"habit-card">
>;

export type ChoreCardModel = ReturnType<
    typeof createTrackableViewModel<"chore-card">
>;
