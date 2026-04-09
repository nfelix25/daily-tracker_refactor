const className =
    "flex-1 py-2 px-4 border border-solid border-border rounded-lg text-sm outline-none transition-colors duration-150 focus:border-primary";

// Break out into a HOC wrapper --- Will need to differentiate between specific target elements eg button
const REFLECTED = ["value", "type", "placeholder", "disabled"] as const;

export class Input extends HTMLElement {
    static formAssociated = true;
    #internals: ElementInternals;

    #input!: HTMLInputElement;

    constructor() {
        super();
        this.#internals = this.attachInternals();
    }

    connectedCallback() {
        const input = document.createElement("input");
        input.className = className;
        input.append(...this.childNodes);
        this.appendChild(input);
        this.#input = input;

        this.style.display = "contents";

        for (const attr of REFLECTED) {
            if (this.hasAttribute(attr)) {
                this.#input.setAttribute(attr, this.getAttribute(attr)!);
            }
        }
    }

    attributeChangedCallback(
        name: (typeof REFLECTED)[number],
        _: void,
        newVal: string,
    ) {
        if (this.isConnected && REFLECTED.includes(name)) {
            this.#input.setAttribute(name, newVal);
        }
    }

    static get observedAttributes() {
        return [...REFLECTED];
    }
}
