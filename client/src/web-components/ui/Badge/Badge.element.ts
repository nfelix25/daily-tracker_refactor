import templateHTML from "./Badge.html?raw" with { type: "html" };
import { getBadgeClass, type Variant } from "./Badge.variants";

export class Badge extends HTMLElement {
    #variant: Variant = "default";

    connectedCallback() {
        const text = this.textContent;
        this.innerHTML = templateHTML;
        this.querySelector(".badge")!.textContent = text;

        this.className = getBadgeClass(this.#variant);
    }

    set variant(value: Variant) {
        this.#variant = value;
        if (this.isConnected) this.className = getBadgeClass(value);
    }
}
