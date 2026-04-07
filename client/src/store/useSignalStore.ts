import { useSyncExternalStore } from "react";

import { createEffect } from "../lib/signals";

export function useSignalValue<T>(signal: () => T): T {
    return useSyncExternalStore(
        (notify: () => void) => {
            // createEffect re-runs when signal changes, call notify to update the component
            const dispose = createEffect(() => {
                signal();
                notify();
            });
            return dispose;
        },
        () => signal(),
    );
}
