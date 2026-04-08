import { useState } from "react";
import "./HabitForm.css";

export function HabitForm({ onAdd, frequency }) {
    const [name, setName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        onAdd(name.trim());
        setName("");
    };

    return (
        <form className="habit-form" onSubmit={handleSubmit}>
            <input
                className="habit-form-input"
                type="text"
                placeholder={`New ${frequency} habit…`}
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <my-button type="submit">Add</my-button>
        </form>
    );
}
