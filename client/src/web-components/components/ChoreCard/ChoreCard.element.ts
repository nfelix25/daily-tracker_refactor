import { BaseElement } from "../../../lib/element.js";
import { myhtml } from "../../../lib/html.js";
import { tailwindSheet } from "../../../lib/tailwind.js";
import {
    createTrackableViewModel,
    type ChoreCardModel,
} from "../../viewmodels/trackable.viewmodel.js";

import styles from "./ChoreCard.css?inline" with { type: "css" };
import templateHTML from "./ChoreCard.html?raw" with { type: "html" };

export class ChoreCard extends BaseElement {
    #model: ChoreCardModel;
    #dispose: (() => void) | null = null;

    constructor() {
        console.log("Constructing ChoreCard");
        super(styles, templateHTML);
        this.#model = createTrackableViewModel("chore-card");
    }

    set model(value: ChoreCardModel) {
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
        this.shadowRoot!.adoptedStyleSheets = [
            ...this.shadowRoot!.adoptedStyleSheets,
            tailwindSheet,
        ];
        this.shadowRoot!.appendChild(fragment);
    }

    disconnectedCallback() {
        this.#dispose?.();
        this.#dispose = null;
    }

    _handleToggle() {
        console.log("Toggling chore", this.#model.id());
        this.dispatchEvent(
            new CustomEvent("ChoreToggle", {
                bubbles: true,
                composed: true,
                detail: { id: this.#model.id() },
            }),
        );
    }
}
