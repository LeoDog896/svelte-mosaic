import { expect, test } from '@playwright/test';

test('index page has expected information', async ({ page }) => {
	// basic information
	await page.goto('/svelte-mosaic/');
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

test('dragbar can be dragged', async ({ page }) => {
	await page.goto('/svelte-mosaic/');

	// dragbar exists
	const dragbar = await page.$('.sash.sash-horizontal');
	expect(dragbar).toBeTruthy();

	if (!dragbar) {
		return;
	}

	// dragbar can be dragged
	const dragbarBox = await dragbar.boundingBox();
	expect(dragbarBox).toBeTruthy();
	if (!dragbarBox) {
		return;
	}

	const oldDragBarX = dragbarBox.x;

	await page.mouse.move(dragbarBox.x + dragbarBox.width / 2, dragbarBox.y + dragbarBox.height / 2);
	await page.mouse.down();
	await page.mouse.move(
		dragbarBox.x + dragbarBox.width / 2 + 100,
		dragbarBox.y + dragbarBox.height / 2
	);
	await page.mouse.up();

	// check if the bar has moved
	const newDragBarX = (await dragbar.boundingBox())?.x;
	expect(newDragBarX).toBeTruthy();
	if (!newDragBarX) {
		return;
	}

	expect(newDragBarX).toBeGreaterThan(oldDragBarX);
});
