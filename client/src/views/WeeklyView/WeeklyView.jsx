import { useHabits } from '../../hooks/useHabits'
import { useChores } from '../../hooks/useChores'
import { HabitList } from '../../components/habits/HabitList/HabitList'
import { ChoreList } from '../../components/chores/ChoreList/ChoreList'
import { HabitForm } from '../../components/habits/HabitForm/HabitForm'
import { ChoreForm } from '../../components/chores/ChoreForm/ChoreForm'
import './WeeklyView.css'

export function WeeklyView() {
  const today = new Date().toISOString().split('T')[0]
  const { habits, loading: hLoading, toggleHabit, addHabit, removeHabit } = useHabits('weekly', today)
  const { chores, loading: cLoading, toggleChore, addChore, removeChore } = useChores('weekly', today)

  if (hLoading || cLoading) return <div className="loading">Loading…</div>

  return (
    <div className="weekly-view">
      <section className="weekly-section">
        <h2 className="weekly-section-title">Weekly Habits</h2>
        {habits.length === 0
          ? <p className="empty-state">No weekly habits yet. Add one below.</p>
          : <HabitList habits={habits} onToggle={toggleHabit} onDelete={removeHabit} />
        }
        <HabitForm onAdd={addHabit} frequency="weekly" />
      </section>

      <section className="weekly-section">
        <h2 className="weekly-section-title">Weekly Chores</h2>
        {chores.length === 0
          ? <p className="empty-state">No weekly chores yet. Add one below.</p>
          : <ChoreList chores={chores} onToggle={toggleChore} onDelete={removeChore} />
        }
        <ChoreForm onAdd={addChore} frequency="weekly" />
      </section>
    </div>
  )
}
