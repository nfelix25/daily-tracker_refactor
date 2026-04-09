import { useState } from "react";
import "./ChoreForm.css";

export function ChoreForm({ onAdd, frequency }) {
    const [name, setName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        onAdd(name.trim());
        setName("");
    };

    return (
        <form className="chore-form" onSubmit={handleSubmit}>
            <my-input
                type="text"
                placeholder={`New ${frequency} chore…`}
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <my-button type="submit">Add</my-button>
        </form>
    );
}
