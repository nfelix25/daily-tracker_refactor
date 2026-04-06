// [first-step: Web Components] HabitList renders <habit-card> custom elements.
// React listens to the custom `habit-toggle` event via ref + addEventListener.
// HabitCard.jsx (React) exists as the original counterpart to this web component.
import { useRef, useEffect } from 'react'
import './HabitList.css'

export function HabitList({ habits, onToggle, onDelete }) {
  if (habits.length === 0) return null
  return (
    <ul className="habit-list">
      {habits.map(habit => (
        <HabitCardElement key={habit.id} habit={habit} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  )
}

function HabitCardElement({ habit, onToggle, onDelete }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Sync attributes imperatively — React 18 has limited custom element prop support
    el.setAttribute('name', habit.name)
    el.setAttribute('streak', String(habit.streak))
    el.setAttribute('item-id', String(habit.id))
    if (habit.completedToday) {
      el.setAttribute('completed', '')
    } else {
      el.removeAttribute('completed')
    }

    const handler = e => onToggle(e.detail.id)
    el.addEventListener('habit-toggle', handler)
    return () => el.removeEventListener('habit-toggle', handler)
  }, [habit, onToggle])

  return (
    <li className="habit-list-item">
      {/* eslint-disable-next-line react/no-unknown-property */}
      <habit-card ref={ref} />
      <button
        className="habit-list-delete"
        onClick={() => onDelete(habit.id)}
        aria-label="Delete"
      >
        ×
      </button>
    </li>
  )
}
