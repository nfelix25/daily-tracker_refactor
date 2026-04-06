import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'

// Base styles
import './styles/global.css'
// [first-step: Tailwind] coexists alongside global.css
import './styles/tailwind.css'

// [first-step: Web Components] Register <habit-card> as a native custom element.
// React treats it as a plain HTML element; event handling is via ref + addEventListener.
import { HabitCard } from './web-components/HabitCard/HabitCard'
customElements.define('habit-card', HabitCard)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
