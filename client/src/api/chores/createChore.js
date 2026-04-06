export async function createChore(name, frequency) {
  const res = await fetch('/api/chores', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, frequency }),
  })
  if (!res.ok) throw new Error('Failed to create chore')
  return res.json()
}
