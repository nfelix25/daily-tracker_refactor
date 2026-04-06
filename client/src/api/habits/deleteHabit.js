export async function deleteHabit(id) {
  const res = await fetch(`/api/habits/${id}`, { method: 'DELETE' })
  if (!res.ok && res.status !== 204) throw new Error('Failed to delete habit')
}
