export async function completeChore(id, date, completed) {
  const method = completed ? 'POST' : 'DELETE'
  const res = await fetch(`/api/chores/${id}/complete`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ date }),
  })
  if (!res.ok && res.status !== 204) throw new Error('Failed to update chore completion')
}
