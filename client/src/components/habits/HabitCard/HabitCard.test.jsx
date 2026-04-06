import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { HabitCard } from './HabitCard'

const mockHabit = {
  id: 1,
  name: 'Morning run',
  type: 'habit',
  frequency: 'daily',
  streak: 3,
  totalCompletions: 10,
  completedToday: false,
}

describe('HabitCard', () => {
  it('renders the habit name', () => {
    render(<HabitCard habit={mockHabit} onToggle={() => {}} onDelete={() => {}} />)
    expect(screen.getByText('Morning run')).toBeInTheDocument()
  })

  it('shows the streak count', () => {
    render(<HabitCard habit={mockHabit} onToggle={() => {}} onDelete={() => {}} />)
    expect(screen.getByText(/🔥 3/)).toBeInTheDocument()
  })

  it('calls onToggle with the habit id when checkbox is clicked', () => {
    const onToggle = vi.fn()
    render(<HabitCard habit={mockHabit} onToggle={onToggle} onDelete={() => {}} />)
    fireEvent.click(screen.getByRole('checkbox'))
    expect(onToggle).toHaveBeenCalledWith(1)
  })

  it('shows completed state when completedToday is true', () => {
    render(
      <HabitCard habit={{ ...mockHabit, completedToday: true }} onToggle={() => {}} onDelete={() => {}} />
    )
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('calls onDelete with the habit id when delete button is clicked', () => {
    const onDelete = vi.fn()
    render(<HabitCard habit={mockHabit} onToggle={() => {}} onDelete={onDelete} />)
    fireEvent.click(screen.getByRole('button', { name: /delete/i }))
    expect(onDelete).toHaveBeenCalledWith(1)
  })
})
