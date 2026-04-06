import { ChoreCard } from '../ChoreCard/ChoreCard'
import './ChoreList.css'

export function ChoreList({ chores, onToggle, onDelete }) {
  if (chores.length === 0) return null
  return (
    <ul className="chore-list">
      {chores.map(chore => (
        <li key={chore.id}>
          <ChoreCard chore={chore} onToggle={onToggle} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  )
}
