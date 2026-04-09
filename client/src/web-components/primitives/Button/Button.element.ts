import { getButtonClass, type ButtonVariant } from "./Button.variants";

// Break out into a HOC wrapper --- Will need to differentiate between specific target elements eg button
const REFLECTED = ["type", "disabled"] as const;

export class Button extends HTMLElement {
    static formAssociated = true;
    #internals: ElementInternals;

    #variant: ButtonVariant = "primary";
    #active = false;
    #button!: HTMLButtonElement;

    constructor() {
        super();
        this.#internals = this.attachInternals();
    }

    connectedCallback() {
        const btn = document.createElement("button");
        btn.append(...this.childNodes);
        this.appendChild(btn);
        this.#button = btn;
        this.#setButtonClass();

        for (const attr of REFLECTED) {
            if (this.hasAttribute(attr)) {
                this.#button.setAttribute(attr, this.getAttribute(attr)!);
            }
        }
    }

    #setButtonClass() {
        if (this.isConnected) {
            this.#button.className = getButtonClass({
                variant: this.#variant,
                active: this.#active,
            });
        }
    }

    set variant(value: ButtonVariant) {
        this.#variant = value;
        this.#setButtonClass();
    }
    set active(value: boolean) {
        this.#active = value;
        this.#setButtonClass();
    }

    attributeChangedCallback(
        name: (typeof REFLECTED)[number],
        _: void,
        newVal: string,
    ) {
        if (this.isConnected && REFLECTED.includes(name)) {
            this.#button.setAttribute(name, newVal);
        }
    }

    static get observedAttributes() {
        return [...REFLECTED];
    }
}
