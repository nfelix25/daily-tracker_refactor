import { useState, useEffect } from 'react'
import { getCompletions } from '../api/completions/getCompletions'

export function useCompletions() {
  const [completions, setCompletions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getCompletions()
      .then(setCompletions)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  return { completions, loading, error }
}
