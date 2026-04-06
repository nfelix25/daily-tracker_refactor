export async function createHabit(name, frequency) {
  const res = await fetch('/api/habits', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, frequency }),
  })
  if (!res.ok) throw new Error('Failed to create habit')
  return res.json()
}
