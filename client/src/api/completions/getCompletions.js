export async function getCompletions(date) {
  const params = new URLSearchParams()
  if (date) params.set('date', date)
  const res = await fetch(`/api/completions?${params}`)
  if (!res.ok) throw new Error('Failed to fetch completions')
  return res.json()
}
