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
import {
    createHabitCardModel,
    type HabitCardModel,
} from "./HabitCard.model.js";

export class HabitCard extends BaseElement {
    #model: HabitCardModel;
    #dispose: (() => void) | null = null;

    constructor() {
        console.log("Constructing HabitCard");
        super(styles, templateHTML);
        this.#model = createHabitCardModel();
    }

    set model(value: HabitCardModel) {
        this.#model = value;
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

    _handleToggle() {
        console.log("Toggling habit", this.#model.id());
        this.dispatchEvent(
            new CustomEvent("HabitToggle", {
                bubbles: true,
                composed: true,
                detail: { id: this.#model.id() },
            }),
        );
    }
}
