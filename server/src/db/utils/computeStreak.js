/**
 * Computes the current streak for an item given its completion dates.
 * For daily items: consecutive days ending on or including today.
 * For weekly items: consecutive ISO weeks ending on or including this week.
 * Note: week-boundary edge cases (week 53) are approximated.
 */
export function computeStreak(completionDates, frequency) {
  if (!completionDates || completionDates.length === 0) return 0
  const sorted = [...completionDates].sort().reverse()
  return frequency === 'daily'
    ? computeDailyStreak(sorted)
    : computeWeeklyStreak(sorted)
}

function toUTCDateString(d) {
  return d.toISOString().split('T')[0]
}

function computeDailyStreak(sortedDates) {
  const today = toUTCDateString(new Date())
  let streak = 0
  let current = new Date(today + 'T12:00:00Z')

  for (const dateStr of sortedDates) {
    if (dateStr === toUTCDateString(current)) {
      streak++
      current.setUTCDate(current.getUTCDate() - 1)
    } else if (dateStr < toUTCDateString(current)) {
      break
    }
  }

  return streak
}

function getISOWeekKey(dateStr) {
  const d = new Date(dateStr + 'T12:00:00Z')
  const day = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - day)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  const week = Math.ceil(((d - yearStart) / 86400000 + 1) / 7)
  return `${d.getUTCFullYear()}-${String(week).padStart(2, '0')}`
}

function computeWeeklyStreak(sortedDates) {
  const today = toUTCDateString(new Date())
  const uniqueWeeks = [...new Set(sortedDates.map(getISOWeekKey))]
  const todayWeek = getISOWeekKey(today)

  let streak = 0
  let [expectedYear, expectedWeek] = todayWeek.split('-').map(Number)

  for (const weekKey of uniqueWeeks) {
    const [yr, wk] = weekKey.split('-').map(Number)
    if (yr === expectedYear && wk === expectedWeek) {
      streak++
      expectedWeek--
      if (expectedWeek === 0) {
        expectedYear--
        expectedWeek = 52
      }
    } else {
      break
    }
  }

  return streak
}
