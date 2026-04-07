import { useState, useEffect, useCallback } from "react";
import { getHabits } from "../api/habits/getHabits";
import { createHabit } from "../api/habits/createHabit";
import { deleteHabit } from "../api/habits/deleteHabit";
import { completeHabit } from "../api/habits/completeHabit";

export function useHabits(frequency, date) {
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const load = useCallback(async () => {
        try {
            setLoading(true);
            setHabits(await getHabits(frequency, date));
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [frequency, date]);

    useEffect(() => {
        load();
    }, [load]);

    const toggleHabit = useCallback(
        async (id) => {
            const habit = habits.find((h) => h.id === id);
            console.log(habit);
            if (!habit) return;
            await completeHabit(id, date, !habit.completedToday);
            await load();
        },
        [habits, date, load],
    );

    const addHabit = useCallback(
        async (name) => {
            await createHabit(name, frequency);
            await load();
        },
        [frequency, load],
    );

    const removeHabit = useCallback(
        async (id) => {
            await deleteHabit(id);
            await load();
        },
        [load],
    );

    return { habits, loading, error, toggleHabit, addHabit, removeHabit };
}
