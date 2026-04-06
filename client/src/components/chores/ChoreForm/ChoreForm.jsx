import { useState } from 'react'
import { Button } from '../../ui/Button/Button'
import './ChoreForm.css'

export function ChoreForm({ onAdd, frequency }) {
  const [name, setName] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    if (!name.trim()) return
    onAdd(name.trim())
    setName('')
  }

  return (
    <form className="chore-form" onSubmit={handleSubmit}>
      <input
        className="chore-form-input"
        type="text"
        placeholder={`New ${frequency} chore…`}
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <Button type="submit">Add</Button>
    </form>
  )
}
