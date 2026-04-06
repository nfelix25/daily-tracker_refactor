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

export class HabitCard extends HTMLElement {
  static get observedAttributes() {
    return ['name', 'streak', 'completed', 'item-id']
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this._handleToggle = this._handleToggle.bind(this)
  }

  connectedCallback() {
    this._render()
    this.shadowRoot.querySelector('.toggle').addEventListener('click', this._handleToggle)
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector('.toggle')?.removeEventListener('click', this._handleToggle)
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    if (!this.shadowRoot.querySelector('.card')) return // not yet mounted
    if (attr === 'name') {
      this.shadowRoot.querySelector('.name').textContent = newVal
    } else if (attr === 'streak') {
      this.shadowRoot.querySelector('.streak').textContent = `🔥 ${newVal}`
    } else if (attr === 'completed') {
      this.shadowRoot.querySelector('.card').classList.toggle('completed', newVal !== null)
    }
  }

  _handleToggle() {
    this.dispatchEvent(
      new CustomEvent('habit-toggle', {
        bubbles: true,
        composed: true,
        detail: { id: this.getAttribute('item-id') },
      })
    )
  }

  _render() {
    const name = this.getAttribute('name') || ''
    const streak = this.getAttribute('streak') || '0'
    const completed = this.hasAttribute('completed')

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        .card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          transition: opacity 0.2s;
        }
        .card.completed { opacity: 0.6; background: #f9fafb; }
        .toggle {
          width: 20px;
          height: 20px;
          border: 2px solid #d1d5db;
          border-radius: 50%;
          background: none;
          cursor: pointer;
          padding: 0;
          flex-shrink: 0;
          position: relative;
          transition: background 0.15s, border-color 0.15s;
        }
        .card.completed .toggle {
          background: #3b82f6;
          border-color: #3b82f6;
        }
        .toggle::after {
          content: '';
          display: none;
          position: absolute;
          top: 2px;
          left: 5px;
          width: 4px;
          height: 8px;
          border: 2px solid #fff;
          border-top: none;
          border-left: none;
          transform: rotate(45deg);
        }
        .card.completed .toggle::after { display: block; }
        .content {
          flex: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .name {
          font-size: 0.95rem;
          color: #111827;
        }
        .card.completed .name {
          text-decoration: line-through;
          color: #6b7280;
        }
        .streak { font-size: 0.8rem; color: #6b7280; }
      </style>
      <div class="card ${completed ? 'completed' : ''}">
        <button class="toggle" aria-label="Toggle completion"></button>
        <div class="content">
          <span class="name">${name}</span>
          <span class="streak">🔥 ${streak}</span>
        </div>
      </div>
    `
  }
}
