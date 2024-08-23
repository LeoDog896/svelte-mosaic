<script lang="ts">
	import { parseSize, parseSizeRange, type Tile } from '$lib/tree.js';
	import { Pane } from 'svelte-splitpanes';
	import Mosaic from '$lib/Mosaic.svelte';

	export let tile: Tile;
	export let containerSizePx: number | undefined;

	$: sizeParsed = containerSizePx ? parseSizeRange(tile.size, containerSizePx) : undefined;

	// Prevents initial from being unnecessarily reactive
	const getInitial = () => sizeParsed?.initial ? sizeParsed.initial * 100 : undefined;

	$: initial = containerSizePx && getInitial();
</script>

<Pane
	size={initial}
	minSize={sizeParsed ? sizeParsed.min * 100 : 0}
	maxSize={sizeParsed ? sizeParsed.max * 100 : 100}
	snapSize={tile.snapSize && containerSizePx ? parseSize(tile.snapSize, containerSizePx / 2) * 100 : undefined}
	class={tile.class}
>
	{#if 'branch' in tile}
		<Mosaic tree={tile.branch} />
	{:else}
		<svelte:component this={tile.component} {...tile.props} />
	{/if}
</Pane>
