export async function getChores(frequency, date) {
  const params = new URLSearchParams()
  if (frequency) params.set('frequency', frequency)
  if (date) params.set('date', date)
  const res = await fetch(`/api/chores?${params}`)
  if (!res.ok) throw new Error('Failed to fetch chores')
  return res.json()
}
