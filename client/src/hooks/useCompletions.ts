import { getCompletions } from "../api/completions/getCompletions";
import { createSignal, createEffect } from "../lib/signals";
import { useMemo } from "react";
import { useSignalValue } from "./useSignalStore";

export function useCompletions() {
    const model = useMemo(() => createCompletionsModel(), []);

    return {
        completions: useSignalValue(model.completions),
        loading: useSignalValue(model.loading),
        error: useSignalValue(model.error),
    };
}

function completionsModel() {
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

function createCompletionsModel() {
    const model = completionsModel();
    return model;
}
