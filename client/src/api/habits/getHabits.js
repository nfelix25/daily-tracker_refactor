export async function getHabits(frequency, date) {
  const params = new URLSearchParams()
  if (frequency) params.set('frequency', frequency)
  if (date) params.set('date', date)
  const res = await fetch(`/api/habits?${params}`)
  if (!res.ok) throw new Error('Failed to fetch habits')
  return res.json()
}
