/**
 * Demo E2E spec for the daily view.
 * Assumes the server is running and the database has been seeded (npm run seed).
 * This spec survives all four refactors unchanged — it tests user behavior, not implementation.
 */
import { test, expect } from '@playwright/test'

test.describe('Daily View', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('shows habits and chores sections on load', async ({ page }) => {
    await expect(page.getByText('Habits')).toBeVisible()
    await expect(page.getByText('Chores')).toBeVisible()
  })

  test('can mark a habit as complete and see it update', async ({ page }) => {
    // Wait for at least one habit-card to appear (web component or React card)
    const firstToggle = page.locator('habit-card').first()
    await expect(firstToggle).toBeVisible()

    // Get the toggle button inside shadow DOM
    const toggleBtn = page.locator('habit-card').first().locator('pierce/.toggle')
    const wasCompleted = await page.locator('habit-card').first().evaluate(
      el => el.hasAttribute('completed')
    )

    await toggleBtn.click()

    // State should have flipped
    await expect(
      page.locator('habit-card').first()
    ).toHaveAttribute('completed', wasCompleted ? undefined : '')
  })

  test('can add a new daily habit', async ({ page }) => {
    const input = page.locator('.habit-form-input').first()
    await input.fill('Test habit from Playwright')
    await input.press('Enter')
    await expect(page.getByText('Test habit from Playwright')).toBeVisible()
  })
})
