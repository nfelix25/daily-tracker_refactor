import templateHTML from "./Badge.html?raw" with { type: "html" };
import { getBadgeClass, type BadgeVariant } from "./Badge.variants";

export class Badge extends HTMLElement {
    #variant: BadgeVariant = "default";

    connectedCallback() {
        const text = this.textContent;
        this.innerHTML = templateHTML;
        this.querySelector(".badge")!.textContent = text;

        this.className = getBadgeClass(this.#variant);
    }

    set variant(value: BadgeVariant) {
        this.#variant = value;
        if (this.isConnected) this.className = getBadgeClass(value);
    }
}
