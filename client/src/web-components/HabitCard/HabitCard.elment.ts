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

import styles from "./HabitCard.css?inline" with { type: "css" };
import templateHTML from "./HabitCard.html?raw" with { type: "html" };

export class HabitCard extends BaseElement {
    static get observedAttributes() {
        return ["name", "streak", "completed", "item-id"];
    }

    constructor() {
        console.log("Constructing HabitCard");
        super(styles, templateHTML);
        this._handleToggle = this._handleToggle.bind(this);
    }

    protected connected(): void {
        super.connected();
        this._render();
        this.shadowRoot!.querySelector(".toggle")?.addEventListener(
            "click",
            this._handleToggle,
        );
    }

    disconnectedCallback() {
        this.shadowRoot!.querySelector(".toggle")?.removeEventListener(
            "click",
            this._handleToggle,
        );
    }

    attributeChangedCallback(attr, oldVal, newVal) {
        if (!this.shadowRoot!.querySelector(".card")) return; // not yet mounted
        if (attr === "name") {
            this.shadowRoot!.querySelector(".name")!.textContent = newVal;
        } else if (attr === "streak") {
            this.shadowRoot!.querySelector(".streak")!.textContent =
                `🔥 ${newVal}`;
        } else if (attr === "completed") {
            this.shadowRoot!.querySelector(".card")?.classList.toggle(
                "completed",
                newVal !== null,
            );
        }
    }

    _handleToggle() {
        this.dispatchEvent(
            new CustomEvent("habit-toggle", {
                bubbles: true,
                composed: true,
                detail: { id: this.getAttribute("item-id") },
            }),
        );
    }

    _render() {
        const name = this.getAttribute("name") || "";
        const streak = this.getAttribute("streak") || "0";
        const completed = this.hasAttribute("completed");

        this.shadowRoot!.innerHTML = `
      <div class="card ${completed ? "completed" : ""}">
        <button class="toggle" aria-label="Toggle completion"></button>
        <div class="content">
          <span class="name">${name}</span>
          <span class="streak">🔥 ${streak}</span>
        </div>
      </div>
    `;
    }
}
