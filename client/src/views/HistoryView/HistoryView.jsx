import { useMemo } from "react";
import { createCompletionsStore } from "../../store/completions.store";
import { useSignalValue } from "../../store/useSignalStore";
import "./HistoryView.css";

export function HistoryView() {
    const completionsStore = useMemo(() => createCompletionsStore(), []);

    const completions = useSignalValue(completionsStore.completions);
    const loading = useSignalValue(completionsStore.loading);
    const error = useSignalValue(completionsStore.error);

    if (loading) return <div className="loading">Loading…</div>;
    if (error) return <div className="error">Failed to load history.</div>;
    if (completions.length === 0) {
        return (
            <p className="empty-state">No completions yet. Start tracking!</p>
        );
    }

    const byDate = completions.reduce((acc, c) => {
        if (!acc[c.completed_date]) acc[c.completed_date] = [];
        acc[c.completed_date].push(c);
        return acc;
    }, {});

    const sortedDates = Object.keys(byDate).sort().reverse();

    return (
        <div className="history-view">
            {sortedDates.map((date) => (
                <div key={date} className="history-day">
                    <h3 className="history-date">{date}</h3>
                    <ul className="history-list">
                        {byDate[date].map((c) => (
                            <li key={c.id} className="history-item">
                                <span className="history-item-name">
                                    {c.name}
                                </span>
                                <span
                                    className={`history-item-type history-item-type--${c.type}`}
                                >
                                    {c.type}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}
