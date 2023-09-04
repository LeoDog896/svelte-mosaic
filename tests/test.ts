import { expect, test } from '@playwright/test';

test('index page has expected information', async ({ page }) => {
	// basic information
	await page.goto('/');
	await expect(page.title()).resolves.toMatch('svelte-mosaic');
	await expect(page.getByRole('heading', { name: 'svelte-mosaic' })).toBeVisible();

	// favicon exists
	const favicon = await page.$('link[rel="icon"]');
	expect(favicon).toBeTruthy();

	// links
	const icons = await page.$$('.icons a');
	expect(icons.length).toBe(2);
	expect(await icons[0].getAttribute('href')).toBe('https://github.com/LeoDog896/svelte-mosaic');
	expect(await icons[1].getAttribute('href')).toBe('https://npmjs.com/package/svelte-mosaic');
});
