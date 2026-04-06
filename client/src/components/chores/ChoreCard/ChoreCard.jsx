import { Checkbox } from '../../ui/Checkbox/Checkbox'
import { Badge } from '../../ui/Badge/Badge'
import './ChoreCard.css'

export function ChoreCard({ chore, onToggle, onDelete }) {
  return (
    <div className={`chore-card ${chore.completedToday ? 'chore-card--completed' : ''}`}>
      <Checkbox checked={chore.completedToday} onChange={() => onToggle(chore.id)} />
      <div className="chore-card-content">
        <span className="chore-card-name">{chore.name}</span>
        <div className="chore-card-meta">
          <Badge variant={chore.frequency}>{chore.frequency}</Badge>
          <span className="chore-card-streak">🔥 {chore.streak}</span>
        </div>
      </div>
      <button className="chore-card-delete" onClick={() => onDelete(chore.id)} aria-label="Delete">
        ×
      </button>
    </div>
  )
}
