export async function deleteChore(id) {
  const res = await fetch(`/api/chores/${id}`, { method: 'DELETE' })
  if (!res.ok && res.status !== 204) throw new Error('Failed to delete chore')
}
