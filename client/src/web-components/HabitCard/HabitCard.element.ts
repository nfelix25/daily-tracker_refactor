/**
 * [first-step: Web Components]
 * <habit-card> — a native custom element replacing the React HabitCard.
 *
 * Attributes:
 *   name      — display name of the habit
 *   streak    — current streak count (string)
 *   item-id   — the habit's numeric id
 *   completed — presence-based boolean; attribute present = completed
 *
 * Events dispatched:
 *   habit-toggle — CustomEvent bubbles:true, composed:true
 *                  detail: { id: String }
 *
 * Usage in React (HabitList.jsx):
 *   const ref = useRef(null)
 *   useEffect(() => {
 *     el.addEventListener('habit-toggle', handler)
 *     return () => el.removeEventListener('habit-toggle', handler)
 *   }, [habit, onToggle])
 *   return <habit-card ref={ref} />
 */

import { BaseElement } from "../../lib/element.js";
import { myhtml } from "../../lib/html.js";

import styles from "./HabitCard.css?inline" with { type: "css" };
import templateHTML from "./HabitCard.html?raw" with { type: "html" };
import { createHabitCardModel } from "./HabitCard.model.js";

export class HabitCard extends BaseElement {
    #model = createHabitCardModel();
    #dispose: (() => void) | null = null;

    static get observedAttributes() {
        return ["name", "streak", "completed", "item-id"] as const;
    }

    constructor() {
        console.log("Constructing HabitCard");
        super(styles, templateHTML);
    }

    protected connected(): void {
        super.connected();

        const { fragment, dispose } = myhtml`
            <div class="${() => (this.#model.completed() ? "card completed" : "card")}">
                <button class="toggle" aria-label="Toggle completion" @click="${() => this._handleToggle()}"></button>
                <div class="content">
                    <span class="name">${this.#model.name}</span>
                    <span class="streak">🔥 ${this.#model.streak}</span>
                </div>
            </div>
            `;

        this.#dispose = dispose;
        this.shadowRoot!.appendChild(fragment);
    }

    disconnectedCallback() {
        this.#dispose?.();
        this.#dispose = null;
    }

    attributeChangedCallback(
        attr: (typeof HabitCard.observedAttributes)[number],
        _oldVal: string | null,
        newVal: string | null,
    ) {
        if (attr === "name") this.#model.setName(newVal ?? "");
        else if (attr === "streak") this.#model.setStreak(Number(newVal));
        else if (attr === "completed")
            this.#model.setCompleted(this.hasAttribute("completed"));
        else if (attr === "item-id") this.#model.setId(newVal);
    }

    _handleToggle() {
        console.log("Toggling habit", this.getAttribute("item-id"));
        this.dispatchEvent(
            new CustomEvent("habit-toggle", {
                bubbles: true,
                composed: true,
                detail: { id: Number(this.getAttribute("item-id")) },
            }),
        );
    }
}
