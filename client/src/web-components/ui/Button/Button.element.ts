import { BaseElement } from "../../../lib/element";
import { tailwindSheet } from "../../../lib/tailwind";
import templateHTML from "./Button.html?raw" with { type: "html" };
import { getButtonClass, type ButtonVariant } from "./Button.variants";

// Break out into a HOC wrapper --- Will need to differentiate between specific target elements eg button
const REFLECTED = ["type", "disabled"] as const;

export class Button extends BaseElement {
    static formAssociated = true;
    #internals: ElementInternals;

    #variant: ButtonVariant = "primary";
    #button!: HTMLButtonElement;

    constructor() {
        super(undefined, templateHTML);
        this.#internals = this.attachInternals();
    }

    connected() {
        super.connected();
        this.shadowRoot!.adoptedStyleSheets = [tailwindSheet];
        this.#button = this.shadowRoot!.querySelector("button")!;
        this.#button.className = getButtonClass(this.#variant);

        for (const attr of REFLECTED) {
            if (this.hasAttribute(attr)) {
                this.#button.setAttribute(attr, this.getAttribute(attr)!);
            }
        }

        this.#button.addEventListener("click", () => {
            if (this.#button.type === "submit") {
                this.#internals.form?.requestSubmit();
            }
        });
    }

    set variant(value: ButtonVariant) {
        this.#variant = value;
        if (this.isConnected) this.#button.className = getButtonClass(value);
    }

    attributeChangedCallback(
        name: (typeof REFLECTED)[number],
        _: void,
        newVal: string,
    ) {
        if (REFLECTED.includes(name)) {
            this.#button.setAttribute(name, newVal);
        }
    }

    static get observedAttributes() {
        return [...REFLECTED];
    }
}
