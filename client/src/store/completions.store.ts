import { getCompletions } from "../api/completions/getCompletions";
import { createSignal, createEffect } from "../lib/signals";

function completionsStore() {
    const [completions, setCompletions] = createSignal([]);
    const [loading, setLoading] = createSignal(true);
    const [error, setError] = createSignal(null);

    createEffect(() => {
        getCompletions()
            .then(setCompletions)
            .catch(setError)
            .finally(() => setLoading(false));
    });

    return { completions, loading, error };
}

export function createCompletionsStore() {
    const store = completionsStore();
    return store;
}
