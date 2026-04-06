import { useHabits } from '../../hooks/useHabits'
import { useChores } from '../../hooks/useChores'
import { HabitList } from '../../components/habits/HabitList/HabitList'
import { ChoreList } from '../../components/chores/ChoreList/ChoreList'
import { HabitForm } from '../../components/habits/HabitForm/HabitForm'
import { ChoreForm } from '../../components/chores/ChoreForm/ChoreForm'
import './DailyView.css'

export function DailyView() {
  const today = new Date().toISOString().split('T')[0]
  const { habits, loading: hLoading, toggleHabit, addHabit, removeHabit } = useHabits('daily', today)
  const { chores, loading: cLoading, toggleChore, addChore, removeChore } = useChores('daily', today)

  if (hLoading || cLoading) return <div className="loading">Loading…</div>

  return (
    <div className="daily-view">
      <section className="daily-section">
        <h2 className="daily-section-title">Habits</h2>
        {habits.length === 0
          ? <p className="empty-state">No daily habits yet. Add one below.</p>
          : <HabitList habits={habits} onToggle={toggleHabit} onDelete={removeHabit} />
        }
        <HabitForm onAdd={addHabit} frequency="daily" />
      </section>

      <section className="daily-section">
        <h2 className="daily-section-title">Chores</h2>
        {chores.length === 0
          ? <p className="empty-state">No daily chores yet. Add one below.</p>
          : <ChoreList chores={chores} onToggle={toggleChore} onDelete={removeChore} />
        }
        <ChoreForm onAdd={addChore} frequency="daily" />
      </section>
    </div>
  )
}
