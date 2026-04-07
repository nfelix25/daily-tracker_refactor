abstract class BaseAbstractElement extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: "open" });
        this.shadowRoot?.appendChild(this.template.content.cloneNode(true));
        this.connected();
    }

    disconnectedCallback() {
        this.disconnected();
    }

    abstract get template(): HTMLTemplateElement;
    protected connected(): void {}
    protected disconnected(): void {}
}

export class BaseElement extends BaseAbstractElement {
    #sheet: CSSStyleSheet | null = null;
    #template: HTMLTemplateElement | null = null;

    constructor(styles?: string, templateHTML?: string) {
        super();

        if (styles) {
            console.log({ styles });
            const sheet = new CSSStyleSheet();
            sheet.replaceSync(styles);
            this.#sheet = sheet;
        }

        if (templateHTML) {
            const template = document.createElement("template");
            template.innerHTML = templateHTML;
            this.#template = template;
        }
    }

    get template() {
        return this.#template ?? document.createElement("template");
    }

    protected connected() {
        if (this.#sheet) {
            this.shadowRoot!.adoptedStyleSheets = [this.#sheet];
        }
    }
}
