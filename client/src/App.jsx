import { useState } from "react";
import { DailyView } from "./views/DailyView/DailyView";
import { WeeklyView } from "./views/WeeklyView/WeeklyView";
import { HistoryView } from "./views/HistoryView/HistoryView";
import "./App.css";

const VIEWS = [
    { id: "daily", label: "Daily" },
    { id: "weekly", label: "Weekly" },
    { id: "history", label: "History" },
];

export function App() {
    const [view, setView] = useState("daily");

    return (
        <div className="app">
            <header className="app-header">
                <h1 className="app-title">Daily Tracker</h1>
                <nav className="app-nav">
                    {VIEWS.map((v) => (
                        <my-button
                            key={v.id}
                            onClick={() => setView(v.id)}
                            variant="nav"
                            active={view === v.id}
                        >
                            {v.label}
                        </my-button>
                    ))}
                </nav>
            </header>

            <main className="app-main">
                {view === "daily" && <DailyView />}
                {view === "weekly" && <WeeklyView />}
                {view === "history" && <HistoryView />}
            </main>
        </div>
    );
}
