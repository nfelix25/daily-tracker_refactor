import { useState, useEffect, useCallback } from 'react'
import { getChores } from '../api/chores/getChores'
import { createChore } from '../api/chores/createChore'
import { deleteChore } from '../api/chores/deleteChore'
import { completeChore } from '../api/chores/completeChore'

export function useChores(frequency, date) {
  const [chores, setChores] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    try {
      setLoading(true)
      setChores(await getChores(frequency, date))
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [frequency, date])

  useEffect(() => { load() }, [load])

  const toggleChore = useCallback(async id => {
    const chore = chores.find(c => c.id === id)
    if (!chore) return
    await completeChore(id, date, !chore.completedToday)
    await load()
  }, [chores, date, load])

  const addChore = useCallback(async name => {
    await createChore(name, frequency)
    await load()
  }, [frequency, load])

  const removeChore = useCallback(async id => {
    await deleteChore(id)
    await load()
  }, [load])

  return { chores, loading, error, toggleChore, addChore, removeChore }
}
