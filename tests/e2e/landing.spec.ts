import { test, expect } from '@playwright/test'

test('should navigate from landing to configurator', async ({ page }) => {
    await page.goto('/')

    await expect(page).toHaveTitle(/Mood Room/)

    const heading = page.getByRole('heading', { name: 'Mood Room' })
    await expect(heading).toBeVisible()

    const ctaButton = page.getByRole('link', { name: 'Enter Your Room' })
    await expect(ctaButton).toBeVisible()

    await ctaButton.click()

    await expect(page).toHaveURL('/configurator')
})

